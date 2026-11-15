import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Package, 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  Wallet, 
  ShieldCheck, 
  HelpCircle, 
  Phone, 
  Clock, 
  Bike, 
  LogOut,
  Star
} from 'lucide-react'
import Header from '../components/layout/Header'
import { useAppStore } from '../store/useAppStore'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { hasParcelPass, parcelPassDeliveriesLeft } = useAppStore()

  return (
    <div className="flex flex-col min-h-full bg-[#f4f5f7] pb-14 font-sans select-none">
      {/* Top Header */}
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate('/')} 
        title="My Profile & Account"
      />

      <div className="flex-1 px-3.5 space-y-2.5 pt-1.5 pb-4 overflow-y-auto no-scrollbar">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFD21F] to-amber-300 flex items-center justify-center font-black text-black text-base shadow-sm">
              AY
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-black text-[#191919]">Ayush Seal</h2>
                <span className="text-[9px] font-bold bg-[#FFFBE6] text-amber-900 border border-amber-300 px-1 py-0.2 rounded-md flex items-center gap-0.5">
                  <Star size={9} className="fill-amber-500 text-amber-500" /> 4.92
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium">+91 98307 30788</p>
              <p className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verified Rapido Member • Kolkata
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* USER REQUEST 4: RAPIDO PARCEL PASS BUTTON / BANNER IN PROFILE   */}
        {/* Redirects to full /parcel/pass detailed subscription page      */}
        {/* ============================================================== */}
        <div 
          onClick={() => navigate('/parcel/pass')}
          className="rounded-2xl bg-gradient-to-br from-[#191919] via-[#242730] to-[#12141a] text-white p-3 border border-gray-800 shadow-sm cursor-pointer hover:border-[#FFD21F]/80 transition-all flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FFD21F]/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] bg-[#FFD21F] text-black font-black px-1.5 py-0.2 rounded uppercase tracking-wider shadow-2xs">
                SUBSCRIPTION
              </span>
              <span className="text-[8px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-1 py-0.2 rounded">
                Saves ~₹180/mo
              </span>
            </div>
            <span className="text-[9px] font-black text-[#FFD21F] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              View Plan →
            </span>
          </div>

          <div className="z-10 py-1.5">
            <h3 className="text-xs font-black text-white flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FFD21F]" />
              Rapido Parcel Pass — ₹49/month
            </h3>
            <p className="text-[9px] text-gray-300 font-medium leading-tight mt-0.5">
              {hasParcelPass 
                ? `Active subscription • ${parcelPassDeliveriesLeft} free deliveries remaining this month`
                : 'Get 5 free deliveries/month, priority dispatch & ₹0 cancellation fee'
              }
            </p>
          </div>

          <div className="flex items-center justify-between z-10 pt-1 border-t border-gray-800/80">
            <span className="text-[8px] text-gray-400 font-semibold">
              {hasParcelPass ? '✓ Currently Active' : 'Ideal for frequent senders & students'}
            </span>
            <div className="bg-[#FFD21F] text-black font-black text-[8.5px] px-2 py-0.5 rounded-lg shadow-2xs">
              {hasParcelPass ? 'Manage Pass' : 'Subscribe ₹49'}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* USER REQUEST 3: PARCEL DELIVERY ACTIVITY BUTTON IN PROFILE     */}
        {/* Redirects to full /parcel/history detailed orders page         */}
        {/* ============================================================== */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1">
            Activity & History
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-2xs">
            {/* Delivery Activity Row (USER REQUEST 3) */}
            <div 
              onClick={() => navigate('/parcel/history')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-base flex-shrink-0">
                  📦
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-bold text-[#191919]">Parcel Delivery Activity</p>
                    <span className="text-[8px] bg-[#FFD21F] text-black font-black px-1.5 py-0.2 rounded-full">
                      2 Orders
                    </span>
                  </div>
                  <p className="text-[8.5px] text-gray-500 mt-0.5">
                    View past packages, download receipts & repeat bookings
                  </p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Ride Trips History Row */}
            <div 
              onClick={() => alert('Rapido Passenger Rides History: 34 rides completed.')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-base flex-shrink-0">
                  🏍️
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#191919]">Ride Trips History</p>
                  <p className="text-[8.5px] text-gray-500 mt-0.5">
                    Bike taxi, auto & cab trip invoices
                  </p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Payments & Addresses */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1">
            Payments & Saved Places
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-2xs">
            <div 
              onClick={() => alert('Saved Addresses: Ahiritola (Home), Jadavpur University (Work)')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#191919]">Saved Addresses</p>
                  <p className="text-[8.5px] text-gray-500 mt-0.5">Ahiritola, Jadavpur University</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black transition-colors" />
            </div>

            <div 
              onClick={() => alert('Rapido Wallet Balance: ₹120.00. Google Pay connected.')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0">
                  <Wallet size={15} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#191919]">Rapido Wallet & UPI</p>
                  <p className="text-[8.5px] text-emerald-700 font-semibold mt-0.5">₹120.00 Balance • Google Pay Active</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>

        {/* Safety & Help */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1">
            Safety & Support
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-2xs">
            <div 
              onClick={() => navigate('/parcel')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#191919]">3-Layer Trust Shield</p>
                  <p className="text-[8.5px] text-gray-500 mt-0.5">Pre-screening, photo audit & receiver OTP</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black transition-colors" />
            </div>

            <div 
              onClick={() => alert('Connecting to Rapido 24x7 Priority Support...')}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 flex-shrink-0">
                  <HelpCircle size={15} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#191919]">Help & Customer Support</p>
                  <p className="text-[8.5px] text-gray-500 mt-0.5">24x7 customer assistance for rides & parcels</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

