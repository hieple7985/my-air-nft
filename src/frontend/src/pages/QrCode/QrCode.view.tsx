import { Input } from 'app/App.components/Input/Input.view'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

// prettier-ignore
import { QrCodeBgLeft, QrCodeBgRight, QrCodeGrid, QrCodeStyled } from './QrCode.style'

type QrCodeViewProps = {
  address?: string
}

export const QrCodeView = ({ address }: QrCodeViewProps) => {
  return (
    <QrCodeGrid>
      <QrCodeBgLeft>
        <img alt="bg-left" src="/bg2-left.svg" />
      </QrCodeBgLeft>
      <QrCodeStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>

        <div>Share this url or QR code with your visitors for them to mint your NFT.</div>

        <label htmlFor="name">Mint URL</label>
        <Input
          name="name"
          placeholder=""
          type="text"
          onChange={() => {}}
          value={`https://myairnft.com/mint/${address}`}
          onBlur={() => {}}
          inputStatus={undefined}
          errorMessage={undefined}
        />

        <label htmlFor="name">Mint QR Code</label>
        <QRCodeSVG value={`https://myairnft.com/mint/${address}`} size={200} />
      </QrCodeStyled>
      <QrCodeBgRight>
        <img alt="bg-right" src="/bg2-right.svg" />
      </QrCodeBgRight>
    </QrCodeGrid>
  )
}
