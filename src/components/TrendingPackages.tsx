import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import PaymentModal, { PackageData } from './PaymentModal'

import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

export default function TrendingPackages() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null,
  )

  const {
    data: packages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['packages', 'recommended'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3001/packages?recommended=true',
      )
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    },
  })

  const handleBuy = (pkg: any) => {
    setSelectedPackage({
      data: pkg.data,
      validity: pkg.validity,
      priceStr: pkg.price,
      network: pkg.features?.[0] || 'High Speed',
    })
    setIsModalOpen(true)
  }

  if (isLoading)
    return (
      <div className='py-20 text-center text-gray-500 font-medium'>
        Memuat rekomendasi paket...
      </div>
    )
  if (error)
    return (
      <div className='py-20 text-center text-red-500 font-medium'>
        Gagal memuat paket.
      </div>
    )

  return (
    <div className='flex flex-col gap-16'>
      {/* Trending Packages Section */}
      <div>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2 tracking-tight'>
              Rekomendasi Paket
            </h2>
            <p className='text-gray-600'>
              Paket data rekomendasi untuk gaya hidupmu.
            </p>
          </div>
          <NavLink
            to='/packages'
            className='flex items-center gap-1 text-brand-primary font-semibold hover:text-[#00556b] transition-colors group'
          >
            Lihat Semua{' '}
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </NavLink>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 relative group'
            >
              {pkg.badge && (
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${pkg.badgeColor}`}
                >
                  {pkg.badge}
                </div>
              )}

              <div className={`text-sm font-bold ${pkg.providerColor} mb-2`}>
                {pkg.provider}
              </div>
              <div className='text-5xl font-extrabold text-brand-primary mb-1 tracking-tight'>
                {pkg.data}
              </div>
              <div className='text-sm text-gray-500 mb-8'>{pkg.validity}</div>

              <div className='flex-1 space-y-4 mb-8'>
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className='flex items-center gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-green-500 shrink-0' />
                    <span className='text-gray-700 text-sm font-medium'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className='w-full h-px bg-gray-100 mb-6'></div>

              <div className='flex items-end justify-between mt-auto'>
                <div>
                  {pkg.oldPrice && (
                    <div className='text-xs text-gray-400 line-through mb-1'>
                      {pkg.oldPrice}
                    </div>
                  )}
                  <div className='text-2xl font-bold text-gray-900'>
                    {pkg.price}
                  </div>
                </div>
                <button
                  onClick={() => handleBuy(pkg)}
                  className='bg-brand-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#00556b] transition-colors shadow-sm active:scale-[0.98]'
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
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
