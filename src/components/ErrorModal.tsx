import { X, AlertCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
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

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='error-modal-overlay'
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
            className='fixed left-1/2 top-1/2 w-[90%] max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col origin-center z-101'
          >
            <div className='bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between'>
              <h2 className='text-[17px] font-bold text-red-700 tracking-tight'>
                Peringatan
              </h2>
              <button
                onClick={onClose}
                className='text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='p-6 flex flex-col items-center text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500'>
                <AlertCircle className='w-8 h-8' />
              </div>
              <p className='text-sm text-gray-600 mb-6'>
                {message}
              </p>
              <button
                onClick={onClose}
                className='w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors shadow-sm cursor-pointer'
              >
                Mengerti
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
