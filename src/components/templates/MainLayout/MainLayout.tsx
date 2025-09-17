
import React, { useState } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { Sidebar } from '@components/organisms/Sidebar'
import { AppHeader } from '@components/organisms/AppHeader'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isSmallScreen ? true : false)

  const handleToggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)
  const handleCloseSidebar = () => isSmallScreen && setSidebarCollapsed(true) // hide on small screen

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onNavItemClick={handleCloseSidebar} // hide on nav click
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginLeft: isSmallScreen ? 0 : sidebarCollapsed ? 0 : '280px',
          transition: 'margin 0.3s ease-in-out',
        }}
      >
        <AppHeader
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar} // toggle button
        />

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
