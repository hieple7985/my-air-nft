import { MichelsonMap } from '@taquito/taquito'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { State } from 'reducers'
import axios from 'axios'
import code from './FA2_NFT.json'

export const ORIGINATE_REQUEST = 'ORIGINATE_REQUEST'
export const ORIGINATE_RESULT = 'ORIGINATE_RESULT'
export const ORIGINATE_ERROR = 'ORIGINATE_ERROR'
export const originate = () => async (dispatch: any, getState: any) => {
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

  try {
    const storage = {
      ledger: MichelsonMap.fromLiteral({}),
      token_metadata: MichelsonMap.fromLiteral({}),
      operators: MichelsonMap.fromLiteral({}),
      admin: state.wallet.accountPkh,
    }

    dispatch({
      type: ORIGINATE_REQUEST,
    })

    const op = await state.wallet.tezos.wallet.originate({ code, storage }).send()
    dispatch(showToaster(SUCCESS, 'Originating...', 'Please wait 30s'))

    await op.confirmation()

    console.log(`Deployed`, op)

    const opHash = op.opHash

    const resp = await axios.get(`https://api.ithacanet.tzkt.io/v1/operations/${opHash}`)
    console.log(resp.data)

    const address = resp.data[0].originatedContract.address

    dispatch(showToaster(SUCCESS, 'Smart contract deployed', address))

    dispatch({
      type: ORIGINATE_RESULT,
      address,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: ORIGINATE_ERROR,
      error,
    })
  }
}
