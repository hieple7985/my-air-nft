import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'
import axios from 'axios'

import { State } from 'reducers'
import { MyNftView } from './MyNft.view'

export const MyNft = () => {
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, tezos, accountPkh } = useSelector((state: State) => state.wallet)
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      const Tezos = new TezosToolkit('https://ithacanet.tezos.marigold.dev')
      //@ts-ignore
      Tezos.addExtension(new Tzip12Module())
      const contract = await Tezos.contract.at('KT1Mdqsdp36cSdag1qy9sGFU2PFuzM7PRn68', tzip12)
      console.log('contract', contract)

      const localStorageTokens = localStorage.tokens
      if (localStorageTokens) {
        let storedTokens = JSON.parse(localStorageTokens)
        console.log('storedTokens', storedTokens)
        storedTokens.forEach(async (storedToken: number) => {
          const meta12: any = await contract.tzip12().getTokenMetadata(storedToken)
          console.log(meta12)
          const city = meta12.description
          const pollutionReq = await axios.get(`https://api.waqi.info/feed/${city}/?token=3ab5a02399daca6b7295bbb2579b8d199e480792`)
          console.log(pollutionReq.data)
          const pollution = pollutionReq.data?.data?.aqi
          let level = 1
          if (pollution >= 0 && pollution < 50) level = 1
          if (pollution >= 50 && pollution < 100) level = 2
          if (pollution >= 100) level = 3

          //@ts-ignore
          setTokens((tokens) => [...tokens, { city, pollution, level }])
        })
      }
    }
    fetchData()
  }, [])

  return <MyNftView tokens={tokens} loading={loading} accountPkh={accountPkh} />
}
