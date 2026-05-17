import { Zap, CheckCircle2 } from 'lucide-react'

export interface PackageData {
  id: string | number
  data: string
  validity: string
  features?: string[]
  oldPrice?: string
  price: string
  badge?: string
  badgeColor?: string
}

interface PackageCardProps {
  key?: string | number | null
  pkg: PackageData
  onBuy: (pkg: PackageData) => void
}

export default function PackageCard({ pkg, onBuy }: PackageCardProps) {
  return (
    <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-brand-primary/30 hover:shadow-[0_10px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group relative w-full max-w-2xl mx-auto'>
      
      {/* Left Column: Data & Validity */}
      <div className='flex items-center gap-4 shrink-0 sm:w-[30%]'>
        <div className='w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-105 transition-transform duration-300'>
          <Zap className='w-5 h-5 fill-brand-primary/10' />
        </div>
        <div>
          <div className='text-2xl font-black text-brand-primary tracking-tight leading-tight'>
            {pkg.data}
          </div>
          <div className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5'>
            {pkg.validity}
          </div>
        </div>
      </div>

      {/* Middle Column: Features List */}
      <div className='flex-1 flex flex-col gap-1.5 sm:px-4 sm:border-l border-gray-100 min-w-0'>
        {(pkg.features || []).slice(0, 3).map((feature, fIdx) => (
          <div key={fIdx} className='flex items-center gap-2 text-gray-600 text-xs font-medium truncate'>
            <CheckCircle2 className='w-3.5 h-3.5 text-green-500 shrink-0' />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Right Column: Price & Action */}
      <div className='flex items-center justify-between sm:justify-end gap-5 shrink-0 sm:pl-5 sm:border-l border-gray-100 sm:w-[35%]'>
        <div className='text-left sm:text-right'>
          {pkg.oldPrice && (
            <div className='text-[10px] text-red-500 line-through font-bold mb-0.5 leading-none'>
              {pkg.oldPrice}
            </div>
          )}
          <div className='text-lg font-extrabold text-gray-900 leading-none'>
            {pkg.price}
          </div>
        </div>
        <button
          onClick={() => onBuy(pkg)}
          className='bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#00556b] transition-all shadow-sm active:scale-[0.98] cursor-pointer text-sm shrink-0'
        >
          Beli
        </button>
      </div>

      {/* Ribbon Badge */}
      {pkg.badge && (
        <div
          className={`absolute top-0 left-6 -translate-y-1/2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-md z-20 ${pkg.badgeColor}`}
        >
          {pkg.badge}
        </div>
      )}
    </div>
  )
}
