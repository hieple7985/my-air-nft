import { HamburgerBox, HamburgerInnerBottom, HamburgerInnerTop, HamburgerStyled } from './Hamburger.style'

interface HamburgerProps {
  showing: boolean
  setShowing: (showing: boolean) => void
}

export const Hamburger = ({ showing, setShowing }: HamburgerProps) => {
  return (
    <HamburgerStyled onClick={() => setShowing(!showing)}>
      <HamburgerBox>
        <HamburgerInnerTop showing={showing} />
        <HamburgerInnerBottom showing={showing} />
      </HamburgerBox>
    </HamburgerStyled>
  )
}
