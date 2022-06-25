import { Link } from 'react-router-dom'

// prettier-ignore
import { MyNftBgLeft, MyNftBgRight, MyNftGrid, MyNftStyled, MyNftTokens } from './MyNft.style'

type MyNftViewProps = {
  loading: boolean
  accountPkh?: string
  tokens: any
}

export const MyNftView = ({ loading, accountPkh, tokens }: MyNftViewProps) => {
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

        <MyNftTokens>
          {tokens.map((token: any) => (
            <a key={token.city} href={`https://aqicn.org/city/${token.city}/`} target="_blank" rel="noreferrer">
              <p>{token.city}</p>
              <pre>{token.pollution}</pre>
              <img alt="pollution" src={`/${token.level}.png`} />
            </a>
          ))}
        </MyNftTokens>

        <Link to="/mint">
          <img alt="button-mint" src="/button-mint.svg" />
        </Link>
      </MyNftStyled>
      <MyNftBgRight />
    </MyNftGrid>
  )
}
