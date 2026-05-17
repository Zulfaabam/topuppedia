import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import { useUser } from '../contexts/UserContext'

export default function Navbar() {
  const {
    user,
    logout,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isSignupModalOpen,
    closeSignupModal,
  } = useUser()

  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    if (location.pathname === '/account') {
      navigate('/')
    }
  }

  return (
    <nav className='bg-transparent backdrop-blur-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
          <Link
            to='/'
            className='text-2xl font-bold text-brand-primary tracking-tight'
          >
            TopUpPedia
          </Link>
        </div>

        <div className='flex items-center gap-4 sm:gap-6'>
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
                className='w-10 h-10 rounded-full overflow-hidden border-2 border-[#00aed6] p-0.5 bg-white shrink-0 cursor-pointer ml-2 relative group'
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
                onClick={openLoginModal}
                className='bg-brand-primary text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-[#00556b] transition-colors shadow-sm whitespace-nowrap'
              >
                Masuk
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </nav>
  )
}
