import styled, { css } from 'styled-components/macro'

import { backgroundColor, gradColor, primaryColor, textColor } from '../../../styles'

export const ButtonStyled = styled.button<{ appearance: string }>`
  ${(props) => {
    let elementBackgroundColor = primaryColor
    let elementTextColor = textColor

    switch (props.appearance) {
      case 'primary':
        elementBackgroundColor = gradColor
        elementTextColor = textColor
        break
      case 'secondary':
        elementBackgroundColor = backgroundColor
        elementTextColor = textColor
        break
      case 'tertiary':
        elementBackgroundColor = backgroundColor
        elementTextColor = textColor
        break
      default:
        elementBackgroundColor = primaryColor
        elementTextColor = textColor
    }

    return css`
      background: ${elementBackgroundColor};
      color: ${elementTextColor};

      svg {
        fill: ${elementTextColor};
      }
    `
  }}

  height: 50px;
  background-blend-mode: soft-light, normal;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  box-shadow: -10px -10px 20px rgba(8, 21, 45, 0.4), 5px 5px 15px rgba(5, 12, 27, 0.6);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  display: grid;
  grid-template-columns: auto 24px;
  grid-gap: 10px;
  cursor: pointer;
  line-height: 46px;
  padding: 0 20px !important;
  margin: 0 !important;
  max-width: 280px;

  > svg {
    margin: 11px 0;
    width: 24px;
    height: 24px;
  }
`

export const ButtonLoading = styled.img`
  height: 40px;
  width: 40px;
`
