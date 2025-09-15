import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '@store/index'
import { setUser } from '@store/slices/authSlice'
import { MuiButtonComponent } from '@components/atoms'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleLogin = () => {
    // Set mock user data to simulate successful authentication
    dispatch(setUser({
      id: 1,
      email: 'user@example.com',
      date_joined: new Date().toISOString(),
      is_active: true
    }))
    
    // Store mock token for persistence
    localStorage.setItem('token', 'mock-jwt-token-' + Date.now())
    
    navigate('/dashboard', { replace: true })
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      padding: '20px'
    }}>
      <MuiButtonComponent
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLogin}
      >
        Login
      </MuiButtonComponent>
    </div>
  )
}

export default LoginPage
