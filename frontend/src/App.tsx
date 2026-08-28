import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/dashboard/Dashboard';
import { LanguageProvider } from './i18n'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
