
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "@store/index"
import { loginUser, clearError } from "@store/slices/authSlice"
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  FormControlLabel,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState, useEffect } from "react"
import "./LoginPage.css"

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )

  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("") // ✅ username instead of email
  const [password, setPassword] = useState("")
  const [validationError, setValidationError] = useState<string | null>(null)

  // ✅ Redirect sirf tab hoga jab login success hoga
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async () => {
    // Validation
    if (!username || !/\S+@\S+\.\S+/.test(username)) {
      setValidationError("Please enter a valid email address")
      return
    }
    if (password.length < 5) {
      setValidationError("Password must be at least 5 characters")
      return
    }

    setValidationError(null)

    // Dispatch login → loader start hoga
    await dispatch(loginUser({ username, password }))
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
              {/* Validation Error */}
              {validationError && <Alert severity="error">{validationError}</Alert>}

              {/* API Error */}
              {error && (
                <Alert severity="error" onClose={() => dispatch(clearError())}>
                  {error}
                </Alert>
              )}

              {/* Username (Email style) */}
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* Password */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox color="warning" />}
                label="Remember me"
              />

              {/* Button with Loader */}
              <Button
                className="login-button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign in"
                )}
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
