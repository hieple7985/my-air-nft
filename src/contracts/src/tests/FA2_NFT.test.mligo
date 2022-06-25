#import "../contracts/FA2_NFT.mligo" "FA2_NFT"
#import "./balance_of_callback_contract.mligo" "Callback"

(* Tests for FA2 multi asset contract *)

module List_helper = struct 

  let nth_exn (type a) (i: int) (a: a list) : a =
    let rec aux (remaining: a list) (cur: int) : a =
      match remaining with 
       [] -> 
        failwith "Not found in list"
      | hd :: tl -> 
          if cur = i then 
            hd 
          else aux tl (cur + 1)
    in
    aux a 0  

end

let get_initial_storage (a, b, c : nat * nat * nat) = 
  let () = Test.reset_state 6n ([] : tez list) in

  let owner1 = Test.nth_bootstrap_account 0 in 
  let owner2 = Test.nth_bootstrap_account 1 in 
  let owner3 = Test.nth_bootstrap_account 2 in 

  let owners = [owner1; owner2; owner3] in

  let op1 = Test.nth_bootstrap_account 3 in
  let op2 = Test.nth_bootstrap_account 4 in
  let op3 = Test.nth_bootstrap_account 5 in

  let ops = [op1; op2; op3] in

    let ledger = Big_map.literal ([
    (1n, owner1);
    (2n, owner2);
    (3n, owner3);
  ])
  in

  let operators  = Big_map.literal ([
    ((owner1, op1), Set.literal [1n]);
    ((owner2, op1), Set.literal [2n]);
    ((owner3, op1), Set.literal [3n]);
    ((op1   , op3), Set.literal [1n]);
  ])
  in
  
  let token_info = (Map.empty: (string, bytes) map) in
  let token_metadata = (Big_map.literal [
    (1n, ({token_id=1n;token_info=(Map.empty : (string, bytes) map);} : FA2_NFT.TokenMetadata.data));
    (2n, ({token_id=2n;token_info=(Map.empty : (string, bytes) map);} : FA2_NFT.TokenMetadata.data));
    (3n, ({token_id=3n;token_info=(Map.empty : (string, bytes) map);} : FA2_NFT.TokenMetadata.data));
  ] : FA2_NFT.TokenMetadata.t) in

  let initial_storage = {
    ledger         = ledger;
    token_metadata = token_metadata;
    operators      = operators;
    admin          = owner1;
  } in

  initial_storage, owners, ops


let assert_balances 
  (contract_address : (FA2_NFT.parameter, FA2_NFT.storage) typed_address ) 
  (a, b, c : (address * nat) * (address * nat) * (address * nat)) = 
  let (owner1, token_id_1) = a in
  let (owner2, token_id_2) = b in
  let (owner3, token_id_3) = c in
  let storage = Test.get_storage contract_address in
  let ledger = storage.ledger in
  let () = match (Big_map.find_opt token_id_1 ledger) with
    Some amt -> assert (amt = owner1)
  | None -> failwith "incorret address" 
  in
  let () = match (Big_map.find_opt token_id_2 ledger) with
    Some amt ->  assert (amt = owner2)
  | None -> failwith "incorret address" 
  in
  let () = match (Big_map.find_opt token_id_3 ledger) with
    Some amt -> assert (amt = owner3)
  | None -> failwith "incorret address" 
  in
  ()


(* Transfer *)

(* 1. transfer successful *)
let test_atomic_tansfer_success =
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=1n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let () = Test.set_source op1 in 
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let _gas = Test.transfer_to_contract_exn contr (Transfer transfer_requests) 0tez in
  let () = assert_balances t_addr ((owner2, 2n), (owner2, 2n), (owner3, 3n)) in
  ()

(* 2. transfer failure token undefined *)
let test_transfer_token_undefined = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=5n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let () = Test.set_source op1 in 
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let result = Test.transfer_to_contract contr (Transfer transfer_requests) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.undefined_token))
  | Fail _ -> failwith "invalid test failure"

(* 3. transfer failure incorrect operator *)
let test_atomic_transfer_failure_not_operator = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op2    = List_helper.nth_exn 1 operators in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=1n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let () = Test.set_source op2 in 
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let result = Test.transfer_to_contract contr (Transfer transfer_requests) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.not_operator))
  | Fail _ -> failwith "invalid test failure"

(* 4. self transfer *)
let test_atomic_tansfer_success_zero_amount_and_self_transfer =
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let transfer_requests = ([
    ({from_=owner2; tx=([{to_=owner2;token_id=2n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let () = Test.set_source op1 in 
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let _gas = Test.transfer_to_contract_exn contr (Transfer transfer_requests) 0tez in
  let () = assert_balances t_addr ((owner1, 1n), (owner2, 2n), (owner3, 3n)) in
  ()

(* 5. transfer failure transitive operators *)
let test_transfer_failure_transitive_operators = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op3    = List_helper.nth_exn 2 operators in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=1n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let () = Test.set_source op3 in 
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let result = Test.transfer_to_contract contr (Transfer transfer_requests) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.not_operator))
  | Fail _ -> failwith "invalid test failure"

(* Balance of *)

(* 6. empty balance of + callback with empty response *)
let test_empty_transfer_and_balance_of = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let (callback_addr,_,_) = Test.originate Callback.main ([] : nat list) 0tez in
  let callback_contract = Test.to_contract callback_addr in

  let balance_of_requests = ({
    requests = ([] : FA2_NFT.request list);
    callback = callback_contract;
  } : FA2_NFT.balance_of) in

  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let _gas = Test.transfer_to_contract_exn contr (Balance_of balance_of_requests) 0tez in

  let callback_storage = Test.get_storage callback_addr in
  assert (callback_storage = ([] : nat list))

(* 7. balance of failure token undefined *)
let test_balance_of_token_undefines = 
  let initial_storage, owners, operators = get_initial_storage (10n, 5n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let (callback_addr,_,_) = Test.originate Callback.main ([] : nat list) 0tez in
  let callback_contract = Test.to_contract callback_addr in

  let balance_of_requests = ({
    requests = ([
      {owner=owner1;token_id=0n};
      {owner=owner2;token_id=2n};
      {owner=owner1;token_id=1n};
    ] : FA2_NFT.request list);
    callback = callback_contract;
  } : FA2_NFT.balance_of) in

  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let result = Test.transfer_to_contract contr (Balance_of balance_of_requests) 0tez in

  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.undefined_token))
  | Fail _ -> failwith "invalid test failure"

(* 8. duplicate balance_of requests *)
let test_balance_of_requests_with_duplicates = 
  let initial_storage, owners, operators = get_initial_storage (10n, 5n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let (callback_addr,_,_) = Test.originate Callback.main ([] : nat list) 0tez in
  let callback_contract = Test.to_contract callback_addr in

  let balance_of_requests = ({
    requests = ([
      {owner=owner1;token_id=1n};
      {owner=owner2;token_id=2n};
      {owner=owner1;token_id=1n};
      {owner=owner1;token_id=2n};
    ] : FA2_NFT.request list);
    callback = callback_contract;
  } : FA2_NFT.balance_of) in

  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let _gas = Test.transfer_to_contract_exn contr (Balance_of balance_of_requests) 0tez in

  let callback_storage = Test.get_storage callback_addr in
  assert (callback_storage = ([1n; 1n; 1n; 0n]))

(* 9. 0 balance if does not hold any tokens (not in ledger) *)
let test_balance_of_0_balance_if_address_does_not_hold_tokens = 
    let initial_storage, owners, operators = get_initial_storage (10n, 5n, 10n) in
    let owner1 = List_helper.nth_exn 0 owners in
    let owner2 = List_helper.nth_exn 1 owners in
    let owner3 = List_helper.nth_exn 2 owners in
    let op1    = List_helper.nth_exn 0 operators in
    let (callback_addr,_,_) = Test.originate Callback.main ([] : nat list) 0tez in
    let callback_contract = Test.to_contract callback_addr in

    let balance_of_requests = ({
      requests = ([
        {owner=owner1;token_id=1n};
        {owner=owner2;token_id=2n};
        {owner=op1;token_id=1n};
      ] : FA2_NFT.request list);
      callback = callback_contract;
    } : FA2_NFT.balance_of) in

    let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
    let contr = Test.to_contract t_addr in
    let _gas = Test.transfer_to_contract_exn contr (Balance_of balance_of_requests) 0tez in

    let callback_storage = Test.get_storage callback_addr in
    assert (callback_storage = ([1n; 1n; 0n]))

(* Update operators *)

(* 10. Remove operator & do transfer - failure *)
let test_update_operator_remove_operator_and_transfer = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op1    = List_helper.nth_exn 0 operators in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in

  let () = Test.set_source owner1 in 
  let _gas = Test.transfer_to_contract_exn contr 
    (Update_operators ([
      (Remove_operator ({
        owner    = owner1;
        operator = op1;
        token_id = 1n;
      } : FA2_NFT.operator) : FA2_NFT.unit_update)
    ] : FA2_NFT.update_operators)) 0tez in

  let () = Test.set_source op1 in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=1n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let result = Test.transfer_to_contract contr (Transfer transfer_requests) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.not_operator))
  | Fail _ -> failwith "invalid test failure"

(* 11. Add operator & do transfer - success *)
let test_update_operator_add_operator_and_transfer = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let op3    = List_helper.nth_exn 2 operators in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in

  let () = Test.set_source owner1 in 
  let _gas = Test.transfer_to_contract_exn contr 
    (Update_operators ([
      (Add_operator ({
        owner    = owner1;
        operator = op3;
        token_id = 1n;
      } : FA2_NFT.operator) : FA2_NFT.unit_update);
    ] : FA2_NFT.update_operators)) 0tez in

  let () = Test.set_source op3 in
  let transfer_requests = ([
    ({from_=owner1; tx=([{to_=owner2;token_id=1n};] : FA2_NFT.atomic_trans list)});
  ] : FA2_NFT.transfer)
  in
  let _gas = Test.transfer_to_contract_exn contr (Transfer transfer_requests) 0tez in
  ()


(*
| Set_admin         p -> set_admin  p s
| Create_token      p -> create     p s
| Mint_token        p -> mint       p s
| Burn_token        p -> burn       p s
*)

(* Set_admin *)
let test_set_admin_check_sender_correct = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _gas = Test.transfer_to_contract_exn contr (Set_admin owner2) 0tez in
  let () = Test.set_source owner2 in
  let _gas = Test.transfer_to_contract_exn contr (Set_admin owner1) 0tez in
  ()

let test_set_admin_check_sender_wrong_sender =
  (* check the error message created when doing it wrong *)
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner2 in
  let result = Test.transfer_to_contract contr (Set_admin owner2) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.requires_admin))
  | Fail _ -> failwith "invalid test failure"

let test_create_token_correct = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  ()

let test_create_token_wrong_sender =
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner2 in
  let result = Test.transfer_to_contract contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.requires_admin))
  | Fail _ -> failwith "invalid test failure"

let test_create_token_wrong_token_id = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let result = Test.transfer_to_contract contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.token_exist))
  | Fail _ -> failwith "invalid test failure"

let test_mint_correct = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 11n; data = {token_id=11n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Mint_token [{owner = owner1; token_id = 10n}; {owner = owner1; token_id = 11n}; ]) 0tez in
  ()

let test_mint_wrong_sender = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 11n; data = {token_id=11n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let () = Test.set_source owner2 in
  let result = Test.transfer_to_contract contr (Mint_token [{owner = owner1; token_id = 10n}; {owner = owner1; token_id = 11n}; ]) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.requires_admin))
  | Fail _ -> failwith "invalid test failure"

let test_mint_wrong_token =
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let result = Test.transfer_to_contract contr (Mint_token [{owner = owner1; token_id = 11n}]) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.undefined_token))
  | Fail _ -> failwith "invalid test failure"

let test_burn_token_correct = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Mint_token [{owner = owner1; token_id = 10n}]) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Burn_token [{owner = owner1; token_id = 10n}]) 0tez in
  ()

let test_burn_token_wrong_sender = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Mint_token [{owner = owner1; token_id = 10n}]) 0tez in
  let () = Test.set_source owner2 in
  let result = Test.transfer_to_contract contr (Burn_token [{owner = owner1; token_id = 10n}]) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.requires_admin))
  | Fail _ -> failwith "invalid test failure"

let test_burn_token_wrong_token = 
  let initial_storage, owners, operators = get_initial_storage (10n, 10n, 10n) in
  let owner1 = List_helper.nth_exn 0 owners in
  let owner2 = List_helper.nth_exn 1 owners in
  let owner3 = List_helper.nth_exn 2 owners in
  let (t_addr,_,_) = Test.originate FA2_NFT.main initial_storage 0tez in
  let contr = Test.to_contract t_addr in
  let () = Test.set_source owner1 in
  let _ = Test.transfer_to_contract_exn contr (Create_token {token_id = 10n; data = {token_id=10n;token_info=(Map.empty : (string, bytes) map)}}) 0tez in
  let _ = Test.transfer_to_contract_exn contr (Mint_token [{owner = owner1; token_id = 10n}]) 0tez in
  let result = Test.transfer_to_contract contr (Burn_token [{owner = owner1; token_id = 55n}]) 0tez in
  match result with
    Success _gas -> failwith "This test should fail"
  | Fail (Rejected (err, _))  -> 
    assert (Test.michelson_equal err (Test.eval FA2_NFT.Errors.undefined_token))
  | Fail _ -> failwith "invalid test failure"