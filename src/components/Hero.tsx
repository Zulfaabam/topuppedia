import { Zap, Info } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import PaymentModal, { PackageData } from './PaymentModal'
import PackageCard from './PackageCard'
import { OPERATOR_PREFIXES } from '../data/operatorPrefixes'
import { OPERATOR_COLORS, DEFAULT_OPERATOR_COLOR } from '../data/operatorColors'
import { useUser } from '../contexts/UserContext'

export default function Hero() {
  const { user, openLoginModal } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [operator, setOperator] = useState('')
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null,
  )

  const { data: allPackages = [], isLoading: isPackagesLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/packages')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    },
  })

  const filteredPackages = allPackages.filter(
    (pkg: any) =>
      operator && pkg.provider.toLowerCase() === operator.toLowerCase(),
  )

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 13) {
      setPhoneNumber(value)

      if (value.length >= 4) {
        const prefix = value.substring(0, 4)
        let foundOperator = ''

        for (const [op, prefixes] of Object.entries(OPERATOR_PREFIXES)) {
          if (prefixes.includes(prefix)) {
            foundOperator = op
            break
          }
        }
        setOperator(foundOperator)
      } else {
        setOperator('')
      }
    }
  }

  const handleBuy = (pkg: any) => {
    if (!user) {
      openLoginModal()
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
              <div className='bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100'>
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
    </div>
  )
}
