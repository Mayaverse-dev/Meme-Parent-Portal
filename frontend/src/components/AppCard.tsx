interface AppCardProps {
  title: string
  description: string
  href: string
  icon: 'chat' | 'shield'
}

export default function AppCard({ title, description, href, icon }: AppCardProps) {
  return (
    <a
      href={href}
      className="group block p-8 bg-white/60 border border-maya-dark/5 rounded-3xl hover:bg-white hover:border-maya-red/20 hover:shadow-lg hover:shadow-maya-red/5 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-12 h-12 mb-6 rounded-2xl bg-maya-red/10 flex items-center justify-center group-hover:bg-maya-red/20 transition-colors">
        {icon === 'chat' ? (
          <svg className="w-6 h-6 text-maya-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-maya-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-maya-dark mb-2 group-hover:text-maya-red transition-colors">
        {title}
      </h3>
      <p className="text-sm text-maya-dark/60 leading-relaxed">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center text-maya-dark/30 group-hover:text-maya-red transition-colors">
        <span className="text-sm font-medium mr-2">Open</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </a>
  )
}
