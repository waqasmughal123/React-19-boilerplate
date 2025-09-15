import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode } from '../../../theme'

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large'
  showTooltip?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium',
  showTooltip = true 
}) => {
  const { mode, toggleTheme } = useThemeMode()

  const toggleButton = (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      size={size}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  )

  if (!showTooltip) {
    return toggleButton
  }

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      {toggleButton}
    </Tooltip>
  )
}
