import { X, Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, useEffect, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useUser } from '../contexts/UserContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const { login, openLoginModal } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Check if email already exists
      const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`)
      const existingUsers = await checkResponse.json()

      if (existingUsers.length > 0) {
        setError('Email sudah terdaftar')
        setIsLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        username,
        email,
        password,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      }

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const savedUser = await response.json()
        login(savedUser)
        // Reset form
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        onClose()
      } else {
        setError('Gagal mendaftar. Silakan coba lagi.')
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan backend mockup sedang berjalan.')
      console.error('Signup error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='signup-modal-overlay'
          className='fixed inset-0 z-100'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={onClose}
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          />
          <motion.div
            initial={{ scale: 0.95, y: 20, x: '-50%' }}
            animate={{ scale: 1, y: '-50%', x: '-50%' }}
            exit={{ scale: 0.95, y: -20, x: '-50%' }}
            className='fixed left-1/2 top-1/2 w-[90%] max-w-112.5 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col origin-center z-101'
          >
            <div className='p-6 md:p-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-[20px] font-bold text-gray-900 tracking-tight'>
                  Daftar Akun Baru
                </h2>
                <button
                  onClick={onClose}
                  className='text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                {error && (
                  <div className='p-3 text-xs font-bold text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1'>
                    {error}
                  </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold text-gray-700 uppercase tracking-wider'>
                      Nama Lengkap
                    </label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='John Doe'
                      required
                      className='w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 text-sm transition-colors'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold text-gray-700 uppercase tracking-wider'>
                      Username
                    </label>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='johndoe'
                      required
                      className='w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 text-sm transition-colors'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-700 uppercase tracking-wider'>
                    Alamat Email
                  </label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@example.com'
                    required
                    className='w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 text-sm transition-colors'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-700 uppercase tracking-wider'>
                    Kata Sandi
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='••••••••'
                      required
                      className='w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 text-sm transition-colors tracking-widest placeholder:tracking-widest'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 cursor-pointer'
                    >
                      {showPassword ? (
                        <EyeOff className='w-4 h-4' />
                      ) : (
                        <Eye className='w-4 h-4' />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-brand-primary text-white py-3.5 rounded-lg font-bold hover:bg-[#00556b] transition-colors shadow-sm mt-2 mb-2 inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer'
                >
                  {isLoading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Sedang Mendaftar...
                    </>
                  ) : (
                    'Daftar Sekarang'
                  )}
                </button>
              </form>

              <div className='h-px bg-gray-100 my-6'></div>

              <p className='text-xs text-center text-gray-500 font-medium'>
                Sudah punya akun?{' '}
                <button
                  onClick={openLoginModal}
                  className='font-bold text-brand-primary hover:underline cursor-pointer'
                >
                  Masuk
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
