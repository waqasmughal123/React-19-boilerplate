


import axios from "axios"
import { AuthResponse } from "@/types/auth"

const API_URL = "http://3.25.19.167:81/api/auth"

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${API_URL}/login/`, credentials)

  // 🔹 Console token
  console.log("Access Token:", response.data.access)

  // 🔹 Decode JWT payload
  if (response.data.access) {
    const payload = JSON.parse(atob(response.data.access.split(".")[1]))
    console.log("Decoded Token Payload:", payload)

    // Agar payload me email hai
    if (payload.email) {
      console.log("User Email from Token:", payload.email)
    }
  }

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
    await axios.post(
      `${API_URL}/logout/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    localStorage.removeItem("token")
  }
}

export const authService = new AuthService()

