import styled from 'styled-components/macro'

export const QrCodeGrid = styled.div`
  display: grid;
  grid-template-columns: calc(50vw - 430px) 800px calc(50vw - 430px);
  grid-gap: 30px;

  @media (max-width: 700px) {
    grid-template-columns: 0 auto 0;
  }
`

export const QrCodeBgLeft = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const QrCodeBgRight = styled.div`
  @media (max-width: 700px) {
    > img {
      display: none;
    }
  }
`

export const QrCodeStyled = styled.div`
  > a > img {
    margin: 20px 0;
  }

  > div {
    margin-bottom: 20px;
  }

  > label {
    margin-bottom: 10px;
  }

  > svg {
    margin: 0;
  }
`
