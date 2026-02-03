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
      <div className="relative group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-6 py-4 input-dark rounded-2xl text-maya-light placeholder:text-maya-light/30 transition-all duration-300"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !password.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-maya-red text-white rounded-xl text-sm font-semibold hover:bg-maya-red/90 hover:shadow-lg hover:shadow-maya-red/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            'Enter'
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-maya-red animate-pulse" />
          <p className="text-sm text-maya-red">{error}</p>
        </div>
      )}
    </form>
  )
}
