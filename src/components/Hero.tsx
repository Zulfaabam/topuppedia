import { Zap, CheckCircle2, Info } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import PaymentModal, { PackageData } from './PaymentModal'
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
    <div className='relative pt-24 pb-48 px-4 flex flex-col items-center w-full'>
      <div className='absolute inset-0 -z-10 overflow-hidden bg-brand-surface-light'>
        <img
          src='/hero-topuppedia.png'
          alt='Abstract wavy background'
          className='absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply'
          referrerPolicy='no-referrer'
        />
        <div className='absolute inset-0 bg-linear-to-t from-brand-surface via-transparent to-white/30'></div>
      </div>

      <div className='text-center mb-12 max-w-2xl px-4'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-6 tracking-tight drop-shadow-sm'>
          Mau Top Up Berapa?
        </h1>
        <p className='text-gray-600 font-medium'>
          Masukkan nomor teleponmu untuk melihat paket terbaik yang tersedia.
        </p>
      </div>

      {/* Input Card */}
      <div className='w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 z-10 mb-12'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-bold text-gray-700 uppercase tracking-wider'>
              Nomor Telepon
            </label>
          </div>
          <div className='relative group'>
            <input
              type='text'
              placeholder='Contoh: 081234567890'
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary/20 focus:bg-white text-xl md:text-2xl font-bold text-gray-900 transition-all placeholder:text-gray-300 placeholder:font-medium ${
                operator ? 'pr-32' : 'pr-12'
              }`}
              autoFocus
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2'>
              {operator ? (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border animate-in fade-in zoom-in slide-in-from-right-2 duration-300 ${
                    OPERATOR_COLORS[operator.toLowerCase()] ||
                    DEFAULT_OPERATOR_COLOR
                  }`}
                >
                  {operator}
                </span>
              ) : (
                <div className='text-gray-300 group-focus-within:text-brand-primary transition-colors'>
                  <Zap className='w-6 h-6' />
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2 text-[11px] text-gray-400 font-medium px-1'>
            <Info className='w-3 h-3' />
            <p>Provider akan dideteksi otomatis berdasarkan 4 digit pertama</p>
          </div>
        </div>
      </div>

      {/* Dynamic Package List */}
      <div className='w-full max-w-7xl mx-auto'>
        {!operator ? (
          <div className='flex flex-col items-center justify-center py-12 opacity-40 grayscale'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <Zap className='w-10 h-10 text-gray-300' />
            </div>
            <p className='text-gray-400 font-medium'>
              Belum ada provider terdeteksi
            </p>
          </div>
        ) : isPackagesLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-64 bg-gray-100 rounded-2xl border border-gray-100'
              ></div>
            ))}
          </div>
        ) : (
          <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='flex items-center justify-between px-2'>
              <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>
                Pilih Paket {operator}
              </h2>
              <span className='text-sm text-gray-500 font-medium'>
                {filteredPackages.length} paket ditemukan
              </span>
            </div>

            {filteredPackages.length > 0 ? (
              <div className='flex flex-col gap-4'>
                {filteredPackages.map((pkg: any) => (
                  <div
                    key={pkg.id}
                    className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-primary/30 hover:shadow-[0_10px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group relative'
                  >
                    <div className='flex items-center gap-6 md:w-1/4'>
                      <div className='w-16 h-16 bg-brand-primary/5 rounded-xl flex items-center justify-center shrink-0'>
                        <Zap className='w-8 h-8 text-brand-primary' />
                      </div>
                      <div>
                        <div className='text-3xl font-extrabold text-brand-primary tracking-tight'>
                          {pkg.data}
                        </div>
                        <div className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                          {pkg.validity}
                        </div>
                      </div>
                    </div>

                    <div className='flex-1 flex flex-wrap gap-x-6 gap-y-2 md:px-6 md:border-x border-gray-100'>
                      {(pkg.features || []).map(
                        (feature: any, fIdx: number) => (
                          <div key={fIdx} className='flex items-center gap-2'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 shrink-0' />
                            <span className='text-gray-600 text-sm font-medium'>
                              {feature}
                            </span>
                          </div>
                        ),
                      )}
                    </div>

                    <div className='flex items-center justify-between md:justify-end gap-6 md:w-1/4'>
                      <div className='text-right'>
                        {pkg.oldPrice && (
                          <div className='text-xs text-gray-400 line-through'>
                            {pkg.oldPrice}
                          </div>
                        )}
                        <div className='text-xl font-bold text-gray-900'>
                          {pkg.price}
                        </div>
                      </div>
                      <button
                        onClick={() => handleBuy(pkg)}
                        className='bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-[#00556b] transition-all shadow-sm active:scale-[0.98]'
                      >
                        Beli
                      </button>
                    </div>

                    {pkg.badge && (
                      <div
                        className={`absolute top-0 left-6 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md z-20 ${pkg.badgeColor}`}
                      >
                        {pkg.badge}
                      </div>
                    )}
                  </div>
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
