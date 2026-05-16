import { Smartphone, Mail, Settings, Filter, ReceiptText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function MyAccount() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
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

  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24'>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2.5fr] gap-6 xl:gap-8'>
        {/* Left Column: Profile Card */}
        <div className='flex flex-col gap-6'>
          <div className='bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center shadow-sm'>
            <div className='relative mb-4 mt-2'>
              <div className='w-28 h-28 rounded-full overflow-hidden border-[3px] border-brand-primary p-1 bg-white'>
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop'
                  }
                  alt={user?.name || 'Tamu'}
                  className='w-full h-full rounded-full object-cover'
                />
              </div>
            </div>

            <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>
              {user?.name || 'Tamu'}
            </h2>
            <p className='text-sm font-semibold text-gray-500 mb-8'>
              {user?.role === 'admin' ? 'Administrator' : 'Member Premium'}
            </p>

            <div className='w-full space-y-4'>
              <div className='w-full bg-brand-surface rounded-xl p-4 flex items-center gap-4'>
                <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center text-brand-primary shadow-sm border border-gray-100 shrink-0'>
                  <Smartphone className='w-5 h-5' />
                </div>
                <div className='overflow-hidden'>
                  <p className='text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5'>
                    Nomor Telepon
                  </p>
                  <p className='text-sm font-bold text-gray-900 truncate'>
                    0812-XXXX-XXXX
                  </p>
                </div>
              </div>

              <div className='w-full bg-brand-surface rounded-xl p-4 flex items-center gap-4'>
                <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center text-brand-primary shadow-sm border border-gray-100 shrink-0'>
                  <Mail className='w-5 h-5' />
                </div>
                <div className='overflow-hidden'>
                  <p className='text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5'>
                    Alamat Email
                  </p>
                  <p className='text-sm font-bold text-gray-900 truncate'>
                    {user?.email || 'Belum masuk'}
                  </p>
                </div>
              </div>
            </div>

            <button className='w-full mt-8 py-3.5 border-2 border-brand-primary text-brand-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-surface-light transition-colors active:scale-[0.98]'>
              <Settings className='w-5 h-5' />
              Edit Profile Details
            </button>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className='flex flex-col'>
          <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full'>
            <div className='px-6 py-5 flex items-center justify-between border-b border-gray-200'>
              <h2 className='text-[19px] font-bold text-gray-900 tracking-tight'>
                Riwayat Transaksi
              </h2>
              <button className='flex items-center gap-2 text-brand-primary font-bold text-sm hover:text-[#004d61] transition-colors'>
                <Filter className='w-4 h-4' />
                Filter
              </button>
            </div>

            <div className='overflow-x-auto border-b border-gray-200'>
              {/* Table Header */}
              <div className='min-w-150 grid grid-cols-[1fr_2fr_1.5fr_1fr_auto] gap-4 px-6 py-4 bg-brand-surface text-xs font-bold text-gray-600 border-b border-gray-200'>
                <div>Tanggal</div>
                <div>Nama Paket</div>
                <div>Jumlah</div>
                <div>Status</div>
                <div className='w-6'></div>{' '}
                {/* Placeholder for receipt icon spacing */}
              </div>

              {/* Table Body */}
              <div className='min-w-150 flex flex-col'>
                {isLoading ? (
                    <div className='py-12 text-center text-gray-500 font-medium italic'>
                      Memuat transaksi...
                    </div>
                ) : !user ? (
                  <div className='py-12 px-6 text-center'>
                    <p className='text-gray-500 mb-4 font-medium italic'>
                      Silakan masuk untuk melihat riwayat transaksi Anda.
                    </p>
                  </div>
                ) : transactions?.length === 0 ? (
                    <div className='py-12 text-center text-gray-500 font-medium italic'>
                      Transaksi tidak ditemukan.
                    </div>
                ) : (
                  transactions?.map((tx: any) => (
                    <div
                      key={tx.id}
                      className='grid grid-cols-[1fr_2fr_1.5fr_1fr_auto] gap-4 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0'
                    >
                      <div className='text-sm text-gray-700 font-medium'>
                        {tx.date}
                      </div>

                      <div>
                        <div className='text-sm font-bold text-gray-900 mb-0.5'>
                          {tx.title}
                        </div>
                        <div className='text-xs text-gray-500 font-medium'>
                          {tx.desc}
                        </div>
                      </div>

                      <div className='text-sm font-bold text-gray-900'>
                        {tx.amount}
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            tx.status === 'Success'
                              ? 'bg-[#88fc85] text-[#005312]'
                              : 'bg-[#ffdad6] text-[#93000a]'
                          }`}
                        >
                          {tx.status === 'Success' ? 'Berhasil' : tx.status === 'Pending' ? 'Menunggu' : tx.status}
                        </span>
                      </div>

                      <button
                        className='text-gray-400 hover:text-brand-primary transition-colors p-1'
                        title='Lihat Bukti'
                      >
                        <ReceiptText className='w-5 h-5' />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className='p-0 mt-auto'>
              <button className='w-full py-5 text-center text-brand-primary font-bold text-sm hover:bg-brand-surface transition-colors'>
                Lihat Semua Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
