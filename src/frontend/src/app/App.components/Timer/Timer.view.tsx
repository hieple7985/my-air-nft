import { TimerGrid, TimerStyled } from './Timer.style'

interface TimerViewProps {
  seconds: number
  minutes: number
  hours: number
  days: number
  small?: boolean
}

export const TimerView = ({ seconds, minutes, hours, days }: TimerViewProps) => (
  <TimerStyled>
    <TimerGrid small>
      <div>
        {days}
        <p>days</p>
      </div>
      <div>:</div>
      <div>
        {hours}
        <p>hours</p>
      </div>
      <div>:</div>
      <div>
        {minutes}
        <p>minutes</p>
      </div>
      <div>:</div>
      <div>
        {seconds}
        <p>seconds</p>
      </div>
    </TimerGrid>
  </TimerStyled>
)
