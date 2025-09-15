import React, { useState } from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Lock,
} from '@mui/icons-material'

// Extended props interface for MUI Password Input
interface MuiPasswordInputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  showPasswordToggle?: boolean
  showLockIcon?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  fullWidth?: boolean
  strengthIndicator?: boolean
}

// Password strength checker
const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: '', color: 'transparent' }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  const levels = [
    { label: 'Very Weak', color: '#f44336' },
    { label: 'Weak', color: '#ff9800' },
    { label: 'Fair', color: '#ffeb3b' },
    { label: 'Good', color: '#8bc34a' },
    { label: 'Strong', color: '#4caf50' },
  ]

  return {
    strength,
    label: levels[strength - 1]?.label || '',
    color: levels[strength - 1]?.color || 'transparent',
  }
}

export const MuiPasswordInput: React.FC<MuiPasswordInputProps> = ({
  label = 'Password',
  helperText,
  errorText,
  isRequired = false,
  showPasswordToggle = true,
  showLockIcon = true,
  variant = 'outlined',
  fullWidth = true,
  strengthIndicator = false,
  error,
  disabled,
  placeholder = 'Enter your password',
  value,
  onChange,
  size = 'medium',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const hasError = error || !!errorText
  
  const passwordValue = typeof value === 'string' ? value : ''
  const passwordStrength = strengthIndicator ? getPasswordStrength(passwordValue) : null

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const getHelperText = () => {
    if (hasError && errorText) return errorText
    if (strengthIndicator && passwordValue && passwordStrength) {
      return `Password strength: ${passwordStrength.label}`
    }
    return helperText
  }

  return (
    <>
      <TextField
        {...props}
        label={label}
        type={showPassword ? 'text' : 'password'}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={isRequired}
        error={hasError}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        helperText={getHelperText()}
        InputProps={{
          startAdornment: showLockIcon ? (
            <InputAdornment position="start">
              <Lock color={hasError ? 'error' : 'action'} />
            </InputAdornment>
          ) : undefined,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  disabled={disabled}
                  size={size === 'small' ? 'small' : 'medium'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : undefined,
          ...props.InputProps,
        }}
        FormHelperTextProps={{
          sx: {
            color: strengthIndicator && passwordValue && passwordStrength && !hasError
              ? passwordStrength.color
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
      
      {/* Password strength indicator bar */}
      {strengthIndicator && passwordValue && passwordStrength && (
        <div style={{ marginTop: '4px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px' }}>
          <div
            style={{
              height: '100%',
              width: `${(passwordStrength.strength / 5) * 100}%`,
              backgroundColor: passwordStrength.color,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      )}
    </>
  )
}



