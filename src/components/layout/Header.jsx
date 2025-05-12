import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import Logo from '../ui/Logo'
import { HiMenu, HiX, HiUser, HiCalendar, HiLogout } from 'react-icons/hi'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Restaurants', path: '/restaurants' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
    setProfileMenuOpen(false)
  }

  const handleLogout = () => {
    setProfileMenuOpen(false)
    logout()
  }

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container-custom flex items-center justify-between py-4">
          <Logo className="h-10 w-auto" />

        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-base font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'text-primary-700' 
                  : 'text-neutral-700 hover:text-primary-700'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              to="/reservations"
              className={`text-base font-medium transition-colors ${
                location.pathname === '/reservations' 
                  ? 'text-primary-700' 
                  : 'text-neutral-700 hover:text-primary-700'
              }`}
            >
              My Reservations
            </Link>
          )}
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <HiUser className="h-5 w-5" />
                </div>
                <span className="hidden lg:block">{user?.name}</span>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-elegant ring-1 ring-black ring-opacity-5"
                  >
                    <div className="border-b border-neutral-100 px-4 py-2">
                      <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                      <p className="text-xs text-neutral-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => handleNavigation('/reservations')}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <HiCalendar className="mr-3 h-5 w-5 text-neutral-400" />
                      My Reservations
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <HiLogout className="mr-3 h-5 w-5 text-neutral-400" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2 px-4">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <Logo className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <HiX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-6 py-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left text-base font-medium ${
                    location.pathname === item.path 
                      ? 'text-primary-700' 
                      : 'text-neutral-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {isAuthenticated && (
                <button
                  onClick={() => handleNavigation('/reservations')}
                  className={`block w-full text-left text-base font-medium ${
                    location.pathname === '/reservations' 
                      ? 'text-primary-700' 
                      : 'text-neutral-700'
                  }`}
                >
                  My Reservations
                </button>
              )}
            </div>
            
            <div className="border-t border-neutral-200 py-6">
              {isAuthenticated ? (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                      <HiUser className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-neutral-800">{user?.name}</p>
                      <p className="text-sm text-neutral-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center text-base font-medium text-neutral-700"
                  >
                    <HiLogout className="mr-3 h-5 w-5 text-neutral-400" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="btn-outline w-full"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleNavigation('/signup')}
                    className="btn-primary w-full"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header