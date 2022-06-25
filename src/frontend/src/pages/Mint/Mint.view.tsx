import { Input } from 'app/App.components/Input/Input.view'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// prettier-ignore
import { MintBgLeft, MintBgRight, MintGrid, MintStyled } from './Mint.style'

type MintViewProps = {
  mintCallback: (city: string) => void
  connectCallback: () => void
  loading: boolean
  accountPkh?: string
  address?: string
  metadata?: any
}

export const MintView = ({ mintCallback, metadata, connectCallback, loading, accountPkh, address }: MintViewProps) => {
  const [city, setCity] = useState('')

  return (
    <MintGrid>
      <MintBgLeft />
      <MintStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>
        <div>
          Enter the name of your city and mint a new NFT that will be sent to your wallet for free. The NFT will contain the name of your
          city in its metadata and update its illustration automatically based on pollution levels in that city.
        </div>

        <label htmlFor="name">Your city</label>
        <Input
          name="name"
          placeholder=""
          type="text"
          onChange={(e: any) => setCity(e.target.value)}
          value={city}
          onBlur={() => {}}
          inputStatus={undefined}
          errorMessage={undefined}
        />

        {accountPkh ? (
          <img onClick={() => mintCallback(city)} alt="button-mint" src="/button-mint.svg" />
        ) : (
          <img onClick={() => connectCallback()} alt="button-connect" src="/button-connect.svg" />
        )}
      </MintStyled>
      <MintBgRight />
    </MintGrid>
  )
}
