

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
  AuthResponse,
} from "@/types/auth"
import { authService } from "@/services/authService"

interface ApiError {
  response?: { data?: { message?: string; detail?: string } }
  message?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,  // 🔹 Always false by default
  isLoading: false,
  error: null,
}

/**
 * LOGIN
 */
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials)

    if (response.access) {
      localStorage.setItem("token", response.access)
    }

    return response
  } catch (error: unknown) {
    const apiError = error as ApiError
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.response?.data?.detail ||
        apiError.message ||
        "Login failed"
    )
  }
})

/**
 * REGISTER
 */
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.register(credentials)

    if (response.access) {
      localStorage.setItem("token", response.access)
    }

    return response
  } catch (error: unknown) {
    const apiError = error as ApiError
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.response?.data?.detail ||
        apiError.message ||
        "Registration failed"
    )
  }
})

/**
 * GET CURRENT USER
 */
export const getCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await authService.getCurrentUser()
  } catch (error: unknown) {
    const apiError = error as ApiError
    return rejectWithValue(
      apiError.response?.data?.message || "Failed to get user"
    )
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false
          state.user = action.payload.user || null
          state.token = action.payload.access
          state.isAuthenticated = true
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.token = null
        state.user = null
      })

      // 🔹 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false
          state.user = action.payload.user || null
          state.token = action.payload.access
          state.isAuthenticated = true
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.token = null
        state.user = null
      })

      // 🔹 GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false
          state.user = action.payload
          state.isAuthenticated = true
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.token = null
        state.user = null
        state.error = action.payload as string
        localStorage.removeItem("token")
      })
  },
})

export const { logout, clearError, setUser } = authSlice.actions
export default authSlice.reducer
