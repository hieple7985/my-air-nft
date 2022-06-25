import { HomeView } from './Home.view'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { connect } from 'app/App.components/Menu/Menu.actions'
import { Navigate } from 'react-router'

export const Home = () => {
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
    <>
      {ready ? (
        <Navigate to="/originate" replace />
      ) : (
        <HomeView
          loading={loading}
          accountPkh={accountPkh}
          wallet={wallet}
          ready={ready}
          handleConnect={handleConnect}
          handleNewConnect={handleNewConnect}
        />
      )}
    </>
  )
}
