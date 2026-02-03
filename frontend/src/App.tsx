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
      <div className="min-h-screen flex items-center justify-center bg-maya-gradient">
        <div className="noise-overlay" />
        <div className="logo-container animate-pulse-glow">
          <img 
            src="/maya.webp" 
            alt="Maya" 
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>
    )
  }

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-maya-gradient px-4 relative overflow-hidden">
        <div className="noise-overlay" />
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maya-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-maya-red/3 rounded-full blur-3xl" />
        
        {/* Quote at top */}
        <div className="absolute top-12 left-0 right-0 text-center px-4 opacity-0 animate-fade-in-up">
          <p className="quote-text text-maya-light/50 text-lg md:text-xl max-w-2xl mx-auto">
            "Aye, there's the rub, For in that sweep of determinism what memes may come."
          </p>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-100">
            <div className="logo-container animate-float">
              <img 
                src="/maya.webp" 
                alt="Maya" 
                className="w-28 h-28 md:w-36 md:h-36 object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-10 text-center opacity-0 animate-fade-in-up animation-delay-200">
            <h1 className="text-xs font-semibold tracking-[0.4em] text-maya-red uppercase mb-3">
              ENTER THE
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-maya-light tracking-tight text-glow">
              Mayaverse
            </h2>
          </div>

          {/* Login Form */}
          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            <LoginForm onSubmit={handleLogin} error={error} />
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 opacity-0 animate-fade-in-up animation-delay-500">
          <div className="w-1 h-1 rounded-full bg-maya-light/20" />
          <div className="w-1 h-1 rounded-full bg-maya-red/60" />
          <div className="w-1 h-1 rounded-full bg-maya-light/20" />
        </div>
      </div>
    )
  }

  // App directory view
  return (
    <div className="min-h-screen bg-maya-gradient px-4 py-8 md:py-12 relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-maya-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-maya-red/3 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Quote at top center */}
        <div className="text-center mb-12 md:mb-16 opacity-0 animate-fade-in-up">
          <p className="quote-text text-maya-light/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            "Aye, there's the rub, For in that sweep of determinism what memes may come."
          </p>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-6 opacity-0 animate-fade-in-up animation-delay-100">
          <div className="flex items-center gap-5">
            <div className="logo-container">
              <img 
                src="/maya.webp" 
                alt="Maya" 
                className="w-14 h-14 md:w-16 md:h-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-[10px] font-semibold tracking-[0.3em] text-maya-red uppercase mb-1">
                MAYA
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-maya-light">Developer Tools</h2>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-maya-light/40 hover:text-maya-red transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-maya-light/5"
          >
            Logout
          </button>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 opacity-0 animate-fade-in-up animation-delay-200">
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
        <div className="mt-16 md:mt-20 text-center opacity-0 animate-fade-in-up animation-delay-300">
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-maya-light/10" />
            <div className="w-2 h-2 rounded-full bg-maya-red/40" />
            <div className="w-8 h-px bg-maya-light/10" />
          </div>
          <p className="text-xs text-maya-light/20 tracking-widest uppercase">
            Maya Narrative Universe
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
