interface AppCardProps {
  title: string
  description: string
  href: string
  image: string
}

export default function AppCard({ title, description, href, image }: AppCardProps) {
  return (
    <a
      href={href}
      className="group block p-6 glass-card rounded-2xl transition-all duration-500 relative overflow-hidden min-h-[160px]"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-maya-light mb-2 group-hover:text-maya-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-maya-light/50 leading-relaxed group-hover:text-maya-light/70 transition-colors duration-300">
          {description}
        </p>
      </div>
    </a>
  )
}
