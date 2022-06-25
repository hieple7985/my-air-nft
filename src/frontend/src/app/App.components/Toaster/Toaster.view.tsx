import { downColor, upColor } from '../../../styles'
import { ERROR } from './Toaster.constants'
import {
  ToasterClose,
  ToasterContent,
  ToasterCountdown,
  ToasterGrid,
  ToasterIcon,
  ToasterMessage,
  ToasterStyled,
  ToasterTitle,
} from './Toaster.style'

interface ToasterViewProps {
  showing: boolean
  status?: string
  title?: string
  message?: string
  closeCallback: () => void
}

export const ToasterView = ({
  showing,
  status = ERROR,
  title = 'Error',
  message = 'Undefined error',
  closeCallback,
}: ToasterViewProps) => {
  const backgroundColor = status === 'success' ? upColor : downColor

  return (
    <ToasterStyled className={showing ? 'showing' : 'hidden'}>
      <ToasterGrid>
        <ToasterIcon status={status}>
          <svg>
            <use xlinkHref={`/icons/sprites.svg#${status}`} />
          </svg>
        </ToasterIcon>
        <ToasterContent>
          <ToasterTitle>{title}</ToasterTitle>
          <ToasterMessage>{message}</ToasterMessage>
        </ToasterContent>
        <ToasterClose onClick={() => closeCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#close" />
          </svg>
        </ToasterClose>
      </ToasterGrid>
      <ToasterCountdown className={showing ? 'showing' : 'hidden'} style={{ backgroundColor }} />
    </ToasterStyled>
  )
}
