import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MOCK_USERS = [
  { id: 1, email: 'user@example.com', password: 'password', name: 'John Doe' }
]

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuthState = useCallback(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      )
      
      if (foundUser) {
        const authUser = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name
        }
        
        setUser(authUser)
        localStorage.setItem('user', JSON.stringify(authUser))
        toast.success('Successfully logged in!')
        navigate('/restaurants')
        return true
      } else {
        toast.error('Invalid email or password')
        return false
      }
    } catch (error) {
      console.error('Login error', error)
      toast.error('Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const signup = useCallback(async (name, email, password) => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error('Email already in use')
        return false
      }
      
      const newUser = {
        id: MOCK_USERS.length + 1,
        email,
        password,
        name
      }
      
      MOCK_USERS.push(newUser)
      
      const authUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
      
      setUser(authUser)
      localStorage.setItem('user', JSON.stringify(authUser))
      toast.success('Account created successfully!')
      navigate('/restaurants')
      return true
    } catch (error) {
      console.error('Signup error', error)
      toast.error('Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('You have been logged out')
    navigate('/')
  }, [navigate])

  const value = {
    user,
    loading,
    checkAuthState,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}