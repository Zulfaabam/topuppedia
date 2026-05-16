import { Zap, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import PaymentModal, { PackageData } from './PaymentModal'
import { quickTopUpPackages } from '../data/packageOptions'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null,
  )

  const handleQuickTopUp = () => {
    setSelectedPackage({
      data: '100GB',
      validity: '30 Days',
      priceStr: 'Rp 129.000',
      network: '5G Ultra Speed',
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
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 transition-all font-medium'
                defaultValue='0812-XXXX-XXXX'
              />
              <span className='absolute right-4 top-1/2 -translate-y-1/2 font-bold text-brand-primary text-sm pr-1'>
                IM3
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Pilih Paket
            </label>
            <div className='relative group'>
              <select
                className='w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors appearance-none cursor-pointer relative z-10'
                defaultValue=''
              >
                {quickTopUpPackages.map((pkg) => (
                  <option
                    key={pkg.value}
                    value={pkg.value}
                    disabled={pkg.disabled}
                  >
                    {pkg.label}
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
            className='bg-brand-primary text-white h-12.5 px-8 rounded-lg font-medium hover:bg-[#00556b] transition-colors w-full md:w-auto shadow-sm active:scale-[0.98]'
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
      />
    </div>
  )
}
