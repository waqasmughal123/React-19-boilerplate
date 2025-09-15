import React from 'react'
import {
  Box,
  Typography,
  Avatar,
  useTheme
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export interface SidebarProps {
  collapsed: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const theme = useTheme()
  const { user } = useSelector((state: RootState) => state.auth)

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  if (collapsed) {
    return null
  }

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f8f9fa',
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: theme.palette.primary.main,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {getUserInitials()}
          </Avatar>
          <Box flex={1}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.email?.split('@')[0] || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Empty Navigation Area */}
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
          No navigation items
        </Typography>
      </Box>
    </Box>
  )
}

export default Sidebar