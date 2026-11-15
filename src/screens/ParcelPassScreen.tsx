import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Gift, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Package, 
  Clock, 
  HelpCircle,
  X
} from 'lucide-react'
import Header from '../components/layout/Header'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { showToast } from '../components/shared/Toast'

export default function ParcelPassScreen() {
  const navigate = useNavigate()
  const { 
    hasParcelPass, 
    parcelPassDeliveriesLeft, 
    setHasParcelPass, 
    setParcelPassDeliveriesLeft 
  } = useAppStore()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleSubscribe = () => {
    setHasParcelPass(true)
    setParcelPassDeliveriesLeft(5)
    setShowConfirmModal(false)
    showToast('Rapido Parcel Pass activated! 5 free deliveries ready.', 'success')
  }

  const handleCancelPass = () => {
    if (confirm('Cancel your Parcel Pass? You will lose remaining free deliveries.')) {
      setHasParcelPass(false)
      showToast('Parcel Pass cancelled', 'info')
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate(-1)} 
        title="Rapido Parcel Pass"
        subtitle="Monthly Delivery Subscription"
      />

      <div className="flex-1 px-4 space-y-4 pt-2">
        {/* Active Pass Status Card (If already subscribed) */}
        {hasParcelPass ? (
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                Active Member
              </span>
              <span className="text-xs font-semibold text-emerald-200">Auto-renews in 28d</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black">Rapido Parcel Pass Active</h2>
              <p className="text-xs text-emerald-100">
                Enjoy priority dispatch and discounted city deliveries.
              </p>
            </div>

            {/* Deliveries Remaining Progress */}
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Free Deliveries Left</span>
                <span>{parcelPassDeliveriesLeft} of 5 Remaining</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFD21F] rounded-full transition-all"
                  style={{ width: `${(parcelPassDeliveriesLeft / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={() => navigate('/parcel/location')}
                className="px-4 py-2 bg-[#FFD21F] text-black font-bold rounded-xl shadow-xs"
              >
                Send Package Now →
              </button>
              <button
                onClick={handleCancelPass}
                className="text-xs text-emerald-200 hover:text-white underline"
              >
                Cancel Pass
              </button>
            </div>
          </div>
        ) : (
          /* Subscription Hero Card */
          <div className="relative rounded-3xl bg-gradient-to-br from-[#191919] via-[#2D2D2D] to-[#111111] text-white p-5 space-y-3 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFD21F]/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-black text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={11} /> Retention Innovation
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white leading-tight">
                Rapido Parcel Pass
              </h2>
              <p className="text-xs text-gray-300">
                Transform occasional deliveries into effortless monthly habit.
              </p>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-black text-[#FFD21F]">₹49</span>
              <span className="text-xs text-gray-400">/ month</span>
              <span className="text-[10px] bg-white/10 text-emerald-300 px-2 py-0.5 rounded-md ml-auto font-medium">
                Saves ~₹180/month
              </span>
            </div>

            <p className="text-[9px] text-gray-400 italic">
              *Proposed concept pricing — subject to market validation.
            </p>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-black text-xs rounded-2xl shadow-xs transition-transform active:scale-95"
            >
              Subscribe to Parcel Pass — ₹49
            </button>
          </div>
        )}

        {/* Benefits Comparison Table */}
        <div className="bg-[#F8F9FA] rounded-3xl p-4 border border-gray-200 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
            Membership Benefits Breakdown
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-3 p-2 rounded-xl bg-white border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold flex-shrink-0">
                📦
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#191919]">5 Deliveries Included</p>
                <p className="text-[10px] text-gray-500">First 5 city deliveries covered up to standard base fare.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 rounded-xl bg-white border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold flex-shrink-0">
                ⚡
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#191919]">Priority Captain Matching</p>
                <p className="text-[10px] text-gray-500">Fast-track dispatch during peak morning & evening hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 rounded-xl bg-white border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold flex-shrink-0">
                🛡️
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#191919]">Free Packaging Sleeve (1/mo)</p>
                <p className="text-[10px] text-gray-500">Complimentary tamper-evident weather sleeve each month.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 rounded-xl bg-white border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold flex-shrink-0">
                🏷️
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#191919]">Flat ₹10 Off Extra Orders</p>
                <p className="text-[10px] text-gray-500">Continued savings on every additional delivery beyond the 5th.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden text-xs">
          <div className="grid grid-cols-3 bg-gray-100 p-2.5 font-bold text-gray-700 text-[11px]">
            <span>Feature</span>
            <span className="text-center text-gray-500">Without Pass</span>
            <span className="text-center text-amber-900">With Pass</span>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 p-2.5 text-[11px]">
              <span className="text-[#191919] font-medium">First 5 Deliveries</span>
              <span className="text-center text-gray-500">₹35 - ₹65 each</span>
              <span className="text-center font-bold text-emerald-600">Included (₹0)</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 text-[11px]">
              <span className="text-[#191919] font-medium">Captain Match</span>
              <span className="text-center text-gray-500">Standard</span>
              <span className="text-center font-bold text-emerald-600">Priority Queue</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 text-[11px]">
              <span className="text-[#191919] font-medium">Tamper Sleeve</span>
              <span className="text-center text-gray-500">₹15 extra</span>
              <span className="text-center font-bold text-emerald-600">1 Free/Month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Activate Rapido Parcel Pass?"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#525252] leading-relaxed">
            You will be charged <strong className="text-black">₹49</strong> for 30 days of Parcel Pass perks, including 5 free deliveries and priority matching.
          </p>

          <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 border border-amber-200">
            <strong>Case Pilot Note:</strong> This subscription directly addresses the 3% monthly active retention gap by creating a high-utility monthly commitment.
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleSubscribe}
              className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-xs rounded-xl shadow-xs"
            >
              Confirm Subscription — ₹49
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-xs rounded-xl"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
