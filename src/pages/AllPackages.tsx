import { Search, ChevronDown, Filter, ArrowRight, CheckCircle2, ShoppingCart, Wallet, Banknote } from 'lucide-react';
import { useState } from 'react';
import PaymentModal, { PackageData } from '../components/PaymentModal';
import { operatorOptions, categoryOptions, priceRangeOptions } from '../data/filterOptions';

const bestSellers = [
  { 
    provider: 'Telkomsel', providerColor: 'text-green-600', 
    data: '100GB', validity: '30 Days Validity', 
    features: ['5G Ultra Speed', 'Free Disney+ Hotstar', 'Unlimited Discovery Max'], 
    oldPrice: 'Rp 150.000', price: 'Rp 129.000', 
    badge: 'Best Seller', badgeColor: 'bg-brand-tertiary text-white' 
  },
  { 
    provider: 'XL Axiata', providerColor: 'text-blue-600', 
    data: '50GB', validity: '30 Days Validity', 
    features: ['Unlimited YouTube', '60 Min All Operator', 'Xtra Combo VIP'], 
    price: 'Rp 89.000', 
  },
  { 
    provider: 'IM3', providerColor: 'text-orange-500', 
    data: '75GB', validity: '30 Days Validity', 
    features: ['Safe Quota Guarantee', 'Data Rollover', 'Freedom Internet'], 
    price: 'Rp 115.000' 
  },
];

const promos = [
  {
    provider: 'Booster', data: '15GB', validity: '7 Days Validity',
    bonusLabel: 'App Bonus', bonusValue: 'TikTok + IG',
    oldPrice: 'Rp 35.000', price: 'Rp 22.500',
    badge: 'New Promo', badgeColor: 'bg-[#88fc85] text-green-900',
    providerColor: 'text-blue-500'
  },
  {
    provider: 'Telkomsel', data: '25GB', validity: '15 Days Validity',
    bonusLabel: 'Extra Data', bonusValue: '5GB Night',
    oldPrice: 'Rp 65.000', price: 'Rp 48.000',
    providerColor: 'text-green-600'
  },
  {
    provider: 'XL', data: '10GB', validity: '3 Days Validity',
    bonusLabel: 'Socials', bonusValue: 'Unlimited Chat',
    oldPrice: 'Rp 25.000', price: 'Rp 15.000',
    providerColor: 'text-blue-600'
  },
  {
    provider: 'Smartfren', data: 'Unlimited', validity: '28 Days Validity',
    bonusLabel: 'FUP', bonusValue: '1.5GB/Day',
    oldPrice: 'Rp 90.000', price: 'Rp 72.000',
    providerColor: 'text-orange-600'
  }
];

const budgetPackages = [
  { data: '2GB', price: 'Rp 5.000', validity: '1 Day' },
  { data: '5GB', price: 'Rp 12.000', validity: '3 Days' },
  { data: '1GB', price: 'Rp 2.500', validity: '1 Day' },
  { data: '8GB', price: 'Rp 20.000', validity: '7 Days' },
];

export default function AllPackages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [operator, setOperator] = useState('all');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleBuy = (pkg: any) => {
    setSelectedPackage({
      data: pkg.data,
      validity: pkg.validity,
      priceStr: pkg.price,
      network: pkg.features?.[0] || 'High Speed Network'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">All Internet Packages</h1>
        <p className="text-gray-600">Find the perfect data plan for your digital lifestyle.</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-16 relative">
        {/* Adds a soft glowing shadow effect under the filter like the design image maybe */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-gray-200 blur-xl -z-10 rounded-full opacity-60"></div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_auto] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search Packages</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for 100GB, 30 days..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-gray-900 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Operator</label>
            <div className="relative group">
              <select 
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary cursor-pointer bg-white relative z-10"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              >
                {operatorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <div className="relative group">
              <select 
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary cursor-pointer bg-white relative z-10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Price Range</label>
            <div className="relative group">
              <select 
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary cursor-pointer bg-white relative z-10"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {priceRangeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <button className="bg-[#00aed6] text-white h-[46px] px-6 rounded-lg font-medium hover:bg-[#009bbf] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Best Sellers</h2>
          <span className="bg-brand-tertiary text-white px-4 py-1.5 rounded-full text-xs font-semibold">
            Most Popular Choice
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestSellers.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 relative">
              {pkg.badge && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${pkg.badgeColor}`}>
                  {pkg.badge}
                </div>
              )}
              <div className={`text-sm font-bold ${pkg.providerColor} mb-2`}>{pkg.provider}</div>
              <div className="text-5xl font-extrabold text-[#006780] mb-1 tracking-tight">{pkg.data}</div>
              <div className="text-sm text-gray-500 mb-8">{pkg.validity}</div>

              <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  {pkg.oldPrice && (
                    <div className="text-xs text-gray-400 line-through mb-1">{pkg.oldPrice}</div>
                  )}
                  <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                </div>
                <button 
                  onClick={() => handleBuy(pkg)}
                  className="bg-[#006780] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#00556b] transition-colors shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Promos */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">New Promos</h2>
          <a href="#" className="flex items-center gap-1 text-[#006780] font-semibold hover:text-[#00556b] transition-colors group text-sm">
            View All <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 relative">
              {promo.badge && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${promo.badgeColor}`}>
                  {promo.badge}
                </div>
              )}
              <div className={`text-xs font-bold ${promo.providerColor} mb-2 uppercase tracking-wide`}>{promo.provider}</div>
              <div className="text-4xl font-extrabold text-[#006780] mb-1 tracking-tight">{promo.data}</div>
              <div className="text-sm text-gray-500 mb-6">{promo.validity}</div>

              <div className="flex items-center justify-between text-sm mb-6 pb-6 border-b border-gray-50">
                <span className="text-gray-500">{promo.bonusLabel}</span>
                <span className="font-bold text-gray-900">{promo.bonusValue}</span>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="text-xs text-red-500 line-through mb-1">{promo.oldPrice}</div>
                  <div className="text-xl font-bold text-gray-900">{promo.price}</div>
                </div>
                <button 
                  onClick={() => handleBuy(promo)}
                  className="w-10 h-10 bg-[#006780] text-white rounded-lg flex items-center justify-center hover:bg-[#00556b] transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Friendly */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Budget Friendly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetPackages.map((pkg, idx) => (
            <div 
              key={idx} 
              onClick={() => handleBuy(pkg)}
              className="bg-[#f8f9ff] rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:border-[#006780]/20 hover:bg-white transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#006780] shadow-sm border border-gray-100 flex-shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg mb-0.5">{pkg.data}</div>
                <div className="text-sm text-gray-500">{pkg.price} &bull; {pkg.validity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Package Banner */}
      <div className="bg-[#004d61] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[40px] border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[40px] border-white/5 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Custom Package Needed?</h2>
          <p className="text-[#b8eaff] text-lg">Can't find what you're looking for? Build your own custom data plan perfectly tailored to your needs.</p>
        </div>
        
        <button className="relative z-10 bg-[#88fc85] text-[#005312] px-8 py-3.5 rounded-lg font-bold hover:bg-[#6cde6c] transition-colors shadow-lg whitespace-nowrap">
          Build Your Plan
        </button>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageData={selectedPackage} 
      />
    </div>
  );
}
