import React, { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Link,
  useTheme
} from '@mui/material'
import {
  Close,
  Search,
  ArrowBack,
  Home,
  OpenInNew
} from '@mui/icons-material'

interface HelpDrawerProps {
  open: boolean
  onClose: () => void
}

const helpItems = [
  {
    id: 'getting-started',
    title: 'Getting started with Microsoft Planner',
    type: 'article'
  },
  {
    id: 'manage-tasks',
    title: 'Manage your tasks in Planner',
    type: 'article'
  },
  {
    id: 'copilot-access',
    title: 'Access Microsoft 365 Copilot in Planner (preview)',
    type: 'article'
  },
  {
    id: 'compare-plans',
    title: 'Compare basic vs premium plans',
    type: 'article'
  },
  {
    id: 'delete-task',
    title: 'Delete a task or plan',
    type: 'article'
  },
  {
    id: 'video-tutorials',
    title: 'Planner video tutorial library',
    type: 'article'
  },
  {
    id: 'planner-blog',
    title: 'Planner blog',
    type: 'external',
    external: true
  },
  {
    id: 'help-center',
    title: 'Planner help center',
    type: 'external',
    external: true
  }
]

const footerLinks = [
  { title: 'Legal', url: '#' },
  { title: 'Privacy & cookies', url: '#' },
  { title: 'Consumer Health Privacy', url: '#' },
  { title: 'Your Privacy Choices', url: '#', hasIcon: true }
]

export const HelpDrawer: React.FC<HelpDrawerProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHelpItems = helpItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleItemClick = (item: typeof helpItems[0]) => {
    console.log('Help item clicked:', item.title)
    // Here you would typically navigate to the help article or open external link
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '90vw',
          backgroundColor: theme.palette.background.paper,
          borderLeft: `1px solid ${theme.palette.divider}`
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Help
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <IconButton size="small" disabled>
            <ArrowBack />
          </IconButton>
          <IconButton size="small">
            <Home />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            placeholder="Search help"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: theme.palette.background.default,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-focused': {
                  backgroundColor: theme.palette.background.paper,
                }
              }
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Featured Help Section */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Featured help
            </Typography>
            
            <List sx={{ p: 0 }}>
              {filteredHelpItems.map((item, index) => (
                <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => handleItemClick(item)}
                    sx={{
                      borderRadius: 1,
                      px: 0,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {item.title}
                          </Typography>
                          {item.external && (
                            <OpenInNew 
                              sx={{ 
                                fontSize: 16, 
                                color: theme.palette.text.secondary 
                              }} 
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.title}>
                <Link
                  href={link.url}
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.title}
                  {link.hasIcon && (
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'white',
                          fontSize: 10,
                          fontWeight: 'bold'
                        }}
                      >
                        ✓
                      </Typography>
                    </Box>
                  )}
                </Link>
                {index < footerLinks.length - 1 && (
                  <Typography variant="caption" color="text.secondary">
                    |
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default HelpDrawer

