import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  Bike, 
  Clock,
  Lock
} from 'lucide-react'
import Header from '../components/layout/Header'
import { useAppStore } from '../store/useAppStore'
import { generateOTP, formatCurrency } from '../utils/helpers'

export default function ConfirmScreen() {
  const navigate = useNavigate()
  const {
    pickupLocation,
    dropLocation,
    recipientName,
    recipientPhone,
    packageCategory,
    packageSize,
    packageDescription,
    selectedVehicle,
    addPackaging,
    totalFare,
    setDeliveryOTP,
    setBookingStatus,
  } = useAppStore()

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'wallet'>('cash')
  const [declaredSafety, setDeclaredSafety] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirmBooking = () => {
    if (!declaredSafety) return
    setIsSubmitting(true)

    // Generate secure 4-digit handover OTP
    const generatedCode = generateOTP()
    setDeliveryOTP(generatedCode)
    setBookingStatus('searching')

    setTimeout(() => {
      navigate('/parcel/searching')
    }, 400)
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <Header 
        showLocation={false} 
        showBack={true} 
        title="Confirm Booking"
        subtitle="Review Details & Trust Shield"
      />

      <div className="flex-1 px-4 space-y-4 pt-2">
        {/* Order Summary Card */}
        <div className="bg-[#F8F9FA] rounded-3xl p-4 border border-[#E9E9E9] space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-xs font-bold text-[#191919] uppercase tracking-wider">
              Booking Overview
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
              {selectedVehicle === 'auto' ? '🛺 Auto Parcel' : '🛵 Bike Parcel'}
            </span>
          </div>

          {/* Locations Route */}
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-[#191919]">{pickupLocation?.name || '32B, Brindaban Basak St'}</p>
                <p className="text-[10px] text-[#737373]">{pickupLocation?.address || 'Ahiritola, Kolkata'}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-[#191919]">{dropLocation?.name || 'Jadavpur University'}</p>
                <p className="text-[10px] text-[#737373]">{dropLocation?.address || 'Kolkata'}</p>
              </div>
            </div>
          </div>

          {/* Recipient & Package Summary */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-[#737373] font-medium block">Recipient</span>
              <p className="font-bold text-[#191919] truncate">{recipientName || 'Ayush Seal'}</p>
              <p className="text-[10px] text-gray-500">{recipientPhone || '9830730788'}</p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-[#737373] font-medium block">Package</span>
              <p className="font-bold text-[#191919] capitalize truncate">
                {packageCategory || 'Documents'} ({packageSize || 'Small'})
              </p>
              <p className="text-[10px] text-gray-500 truncate">
                {packageDescription || 'Standard Parcel'}
              </p>
            </div>
          </div>
        </div>

        {/* 3-Layer Trust Shield Verification Checklist */}
        <div className="bg-amber-50/70 rounded-3xl p-3.5 border border-amber-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <ShieldCheck size={16} className="text-amber-800" />
            <span>Rapido 3-Layer Trust Shield Active</span>
          </div>

          <div className="space-y-1.5 text-[11px] text-amber-950">
            <div className="flex items-center gap-2">
              <CheckCircle size={13} className="text-emerald-700" />
              <span>Layer 1: Restricted items screened & declared</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={13} className="text-emerald-700" />
              <span>Layer 2: Captain takes verified pickup photo with GPS audit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={13} className="text-emerald-700" />
              <span>Layer 3: Recipient receives secure 4-digit handover OTP</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
          <span className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
            Select Payment Method
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'cash'
                  ? 'border-2 border-[#FFD21F] bg-[#FFF8DC] font-bold text-black'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <span className="text-lg block">💵</span>
              <span className="text-[11px] block mt-0.5">Cash</span>
            </button>

            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'upi'
                  ? 'border-2 border-[#FFD21F] bg-[#FFF8DC] font-bold text-black'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <span className="text-lg block">📱</span>
              <span className="text-[11px] block mt-0.5">UPI / GPay</span>
            </button>

            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-2 border-[#FFD21F] bg-[#FFF8DC] font-bold text-black'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <span className="text-lg block">💳</span>
              <span className="text-[11px] block mt-0.5">Wallet (₹120)</span>
            </button>
          </div>
        </div>

        {/* Sender Safety Declaration Checkbox */}
        <div className="p-3 rounded-2xl border border-gray-200 bg-white flex items-start gap-2.5">
          <input
            type="checkbox"
            id="senderDecl"
            checked={declaredSafety}
            onChange={(e) => setDeclaredSafety(e.target.checked)}
            className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 h-4 w-4 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="senderDecl" className="text-[11px] text-[#525252] leading-tight cursor-pointer select-none">
            I confirm that this package contains only permitted goods and <strong className="text-black">NO cash, currency, jewellery, bullion, or hazardous items</strong>. I agree to Rapido's parcel handover verification policy.
          </label>
        </div>

        {/* Confirm and Book CTA */}
        <div className="pt-2">
          <button
            onClick={handleConfirmBooking}
            disabled={!declaredSafety || isSubmitting}
            className={`w-full py-3.5 font-bold text-sm rounded-2xl shadow-xs transition-transform flex items-center justify-center gap-2 ${
              !declaredSafety || isSubmitting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#FFD21F] hover:bg-[#f0c400] text-black active:scale-[0.99]'
            }`}
          >
            <Lock size={15} />
            <span>
              {declaredSafety ? `Confirm & Book — ${formatCurrency(totalFare || 45)}` : 'Check Declaration to Proceed'}
            </span>
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-1.5">
            Transparent pricing • Free cancellation before pickup
          </p>
        </div>
      </div>
    </div>
  )
}
