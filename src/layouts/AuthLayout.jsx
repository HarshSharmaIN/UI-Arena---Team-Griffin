import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/ui/Logo'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-neutral-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="inline-flex items-center">
            <Logo className="h-12 w-auto" />
          </Link>
        </div>
      </div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <div className="bg-white py-8 px-4 shadow-elegant sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
        
        <div className="mt-6 text-center text-sm text-neutral-600">
          <Link to="/" className="font-medium text-primary-700 hover:text-primary-600">
            Return to home page
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout