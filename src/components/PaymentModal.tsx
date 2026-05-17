import { useState, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import { useUser } from '../contexts/UserContext'

export interface PackageData {
  data: string
  validity: string
  priceStr: string
  network?: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  packageData: PackageData | null
  initialPhoneNumber?: string
}

type PaymentStep =
  | 'summary'
  | 'verification'
  | 'processing'
  | 'success'
  | 'error'

const VERIFICATION_CODE = 'TOPUP123'

export default function PaymentModal({
  isOpen,
  onClose,
  packageData,
  initialPhoneNumber = '',
}: PaymentModalProps) {
  const { user } = useUser()
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
  const [step, setStep] = useState<PaymentStep>('summary')
  const [inputCode, setInputCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setPhoneNumber(initialPhoneNumber)
      setStep('summary')
      setInputCode('')
      setErrorMsg('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [initialPhoneNumber, isOpen])

  const defaultSubtotal = 129000
  const subtotal = packageData
    ? parseInt(packageData.priceStr.replace(/[^0-9]/g, ''), 10)
    : defaultSubtotal

  const serviceFee = 1000
  const total = subtotal + serviceFee

  const formatPrice = (price: number) =>
    `Rp ${price.toLocaleString('id-ID').replace(/,/g, '.')}`

  const handleProcessPayment = async () => {
    setStep('processing')
    try {
      const newTransaction = {
        id: Date.now().toString(),
        userId: user?.id || 'guest',
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        title: packageData?.data || 'Paket Data',
        desc: `${packageData?.validity || '30 Hari'} - ${phoneNumber}`,
        amount: formatPrice(total),
        status: 'Success',
        phone: phoneNumber,
      }

      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      })

      if (response.ok) {
        setStep('success')
      } else {
        throw new Error('Failed to save transaction')
      }
    } catch (err) {
      console.error('Payment error:', err)
      setErrorMsg('Terjadi kesalahan saat memproses transaksi.')
      setStep('error')
    }
  }

  const handleVerify = () => {
    if (inputCode.toUpperCase() === VERIFICATION_CODE) {
      handleProcessPayment()
    } else {
      setErrorMsg('Kode verifikasi tidak valid. Silakan coba lagi.')
    }
  }

  if (typeof document === 'undefined') return null

  const renderContent = () => {
    switch (step) {
      case 'summary':
        return (
          <div className='p-6'>
            <div className='mb-6'>
              <h3 className='text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase'>
                Ringkasan Pesanan
              </h3>
              <div className='bg-brand-surface-light rounded-xl p-4 space-y-3'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-500'>Nomor Telepon</span>
                  {initialPhoneNumber ? (
                    <span className='font-semibold text-gray-900 tracking-wide'>
                      {initialPhoneNumber}
                    </span>
                  ) : (
                    <input
                      type='text'
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, ''))
                      }
                      placeholder='08xx-xxxx-xxxx'
                      className='bg-transparent border-b border-brand-primary/30 focus:border-brand-primary outline-none text-right font-semibold text-gray-900 w-36 transition-colors placeholder:text-gray-400 placeholder:font-normal'
                      autoFocus
                    />
                  )}
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-500'>Paket</span>
                  <span className='font-semibold text-gray-900'>
                    {packageData?.data || '100GB'}{' '}
                    <span className='font-normal text-gray-600'>
                      (
                      {(packageData?.validity || '30 Hari')
                        .replace(' Validity', '')
                        .replace(' Days', ' Hari')}
                      )
                    </span>
                  </span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-500'>Jaringan</span>
                  <span className='font-semibold text-brand-primary'>
                    {packageData?.network || '5G Ultra Speed'}
                  </span>
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase'>
                Detail Pembayaran
              </h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>Subtotal</span>
                  <span className='text-gray-900 font-medium'>
                    {packageData?.priceStr || formatPrice(defaultSubtotal)}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>Biaya Layanan</span>
                  <span className='text-gray-900 font-medium'>
                    {formatPrice(serviceFee)}
                  </span>
                </div>
              </div>
              <div className='h-px bg-gray-200 my-4'></div>
              <div className='flex justify-between items-center'>
                <span className='font-bold text-gray-900 text-base'>
                  Total Pembayaran
                </span>
                <span className='text-lg font-bold text-brand-primary'>
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep('verification')}
              disabled={!phoneNumber}
              className='w-full bg-brand-primary text-white py-3.5 rounded-lg font-bold hover:bg-[#00556b] transition-colors shadow-sm mb-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              Bayar Sekarang
            </button>

            <p className='text-[10px] text-center text-gray-400 font-medium'>
              Dengan mengklik Bayar Sekarang, kamu menyetujui Syarat dan
              Ketentuan kami.
            </p>
          </div>
        )

      case 'verification':
        return (
          <div className='p-6 flex flex-col items-center text-center'>
            <div className='w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6'>
              <Loader2 className='w-8 h-8 text-brand-primary animate-spin' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              Verifikasi Keamanan
            </h3>
            <p className='text-sm text-gray-500 mb-8'>
              Untuk alasan keamanan, masukkan kode verifikasi berikut:
              <br />
              <span className='font-bold text-brand-primary select-all'>
                {VERIFICATION_CODE}
              </span>
            </p>

            <div className='w-full space-y-4 mb-8'>
              <div className='relative'>
                <input
                  type='text'
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value)
                    setErrorMsg('')
                  }}
                  placeholder='Masukkan kode di atas'
                  className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl text-center font-bold tracking-[0.2em] focus:outline-none transition-all ${
                    errorMsg
                      ? 'border-red-500 focus:ring-red-100'
                      : 'border-gray-100 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10'
                  }`}
                  autoFocus
                />
              </div>
              {errorMsg && (
                <div className='flex items-center justify-center gap-2 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-1'>
                  <AlertCircle className='w-4 h-4' />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className='flex flex-col w-full gap-3'>
              <button
                onClick={handleVerify}
                disabled={!inputCode}
                className='w-full bg-brand-primary text-white py-3.5 rounded-lg font-bold hover:bg-[#00556b] transition-colors shadow-sm disabled:opacity-50 cursor-pointer'
              >
                Verifikasi & Bayar
              </button>
              <button
                onClick={() => setStep('summary')}
                className='text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors py-2 cursor-pointer'
              >
                Kembali ke Ringkasan
              </button>
            </div>
          </div>
        )

      case 'processing':
        return (
          <div className='p-12 flex flex-col items-center text-center'>
            <div className='w-20 h-20 border-4 border-gray-100 border-t-brand-primary rounded-full animate-spin mb-8'></div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              Memproses Pembayaran
            </h3>
            <p className='text-sm text-gray-500'>
              Mohon tunggu sebentar, kami sedang memproses pesananmu...
            </p>
          </div>
        )

      case 'success':
        return (
          <div className='p-8 flex flex-col items-center text-center'>
            <div className='w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 animate-in zoom-in duration-500'>
              <CheckCircle2 className='w-12 h-12' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>
              Pembayaran Berhasil!
            </h3>
            <p className='text-gray-500 mb-8 max-w-70'>
              Paket data {packageData?.data} telah berhasil dikirim ke nomor{' '}
              <span className='font-bold text-gray-900'>{phoneNumber}</span>.
            </p>

            <div className='w-full bg-gray-50 rounded-2xl p-4 mb-8 space-y-2'>
              <div className='flex justify-between text-xs text-gray-500'>
                <span>ID Transaksi</span>
                <span className='font-medium text-gray-900'>
                  #TX-{Date.now().toString().slice(-8)}
                </span>
              </div>
              <div className='flex justify-between text-xs text-gray-500'>
                <span>Metode Pembayaran</span>
                <span className='font-medium text-gray-900'>
                  Dompet Digital
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className='w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98] cursor-pointer'
            >
              Selesai
            </button>
          </div>
        )

      case 'error':
        return (
          <div className='p-8 flex flex-col items-center text-center'>
            <div className='w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500'>
              <AlertCircle className='w-12 h-12' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              Gagal Memproses
            </h3>
            <p className='text-sm text-gray-500 mb-8'>{errorMsg}</p>
            <button
              onClick={() => setStep('summary')}
              className='w-full bg-brand-primary text-white py-3.5 rounded-lg font-bold hover:bg-[#00556b] transition-colors shadow-sm cursor-pointer'
            >
              Coba Lagi
            </button>
          </div>
        )
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='payment-modal-overlay'
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
            className='fixed left-1/2 top-1/2 w-[90%] max-w-100 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col origin-center z-101'
          >
            {/* Header - Only show for summary and verification steps */}
            {(step === 'summary' || step === 'verification') && (
              <div className='bg-brand-surface px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
                <h2 className='text-[17px] font-bold text-gray-900 tracking-tight'>
                  {step === 'summary'
                    ? 'Verifikasi Pembayaran'
                    : 'Langkah Terakhir'}
                </h2>
                <button
                  onClick={onClose}
                  className='text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
            )}

            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
