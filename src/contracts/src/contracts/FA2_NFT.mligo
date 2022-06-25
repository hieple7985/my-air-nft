(**
   This file implement the TZIP-12 protocol (a.k.a FA2) for NFT on Tezos
   copyright Wulfman Corporation 2021
*)

(*
   Errors
*)
module Errors = struct
   let undefined_token = "FA2_TOKEN_UNDEFINED"
   let ins_balance     = "FA2_INSUFFICIENT_BALANCE"
   let no_transfer     = "FA2_TX_DENIED"
   let not_owner       = "FA2_NOT_OWNER"
   let not_operator    = "FA2_NOT_OPERATOR"
   let not_supported   = "FA2_OPERATORS_UNSUPPORTED"
   let rec_hook_fail   = "FA2_RECEIVER_HOOK_FAILED"
   let send_hook_fail  = "FA2_SENDER_HOOK_FAILED"
   let rec_hook_undef  = "FA2_RECEIVER_HOOK_UNDEFINED"
   let send_hook_under = "FA2_SENDER_HOOK_UNDEFINED"
   let requires_admin  = "NOT_AN_ADMIN"
   let already_exist   = "UNIQUE_TOKEN_ALREADY_EXIST"
   let token_exist     = "TOKEN_ID_ALREADY_PRESENT"
end

module Operators = struct
   type owner    = address
   type operator = address
   type token_id = nat
   type t = ((owner * operator), token_id set) big_map

(** if transfer policy is Owner_or_operator_transfer *)
   let assert_authorisation (operators : t) (from_ : address) (token_id : nat) : unit =
      let sender_ = Tezos.sender in
      if (sender_ = from_) then ()
      else
      let authorized = match Big_map.find_opt (from_,sender_) operators with
         Some (a) -> a | None -> Set.empty
      in if Set.mem token_id authorized then ()
      else failwith Errors.not_operator
(** if transfer policy is Owner_transfer
   let assert_authorisation (operators : t) (from_ : address) : unit =
      let sender_ = Tezos.sender in
      if (sender_ = from_) then ()
      else failwith Errors.not_owner
*)

(** if transfer policy is No_transfer
   let assert_authorisation (operators : t) (from_ : address) : unit =
      failwith Errors.no_owner
*)

   let assert_update_permission (owner : owner) : unit =
      assert_with_error (owner = Tezos.sender) "The sender can only manage operators for his own token"
   (** For an administator
      let admin = tz1.... in
      assert_with_error (Tezos.sender = admiin) "Only administrator can manage operators"
   *)

   let add_operator (operators : t) (owner : owner) (operator : operator) (token_id : token_id) : t =
      if owner = operator then operators (* assert_authorisation always allow the owner so this case is not relevant *)
      else
         let () = assert_update_permission owner in
         let auth_tokens = match Big_map.find_opt (owner,operator) operators with
            Some (ts) -> ts | None -> Set.empty in
         let auth_tokens  = Set.add token_id auth_tokens in
         Big_map.update (owner,operator) (Some auth_tokens) operators

   let remove_operator (operators : t) (owner : owner) (operator : operator) (token_id : token_id) : t =
      if owner = operator then operators (* assert_authorisation always allow the owner so this case is not relevant *)
      else
         let () = assert_update_permission owner in
         let auth_tokens = match Big_map.find_opt (owner,operator) operators with
         None -> None | Some (ts) ->
            let ts = Set.remove token_id ts in
            if (Set.size ts = 0n) then None else Some (ts)
         in
         Big_map.update (owner,operator) auth_tokens operators
end

module Ledger = struct
   type token_id = nat
   type owner = address
   type t = (token_id,owner) big_map

   let is_owner_of (ledger:t) (token_id : token_id) (owner: address) : bool =
      (** We already sanitized token_id, a failwith here indicated a patological storage *)
      let current_owner = Option.unopt (Big_map.find_opt token_id ledger) in
      current_owner=owner

   let assert_owner_of (ledger:t) (token_id : token_id) (owner: address) : unit =
      assert_with_error (is_owner_of ledger token_id owner) Errors.ins_balance

   let assert_not_owned (ledger:t) (token_id : token_id) : unit =
      assert_with_error  (not (Map.mem token_id ledger)) Errors.already_exist

   let transfer_token_from_user_to_user (ledger : t) (token_id : token_id) (from_ : owner) (to_ : owner) : t =
      let () = assert_owner_of ledger token_id from_ in
      let ledger = Big_map.update token_id (Some to_) ledger in
      ledger

   let mint_token (ledger:t) (token_id : token_id) (owner: address) : t =
      let () = assert_not_owned ledger token_id in
      let ledger = Big_map.update token_id (Some owner) ledger in
      ledger

   let burn_token (ledger:t) (token_id : token_id) (owner: address) : t =
      let () = assert_owner_of ledger token_id owner in
      let ledger = Big_map.update token_id (None : address option) ledger in
      ledger
end

module TokenMetadata = struct
   (**
      This should be initialized at origination, conforming to either
      TZIP-12 : https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#token-metadata
      or TZIP-16 : https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#contract-metadata-tzip-016
   *)
   type data = {token_id:nat;token_info:(string,bytes)map}
   type t = (nat, data) big_map

   let add_new_token (md:t) (token_id : nat) (data:data) =
      let () = assert_with_error (not (Big_map.mem token_id md)) Errors.token_exist in
      let md = Big_map.add token_id data md in
      md
end

module Storage = struct
   type token_id = nat
   type t = {
      ledger : Ledger.t;
      token_metadata : TokenMetadata.t;
      operators : Operators.t;
      admin     : address
   }

   let is_owner_of (s:t) (owner : address) (token_id : token_id) : bool =
      Ledger.is_owner_of s.ledger token_id owner

   let assert_token_exist (s:t) (token_id : nat) : unit  =
      let _ = Option.unopt_with_error (Big_map.find_opt token_id s.token_metadata)
         Errors.undefined_token in
      ()

   let get_token_metadata (s:t) = s.token_metadata
   let set_token_metadata (s:t) (token_metadata:TokenMetadata.t) = {s with token_metadata = token_metadata}

   let get_ledger (s:t) = s.ledger
   let set_ledger (s:t) (ledger:Ledger.t) = {s with ledger = ledger}

   let get_operators (s:t) = s.operators
   let set_operators (s:t) (operators:Operators.t) = {s with operators = operators}

   let assert_admin (s:t) : unit =
      assert_with_error (Tezos.sender = s.admin) Errors.requires_admin

   let set_admin (s:t) (admin:address) = {s with admin = admin}
end


type storage = Storage.t

(** Transfer entrypoint *)
type atomic_trans = [@layout:comb] {
   to_      : address;
   token_id : nat;
}

type transfer_from = {
   from_ : address;
   tx    : atomic_trans list
}
type transfer = transfer_from list

let transfer : transfer -> storage -> operation list * storage =
   fun (t:transfer) (s:storage) ->
   (* This function process the "tx" list. Since all transfer share the same "from_" address, we use a se *)
   let process_atomic_transfer (from_:address) (ledger, t:Ledger.t * atomic_trans) =
      let {to_;token_id} = t in
      let ()     = Storage.assert_token_exist s token_id in
      let ()     = Operators.assert_authorisation s.operators from_ token_id in
      let ledger = Ledger.transfer_token_from_user_to_user ledger token_id from_ to_ in
      ledger
   in
   let process_single_transfer (ledger, t:Ledger.t * transfer_from ) =
      let {from_;tx} = t in
      let ledger     = List.fold_left (process_atomic_transfer from_) ledger tx in
      ledger
   in
   let ledger = List.fold_left process_single_transfer s.ledger t in
   let s = Storage.set_ledger s ledger in
   ([]: operation list),s

type request = {
   owner    : address;
   token_id : nat;
}

type callback = [@layout:comb] {
   request : request;
   balance : nat;
}

type balance_of = [@layout:comb] {
   requests : request list;
   callback : callback list contract;
}

(** Balance_of entrypoint *)
let balance_of : balance_of -> storage -> operation list * storage =
   fun (b: balance_of) (s: storage) ->
   let {requests;callback} = b in
   let get_balance_info (request : request) : callback =
      let {owner;token_id} = request in
      let ()       = Storage.assert_token_exist  s token_id in
      let balance_ = if Storage.is_owner_of s owner token_id then 1n else 0n in
      {request=request;balance=balance_}
   in
   let callback_param = List.map get_balance_info requests in
   let operation = Tezos.transaction callback_param 0tez callback in
   ([operation]: operation list),s

(** Update_operators entrypoint *)
type operator = [@layout:comb] {
   owner    : address;
   operator : address;
   token_id : nat;
}

type unit_update      = Add_operator of operator | Remove_operator of operator
type update_operators = unit_update list

let update_ops : update_operators -> storage -> operation list * storage =
   fun (updates: update_operators) (s: storage) ->
   let update_operator (operators,update : Operators.t * unit_update) = match update with
      Add_operator    {owner=owner;operator=operator;token_id=token_id} -> Operators.add_operator    operators owner operator token_id
   |  Remove_operator {owner=owner;operator=operator;token_id=token_id} -> Operators.remove_operator operators owner operator token_id
   in
   let operators = Storage.get_operators s in
   let operators = List.fold_left update_operator operators updates in
   let s = Storage.set_operators s operators in
   ([]: operation list),s

(** If transfer_policy is  No_transfer or Owner_transfer
let update_ops : update_operators -> storage -> operation list * storage =
   fun (updates: update_operators) (s: storage) ->
   let () = failwith Errors.not_supported in
   ([]: operation list),s
*)

(* extendend admin operations *)
let set_admin (admin : address) (s : storage) =
   let () = Storage.assert_admin s in
   let s  = Storage.set_admin s admin in
   ([]: operation list),s

type create_token = {
   token_id : nat;
   data     : TokenMetadata.data;
}

let create ({token_id;data} : create_token) (s : storage) =
   let () = Storage.assert_admin s in
   let md = Storage.get_token_metadata s in
   let md = TokenMetadata.add_new_token md token_id data in
   let s = Storage.set_token_metadata s md in
   ([]: operation list),s


type mint_or_burn = request

let mint (lst : mint_or_burn list) (s : storage) =
   let () = Storage.assert_admin s in
   let ledger = Storage.get_ledger s in
   let process_one (ledger,{owner;token_id} : Ledger.t * mint_or_burn) =
      let () = Storage.assert_token_exist  s token_id in
      Ledger.mint_token ledger token_id owner
   in
   let ledger = List.fold_left process_one ledger lst in
   let s = Storage.set_ledger s ledger in
   ([]: operation list),s

let burn (lst : mint_or_burn list) (s : storage) =
   let () = Storage.assert_admin s in
   let ledger = Storage.get_ledger s in
   let process_one (ledger,{owner;token_id} : Ledger.t * mint_or_burn) =
      let () = Storage.assert_token_exist  s token_id in
      Ledger.burn_token ledger token_id owner
   in
   let ledger = List.fold_left process_one ledger lst in
   let s = Storage.set_ledger s ledger in
   ([]: operation list),s

type parameter = [@layout:comb]
   | Transfer of transfer
   | Balance_of of balance_of
   | Update_operators of update_operators
   | Set_admin of address
   | Create_token of create_token
   | Mint_token of mint_or_burn list
   | Burn_token of mint_or_burn list

let main ((p,s):(parameter * storage)) = match p with
   Transfer         p -> transfer   p s
|  Balance_of       p -> balance_of p s
|  Update_operators p -> update_ops p s
(* extended admin operations *)
| Set_admin         p -> set_admin  p s
| Create_token      p -> create     p s
| Mint_token        p -> mint       p s
| Burn_token        p -> burn       p s
