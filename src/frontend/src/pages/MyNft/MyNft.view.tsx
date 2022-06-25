import { Link } from 'react-router-dom'

// prettier-ignore
import { MyNftBgLeft, MyNftBgRight, MyNftGrid, MyNftStyled } from './MyNft.style'

type MyNftViewProps = {
  createCallback: (name: string, description: string, image: string) => void
  loading: boolean
  accountPkh?: string
  address?: string
}

export const MyNftView = ({ address, createCallback, loading, accountPkh }: MyNftViewProps) => {
  return (
    <MyNftGrid>
      <MyNftBgLeft />
      <MyNftStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>

        <div>
          Here is the gallery of the Air NFTs that you own. Their illustration is based on the pollution level of the asssociated city. You
          can click on them to see more imformation from aqicn.org. Click Mint New NFT if do not have any Air NFT yet.{' '}
        </div>

        <div>No NFT in your gallery yet...</div>

        <Link to="/mint">
          <img alt="button-mint" src="/button-mint.svg" />
        </Link>
      </MyNftStyled>
      <MyNftBgRight />
    </MyNftGrid>
  )
}
