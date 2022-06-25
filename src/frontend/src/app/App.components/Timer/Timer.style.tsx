import styled from 'styled-components/macro'

export const TimerStyled = styled.div`
  text-align: center;
  display: inline-block;
`

export const TimerText = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 20px;
`

export const TimerGrid = styled.div<{ small?: boolean }>`
  display: grid;
  grid-template-columns: 60px 6px 60px 6px 60px 6px 60px;
  grid-gap: ${(props) => (props.small ? 2 : 20)}px;
  font-size: ${(props) => (props.small ? 28 : 48)}px;

  > div > p {
    font-size: 12px;
    font-weight: bold;
    margin: 0 auto;
  }
`
