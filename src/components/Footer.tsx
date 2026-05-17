export default function Footer() {
  return (
    <footer className='bg-brand-surface py-6 md:py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between gap-2'>
          <h3 className='text-2xl font-bold text-gray-900 tracking-tight'>
            TopUpPedia
          </h3>
          <p className='text-gray-600 text-sm leading-relaxed max-w-sm text-left md:text-right'>
            © 2026 TopUpPedia. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
