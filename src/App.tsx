import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { LoginPage, RegisterPage } from '@pages/auth'
import { DashboardPage } from '@pages/dashboard'
import { ProtectedRoute } from '@components/organisms/ProtectedRoute'
import WorkersDashboard from './pages/WorkersDasboard/WorkersDashboard'



function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
        
    <Routes>
      {/* Default route - Login page */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workers"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <WorkersDashboard/>
          </ProtectedRoute>
        }
      />
      
    </Routes>
  
  )
}

export default App
