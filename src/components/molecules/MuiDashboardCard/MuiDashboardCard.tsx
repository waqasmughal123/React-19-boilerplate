import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface MuiDashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  elevation?: number
}

export const MuiDashboardCard: React.FC<MuiDashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
  elevation = 1,
}) => {
  const theme = useTheme()

  const getColorValue = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'success':
        return theme.palette.success.main
      case 'warning':
        return theme.palette.warning.main
      case 'error':
        return theme.palette.error.main
      case 'info':
        return theme.palette.info.main
      default:
        return theme.palette.primary.main
    }
  }

  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          elevation: elevation + 2,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        {/* Header with title and icon */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Avatar
              sx={{
                bgcolor: getColorValue(color),
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          )}
        </Box>

        {/* Main value */}
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{
            fontWeight: 700,
            mb: trend ? 1 : 0,
            fontSize: '2rem',
          }}
        >
          {value}
        </Typography>

        {/* Trend indicator */}
        {trend && (
          <Box display="flex" alignItems="center" mt={1}>
            <Chip
              icon={
                trend.isPositive ? (
                  <TrendingUp fontSize="small" />
                ) : (
                  <TrendingDown fontSize="small" />
                )
              }
              label={trend.value}
              size="small"
              color={trend.isPositive ? 'success' : 'error'}
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}



