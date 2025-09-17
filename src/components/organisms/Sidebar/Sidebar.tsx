


import React from 'react'
import { Avatar, List, ListItemIcon, ListItemText, Typography, Button } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { logout } from '@store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import './Sidebar.css'

export interface SidebarProps {
  collapsed?: boolean
  active?: string
  onNavItemClick?: () => void // ✅ callback for small screen toggle
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, active = 'Dashboard', onNavItemClick }) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  if (collapsed) return null

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Workers', icon: <PeopleIcon />, path: '/workers' },
  ]

  const getUserInitials = () => user?.email?.charAt(0).toUpperCase() || 'U'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signup')
  }

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Avatar
          sx={{ bgcolor: '#ffd600', color: '#111827', fontWeight: 700 }}
        >
          {getUserInitials()}
        </Avatar>
        <div>
          <Typography className="sidebar-header-title">Custom Aluminium</Typography>
          <Typography className="sidebar-header-subtitle">Metalwork Specialists</Typography>
        </div>
      </div>

      {/* Navigation */}
      <List className="nav-list">
  {navItems.map((item) => {
    const isActive = location.pathname === item.path
    return (
      <Link
        to={item.path}
        key={item.text}
        style={{ textDecoration: 'none' }}
        onClick={onNavItemClick}
      >
        <div
          className="nav-item"
          style={{
            backgroundColor: isActive ? '#ffd600' : 'transparent',
            color: isActive ? '#111827' : '#ffffffaa',
            borderLeft: isActive ? '3px solid #ffd600' : '3px solid transparent',
          }}
        >
          <ListItemIcon sx={{ color: isActive ? '#111827' : '#ffffffaa', minWidth: 36 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{ color: isActive ? '#111827' : '#ffffffaa' }}
          />
        </div>
      </Link>
    )
  })}
</List>


      {/* Logout */}
      <div className="logout-container">
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: '#ffd600',
            border: '1px solid #ffd600',
            width: '100%',
            backgroundColor: 'transparent',
            '&:hover': {
              bgcolor: '#ffd600',
              color: '#111827',
              borderColor: '#ffd600',
            },
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
