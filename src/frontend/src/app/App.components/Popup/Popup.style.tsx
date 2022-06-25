import styled from 'styled-components/macro'
import { textColor, backgroundColor } from 'styles'

export const PopupStyled = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 360px;
  height: 210px;
  z-index: 10;

  @media (max-width: 800px) {
    display: none;
  }
`

export const PopupContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 360px;
  height: 210px;
  padding: 20px;

  > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  > p {
    font-weight: 900;
    font-size: 16px;
    line-height: 130%;
    color: #ffffff;
    margin: 6px 0 10px 0;
  }

  > pre {
    font-family: Nizzoli;
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 130%;
    color: #ffffff;
  }
`

export const PopupBg = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 360px;
  height: 210px;
  color: ${textColor};
  background-color: ${backgroundColor};
  opacity: 0.7;
  border-radius: 8px;
  backdrop-filter: blur(20px);
`

export const PopupSocial = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(5, 44px);
  grid-gap: 20px;
  text-align: center;
  width: 300px;

  a {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%), #ebecf0;
    background-blend-mode: soft-light, normal;
    border: 2px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    box-shadow: -10px -10px 20px rgba(8, 21, 45, 0.2), 5px 5px 15px rgba(5, 12, 27, 0.4);
    border-radius: 8px;
    margin-right: 16px;
    display: flex;
    padding: 8px;
    width: 44px;
    height: 44px;

    &:last-child {
      margin-right: 0;
    }
  }
`
