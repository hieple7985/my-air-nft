import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { State } from 'reducers'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

//@ts-ignore
const Tezos = new TezosToolkit('https://ithacanet.tezos.marigold.dev')
//@ts-ignore
Tezos.addExtension(new Tzip12Module())

export const FETCH_METADATA_REQUEST = 'FETCH_METADATA_REQUEST'
export const FETCH_METADATA_RESULT = 'FETCH_METADATA_RESULT'
export const FETCH_METADATA_ERROR = 'FETCH_METADATA_ERROR'
export const fetchMetadata = (address: string) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  if (!address) {
    dispatch(showToaster(ERROR, 'Contract not found', 'Please return to homepage'))
    return
  }

  try {
    dispatch({
      type: FETCH_METADATA_REQUEST,
    })

    const contract = await Tezos.contract.at(address, tzip12)
    console.log('contract', contract)
    //@ts-ignore
    const meta12 = await contract.tzip12().getTokenMetadata(0)
    console.log(meta12)

    dispatch({
      type: FETCH_METADATA_RESULT,
      metadata: meta12,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: FETCH_METADATA_ERROR,
      error,
    })
  }
}

export const MINT_REQUEST = 'MINT_REQUEST'
export const MINT_RESULT = 'MINT_RESULT'
export const MINT_ERROR = 'MINT_ERROR'
export const mint = (address: string) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  if (!state.wallet.tezos) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Please return to homepage'))
    return
  }

  if (!state.wallet.accountPkh) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Please return to homepage'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  if (!address) {
    dispatch(showToaster(ERROR, 'Contract not found', 'Please return to homepage'))
    return
  }

  try {
    dispatch({
      type: MINT_REQUEST,
    })

    const contract = await state.wallet.tezos?.wallet.at(address)
    const token_id = 0
    const owner = state.wallet.accountPkh
    const mintTransaction = await contract.methods.mint_token([{ owner, token_id }]).send()
    dispatch(showToaster(SUCCESS, 'Creating token...', 'Please wait 30s'))

    const mintDone = await mintTransaction.confirmation()
    console.log('done', mintDone)

    dispatch(showToaster(SUCCESS, 'NFT sent to your wallet', 'Enjoy!'))

    dispatch({
      type: MINT_RESULT,
      mintConfirmation: mintDone,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: MINT_ERROR,
      error,
    })
  }
}
