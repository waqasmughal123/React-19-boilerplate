import { useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '@store/index'
import { registerUser, clearError } from '@store/slices/authSlice'
import { MuiButtonComponent, MuiEmailInput, MuiPasswordInput, Logo } from '@components/atoms'
import { useAuthContent } from '@hooks/useContent'
import './LoginPage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
  })
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const authContent = useAuthContent()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      email: e.target.value
    }))
    if (error) {
      dispatch(clearError())
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      password: e.target.value
    }))
    setPasswordError('')
    if (error) {
      dispatch(clearError())
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      password_confirm: e.target.value
    }))
    setPasswordError('')
    if (error) {
      dispatch(clearError())
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Client-side password confirmation check
    if (formData.password !== formData.password_confirm) {
      setPasswordError('Passwords do not match')
      return
    }
    
    try {
      const result = await dispatch(registerUser(formData))
      if (result.type === 'auth/register/fulfilled') {
        // Force navigation after successful registration
        setTimeout(() => {
          navigate('/dashboard', { replace: true })
        }, 100)
      }
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h1>{authContent.register.title}</h1>
              <p>{authContent.register.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <MuiEmailInput
                  label={authContent.register.emailLabel}
                  placeholder={authContent.register.emailPlaceholder}
                  value={formData.email}
                  onChange={handleEmailChange}
                  isRequired
                  fullWidth
                  validateOnBlur
                  showValidationIcon
                  errorText={error && error.includes('email') ? error : undefined}
                />
              </div>

              <div className="form-group">
                <MuiPasswordInput
                  label={authContent.register.passwordLabel}
                  placeholder={authContent.register.passwordPlaceholder}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  isRequired
                  fullWidth
                  showPasswordToggle
                  strengthIndicator
                  errorText={error && error.includes('password') && !passwordError ? error : undefined}
                />
              </div>

              <div className="form-group">
                <MuiPasswordInput
                  label={authContent.register.confirmPasswordLabel}
                  placeholder={authContent.register.confirmPasswordPlaceholder}
                  value={formData.password_confirm}
                  onChange={handleConfirmPasswordChange}
                  isRequired
                  fullWidth
                  showPasswordToggle
                  errorText={passwordError || (error && error.includes('confirm') ? error : undefined)}
                />
              </div>

              <MuiButtonComponent
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                isLoading={isLoading}
                className="login-button"
              >
                {authContent.register.registerButton}
              </MuiButtonComponent>
            </form>

            <div className="login-footer">
              <p>
                {authContent.register.hasAccount}{' '}
                <Link to="/login" className="signup-link">
                  {authContent.register.signInLink}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="login-right">
                        <div className="brand-section">
                <Logo size="2xl" className="logo--light" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
