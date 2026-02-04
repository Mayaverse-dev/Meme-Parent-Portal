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
      <div className="min-h-screen flex flex-col bg-maya-gradient px-2 relative overflow-hidden">
        <div className="noise-overlay" />
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maya-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-maya-red/3 rounded-full blur-3xl" />
        
        {/* Quote at top of page */}
        <div className="pt-12 md:pt-16 text-center px-4 opacity-0 animate-fade-in-up">
          <p className="quote-text text-maya-light/60 text-lg md:text-xl">
            "Aye, there's the rub,
          </p>
          <p className="quote-text text-maya-light/60 text-lg md:text-xl">
            For in that sweep of determinism what memes may come."
          </p>
        </div>

        {/* Main content - centered */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          {/* Title "Enter" */}
          <div className="mb-4 text-center opacity-0 animate-fade-in-up animation-delay-100">
            <h1 className="text-xs font-semibold tracking-[0.4em] text-maya-light/50 uppercase">
              ENTER
            </h1>
          </div>

          {/* Logo */}
          <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            <img 
              src="/maya.webp" 
              alt="Maya" 
              className="w-40 md:w-52 h-auto"
            />
          </div>

          {/* Login Form */}
          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            <LoginForm onSubmit={handleLogin} error={error} />
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="pb-8 flex justify-center gap-2 opacity-0 animate-fade-in-up animation-delay-500">
          <div className="w-1 h-1 rounded-full bg-maya-light/20" />
          <div className="w-1 h-1 rounded-full bg-maya-red/60" />
          <div className="w-1 h-1 rounded-full bg-maya-light/20" />
        </div>
      </div>
    )
  }

  // App directory view
  return (
    <div className="min-h-screen flex flex-col bg-maya-gradient px-4 py-8 md:py-12 relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-maya-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-maya-red/3 rounded-full blur-3xl" />

      <div className="flex-1 max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 md:mb-16 opacity-0 animate-fade-in-up animation-delay-100">
          <div className="flex flex-col items-start">
            <img 
              src="/maya.webp" 
              alt="Maya" 
              className="w-12 md:w-16 h-auto mb-2"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-maya-light">Tools</h2>
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
            image="/one-bard-one-lullaby.png"
          />
          <AppCard
            title="Lore Consistency Enforcer"
            description="Validate your stories against the Lore Book. Catch inconsistencies before they become canon."
            href="https://lore.meme.entermaya.com"
            image="/vidhi-vidhaata.png"
          />
          <AppCard
            title="Copy Editor"
            description="Edit and refine your content with AI-powered copy editing tools for the Maya universe."
            href="https://copyedit.meme.entermaya.com"
            image="/seed-out-of-place.png"
          />
        </div>
      </div>

      {/* Footer - pinned to bottom */}
      <div className="pb-6 pt-8 text-center opacity-0 animate-fade-in-up animation-delay-300 relative z-10">
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
  )
}

export default App
