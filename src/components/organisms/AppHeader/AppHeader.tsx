// import React, { useState } from 'react'
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   Typography,
//   useTheme
// } from '@mui/material'
// import {
//   Settings,
//   Logout,
//   AccountCircle
// } from '@mui/icons-material'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@store/index'
// import { logout } from '@store/slices/authSlice'

// export interface AppHeaderProps {
//   sidebarCollapsed: boolean
//   onToggleSidebar: () => void
// }

// export const AppHeader: React.FC<AppHeaderProps> = ({ sidebarCollapsed }) => {
//   const theme = useTheme()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { user } = useSelector((state: RootState) => state.auth)
  
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

//   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/login')
//     handleMenuClose()
//   }

//   const handleSettings = () => {
//     navigate('/settings')
//     handleMenuClose()
//   }

//   const getUserInitials = () => {
//     if (user?.email) {
//       return user.email.charAt(0).toUpperCase()
//     }
//     return 'U'
//   }

//   const getUserDisplayName = () => {
//     return user?.email?.split('@')[0] || 'User'
//   }

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           left: sidebarCollapsed ? 0 : 280,
//           width: sidebarCollapsed ? '100%' : 'calc(100% - 280px)',
//           backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
//           borderBottom: `1px solid ${theme.palette.divider}`,
//           color: theme.palette.text.primary,
//           zIndex: theme.zIndex.drawer - 1,
//           transition: theme.transitions.create(['left', 'width'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           })
//         }}
//       >
//         <Toolbar sx={{ minHeight: '64px !important', px: 3, justifyContent: 'flex-end' }}>
//           {/* User Profile Circle */}
//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls="primary-search-account-menu"
//             aria-haspopup="true"
//             onClick={handleProfileMenuOpen}
//             color="inherit"
//           >
//             <Avatar
//               sx={{
//                 width: 40,
//                 height: 40,
//                 backgroundColor: theme.palette.primary.main,
//                 fontSize: '16px',
//                 fontWeight: 600
//               }}
//             >
//               {getUserInitials()}
//             </Avatar>
//           </IconButton>

//           {/* Profile Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             PaperProps={{
//               sx: {
//                 mt: 1,
//                 minWidth: 200,
//                 '& .MuiMenuItem-root': {
//                   px: 2,
//                   py: 1,
//                 },
//               },
//             }}
//           >
//             {/* User Info */}
//             <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
//               <Box display="flex" alignItems="center" gap={2}>
//                 <Avatar
//                   sx={{
//                     width: 40,
//                     height: 40,
//                     backgroundColor: theme.palette.primary.main,
//                     fontSize: '16px',
//                     fontWeight: 600
//                   }}
//                 >
//                   {getUserInitials()}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     {getUserDisplayName()}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {user?.email}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
//               <AccountCircle sx={{ mr: 2 }} />
//               My Profile
//             </MenuItem>
            
//             <MenuItem onClick={handleSettings}>
//               <Settings sx={{ mr: 2 }} />
//               Settings
//             </MenuItem>
            
//             <Divider />
            
//             <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
//               <Logout sx={{ mr: 2 }} />
//               Sign out
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

// export default AppHeader

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
} from '@mui/material'
import { Menu as MenuIcon, Settings, Logout, AccountCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { logout } from '@store/slices/authSlice'

export interface AppHeaderProps {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
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
        left: sidebarCollapsed ? 0 : 280,
        width: sidebarCollapsed ? '100%' : 'calc(100% - 280px)',
        backgroundColor: '#111827',
        borderBottom: '1px solid #222',
        color: '#fff',
        zIndex: 1200,
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2, justifyContent: 'space-between' }}>
        {/* Left: Menu icon always visible */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onToggleSidebar}
          sx={{ color: '#ffd600' }}
        >
          <MenuIcon />
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
                <Avatar sx={{ width: 40, height: 40, backgroundColor: '#ffd600', color: '#111827', fontSize: 16, fontWeight: 600 }}>
                  {getUserInitials()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} color="#fff">{getUserDisplayName()}</Typography>
                  <Typography variant="caption" color="#ffffffaa">{user?.email}</Typography>
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
