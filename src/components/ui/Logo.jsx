import { Link } from 'react-router-dom'

const Logo = ({ className = "h-8 w-auto" }) => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <svg 
        className={className} 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M25 5C13.954 5 5 13.954 5 25C5 36.046 13.954 45 25 45C36.046 45 45 36.046 45 25C45 13.954 36.046 5 25 5Z" 
          fill="#8B0000" 
        />
        <path 
          d="M33 20C33 22.2091 29.4183 24 25 24C20.5817 24 17 22.2091 17 20C17 17.7909 20.5817 16 25 16C29.4183 16 33 17.7909 33 20Z" 
          fill="#D4AF37" 
        />
        <path 
          d="M17 22V30C17 32.2091 20.5817 34 25 34C29.4183 34 33 32.2091 33 30V22" 
          stroke="#D4AF37" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
      </svg>
      <span className="font-serif text-xl font-bold hidden sm:inline-block text-current">
        TableTaste
      </span>
    </Link>
  )
}

export default Logo