import { ProgressBarStatus } from './ProgressBar.constants'
import { ProgressBarStyled } from './ProgressBar.style'

interface ProgressBarViewProps {
  status: ProgressBarStatus
}

export const ProgressBarView = ({ status = ProgressBarStatus.NO_DISPLAY }: ProgressBarViewProps) => (
  <ProgressBarStyled status={status} />
)
