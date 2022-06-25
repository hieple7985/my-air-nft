import { Link } from 'react-router-dom'

// prettier-ignore
import { MintBgLeft, MintBgRight, MintGrid, MintNftGrid, MintStyled } from './Mint.style'

type MintViewProps = {
  mintCallback: () => void
  connectCallback: () => void
  loading: boolean
  accountPkh?: string
  address?: string
  metadata?: any
}

export const MintView = ({ mintCallback, metadata, connectCallback, loading, accountPkh, address }: MintViewProps) => {
  return (
    <MintGrid>
      <MintBgLeft>
        <img alt="bg-left" src="/bg2-left.svg" />
      </MintBgLeft>
      <MintStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>
        <div>Congratulation, you can participate in this airdrop and mint the NFT below!</div>

        <MintNftGrid>
          {metadata ? (
            <img alt="nft" src={`https://cloudflare-ipfs.com/ipfs/${metadata.displayUri.replace('ipfs://', '')}`} />
          ) : (
            <div>Loading...</div>
          )}
          <div>
            <b>{metadata ? metadata.name : 'Loading...'}</b>
            <div>{metadata ? metadata.description : 'Loading...'}</div>
          </div>
        </MintNftGrid>

        {accountPkh ? (
          <img onClick={() => mintCallback()} alt="button-mint" src="/button-mint.svg" />
        ) : (
          <img onClick={() => connectCallback()} alt="button-connect" src="/button-connect.svg" />
        )}
      </MintStyled>
      <MintBgRight>
        <img alt="bg-right" src="/bg2-right.svg" />
      </MintBgRight>
    </MintGrid>
  )
}
