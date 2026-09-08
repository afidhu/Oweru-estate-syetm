import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/dashboard/Dashboard';
import { LanguageProvider } from './i18n'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Dashboard" element={<ProtectedDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

function ProtectedDashboard() {
  return localStorage.getItem('oweru-auth-user') ? <Dashboard /> : <Navigate to="/login" replace />
}
