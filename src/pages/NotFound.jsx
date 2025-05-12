import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineExclamationCircle, HiHome, HiSearch } from 'react-icons/hi'

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
          <HiOutlineExclamationCircle className="h-12 w-12 text-primary-700" />
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary py-2.5 px-5 flex items-center justify-center">
            <HiHome className="mr-2 h-5 w-5" />
            Return Home
          </Link>
          
          <Link to="/restaurants" className="btn-outline py-2.5 px-5 flex items-center justify-center">
            <HiSearch className="mr-2 h-5 w-5" />
            Find Restaurants
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound