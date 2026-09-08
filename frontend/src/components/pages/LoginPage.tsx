import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../services/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await authApi.login(username.trim(), password)
      localStorage.setItem('oweru-auth-user', JSON.stringify(user))
      navigate('/Dashboard', { replace: true })
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <span className="login-badge"><i className="bi bi-shield-check" />Secure workspace</span>
        <h1>Welcome back</h1>
        <p>Sign in to your Sell With Oweru workspace.</p>
        <form onSubmit={submit} className="login-form">
          <label>Username<div className="login-field"><i className="bi bi-person" /><input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" autoComplete="username" required /></div></label>
          <label>Password<div className="login-field password-input"><i className="bi bi-lock" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" title={showPassword ? 'Hide password' : 'Show password'} aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}><i className={`bi bi-eye${showPassword ? '-slash' : ''}`} /></button></div></label>
          {error && <div className="login-error" role="alert">{error}</div>}
          <button className="login-submit" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}<i className="bi bi-arrow-right" /></button>
        </form>
        <p className="login-foot">Access is provisioned by your administrator. Trouble signing in? Reach out to your workspace admin.</p>
      </section>
    </main>
  )
}
