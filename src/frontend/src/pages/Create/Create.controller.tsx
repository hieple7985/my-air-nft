import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import { State } from 'reducers'
import { create } from './Create.actions'
import { CreateView } from './Create.view'

export const Create = () => {
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
        <CreateView address={address} createCallback={createCallback} loading={loading} accountPkh={accountPkh} />
      )}
    </>
  )
}
