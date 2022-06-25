import styled from 'styled-components/macro'
import { backgroundColor, containerColor, textColor } from '../../../styles'

export const FooterStyled = styled.footer`
  background-color: ${containerColor};
  color: ${textColor};
  padding: 50px 10%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 10px;

  @media (max-width: 900px) {
    display: block;

    a {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`

export const FooterCol = styled.div`
  flex: calc(100% / 3);

  > a {
    color: ${textColor};
    text-decoration: underline;
  }

  &:nth-child(1) {
    img {
      max-width: 210px;
      width: 80%;
    }
  }

  &:nth-child(2) {
    text-align: center;
    line-height: 22px;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: right;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-right: 10px;

      background: ${backgroundColor};
      border: 2px solid rgba(255, 255, 255, 0.05);
      box-sizing: border-box;
      box-shadow: -5px -5px 10px rgba(8, 21, 45, 0.6), 5px 5px 10px rgba(5, 12, 27, 0.6);
      border-radius: 8px;

      &:last-child {
        margin-right: 0;
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: 900px) {
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 20px;
      text-align: left;
    }

    &:nth-child(3) {
      justify-content: left;
    }
  }
`
