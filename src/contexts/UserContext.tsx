import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  username: string
  email: string
  name: string
  role: string
  avatar: string
}

interface UserContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  isSignupModalOpen: boolean
  openSignupModal: () => void
  closeSignupModal: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const openLoginModal = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const openSignupModal = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }
  const closeSignupModal = () => setIsSignupModalOpen(false)

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isSignupModalOpen,
        openSignupModal,
        closeSignupModal,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
