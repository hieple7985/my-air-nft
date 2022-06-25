import { InputStyled, InputComponent, InputStatus, InputIcon, InputErrorMessage } from './Input.style'

interface InputProps {
  icon?: string
  placeholder: string
  name?: string
  value?: string | number
  onChange: any
  onBlur: any
  inputStatus?: 'success' | 'error'
  type: string
  errorMessage?: string
  disabled?: boolean
}

export const Input = ({
  icon,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  inputStatus,
  type = 'text',
  errorMessage,
  disabled,
}: InputProps) => (
  <InputStyled>
    {icon && (
      <InputIcon>
        <use xlinkHref={`/icons/sprites.svg#${icon}`} />
      </InputIcon>
    )}
    <InputComponent
      type={type}
      name={name}
      className={inputStatus}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={name}
      disabled={disabled}
    />
    <InputStatus className={inputStatus} />
    {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
  </InputStyled>
)
