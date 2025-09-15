import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { CircularProgress } from '@mui/material'

// Extended props interface
interface MuiButtonComponentProps extends Omit<MuiButtonProps, 'size'> {
  isLoading?: boolean
  loadingText?: string
  size?: 'small' | 'medium' | 'large'
}

export const MuiButtonComponent: React.FC<MuiButtonComponentProps> = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  size = 'medium',
  variant = 'contained',
  color = 'primary',
  startIcon,
  endIcon,
  ...props
}) => {
  const isDisabled = disabled || isLoading

  return (
    <MuiButton
      {...props}
      variant={variant}
      color={color}
      size={size}
      disabled={isDisabled}
      startIcon={isLoading ? undefined : startIcon}
      endIcon={isLoading ? undefined : endIcon}
    >
      {isLoading ? (
        <>
          <CircularProgress
            size={16}
            color="inherit"
            sx={{ marginRight: 1 }}
          />
          {loadingText}
        </>
      ) : (
        children
      )}
    </MuiButton>
  )
}



