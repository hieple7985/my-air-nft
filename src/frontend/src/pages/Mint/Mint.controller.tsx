import { connect } from 'app/App.components/Menu/Menu.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { State } from 'reducers'
import { fetchMetadata, mint } from './Mint.actions'
import { MintView } from './Mint.view'

export const Mint = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, tezos, accountPkh } = useSelector((state: State) => state.wallet)
  const { metadata } = useSelector((state: State) => state.contract)
  const params = useParams()
  const address = params.address

  useEffect(() => {
    if (address) dispatch(fetchMetadata(address))
  }, [address])

  const mintCallback = () => {
    if (address) dispatch(mint(address))
    else dispatch(showToaster(ERROR, 'Contract not found', 'Please return to homepage'))
  }

  const connectCallback = () => {
    dispatch(connect({ forcePermission: false }))
  }

  return (
    <MintView
      metadata={metadata}
      address={address}
      mintCallback={mintCallback}
      connectCallback={connectCallback}
      loading={loading}
      accountPkh={accountPkh}
    />
  )
}
