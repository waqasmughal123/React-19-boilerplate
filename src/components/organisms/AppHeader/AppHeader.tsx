


import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, Settings, Logout, AccountCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { logout } from '@store/slices/authSlice'

export interface AppHeaderProps {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')) // ✅ detect small screen
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    handleMenuClose()
  }
  const handleSettings = () => {
    navigate('/settings')
    handleMenuClose()
  }

  const getUserInitials = () => user?.email?.charAt(0).toUpperCase() || 'U'
  const getUserDisplayName = () => user?.email?.split('@')[0] || 'User'

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: isSmallScreen ? 0 : sidebarCollapsed ? 0 : 280, // ✅ small screen -> always full width
        width: isSmallScreen ? '100%' : sidebarCollapsed ? '100%' : 'calc(100% - 280px)',
        backgroundColor: '#111827',
        borderBottom: '1px solid #222',
        color: '#fff',
        zIndex: 1400, // ✅ above sidebar
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2, justifyContent: 'space-between' }}>
        {/* Left: Menu / Close icon */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onToggleSidebar}
          sx={{ color: '#ffd600' }}
        >
          {isSmallScreen
            ? (sidebarCollapsed ? <MenuIcon /> : <CloseIcon />) // ✅ small screen -> Menu / Close toggle
            : <MenuIcon />}  {/* ✅ large screen -> always MenuIcon */}
        </IconButton>

        {/* Right: User menu */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#ffd600',
                color: '#111827',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {getUserInitials()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                bgcolor: '#111827',
                color: '#fff',
                borderRadius: 0,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: '#ffd600',
                    color: '#111827',
                  },
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #222' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#ffd600',
                    color: '#111827',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {getUserInitials()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} color="#fff">
                    {getUserDisplayName()}
                  </Typography>
                  <Typography variant="caption" color="#ffffffaa">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <MenuItem onClick={() => { navigate('/profile'); handleMenuClose() }}>
              <AccountCircle sx={{ mr: 2, color: '#ffd600' }} /> My Profile
            </MenuItem>
            <MenuItem onClick={handleSettings}>
              <Settings sx={{ mr: 2, color: '#ffd600' }} /> Settings
            </MenuItem>
            <Divider sx={{ borderColor: '#222' }} />
            <MenuItem onClick={handleLogout} sx={{ color: '#e53e3e' }}>
              <Logout sx={{ mr: 2, color: '#e53e3e' }} /> Sign out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
