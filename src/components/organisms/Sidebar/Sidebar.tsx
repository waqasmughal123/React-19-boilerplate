import React from 'react'
import { Avatar, List, ListItemIcon, ListItemText, Typography, Button } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import './Sidebar.css'

export interface SidebarProps {
  collapsed?: boolean
  active?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, active = 'Dashboard' }) => {
  const { user } = useSelector((state: RootState) => state.auth)

  if (collapsed) return null

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Workers', icon: <PeopleIcon /> },
  ]

  const getUserInitials = () => user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Avatar
          sx={{
            bgcolor: '#ffd600',
            color: '#111827',
            fontWeight: 700,
          }}
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
        {navItems.map((item) => (
         <div
  key={item.text}
  className="nav-item"
  style={{
    backgroundColor: active === item.text ? '#ffd600' : 'transparent',
    color: active === item.text ? '#111827' : '#ffffffaa',
    borderLeft: active === item.text ? '3px solid #ffd600' : '3px solid transparent',
  }}
>
  <ListItemIcon
    sx={{ color: active === item.text ? '#111827' : '#ffffffaa', minWidth: 36 }}
  >
    {item.icon}
  </ListItemIcon>
  <ListItemText
    primary={item.text}
    sx={{ color: active === item.text ? '#111827' : '#ffffffaa' }}
  />
</div>
        ))}
      </List>

      {/* Logout */}
      <div className="logout-container">
        <Button
          startIcon={<LogoutIcon />}
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
