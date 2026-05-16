import { Smartphone, Mail, Settings, Filter, ReceiptText } from 'lucide-react';

const transactions = [
  { 
    id: 1,
    date: 'Oct 24, 2023', 
    title: '100GB 30 Days', 
    desc: 'Flash Speed Pack', 
    amount: 'Rp 129.000', 
    status: 'Success' 
  },
  { 
    id: 2,
    date: 'Oct 12, 2023', 
    title: 'Top Up Balance', 
    desc: 'OVO Payment', 
    amount: 'Rp 200.000', 
    status: 'Success' 
  },
  { 
    id: 3,
    date: 'Sep 24, 2023', 
    title: '50GB 30 Days', 
    desc: 'Streamer Special', 
    amount: 'Rp 89.000', 
    status: 'Success' 
  },
  { 
    id: 4,
    date: 'Sep 10, 2023', 
    title: '10GB Add-on', 
    desc: 'Mid-month Booster', 
    amount: 'Rp 25.000', 
    status: 'Pending' 
  },
  { 
    id: 5,
    date: 'Aug 24, 2023', 
    title: '100GB 30 Days', 
    desc: 'Flash Speed Pack', 
    amount: 'Rp 129.000', 
    status: 'Success' 
  },
];

export default function MyAccount() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2.5fr] gap-6 xl:gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center shadow-sm">
            
            <div className="relative mb-4 mt-2">
              <div className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-[#00aed6] p-1 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop" 
                  alt="Alex Johnson" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Alex Johnson</h2>
            <p className="text-sm font-semibold text-gray-500 mb-8">Premium Member</p>

            <div className="w-full space-y-4">
              <div className="w-full bg-[#f8f9ff] rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#006780] shadow-sm border border-gray-100 flex-shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Phone Number</p>
                  <p className="text-sm font-bold text-gray-900 truncate">0812-XXXX-XXXX</p>
                </div>
              </div>

              <div className="w-full bg-[#f8f9ff] rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#006780] shadow-sm border border-gray-100 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="text-sm font-bold text-gray-900 truncate">alex.j@topup-pedia.com</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 py-3.5 border-2 border-[#006780] text-[#006780] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#eff4ff] transition-colors active:scale-[0.98]">
              <Settings className="w-5 h-5" />
              Edit Profile Details
            </button>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="flex flex-col">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-200">
              <h2 className="text-[19px] font-bold text-gray-900 tracking-tight">Transaction History</h2>
              <button className="flex items-center gap-2 text-[#006780] font-bold text-sm hover:text-[#004d61] transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto border-b border-gray-200">
              {/* Table Header */}
              <div className="min-w-[600px] grid grid-cols-[1fr_2fr_1.5fr_1fr_auto] gap-4 px-6 py-4 bg-[#f8f9ff] text-xs font-bold text-gray-600 border-b border-gray-200">
                <div>Date</div>
                <div>Package Name</div>
                <div>Amount</div>
                <div>Status</div>
                <div className="w-6"></div> {/* Placeholder for receipt icon spacing */}
              </div>

              {/* Table Body */}
              <div className="min-w-[600px] flex flex-col">
                {transactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-[1fr_2fr_1.5fr_1fr_auto] gap-4 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0">
                    <div className="text-sm text-gray-700 font-medium">
                      {tx.date}
                    </div>
                    
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-0.5">{tx.title}</div>
                      <div className="text-xs text-gray-500 font-medium">{tx.desc}</div>
                    </div>
                    
                    <div className="text-sm font-bold text-gray-900">
                      {tx.amount}
                    </div>
                    
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        tx.status === 'Success' 
                          ? 'bg-[#88fc85] text-[#005312]' 
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        {tx.status}
                      </span>
                    </div>

                    <button className="text-gray-400 hover:text-[#006780] transition-colors p-1" title="View Receipt">
                      <ReceiptText className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-0 mt-auto">
              <button className="w-full py-5 text-center text-[#006780] font-bold text-sm hover:bg-[#f8f9ff] transition-colors">
                View All Transactions
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
