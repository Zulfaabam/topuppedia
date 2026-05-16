import { Zap, ChevronDown } from 'lucide-react'
import { useState, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import PaymentModal, { PackageData } from './PaymentModal'
import { OPERATOR_PREFIXES } from '../data/operatorPrefixes'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [operator, setOperator] = useState('')
  const [selectedPackageId, setSelectedPackageId] = useState('')
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

        if (foundOperator !== operator) {
          setOperator(foundOperator)
          setSelectedPackageId('')
        }
      } else {
        setOperator('')
        setSelectedPackageId('')
      }
    }
  }

  const handleQuickTopUp = () => {
    const pkg = filteredPackages.find((p: any) => p.id === selectedPackageId)
    if (!pkg) return

    setSelectedPackage({
      data: pkg.data,
      validity: pkg.validity,
      priceStr: pkg.price,
      network: pkg.features?.[0] || 'High Speed',
    })
    setIsModalOpen(true)
  }

  return (
    <div className='relative pt-24 pb-48 px-4 flex flex-col items-center'>
      <div className='absolute inset-0 -z-10 overflow-hidden bg-brand-surface-light'>
        <img
          src='/hero-topuppedia.png'
          alt='Abstract wavy background'
          className='absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply'
          referrerPolicy='no-referrer'
        />
        <div className='absolute inset-0 bg-linear-to-t from-brand-surface via-transparent to-white/30'></div>
      </div>

      <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-12 text-center tracking-tight drop-shadow-sm'>
        Mau Top Up Apa?
      </h1>

      {/* Quick Top-up Card */}
      <div className='w-full max-w-4xl bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 z-10'>
        <div className='flex items-center gap-2 mb-6'>
          <Zap className='w-5 h-5 text-brand-primary fill-brand-primary' />
          <h2 className='text-lg font-semibold text-gray-900'>Top-up Cepat</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[1fr_1.5fr_auto] gap-4 items-end'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Nomor Telepon
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='0812-XXXX-XXXX'
                value={phoneNumber}
                onChange={handlePhoneChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 transition-all font-medium'
              />
              <span className='absolute right-4 top-1/2 -translate-y-1/2 font-bold text-brand-primary text-sm pr-1 transition-all duration-300'>
                {operator || '...'}
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Pilih Paket
            </label>
            <div className='relative group'>
              <select
                className='w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors appearance-none cursor-pointer relative z-10 disabled:bg-gray-50 disabled:cursor-not-allowed'
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                disabled={!operator || isPackagesLoading}
              >
                <option value='' disabled>
                  {!operator
                    ? 'Pilih operator dulu'
                    : isPackagesLoading
                      ? 'Memuat paket...'
                      : filteredPackages.length === 0
                        ? 'Paket tidak tersedia'
                        : 'Pilih Paket'}
                </option>
                {filteredPackages.map((pkg: any) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.data} - {pkg.price}
                  </option>
                ))}
              </select>
              <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20'>
                <ChevronDown className='w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors' />
              </div>
            </div>
          </div>

          <button
            onClick={handleQuickTopUp}
            disabled={!selectedPackageId}
            className='bg-brand-primary text-white h-12.5 px-8 rounded-lg font-medium hover:bg-[#00556b] transition-colors w-full md:w-auto shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary'
          >
            Beli Paket
          </button>
        </div>

        <div className='mt-6 text-xs text-gray-500 flex items-center justify-center md:justify-start'>
          <p>Top Up Murah, Cepat, dan Terpercaya</p>
        </div>
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
