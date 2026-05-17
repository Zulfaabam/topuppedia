import { Smartphone, Mail, Settings, X } from 'lucide-react'
import { useState, useEffect, FormEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function MyAccount() {
  const { user, login } = useUser()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState('')

  // Prefill when modal opens
  useEffect(() => {
    if (isEditOpen && user) {
      setEditName(user.name || '')
      setEditPhone(user.phone || '')
      setUpdateError('')
    }
  }, [isEditOpen, user])

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsUpdating(true)
    setUpdateError('')

    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
        }),
      })

      if (!response.ok) {
        throw new Error('Gagal memperbarui profil di database')
      }

      const updatedUser = await response.json()
      
      // Update global user context & localStorage
      login(updatedUser)
      setIsEditOpen(false)
    } catch (err: any) {
      setUpdateError('Gagal menyimpan detail profil. Silakan coba lagi.')
      console.error('Update profile error:', err)
    } finally {
      setIsUpdating(false)
    }
  }

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
                    {user?.phone || 'Belum diatur'}
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

            <button 
              onClick={() => setIsEditOpen(true)}
              className='w-full mt-8 py-3.5 border-2 border-brand-primary text-brand-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-surface-light transition-colors active:scale-[0.98] cursor-pointer'
            >
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
            </div>

            <div className='overflow-x-auto border-b border-gray-200'>
              {/* Table Header */}
              <div className='min-w-150 grid grid-cols-[1fr_1.2fr_2fr_1.2fr_1fr] gap-4 px-6 py-4 bg-brand-surface text-xs font-bold text-gray-600 border-b border-gray-200'>
                <div>Tanggal</div>
                <div>No. Telepon</div>
                <div>Nama Paket</div>
                <div>Jumlah</div>
                <div>Status</div>
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
                      className='grid grid-cols-[1fr_1.2fr_2fr_1.2fr_1fr] gap-4 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0'
                    >
                      <div className='text-sm text-gray-700 font-medium'>
                        {tx.date}
                      </div>

                      <div className='text-sm font-semibold text-gray-900 font-mono'>
                        {tx.phone || '-'}
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
                          {tx.status === 'Success'
                            ? 'Berhasil'
                            : tx.status === 'Pending'
                              ? 'Menunggu'
                              : tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Details Modal */}
      {isEditOpen && (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          {/* Backdrop */}
          <div
            onClick={() => setIsEditOpen(false)}
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          />

          {/* Modal Container */}
          <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-10'>
            <div className='p-6 md:p-8'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-bold text-gray-900 tracking-tight'>
                  Edit Detail Profil
                </h3>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className='text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className='space-y-5'>
                {updateError && (
                  <div className='p-3 text-xs font-bold text-red-600 bg-red-50 rounded-lg border border-red-100'>
                    {updateError}
                  </div>
                )}

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Nama Lengkap
                  </label>
                  <input
                    type='text'
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    placeholder='Nama lengkap Anda'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-gray-900 text-sm font-semibold transition-all'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    Nomor Telepon
                  </label>
                  <input
                    type='text'
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder='Contoh: 081234567890'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-gray-900 text-sm font-semibold transition-all'
                  />
                </div>

                <div className='flex items-center gap-3 mt-8'>
                  <button
                    type='button'
                    onClick={() => setIsEditOpen(false)}
                    className='flex-1 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer'
                  >
                    Batal
                  </button>
                  <button
                    type='submit'
                    disabled={isUpdating}
                    className='flex-1 py-3 bg-brand-primary text-white rounded-xl font-bold text-sm hover:bg-[#00556b] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm cursor-pointer'
                  >
                    {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
