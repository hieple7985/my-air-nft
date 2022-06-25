import { FooterStyled, FooterCol } from './Footer.style'

export const Footer = () => (
  <FooterStyled>
    <FooterCol>
      <img src="logo.svg" alt="myairnft.com" />
    </FooterCol>
    <FooterCol>
      <span>myairnft.com for waylad projects</span>
    </FooterCol>
    <FooterCol>
      <a href="https://discord.gg" target="_blank" rel="noreferrer">
        <svg>
          <use xlinkHref="/icons/sprites.svg#discord" />
        </svg>
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
        <svg>
          <use xlinkHref="/icons/sprites.svg#twitter" />
        </svg>
      </a>
    </FooterCol>
  </FooterStyled>
)
