import styled from 'styled-components/macro'

import { backgroundColor } from './colors'

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const CardPage = styled.div`
  width: 400px;
  margin: 100px auto 20px auto;
  max-width: 90vw;
  min-height: 100vh;
`

export const FullPage = styled.div`
  width: 100vw;
  margin: 0 auto 0 auto;
  max-width: 1280px;
  min-height: 100vh;
`

export const Message = styled.div`
  text-align: center;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50vh;
`

export const Card = styled.div`
  background: ${backgroundColor};
  border: 2px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  box-shadow: -5px -5px 10px rgba(8, 21, 45, 0.6), 5px 5px 10px rgba(5, 12, 27, 0.6);
  border-radius: 8px;
`
