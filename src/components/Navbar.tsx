import { Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import LoginModal from './LoginModal'
import { useUser } from '../contexts/UserContext'

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { user, logout } = useUser()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
          <Link
            to='/'
            className='text-2xl font-bold text-brand-primary tracking-tight'
          >
            TopUpPedia
          </Link>
          {/* <div className='hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600'>
            <NavLink
              to='/packages'
              className={({ isActive }) =>
                isActive
                  ? 'text-brand-primary border-b-2 border-brand-primary py-1'
                  : 'hover:text-brand-primary transition-colors py-1 border-b-2 border-transparent'
              }
            >
              Semua Paket
            </NavLink>
          </div> */}
        </div>

        <div className='flex items-center gap-4 sm:gap-6'>
          {/* <div className='relative hidden md:block'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Cari paket...'
              className='pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-shadow'
            />
          </div> */}
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className='text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider'
              >
                Keluar
              </button>
              <Link
                to='/account'
                className='w-10 h-10 rounded-full overflow-hidden border-2 border-[#00aed6] p-0.5 bg-white flex-shrink-0 cursor-pointer ml-2 relative group'
              >
                <img
                  src={
                    user.avatar ||
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop'
                  }
                  alt={user.name}
                  className='w-full h-full rounded-full object-cover'
                />
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginOpen(true)}
                className='bg-brand-primary text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-[#00556b] transition-colors shadow-sm whitespace-nowrap'
              >
                Masuk
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  )
}
