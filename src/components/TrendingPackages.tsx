import {
  LayoutGrid,
  Smartphone,
  Zap,
  Monitor,
  PawPrint,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useState } from 'react'
import PaymentModal, { PackageData } from './PaymentModal'

const categories = [
  { icon: LayoutGrid, label: 'Kategori', active: true },
  { icon: Smartphone, label: 'Handphone & Tablet' },
  { icon: Zap, label: 'Top-Up & Tagihan' },
  { icon: Monitor, label: 'Elektronik' },
  { icon: PawPrint, label: 'Perawatan Hewan' },
]

const packages = [
  {
    provider: 'Telkomsel',
    providerColor: 'text-green-600',
    data: '100GB',
    validity: '30 Days Validity',
    features: [
      '5G Ultra Speed',
      'Free Disney+ Hotstar',
      'Unlimited Discovery Max',
    ],
    oldPrice: 'Rp 150.000',
    price: 'Rp 129.000',
    badge: 'Best Seller',
    badgeColor: 'bg-brand-tertiary text-white',
  },
  {
    provider: 'XL Axiata',
    providerColor: 'text-blue-600',
    data: '50GB',
    validity: '30 Days Validity',
    features: ['Unlimited YouTube', '60 Min All Operator', 'Xtra Combo VIP'],
    price: 'Rp 89.000',
    badge: 'New Promo',
    badgeColor: 'bg-[#88fc85] text-green-900',
  },
  {
    provider: 'IM3',
    providerColor: 'text-orange-500',
    data: '75GB',
    validity: '30 Days Validity',
    features: ['Safe Quota Guarantee', 'Data Rollover', 'Freedom Internet'],
    price: 'Rp 115.000',
  },
]

export default function TrendingPackages() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null,
  )

  const handleBuy = (pkg: any) => {
    setSelectedPackage({
      data: pkg.data,
      validity: pkg.validity,
      priceStr: pkg.price,
      network: pkg.features[0] || 'High Speed',
    })
    setIsModalOpen(true)
  }

  return (
    <div className='flex flex-col gap-16'>
      {/* Trending Packages Section */}
      <div>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2 tracking-tight'>
              Trending Packages
            </h2>
            <p className='text-gray-600'>
              Recommended high-speed data plans for your lifestyle.
            </p>
          </div>
          <a
            href='#'
            className='flex items-center gap-1 text-brand-primary font-semibold hover:text-[#00556b] transition-colors group'
          >
            View All{' '}
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </a>
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
                    <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0' />
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
                  Buy Now
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
