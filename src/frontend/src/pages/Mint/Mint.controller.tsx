import { connect } from 'app/App.components/Menu/Menu.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'
import { useDispatch, useSelector } from 'react-redux'

import { State } from 'reducers'
import { mint } from './Mint.actions'
import { MintView } from './Mint.view'

export const Mint = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, tezos, accountPkh } = useSelector((state: State) => state.wallet)

  const mintCallback = (city: string) => {
    if (city) dispatch(mint(city))
    else dispatch(showToaster(ERROR, 'Incorrect City', 'Please retry'))
  }

  const connectCallback = () => {
    dispatch(connect({ forcePermission: false }))
  }

  return <MintView mintCallback={mintCallback} connectCallback={connectCallback} loading={loading} accountPkh={accountPkh} />
}
