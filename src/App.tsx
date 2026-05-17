import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'

export default function App() {
  return (
    <div className='min-h-screen font-sans flex flex-col selection:bg-brand-primary selection:text-white'>
      <Navbar />

      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<MyAccount />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
