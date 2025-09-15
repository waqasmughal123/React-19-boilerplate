import React, { useState, useEffect } from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
} from '@mui/material'
import {
  Email,
  CheckCircle,
  Error,
} from '@mui/icons-material'

// Extended props interface for MUI Email Input
interface MuiEmailInputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  showEmailIcon?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  fullWidth?: boolean
  validateOnBlur?: boolean
  showValidationIcon?: boolean
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Email validation function
const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email) return { isValid: true, message: '' }
  
  const trimmedEmail = email.trim()
  
  if (trimmedEmail.length < 5) {
    return { isValid: false, message: 'Email is too short' }
  }
  
  if (trimmedEmail.length > 254) {
    return { isValid: false, message: 'Email is too long' }
  }
  
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' }
  }
  
  return { isValid: true, message: 'Valid email address' }
}

export const MuiEmailInput: React.FC<MuiEmailInputProps> = ({
  label = 'Email Address',
  helperText,
  errorText,
  isRequired = false,
  showEmailIcon = true,
  variant = 'outlined',
  fullWidth = true,
  validateOnBlur = true,
  showValidationIcon = true,
  error,
  disabled,
  placeholder = 'Enter your email address',
  value,
  onChange,
  onBlur,
  size = 'medium',
  ...props
}) => {
  const [validation, setValidation] = useState<{ isValid: boolean; message: string }>({
    isValid: true,
    message: '',
  })
  const [hasBlurred, setHasBlurred] = useState(false)

  const emailValue = typeof value === 'string' ? value : ''
  const hasError = error || !!errorText || (hasBlurred && !validation.isValid)

  // Validate email on value change
  useEffect(() => {
    if (validateOnBlur && hasBlurred) {
      setValidation(validateEmail(emailValue))
    }
  }, [emailValue, validateOnBlur, hasBlurred])

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasBlurred(true)
    if (validateOnBlur) {
      setValidation(validateEmail(emailValue))
    }
    if (onBlur) {
      onBlur(event)
    }
  }

  const getHelperText = () => {
    if (hasError && errorText) return errorText
    if (hasBlurred && !validation.isValid) return validation.message
    if (hasBlurred && validation.isValid && emailValue) return validation.message
    return helperText
  }

  const getValidationIcon = () => {
    if (!showValidationIcon || !hasBlurred || !emailValue) return null
    
    return validation.isValid ? (
      <CheckCircle color="success" fontSize="small" />
    ) : (
      <Error color="error" fontSize="small" />
    )
  }

  return (
    <TextField
      {...props}
      label={label}
      type="email"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={isRequired}
      error={hasError}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      helperText={getHelperText()}
      InputProps={{
        startAdornment: showEmailIcon ? (
          <InputAdornment position="start">
            <Email color={hasError ? 'error' : 'action'} />
          </InputAdornment>
        ) : undefined,
        endAdornment: getValidationIcon() ? (
          <InputAdornment position="end">
            {getValidationIcon()}
          </InputAdornment>
        ) : undefined,
        ...props.InputProps,
      }}
      FormHelperTextProps={{
        sx: {
          color: hasBlurred && validation.isValid && emailValue && !hasError
            ? 'success.main'
            : undefined,
          ...props.FormHelperTextProps?.sx,
        },
        ...props.FormHelperTextProps,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: hasError ? 'error.main' : 'primary.main',
          },
        },
        ...props.sx,
      }}
    />
  )
}
