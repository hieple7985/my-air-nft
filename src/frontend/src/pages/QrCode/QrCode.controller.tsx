import * as React from 'react'
import { useParams } from 'react-router-dom'

import { QrCodeView } from './QrCode.view'

export const QrCode = () => {
  const params = useParams()
  const address = params.address

  return <QrCodeView address={address} />
}
