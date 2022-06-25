import { HomeStyled } from './Home.style'

type HomeViewProps = {
  loading: boolean
  accountPkh?: string
  handleNewConnect: () => void
  wallet: any
  ready: boolean
  handleConnect: () => void
}

export const HomeView = ({ loading, accountPkh, handleNewConnect, wallet, ready, handleConnect }: HomeViewProps) => {
  return <HomeStyled onClick={handleConnect} />
}
