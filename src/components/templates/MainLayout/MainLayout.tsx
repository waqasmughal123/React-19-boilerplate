import React, { useState } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { Sidebar } from '@components/organisms/Sidebar'
import { AppHeader } from '@components/organisms/AppHeader'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')) // ✅ small vs large detect
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        sx={{
          position: isSmallScreen ? 'fixed' : 'fixed',
          left: sidebarCollapsed ? (isSmallScreen ? '-280px' : 0) : 0,
          top: isSmallScreen ? '64px' : 0, // ✅ small -> header ke niche
          bottom: 0,
          width: '280px',
          height: isSmallScreen ? 'calc(100% - 64px)' : '100%',
          transition: 'left 0.3s ease-in-out',
          zIndex: 1300,
        }} 
      />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          // ✅ Large screen pe text move kare, small pe fixed rahe
          marginLeft: isSmallScreen ? 0 : (sidebarCollapsed ? 0 : '280px'),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Header */}
        <AppHeader 
          sidebarCollapsed={sidebarCollapsed} 
          onToggleSidebar={handleToggleSidebar} 
        />
        
        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '64px',
            padding: theme.spacing(3),
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
