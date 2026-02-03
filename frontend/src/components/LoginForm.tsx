import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (password: string) => void
  error: string | null
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim() || isLoading) return
    
    setIsLoading(true)
    await onSubmit(password)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-5 py-4 bg-white/60 border border-maya-dark/10 rounded-2xl text-maya-dark placeholder:text-maya-dark/30 focus:outline-none focus:border-maya-red/30 focus:bg-white transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !password.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-maya-red text-white rounded-xl text-sm font-medium hover:bg-maya-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? '...' : 'Enter'}
        </button>
      </div>
      
      {error && (
        <p className="mt-3 text-sm text-maya-red text-center">{error}</p>
      )}
    </form>
  )
}
