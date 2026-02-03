import { useState, useEffect } from 'react'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import AppCard from './components/AppCard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await axios.get('/api/verify')
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (password: string) => {
    setError(null)
    try {
      await axios.post('/api/login', { password })
      setIsAuthenticated(true)
    } catch {
      setError('Invalid password')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout')
      setIsAuthenticated(false)
    } catch {
      console.error('Logout failed')
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maya-light">
        <div className="text-maya-dark/40 text-sm font-medium">Loading...</div>
      </div>
    )
  }

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-maya-light px-4">
        <div className="mb-12 text-center">
          <h1 className="text-[10px] font-bold tracking-[0.3em] text-maya-dark/40 uppercase mb-2">
            ENTER
          </h1>
          <h2 className="text-4xl font-bold text-maya-dark tracking-tight">Maya</h2>
        </div>
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    )
  }

  // App directory view
  return (
    <div className="min-h-screen bg-maya-light px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-[10px] font-bold tracking-[0.3em] text-maya-dark/40 uppercase mb-1">
              MAYA
            </h1>
            <h2 className="text-2xl font-bold text-maya-dark">Developer Tools</h2>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-maya-dark/50 hover:text-maya-red transition-colors"
          >
            Logout
          </button>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <AppCard
            title="Ask Maya"
            description="Query the canonical lore using natural language. Get answers grounded in the official Maya universe."
            href="https://askmaya.meme.entermaya.com"
            icon="chat"
          />
          <AppCard
            title="Lore Consistency Enforcer"
            description="Validate your stories against the Lore Book. Catch inconsistencies before they become canon."
            href="https://lore.meme.entermaya.com"
            icon="shield"
          />
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-maya-dark/30">
          Maya Narrative Universe
        </div>
      </div>
    </div>
  )
}

export default App
