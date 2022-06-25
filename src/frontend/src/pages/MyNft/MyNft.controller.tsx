import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import { State } from 'reducers'
import { create } from './MyNft.actions'
import { MyNftView } from './MyNft.view'

export const MyNft = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, tezos, accountPkh } = useSelector((state: State) => state.wallet)
  const { address, createConfirmation } = useSelector((state: State) => state.contract)

  const createCallback = (name: string, description: string, image: string) => {
    dispatch(create(name, description, image))
  }

  return (
    <>
      {createConfirmation ? (
        <Navigate to={`/qrcode/${address}`} replace />
      ) : (
        <MyNftView address={address} createCallback={createCallback} loading={loading} accountPkh={accountPkh} />
      )}
    </>
  )
}
