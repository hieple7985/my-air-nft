import { PopupBg, PopupContainer, PopupSocial, PopupStyled } from './Popup.style'

interface PopupViewProps {
  hideCallback: () => void
}

export const PopupView = ({ hideCallback }: PopupViewProps) => (
  <PopupStyled>
    <PopupBg />
    <PopupContainer>
      <svg onClick={() => hideCallback()}>
        <use xlinkHref="/icons/sprites.svg#close" />
      </svg>
      <p>Coming soon...</p>
      <pre>Hello World!</pre>
      <PopupSocial></PopupSocial>
    </PopupContainer>
  </PopupStyled>
)
