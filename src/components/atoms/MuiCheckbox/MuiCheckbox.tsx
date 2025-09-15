import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  Box,
} from '@mui/material'
import {
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
} from '@mui/icons-material'

// Single checkbox option interface
export interface CheckboxOption {
  value: string | number
  label: string
  disabled?: boolean
  description?: string
}

// Extended props interface for MUI Checkbox
interface MuiCheckboxProps {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  variant?: 'checkbox' | 'switch' | 'radio'
  orientation?: 'horizontal' | 'vertical'
  options?: CheckboxOption[] // For multiple checkboxes or radio group
  value?: string | number | boolean | (string | number)[] // Single value or array for multiple
  onChange?: (value: string | number | boolean | (string | number)[]) => void
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

export const MuiCheckbox: React.FC<MuiCheckboxProps> = ({
  label,
  helperText,
  errorText,
  isRequired = false,
  variant = 'checkbox',
  orientation = 'vertical',
  options = [],
  value,
  onChange,
  fullWidth = true,
  error = false,
  disabled,
  size = 'medium',
  color = 'primary'
}) => {
  const hasError = error || !!errorText
  const isMultiple = Array.isArray(value)
  const isSingleOption = options.length === 0

  // Handle single checkbox change
  const handleSingleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (variant === 'checkbox' || variant === 'switch') {
      onChange?.(event.target.checked)
    }
  }

  // Handle multiple checkbox change
  const handleMultipleChange = (optionValue: string | number) => {
    if (!isMultiple) return

    const currentValues = value as (string | number)[]
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue]
    
    onChange?.(newValues)
  }

  // Handle radio group change
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  // Render single checkbox/switch
  const renderSingle = () => {
    const isChecked = Boolean(value)

    if (variant === 'switch') {
      return (
        <FormControlLabel
          control={
            <Switch
              checked={isChecked}
              onChange={handleSingleChange}
              disabled={disabled}
              size={size === 'large' ? 'medium' : size}
              color={color}
            />
          }
          label={label || ''}
          sx={{ margin: 0 }}
        />
      )
    }

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleSingleChange}
            disabled={disabled}
            size={size}
            color={color}
            icon={<CheckBoxOutlineBlank />}
            checkedIcon={<CheckBox />}
            indeterminateIcon={<IndeterminateCheckBox />}
          />
        }
        label={label || ''}
        sx={{ margin: 0 }}
      />
    )
  }

  // Render multiple checkboxes
  const renderMultiple = () => {
    const currentValues = (value as (string | number)[]) || []

    return (
      <FormGroup
        row={orientation === 'horizontal'}
        sx={{
          gap: orientation === 'horizontal' ? 2 : 0.5,
        }}
      >
        {options.map((option) => (
          <Box key={option.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentValues.includes(option.value)}
                  onChange={() => handleMultipleChange(option.value)}
                  disabled={disabled || option.disabled}
                  size={size}
                  color={color}
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                />
              }
              label={option.label}
              sx={{ margin: 0 }}
            />
            {option.description && (
              <FormHelperText sx={{ ml: 4, mt: 0, mb: 1 }}>
                {option.description}
              </FormHelperText>
            )}
          </Box>
        ))}
      </FormGroup>
    )
  }

  // Render radio group
  const renderRadioGroup = () => {
    return (
      <RadioGroup
        value={value || ''}
        onChange={handleRadioChange}
        row={orientation === 'horizontal'}
        sx={{
          gap: orientation === 'horizontal' ? 2 : 0.5,
        }}
      >
        {options.map((option) => (
          <Box key={option.value}>
            <FormControlLabel
              value={option.value}
              control={
                <Radio
                  disabled={disabled || option.disabled}
                  size={size === 'large' ? 'medium' : size}
                  color={color}
                />
              }
              label={option.label}
              sx={{ margin: 0 }}
            />
            {option.description && (
              <FormHelperText sx={{ ml: 4, mt: 0, mb: 1 }}>
                {option.description}
              </FormHelperText>
            )}
          </Box>
        ))}
      </RadioGroup>
    )
  }

  // Render content based on variant and options
  const renderContent = () => {
    if (isSingleOption) {
      return renderSingle()
    }

    if (variant === 'radio') {
      return renderRadioGroup()
    }

    return renderMultiple()
  }

  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      required={isRequired}
      error={hasError}
      disabled={disabled}
      sx={{
        '& .MuiFormLabel-root': {
          fontSize: '1rem',
          fontWeight: 500,
          marginBottom: 1,
        },
      }}
    >
      {/* Main label for groups */}
      {!isSingleOption && label && (
        <FormLabel component="legend" sx={{ mb: 1 }}>
          {label}
        </FormLabel>
      )}

      {renderContent()}

      {/* Helper text */}
      {((hasError && errorText) || helperText) && (
        <FormHelperText>
          {hasError && errorText ? errorText : helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
