import { ReactNode } from 'react'
import { clsx } from 'clsx'
import './FormField.css'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  icon?: ReactNode
}

export const FormField = ({
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  icon,
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <div className={clsx('form-field__input-wrapper', { 'form-field__input-wrapper--with-icon': icon })}>
        {icon && <div className="form-field__icon">{icon}</div>}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={clsx('form-field__input', { 'form-field__input--error': error })}
        />
      </div>
    </div>
  )
}
