import styled from 'styled-components/macro'
import { textColor } from 'styles'

export const MyNftGrid = styled.div`
  display: grid;
  grid-template-columns: calc(50vw - 430px) 800px calc(50vw - 430px);
  grid-gap: 30px;

  @media (max-width: 700px) {
    grid-template-columns: 0 auto 0;
  }
`

export const MyNftBgLeft = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const MyNftBgRight = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const MyNftStyled = styled.div`
  > a > img {
    margin: 20px 0;
  }

  > div {
    margin-bottom: 20px;
  }

  > label {
    margin-bottom: 10px;
  }

  > img {
    cursor: pointer;
  }
`

export const UploaderFileSelector = styled.div`
  > input {
    display: none;
  }
`

export const UploaderLabel = styled.label`
  height: 40px;
  width: 200px;
  border: 1px solid #bdbdb8;
  box-sizing: border-box;
  border-radius: 1px;
  cursor: pointer;
  user-select: none;
  color: ${textColor};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MyNftTokens = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  text-align: center;

  > a {
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #bdbdb8;
  }

  img {
    width: 100%;
  }

  p {
    text-transform: capitalize;
  }

  pre {
    font-size: 20px;
    font-weight: bold;
  }
`
