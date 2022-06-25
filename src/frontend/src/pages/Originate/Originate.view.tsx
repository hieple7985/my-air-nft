import { Link } from 'react-router-dom'

// prettier-ignore
import { OriginateBgLeft, OriginateBgRight, OriginateGrid, OriginateStyled } from './Originate.style'

type OriginateViewProps = {
  originateCallback: () => void
  loading: boolean
  accountPkh?: string
}

export const OriginateView = ({ originateCallback, loading, accountPkh }: OriginateViewProps) => {
  return (
    <OriginateGrid>
      <OriginateBgLeft>
        <img alt="bg-left" src="/bg2-left.svg" />
      </OriginateBgLeft>
      <OriginateStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>

        <div>
          You are about to create an NFT airdrop. This page will allow you to deploy a new FA2 smart contract. You will be the owner of the
          contract and have full admin right on it, not myairnft.com. Once deployed, you will be able to create a new token and associated
          airdrop.
        </div>
        <div>
          The contract admin will be <b>{accountPkh}</b>
        </div>

        {loading ? <div>Deploying...</div> : <img onClick={() => originateCallback()} alt="button-deploy" src="/button-deploy.svg" />}
      </OriginateStyled>
      <OriginateBgRight>
        <img alt="bg-right" src="/bg2-right.svg" />
      </OriginateBgRight>
    </OriginateGrid>
  )
}
