import styled from 'styled-components/macro'
import { backgroundColor, primaryColor, textColor } from 'styles'

export const MenuStyled = styled.div`
  font-size: 14px;
  position: fixed;
  width: 100%;
  top: 20px;
  z-index: 12;
`

export const MenuBar = styled.div<{ showing: boolean }>`
  margin: 0 auto;
  padding: 0 13px;
  max-width: calc(100vw - 40px);
  width: 1280px;
  position: relative;
  text-align: center;
  height: ${(props) => (props.showing ? '600px' : '80px')};
  z-index: 1;
  display: grid;
  grid-template-columns: 225px auto auto auto 240px;
  gap: 10px;
  font-weight: 500;
  overflow: hidden;
  transition: height 1s ease-in-out;

  background: ${backgroundColor};
  border: 2px solid ${backgroundColor};
  box-sizing: border-box;
  box-shadow: -10px -10px 20px rgba(8, 21, 45, 0.4), 5px 5px 15px rgba(5, 12, 27, 0.6);
  border-radius: 10px;

  > a {
    margin: 13px 0;
  }

  @media (max-width: 1023px) {
    grid-template-columns: auto;
    grid-template-rows: 80px 0px 370px 20px 80px;

    > a:nth-child(5) {
      margin: 13px auto;
    }
  }

  button {
    float: right;
    margin-top: 10px !important;
  }
`

export const MenuLogo = styled.img`
  height: 40px;
  margin: 5px 0px 5px 10px;
  display: block;
`

export const MenuNav = styled.div`
  position: relative;
  text-align: center;
  height: 80px;
  z-index: 1;

  > div {
    line-height: 80px;
    color: ${textColor};
    font-weight: 600;
    margin: 0 10px;
  }

  @media (max-width: 1279px) {
    grid-template-columns: repeat(5, auto);
  }

  @media (max-width: 1023px) {
    grid-template-columns: auto;
    grid-template-rows: repeat(8, 40px);

    > div {
      display: block !important;
      line-height: 40px;
    }
  }
`

export const MenuConnected = styled.div`
  text-align: center;
  font-weight: 600;
  margin: 10px auto 33px auto;

  > p {
    font-size: 11px;
    line-height: 11px;
    margin: 3px;
    color: ${textColor};
  }

  > div {
    font-size: 18px;
    line-height: 18px;
    color: ${primaryColor};
  }

  svg {
    cursor: pointer;
    height: 12px;
    margin-left: 10px;
    width: 20px;
    vertical-align: bottom;
    stroke: ${primaryColor};
  }
`
