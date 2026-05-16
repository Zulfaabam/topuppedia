import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';

export interface PackageData {
  data: string;
  validity: string;
  priceStr: string;
  network?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
}

export default function PaymentModal({ isOpen, onClose, packageData }: PaymentModalProps) {
  // Parse price string to number for calculation
  const defaultSubtotal = 129000;
  const subtotal = packageData 
    ? parseInt(packageData.priceStr.replace(/[^0-9]/g, ''), 10) 
    : defaultSubtotal;
    
  const serviceFee = 1000;
  const total = subtotal + serviceFee;

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID').replace(/,/g, '.')}`;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="payment-modal-overlay"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, y: 20, x: "-50%" }}
            animate={{ scale: 1, y: "-50%", x: "-50%" }}
            exit={{ scale: 0.95, y: -20, x: "-50%" }}
            className="fixed left-1/2 top-1/2 w-[90%] max-w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col origin-center z-[101]"
          >
            {/* Header */}
            <div className="bg-[#f8f9ff] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Verifikasi Pembayaran</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Ringkasan Pesanan</h3>
                <div className="bg-[#eff4ff] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Nomor Telepon</span>
                    <span className="font-semibold text-gray-900">0812-XXXX-XXXX</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Paket</span>
                    <span className="font-semibold text-gray-900">
                      {packageData?.data || '100GB'} <span className="font-normal text-gray-600">({(packageData?.validity || '30 Hari').replace(' Validity', '').replace(' Days', ' Hari')})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Jaringan</span>
                    <span className="font-semibold text-[#006780]">
                      {packageData?.network || '5G Ultra Speed'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Detail Pembayaran</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 font-medium">{packageData?.priceStr || formatPrice(defaultSubtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Biaya Layanan</span>
                    <span className="text-gray-900 font-medium">{formatPrice(serviceFee)}</span>
                  </div>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-base">Total Pembayaran</span>
                  <span className="text-lg font-bold text-[#006780]">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert('Pembayaran berhasil!');
                  onClose();
                }}
                className="w-full bg-[#006780] text-white py-3.5 rounded-lg font-bold hover:bg-[#00556b] transition-colors shadow-sm mb-4"
              >
                Bayar Sekarang
              </button>

              <p className="text-[10px] text-center text-gray-400 font-medium">
                Dengan mengklik Bayar Sekarang, kamu menyetujui Syarat dan Ketentuan kami.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
