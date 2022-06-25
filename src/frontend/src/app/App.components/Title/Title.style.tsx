import styled from 'styled-components/macro'

import { gradColor, textColor } from '../../../styles'

export const TitleStyled = styled.div`
  width: 70%;
  margin-bottom: 100px;

  @media (max-width: 1023px) {
    width: 100%;
  }
`

export const TitleSurTitle = styled.h2`
  display: inline-block;
  background: ${gradColor};
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 12px;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 800px) {
    font-size: 18px;
  }
`

export const TitleTitle = styled.h1`
  display: block;
  color: ${textColor};
  font-family: 'Nizzoli';
  font-weight: 900;
  font-size: 48px;
  line-height: 130%;
  margin-bottom: 12px;

  @media (max-width: 800px) {
    font-size: 30px;
  }
`

export const TitleChildren = styled.div`
  font-size: 18px;
  line-height: 150%;
`
