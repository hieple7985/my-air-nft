import { createGlobalStyle } from 'styled-components/macro'
import { textColor, backgroundColor, placeholderTextColor } from './colors'

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

div {
  display: block;
}

body {
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  font-display: optional;
  background-color: ${backgroundColor};
  color: ${textColor};
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

svg {
  margin: 0 auto;
  display: block;
}

input {
  color: ${textColor};
  font-size: 14px;
}

::placeholder {
  color: ${placeholderTextColor};
  font-size: 14px;
}

*:focus {
  outline: none;
}

a {
  color: ${textColor};
  text-decoration: none;
  opacity: 1;
  transition: opacity 0.15s ease-in-out-out;
  will-change: opacity;
}

a:hover {
  opacity: 0.9;
}

p {
    font-family: "Inter", sans-serif;
    display: block;
    margin-block-start: 10px;
    margin-block-end: 10px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: ${textColor}
}
`
