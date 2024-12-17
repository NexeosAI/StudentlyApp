interface LogoProps {
  className?: string
  variant?: 'default' | 'light'
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground'

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M16 2L2 9L16 16L30 9L16 2Z"
          className={`fill-primary ${variant === 'light' ? 'opacity-90' : ''}`}
        />
        <path
          d="M2 23L16 30L30 23V9L16 16L2 9V23Z"
          className={`fill-primary ${variant === 'light' ? 'opacity-70' : 'opacity-80'}`}
        />
      </svg>
      <span className={`text-xl font-bold ${textColor}`}>StudentlyAI</span>
    </div>
  )
}
