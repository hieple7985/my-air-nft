import styled, { css } from 'styled-components/macro'

import { backgroundColor, textColor } from '../../../../styles'

export const HamburgerStyled = styled.div`
  position: absolute;
  right: 13px;
  top: 23px;
  width: 50px;
  height: 50px;
  overflow: visible;
  box-sizing: content-box;
  cursor: pointer;
  z-index: 11;
  display: none;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-left: -53px;
    margin-top: -11px;
    z-index: -2;

    background: ${backgroundColor};
    box-shadow: inset -4px -4px 4px rgba(58, 68, 93, 0.5), inset 4px 4px 4px #060c18;

    /* background: linear-gradient(135.37deg, rgba(0, 0, 0, 0.4) 4.29%, rgba(255, 255, 255, 0.4) 95.6%), #0029ff;
    background-blend-mode: soft-light, normal;
    border: 2px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    box-shadow: -10px -10px 20px #fafbff, 10px 10px 20px #a6abbd; */
    border-radius: 40px;
  }

  @media (max-width: 1023px) {
    display: block;
  }
`

export const HamburgerBox = styled.div`
  position: absolute;
  top: 7px;
  right: 12px;
  display: block;
  width: 24px;
  height: 14px;
`

export const HamburgerInner = styled.div`
  position: absolute;
  width: 24px;
  height: 1.5px;
  border-radius: 1px;
  will-change: transform;
  background-color: ${textColor};
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`

export const HamburgerInnerTop = styled(HamburgerInner)<{ showing: boolean }>`
  top: 2px;
  ${(props) =>
    props.showing &&
    css`
      transform: translate3d(-1px, 4px, 0) rotate(-45deg);
    `};
`

export const HamburgerInnerMiddle = styled(HamburgerInner)`
  display: block;
  top: calc(50% - 1px);
`

export const HamburgerInnerBottom = styled(HamburgerInner)<{ showing: boolean }>`
  bottom: 3px;
  ${(props) =>
    props.showing &&
    css`
      transform: translate3d(-1px, -4px, 0) rotate(45deg);
    `};
`
