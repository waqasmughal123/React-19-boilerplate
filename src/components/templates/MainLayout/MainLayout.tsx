import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { Sidebar } from '@components/organisms/Sidebar'
import { AppHeader } from '@components/organisms/AppHeader'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: sidebarCollapsed ? 0 : '280px', // Account for sidebar width
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
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
            marginTop: '64px', // Account for header height
            padding: theme.spacing(3),
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
