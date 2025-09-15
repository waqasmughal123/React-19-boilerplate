import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { PaletteMode } from '@mui/material'
import { createAppTheme } from './mui-theme'

// Theme context type
export interface ThemeContextType {
  mode: PaletteMode
  toggleTheme: () => void
  setTheme: (mode: PaletteMode) => void
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode
  defaultMode?: PaletteMode
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = 'light' 
}) => {
  // Get initial theme from localStorage or use default
  const getInitialTheme = (): PaletteMode => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme-mode') as PaletteMode
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return defaultMode
  }

  const [mode, setMode] = useState<PaletteMode>(getInitialTheme)

  // Update localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode)
    }
  }, [mode])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('theme-mode')
        if (!savedTheme) {
          setMode(e.matches ? 'dark' : 'light')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }

  // Set specific theme mode
  const setTheme = (newMode: PaletteMode) => {
    setMode(newMode)
  }

  // Create theme based on current mode
  const theme = createAppTheme(mode)

  // Context value
  const contextValue: ThemeContextType = {
    mode,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme context
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider')
  }
  return context
}



