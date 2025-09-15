import React from 'react'
import { 
  CircularProgress, 
  Box, 
  Typography, 
  Backdrop,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled components
const OverlayContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000,
}))

const InlineContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
})

const RelativeContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100px',
})

const AbsoluteContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 100000,
})

const SpinnerContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  borderRadius: theme.spacing(1),
}))

export interface LoadingSpinnerProps {
  /**
   * Loading state
   */
  loading?: boolean
  /**
   * Loading text to display
   */
  text?: string
  /**
   * Size of the spinner
   */
  size?: number | 'small' | 'medium' | 'large'
  /**
   * Color of the spinner
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
  /**
   * Variant of the spinner display
   * - 'overlay': Full screen overlay with backdrop
   * - 'absolute': Absolute positioned over parent container
   * - 'relative': Relative positioned inline
   * - 'inline': Simple inline spinner
   */
  variant?: 'overlay' | 'absolute' | 'relative' | 'inline'
  /**
   * Show paper background for the spinner content
   */
  showBackground?: boolean
  /**
   * Custom className
   */
  className?: string
  /**
   * Children to render when not loading (for absolute/relative variants)
   */
  children?: React.ReactNode
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading = true,
  text = 'Loading...',
  size = 'medium',
  color = 'primary',
  variant = 'inline',
  showBackground = true,
  className,
  children,
}) => {
  // Convert size string to number
  const spinnerSize = typeof size === 'string' 
    ? size === 'small' ? 24 : size === 'large' ? 56 : 40
    : size

  const spinnerContent = (
    <>
      <CircularProgress size={spinnerSize} color={color} />
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </>
  )

  const wrappedContent = showBackground ? (
    <SpinnerContent elevation={3}>
      {spinnerContent}
    </SpinnerContent>
  ) : (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {spinnerContent}
    </Box>
  )

  // Don't render anything if not loading (except for absolute/relative variants with children)
  if (!loading && variant !== 'absolute' && variant !== 'relative') {
    return null
  }

  switch (variant) {
    case 'overlay':
      return loading ? (
        <OverlayContainer className={className}>
          {wrappedContent}
        </OverlayContainer>
      ) : null

    case 'absolute':
      return (
        <Box position="relative" className={className}>
          {children}
          {loading && (
            <AbsoluteContainer>
              {wrappedContent}
            </AbsoluteContainer>
          )}
        </Box>
      )

    case 'relative':
      return loading ? (
        <RelativeContainer className={className}>
          {wrappedContent}
        </RelativeContainer>
      ) : (
        children || null
      )

    case 'inline':
    default:
      return loading ? (
        <InlineContainer className={className}>
          {wrappedContent}
        </InlineContainer>
      ) : null
  }
}

// Backdrop variant using MUI Backdrop
export interface LoadingBackdropProps {
  /**
   * Loading state
   */
  open: boolean
  /**
   * Loading text to display
   */
  text?: string
  /**
   * Size of the spinner
   */
  size?: number | 'small' | 'medium' | 'large'
  /**
   * Color of the spinner
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
  /**
   * Custom className
   */
  className?: string
  /**
   * onClick handler for backdrop
   */
  onClick?: () => void
}

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  open,
  text = 'Loading...',
  size = 'large',
  color = 'primary',
  className,
  onClick,
}) => {
  const spinnerSize = typeof size === 'string' 
    ? size === 'small' ? 24 : size === 'large' ? 56 : 40
    : size

  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: 100000,
        flexDirection: 'column',
        gap: 2
      }}
      open={open}
      onClick={onClick}
      className={className}
    >
      <CircularProgress color={color} size={spinnerSize} />
      {text && (
        <Typography variant="h6" color="inherit">
          {text}
        </Typography>
      )}
    </Backdrop>
  )
}

// Mini spinner for buttons and small spaces
export interface MiniSpinnerProps {
  /**
   * Size of the mini spinner
   */
  size?: number
  /**
   * Color of the spinner
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
  /**
   * Custom className
   */
  className?: string
}

export const MiniSpinner: React.FC<MiniSpinnerProps> = ({
  size = 16,
  color = 'inherit',
  className,
}) => {
  return (
    <CircularProgress 
      size={size} 
      color={color} 
      thickness={4}
      className={className}
    />
  )
}

// Table loading skeleton
export const TableLoadingSpinner: React.FC<{
  rows?: number
  columns?: number
  text?: string
}> = ({ rows = 5, columns = 4, text = 'Loading data...' }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={4}>
      <CircularProgress size={40} color="primary" />
      <Typography variant="body2" color="text.secondary" mt={2}>
        {text}
      </Typography>
      <Typography variant="caption" color="text.disabled" mt={1}>
        {rows} rows × {columns} columns
      </Typography>
    </Box>
  )
}

export default LoadingSpinner
