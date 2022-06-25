import { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '../Button/Button.view'
import { Hamburger } from './Hamburger/Hamburger.view'
// prettier-ignore
import { MenuBar, MenuConnected, MenuLogo, MenuNav, MenuStyled } from './Menu.style'
type MenuViewProps = {
  loading: boolean
  accountPkh?: string
  handleNewConnect: () => void
  wallet: any
  ready: boolean
  handleConnect: () => void
}

export const MenuView = ({ loading, accountPkh, handleNewConnect, wallet, ready, handleConnect }: MenuViewProps) => {
  const [showing, setShowing] = useState(false)

  return (
    <MenuStyled>
      <MenuBar showing={showing}>
        <Link to="/" onClick={() => setShowing(false)}>
          <MenuLogo alt="myairnft.com" src="/logo.svg" />
        </Link>
        <div />
        <MenuNav>
          <div></div>
        </MenuNav>
        <div />

        {wallet ? (
          <div>
            {ready ? (
              <Button appearance="secondary" icon="check">
                {accountPkh ? `${accountPkh.slice(0, 7)}...${accountPkh.slice(accountPkh.length - 4, accountPkh.length)}` : 'Not connected'}
              </Button>
            ) : (
              <Button clickCallback={handleConnect}>Connect wallet</Button>
            )}
          </div>
        ) : (
          <Button clickCallback={() => window.open('https://templewallet.com/', '_blank')!.focus()}>Install wallet</Button>
        )}

        <Hamburger showing={showing} setShowing={() => setShowing(!showing)} />
      </MenuBar>
    </MenuStyled>
  )
}
