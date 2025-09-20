import axios from "axios"
import { AuthResponse } from "@/types/auth"

const API_URL = "http://54.206.231.112:8000/api/auth"

class AuthService {
  // ✅ Login ab email accept karega
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    console.log("Login Credentials:", credentials)
    const response = await axios.post<AuthResponse>(`${API_URL}/login/`, credentials)

    // Purana token remove karo
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')

    // Naya token save karo
    localStorage.setItem('token', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)
    console.log("Access Token saved to localStorage:", response.data.access)

    return response.data
  }

  async register(credentials: { username: string; password: string; email?: string }): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/register/`, credentials)
    return response.data
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_URL}/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  }

  async logout() {
    const token = localStorage.getItem("token")
    await axios.post(`${API_URL}/logout/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
  }
}

export const authService = new AuthService()
