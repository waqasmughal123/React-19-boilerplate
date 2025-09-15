import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '@store/index'
import { setUser } from '@store/slices/authSlice'
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  FormControlLabel,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import './LoginPage.css'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Mock authentication
    dispatch(setUser({
      id: 1,
      email: email || 'user@example.com',
      date_joined: new Date().toISOString(),
      is_active: true
    }))

    localStorage.setItem('token', 'mock-jwt-token-' + Date.now())

    // Navigate to dashboard after button click
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Left Side - Form */}
        <div className="login-left">
          <div className="login-form-wrapper">
            <div className="login-header">
              <Typography variant="h5" fontWeight={600}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Enter your credentials to access your account
              </Typography>
            </div>

            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <FormControlLabel
                control={<Checkbox color="warning" />}
                label="Remember me"
              />

              <Button
                className="login-button"
                fullWidth
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>

        {/* Right Side - Brand */}
        <div className="login-right">
          <div className="brand-section">
            <div className="brand-logo">
              <div className="logo-circle">CA</div>
              <h2>CUSTOM ALUMINIUM</h2>
              <p>METALWORK SPECIALISTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
