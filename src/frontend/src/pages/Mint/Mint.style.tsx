import styled from 'styled-components/macro'
import { textColor } from 'styles'

export const MintGrid = styled.div`
  display: grid;
  grid-template-columns: calc(50vw - 430px) 800px calc(50vw - 430px);
  grid-gap: 30px;

  @media (max-width: 700px) {
    grid-template-columns: 0 auto 0;
  }
`

export const MintBgLeft = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const MintBgRight = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const MintStyled = styled.div`
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

export const MintNftGrid = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-gap: 30px;
  border: 1px solid #bdbdb8;
  border-radius: 1px;

  > img {
    width: 100%;
  }

  > div {
    margin: 20px 10px;

    > div {
      margin-top: 10px;
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: auto;
  }
`
