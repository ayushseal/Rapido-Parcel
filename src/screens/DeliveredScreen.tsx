import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Camera, 
  KeyRound, 
  RotateCcw, 
  BookmarkCheck, 
  Clock, 
  Star, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Check,
  Home
} from 'lucide-react'
import Header from '../components/layout/Header'
import { useAppStore } from '../store/useAppStore'
import { formatCurrency } from '../utils/helpers'
import { showToast } from '../components/shared/Toast'

export default function DeliveredScreen() {
  const navigate = useNavigate()
  const {
    captain,
    pickupLocation,
    dropLocation,
    recipientName,
    recipientPhone,
    packageCategory,
    totalFare,
    savedRecipients,
    addSavedRecipient,
    setPackageDescription,
  } = useAppStore()

  const [rating, setRating] = useState(5)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const feedbackTags = ['On Time Delivery', 'Handled with Care', 'Polite Captain', 'Quick Verification']

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // Repeat Booking (Retention Engine)
  const handleRepeatBooking = () => {
    // Keep pickup, drop, and recipient, clear description for fresh order
    setPackageDescription('')
    navigate('/parcel/location')
  }

  // Save Recipient
  const handleSaveRecipient = () => {
    if (dropLocation && recipientName) {
      addSavedRecipient({
        id: `rec-${Date.now()}`,
        name: recipientName,
        phone: recipientPhone || '+91 98765 00000',
        address: dropLocation,
      })
      setSavedSuccess(true)
      showToast('Recipient saved to your address book!', 'success')
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-8">
      <Header 
        showLocation={false} 
        showBack={false} 
        title="Delivery Completed" 
        rightElement={
          <button 
            onClick={() => navigate('/')} 
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
            title="Go to Home"
          >
            <Home size={18} />
          </button>
        }
      />

      <div className="flex-1 px-4 space-y-4 pt-2">
        {/* Success Splash Badge */}
        <div className="flex flex-col items-center text-center py-4 space-y-2">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20"
          >
            ✓
          </motion.div>

          <div className="space-y-0.5">
            <h2 className="text-lg font-black text-[#191919]">
              Parcel Delivered Successfully!
            </h2>
            <p className="text-xs text-[#737373]">
              Handover verified & securely confirmed by {recipientName || 'recipient'}
            </p>
          </div>
        </div>

        {/* 3-Layer Trust Shield Audit Card */}
        <div className="bg-[#F8F9FA] rounded-3xl p-4 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="text-xs font-bold text-[#191919] flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-600" />
              Verified Handover Audit
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Safe Handover ✓
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* OTP Verified Record */}
            <div className="flex items-start gap-2.5">
              <KeyRound size={15} className="text-amber-800 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#191919]">Receiver OTP Verified</p>
                <p className="text-[10px] text-gray-500">
                  Recipient entered 4-digit code directly with captain
                </p>
              </div>
            </div>

            {/* Photo Records */}
            <div className="flex items-start gap-2.5">
              <Camera size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#191919]">Pickup & Drop-off Photos Logged</p>
                <p className="text-[10px] text-gray-500">
                  2 timestamped images stored on immutable audit trail
                </p>
              </div>
            </div>

            {/* Drop Location */}
            <div className="flex items-start gap-2.5">
              <Clock size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#191919]">{dropLocation?.name || 'Jadavpur University, Kolkata'}</p>
                <p className="text-[10px] text-gray-500">Delivered in 24 mins • On-time</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
            <span className="text-gray-500">Amount Paid (Cash on Handover)</span>
            <span className="text-sm font-black text-[#191919]">{formatCurrency(totalFare || 45)}</span>
          </div>
        </div>

        {/* Interactive Captain Rating Card */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD21F] flex items-center justify-center text-xl font-bold">
              👨‍✈️
            </div>
            <div>
              <p className="text-xs font-bold text-[#191919]">Rate Captain {captain?.name || 'Rajesh'}</p>
              <p className="text-[10px] text-gray-500">How was your parcel delivery experience?</p>
            </div>
          </div>

          {/* Star selector */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="p-1 text-2xl transition-transform active:scale-125 focus:outline-hidden"
              >
                <Star
                  size={26}
                  className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                />
              </button>
            ))}
          </div>

          {/* Quick feedback tags */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {feedbackTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setRatingSubmitted(true)
              showToast('Thank you for rating your captain!', 'success')
            }}
            disabled={ratingSubmitted}
            className={`w-full py-2 text-xs font-bold rounded-xl transition-colors ${
              ratingSubmitted
                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            {ratingSubmitted ? 'Feedback Submitted ✓' : 'Submit Feedback'}
          </button>
        </div>

        {/* HABIT FORMATION & RETENTION ENGINE (Key Product Strategic Element) */}
        <div className="bg-gradient-to-br from-[#FFFBE6] via-amber-50 to-[#FFF8DC] rounded-3xl p-4 border border-amber-300 space-y-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full inline-block">
              Repeat Delivery Engine
            </span>
            <h3 className="text-sm font-black text-[#191919] pt-1">
              Need to send something again?
            </h3>
            <p className="text-xs text-[#525252]">
              Repeat this exact route to {recipientName || 'saved recipient'} with 1-tap re-ordering.
            </p>
          </div>

          <div className="space-y-2">
            {/* Primary Action: Send Again */}
            <button
              onClick={handleRepeatBooking}
              className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-black text-xs rounded-2xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <RotateCcw size={14} />
              <span>Send Again (Same Route)</span>
              <span>→</span>
            </button>

            {/* Save Recipient Button */}
            {!savedSuccess && (
              <button
                onClick={handleSaveRecipient}
                className="w-full py-2.5 bg-white hover:bg-gray-50 text-amber-900 font-bold text-xs rounded-2xl border border-amber-300 flex items-center justify-center gap-2 transition-colors"
              >
                <BookmarkCheck size={14} />
                <span>Save {recipientName || 'Recipient'} to Quick Send</span>
              </button>
            )}

            {savedSuccess && (
              <div className="text-center text-[11px] font-bold text-emerald-700 py-1 flex items-center justify-center gap-1">
                <Check size={13} /> {recipientName} added to your saved addresses!
              </div>
            )}
          </div>
        </div>

        {/* Secondary Links */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <button
            onClick={() => navigate('/parcel/history')}
            className="text-gray-600 hover:text-black font-semibold flex items-center gap-1"
          >
            <span>View All Deliveries</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => navigate('/')}
            className="text-amber-800 hover:underline font-bold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
