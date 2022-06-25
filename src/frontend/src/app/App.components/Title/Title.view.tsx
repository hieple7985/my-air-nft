import { TitleChildren, TitleStyled, TitleSurTitle, TitleTitle } from './Title.style'
import { ReactNode } from 'react'

interface TitleProps {
  surTitle?: string
  title?: string
  children: ReactNode
}

export const Title = ({ surTitle, title, children }: TitleProps) => (
  <TitleStyled>
    {surTitle ? <TitleSurTitle>{surTitle}</TitleSurTitle> : null}
    {title ? <TitleTitle>{title}</TitleTitle> : null}
    <TitleChildren>{children}</TitleChildren>
  </TitleStyled>
)
