import { Zap, Info, History } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import PaymentModal, { PackageData } from './PaymentModal'
import PackageCard from './PackageCard'
import ErrorModal from './ErrorModal'
import { OPERATOR_PREFIXES } from '../data/operatorPrefixes'
import { OPERATOR_COLORS, DEFAULT_OPERATOR_COLOR } from '../data/operatorColors'
import { useUser } from '../contexts/UserContext'

export default function Hero() {
  const { user, openLoginModal } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [operator, setOperator] = useState('')
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null,
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const { data: allPackages = [], isLoading: isPackagesLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/packages')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    },
  })

  // Fetch logged in user's transactions
  const { data: userTransactions = [] } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3001/transactions?userId=${user.id}`,
      )
      if (!response.ok) throw new Error('Failed to fetch transactions')
      return response.json()
    },
    enabled: !!user?.id,
  })

  // Calculate unique, valid previous phone numbers from transactions
  const autocompleteOptions: string[] = Array.from(
    new Set(
      userTransactions
        .map((tx: any) => tx.phone)
        .filter((phone?: string) => !!phone),
    ),
  )

  const filteredOptions = autocompleteOptions.filter((option) =>
    option.startsWith(phoneNumber),
  )

  const getOperatorForPrefix = (phone: string) => {
    if (phone.length >= 4) {
      const prefix = phone.substring(0, 4)
      for (const [op, prefixes] of Object.entries(OPERATOR_PREFIXES)) {
        if (prefixes.includes(prefix)) {
          return op
        }
      }
    }
    return ''
  }

  const handleSelectOption = (option: string) => {
    setPhoneNumber(option)
    setShowDropdown(false)

    const foundOperator = getOperatorForPrefix(option)
    setOperator(foundOperator)
  }

  const filteredPackages = allPackages.filter(
    (pkg: any) =>
      operator && pkg.provider.toLowerCase() === operator.toLowerCase(),
  )

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 13) {
      setPhoneNumber(value)

      const foundOperator = getOperatorForPrefix(value)
      setOperator(foundOperator)
    }
  }

  const handleBuy = (pkg: any) => {
    if (!user) {
      openLoginModal()
      return
    }

    if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 13 || !operator) {
      setErrorMsg('Mohon masukkan nomor telepon yang valid (10-13 digit) dengan provider yang sesuai.')
      setIsErrorModalOpen(true)
      return
    }

    setSelectedPackage({
      data: pkg.data,
      validity: pkg.validity,
      priceStr: pkg.price,
      network: pkg.features?.[0] || 'High Speed',
    })
    setIsModalOpen(true)
  }

  return (
    <div className='relative pt-10 pb-16 md:pb-48 px-4 flex flex-col items-center w-full'>
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 w-full xl:w-2/3 h-120 -z-10 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0, 103, 128, 0.48) 0%, rgba(0, 103, 128, 0) 70%)',
        }}
      />
      <div
        className='absolute bottom-20 left-0 w-1/2 xl:w-2/3 h-120 -z-10 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.45) 0%, rgba(139, 92, 246, 0) 50%)',
        }}
      />
      <div
        className='absolute bottom-10 right-0 w-1/2 xl:w-2/3 h-120 -z-10 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(238, 133, 0, 0.54) 0%, rgba(238, 133, 0, 0) 60%)',
        }}
      />

      <div className='text-center mb-8 max-w-2xl px-4'>
        <h1 className='text-4xl md:text-5xl font-bold text-brand-primary mb-3 md:mb-4 tracking-tight drop-shadow-sm'>
          Mau Top Up Berapa?
        </h1>
        <p className='text-gray-600 font-medium'>
          Masukkan nomor teleponmu untuk melihat paket terbaik yang tersedia.
        </p>
      </div>

      {/* Input Card */}
      <div className='w-full max-w-2xl bg-white rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 z-10 mb-6 md:mb-10'>
        <div className='space-y-3.5'>
          <div className='flex items-center justify-between'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
              Nomor Telepon
            </label>
          </div>
          <div className='relative group'>
            <input
              type='text'
              placeholder='Contoh: 081234567890'
              value={phoneNumber}
              onChange={handlePhoneChange}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className={`w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary/20 focus:bg-white text-lg md:text-xl font-bold text-gray-900 transition-all placeholder:text-gray-300 placeholder:font-medium ${
                operator ? 'pr-28' : 'pr-10'
              }`}
              autoFocus
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2'>
              {operator ? (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border animate-in fade-in zoom-in slide-in-from-right-2 duration-300 ${
                    OPERATOR_COLORS[operator.toLowerCase()] ||
                    DEFAULT_OPERATOR_COLOR
                  }`}
                >
                  {operator}
                </span>
              ) : (
                <div className='text-gray-300 group-focus-within:text-brand-primary transition-colors'>
                  <Zap className='w-5 h-5' />
                </div>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && filteredOptions.length > 0 && (
              <div className='absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-20 max-h-60 overflow-y-auto divide-y divide-gray-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                <div className='px-4 py-2 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
                  Nomor Pernah Digunakan
                </div>
                {filteredOptions.map((option) => {
                  const opPreview = getOperatorForPrefix(option)
                  return (
                    <button
                      key={option}
                      type='button'
                      onMouseDown={() => handleSelectOption(option)}
                      className='w-full px-4 py-3 text-left hover:bg-brand-surface-light flex items-center justify-between transition-colors group/item cursor-pointer'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-primary group-hover/item:bg-white transition-colors shrink-0'>
                          <History className='w-4 h-4' />
                        </div>
                        <span className='font-bold text-gray-900 text-sm md:text-base tracking-wide'>
                          {option}
                        </span>
                      </div>
                      {opPreview && (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border uppercase tracking-wider ${
                            OPERATOR_COLORS[opPreview.toLowerCase()] ||
                            DEFAULT_OPERATOR_COLOR
                          }`}
                        >
                          {opPreview}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className='flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 font-medium px-1'>
            <Info className='size-3' />
            <p>Provider akan dideteksi otomatis berdasarkan 4 digit pertama</p>
          </div>
        </div>
      </div>

      {/* Dynamic Package List */}
      <div className='w-full max-w-2xl mx-auto'>
        {!operator ? (
          <div className='flex flex-col items-center justify-center py-12 grayscale'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <Zap className='w-10 h-10 text-gray-300' />
            </div>
            <p className='text-brand-secondary font-medium'>
              Belum ada provider terdeteksi
            </p>
          </div>
        ) : isPackagesLoading ? (
          <div className='flex flex-col gap-4 animate-pulse'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-24 bg-gray-100/80 rounded-2xl border border-gray-100'
              ></div>
            ))}
          </div>
        ) : (
          <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='flex items-center justify-between px-2'>
              <h2 className='text-xl md:text-2xl font-bold text-gray-900 tracking-tight'>
                Pilih Paket {operator}
              </h2>
              <span className='text-sm text-gray-500 font-medium'>
                {filteredPackages.length} paket ditemukan
              </span>
            </div>

            {filteredPackages.length > 0 ? (
              <div className='flex flex-col gap-4'>
                {filteredPackages.map((pkg: any) => (
                  <PackageCard key={pkg.id} pkg={pkg} onBuy={handleBuy} />
                ))}
              </div>
            ) : (
              <div className='bg-white rounded-2xl max-w-2xl p-12 text-center border-2 border-dashed border-gray-100'>
                <p className='text-gray-500 font-medium'>
                  Maaf, tidak ada paket tersedia untuk provider ini saat ini.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageData={selectedPackage}
        initialPhoneNumber={phoneNumber}
      />
      
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMsg}
      />
    </div>
  )
}
