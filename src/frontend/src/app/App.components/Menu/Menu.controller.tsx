import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { connect } from './Menu.actions'

import { MenuView } from './Menu.view'

export const Menu = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, accountPkh } = useSelector((state: State) => state.wallet)

  const handleConnect = () => {
    dispatch(connect({ forcePermission: false }))
  }

  const handleNewConnect = () => {
    dispatch(connect({ forcePermission: true }))
  }

  return (
    <MenuView
      loading={loading}
      accountPkh={accountPkh}
      wallet={wallet}
      ready={ready}
      handleConnect={handleConnect}
      handleNewConnect={handleNewConnect}
    />
  )
}
