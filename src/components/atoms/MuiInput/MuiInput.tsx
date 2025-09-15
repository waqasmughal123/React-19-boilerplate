import React from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
} from '@mui/material'

// Extended props interface for MUI Input
interface MuiInputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variant?: 'outlined' | 'filled' | 'standard'
  fullWidth?: boolean
}

export const MuiInput: React.FC<MuiInputProps> = ({
  label,
  helperText,
  errorText,
  isRequired = false,
  startIcon,
  endIcon,
  variant = 'outlined',
  fullWidth = true,
  error,
  disabled,
  placeholder,
  value,
  onChange,
  type = 'text',
  size = 'medium',
  ...props
}) => {
  const hasError = error || !!errorText
  const displayHelperText = hasError ? errorText : helperText

  return (
    <TextField
      {...props}
      label={label}
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={isRequired}
      error={hasError}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      helperText={displayHelperText}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
        ...props.InputProps,
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
