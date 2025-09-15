import React from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Add,
  Remove,
  Numbers,
} from '@mui/icons-material'

// Extended props interface for MUI Number Input
interface MuiNumberInputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  showNumberIcon?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  fullWidth?: boolean
  min?: number
  max?: number
  step?: number
  showSteppers?: boolean
  allowDecimals?: boolean
  currency?: string
  percentage?: boolean
}

export const MuiNumberInput: React.FC<MuiNumberInputProps> = ({
  label = 'Number',
  helperText,
  errorText,
  isRequired = false,
  showNumberIcon = true,
  variant = 'outlined',
  fullWidth = true,
  min,
  max,
  step = 1,
  showSteppers = false,
  allowDecimals = true,
  currency,
  percentage = false,
  error,
  disabled,
  placeholder = 'Enter a number',
  value,
  onChange,
  size = 'medium',
  ...props
}) => {
  const hasError = error || !!errorText
  const numericValue = typeof value === 'string' || typeof value === 'number' ? Number(value) : 0

  const handleIncrement = () => {
    const newValue = numericValue + step
    const clampedValue = max !== undefined ? Math.min(newValue, max) : newValue
    const event = {
      target: { value: clampedValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>
    onChange?.(event)
  }

  const handleDecrement = () => {
    const newValue = numericValue - step
    const clampedValue = min !== undefined ? Math.max(newValue, min) : newValue
    const event = {
      target: { value: clampedValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>
    onChange?.(event)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value

    // Remove non-numeric characters based on allowDecimals
    if (!allowDecimals) {
      inputValue = inputValue.replace(/[^-0-9]/g, '')
    } else {
      inputValue = inputValue.replace(/[^-0-9.]/g, '')
    }

    // Prevent multiple decimal points
    if (allowDecimals) {
      const decimalCount = (inputValue.match(/\./g) || []).length
      if (decimalCount > 1) {
        inputValue = inputValue.substring(0, inputValue.lastIndexOf('.'))
      }
    }

    // Apply min/max constraints
    const numValue = Number(inputValue)
    if (!isNaN(numValue)) {
      if (min !== undefined && numValue < min) {
        inputValue = min.toString()
      }
      if (max !== undefined && numValue > max) {
        inputValue = max.toString()
      }
    }

    const newEvent = {
      ...event,
      target: { ...event.target, value: inputValue }
    }
    onChange?.(newEvent)
  }



  const getStartAdornment = () => {
    if (currency) {
      return (
        <InputAdornment position="start">
          {currency.toUpperCase()}
        </InputAdornment>
      )
    }
    
    if (showNumberIcon) {
      return (
        <InputAdornment position="start">
          <Numbers color={hasError ? 'error' : 'action'} />
        </InputAdornment>
      )
    }

    return undefined
  }

  const getEndAdornment = () => {
    const elements = []

    if (percentage) {
      elements.push(<span key="percent">%</span>)
    }

    if (showSteppers && !disabled) {
      elements.push(
        <div key="steppers" style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
          <Tooltip title="Increase">
            <IconButton
              size="small"
              onClick={handleIncrement}
              disabled={max !== undefined && numericValue >= max}
              sx={{ padding: '2px', fontSize: '12px' }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Decrease">
            <IconButton
              size="small"
              onClick={handleDecrement}
              disabled={min !== undefined && numericValue <= min}
              sx={{ padding: '2px', fontSize: '12px' }}
            >
              <Remove fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }

    return elements.length > 0 ? (
      <InputAdornment position="end">
        {elements}
      </InputAdornment>
    ) : undefined
  }

  const getHelperText = () => {
    if (hasError && errorText) return errorText
    
    let baseHelperText = helperText || ''
    
    if (min !== undefined || max !== undefined) {
      const rangeText = min !== undefined && max !== undefined
        ? `Range: ${min} - ${max}`
        : min !== undefined
        ? `Minimum: ${min}`
        : `Maximum: ${max}`
      
      baseHelperText = baseHelperText ? `${baseHelperText} (${rangeText})` : rangeText
    }
    
    return baseHelperText
  }

  return (
    <TextField
      {...props}
      label={label}
      type="text" // Use text to handle custom formatting
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={isRequired}
      error={hasError}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      helperText={getHelperText()}
      inputProps={{
        inputMode: 'numeric',
        pattern: allowDecimals ? '[0-9]*\\.?[0-9]*' : '[0-9]*',
        min,
        max,
        step,
        ...props.inputProps,
      }}
      InputProps={{
        startAdornment: getStartAdornment(),
        endAdornment: getEndAdornment(),
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
