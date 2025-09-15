import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
  Chip,
  Box,
  InputAdornment,
  ListItemText,
  Checkbox,
} from '@mui/material'
import { ExpandMore, Clear } from '@mui/icons-material'

// Option interface
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
}

// Extended props interface for MUI Select
interface MuiSelectProps extends Omit<SelectProps, 'variant'> {
  label?: string
  helperText?: string
  errorText?: string
  isRequired?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  fullWidth?: boolean
  options: SelectOption[]
  clearable?: boolean
  searchable?: boolean
  multiple?: boolean
  placeholder?: string
  startIcon?: React.ReactNode
  maxHeight?: number
}

export const MuiSelect: React.FC<MuiSelectProps> = ({
  label,
  helperText,
  errorText,
  isRequired = false,
  variant = 'outlined',
  fullWidth = true,
  options = [],
  clearable = false,
  multiple = false,
  placeholder = 'Select an option',
  startIcon,
  maxHeight = 300,
  error,
  disabled,
  value,
  onChange,
  size = 'medium',
  ...props
}) => {
  const hasError = error || !!errorText
  const hasValue = multiple 
    ? Array.isArray(value) && value.length > 0
    : value !== undefined && value !== null && value !== ''

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation()
    const clearValue = multiple ? [] : ''
    const fakeEvent = {
      target: { value: clearValue }
    } as any
    onChange?.(fakeEvent, null as any)
  }

  const renderValue = (selected: any) => {
    if (!hasValue) {
      return <span style={{ color: '#999' }}>{placeholder}</span>
    }

    if (multiple) {
      const selectedArray = Array.isArray(selected) ? selected : []
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedArray.map((val) => {
            const option = options.find(opt => opt.value === val)
            return (
              <Chip
                key={val}
                label={option?.label || val}
                size="small"
                variant="outlined"
              />
            )
          })}
        </Box>
      )
    }

    const selectedOption = options.find(opt => opt.value === selected)
    return selectedOption?.label || selected
  }

  const getEndAdornment = () => {
    if (clearable && hasValue && !disabled) {
      return (
        <InputAdornment position="end">
          <Clear
            sx={{ 
              cursor: 'pointer', 
              fontSize: '18px',
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' }
            }}
            onClick={handleClear}
          />
        </InputAdornment>
      )
    }
    return undefined
  }

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      required={isRequired}
      error={hasError}
      disabled={disabled}
      size={size}
    >
      {label && (
        <InputLabel id={`${label}-select-label`}>
          {label}
        </InputLabel>
      )}
      
      <Select
        {...props}
        labelId={label ? `${label}-select-label` : undefined}
        label={label}
        value={value}
        onChange={onChange}
        multiple={multiple}
        displayEmpty={!label}
        renderValue={renderValue}
        IconComponent={clearable && hasValue ? () => null : ExpandMore}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: maxHeight,
            },
          },
        }}
        startAdornment={startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined}
        endAdornment={getEndAdornment()}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          },
          ...props.sx,
        }}
      >
        {!multiple && placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            {multiple && (
              <Checkbox
                checked={Array.isArray(value) && value.includes(option.value)}
                size="small"
              />
            )}
            
            {option.icon && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                {option.icon}
              </Box>
            )}
            
            <ListItemText
              primary={option.label}
              secondary={option.description}
              sx={{
                '& .MuiListItemText-secondary': {
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                },
              }}
            />
          </MenuItem>
        ))}
        
        {options.length === 0 && (
          <MenuItem disabled>
            <em>No options available</em>
          </MenuItem>
        )}
      </Select>
      
      {(hasError && errorText) || helperText ? (
        <FormHelperText>
          {hasError && errorText ? errorText : helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}



