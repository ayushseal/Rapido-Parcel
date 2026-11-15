import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Package, 
  Bike, 
  MapPin, 
  X, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle,
  HelpCircle
} from 'lucide-react'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { mockCaptains } from '../data/mockData'
import { formatCurrency } from '../utils/helpers'

export default function SearchingScreen() {
  const navigate = useNavigate()
  const {
    selectedVehicle,
    packageCategory,
    packageSize,
    pickupLocation,
    dropLocation,
    totalFare,
    setCaptain,
    setBookingStatus,
  } = useAppStore()

  const [searchSeconds, setSearchSeconds] = useState(0)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [matchedCaptainData, setMatchedCaptainData] = useState<any | null>(null)

  // Simulation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchSeconds((prev) => prev + 1)
    }, 1000)

    // After 3.5 seconds, match a captain
    const matchTimeout = setTimeout(() => {
      // Pick matching captain based on vehicle
      const cap = selectedVehicle === 'auto' ? mockCaptains[1] : mockCaptains[0]
      setCaptain(cap)
      setMatchedCaptainData(cap)

      // After a brief 1.2s reveal, proceed to tracking
      setTimeout(() => {
        setBookingStatus('matched')
        navigate('/parcel/tracking')
      }, 1200)
    }, 3500)

    return () => {
      clearInterval(timer)
      clearTimeout(matchTimeout)
    }
  }, [navigate, selectedVehicle, setCaptain, setBookingStatus])

  const handleConfirmCancel = () => {
    setBookingStatus('cancelled')
    setShowCancelModal(false)
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full bg-white justify-between p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFD21F] flex items-center justify-center font-bold text-xs">
            📦
          </div>
          <span className="text-xs font-bold text-[#191919]">Rapido Parcel Dispatch</span>
        </div>
        <button
          onClick={() => setShowCancelModal(true)}
          className="text-xs font-bold text-red-600 hover:text-red-700 p-1"
        >
          Cancel
        </button>
      </div>

      {/* Main Radar Matching Visual Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {!matchedCaptainData ? (
          <>
            {/* Animated Radar Pulse */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Concentric expanding ripples */}
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-amber-300"
              />
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-yellow-400"
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1.2, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-amber-200"
              />

              {/* Center Vehicle Icon */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#FFD21F] shadow-lg flex items-center justify-center text-3xl border-4 border-white">
                {selectedVehicle === 'auto' ? '🛺' : '🛵'}
              </div>
            </div>

            <div className="text-center space-y-1.5 max-w-xs">
              <h2 className="text-lg font-black text-[#191919]">
                Connecting with Nearest Captain...
              </h2>
              <p className="text-xs text-[#737373]">
                Checking 18 nearby parcel captains in Ahiritola / Kolkata area ({searchSeconds}s)
              </p>
            </div>
          </>
        ) : (
          /* Match Found Success Splash */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-xl">
              ✓
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Captain Allocated!
              </span>
              <h2 className="text-xl font-black text-[#191919]">
                {matchedCaptainData.name} is on the way!
              </h2>
              <p className="text-xs text-[#737373]">
                {matchedCaptainData.vehicleModel} ({matchedCaptainData.vehicleNumber})
              </p>
            </div>
          </motion.div>
        )}

        {/* Mini Order Summary Card */}
        <div className="w-full bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#737373] text-[11px]">
            <span>Package: <strong className="text-black capitalize">{packageCategory}</strong></span>
            <span>Est. Fare: <strong className="text-black">{formatCurrency(totalFare || 175)}</strong></span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-gray-200 text-[11px] truncate">
            <span className="truncate max-w-[120px]">📍 {pickupLocation?.name || 'Ahiritola'}</span>
            <span className="text-gray-400">→</span>
            <span className="truncate max-w-[120px]">🏁 {dropLocation?.name || 'Jadavpur Univ'}</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="space-y-2 text-center pb-2">
        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" />
          Zero cancellation fee while matching
        </p>

        <button
          onClick={() => setShowCancelModal(true)}
          className="text-xs font-semibold text-gray-500 hover:text-black py-1"
        >
          Cancel Request
        </button>
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Delivery Request?"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#525252] leading-relaxed">
            Are you sure you want to cancel this booking? Nearby captains are actively reviewing your request.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmCancel}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
            >
              Yes, Cancel Booking
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-xs rounded-xl"
            >
              Keep Searching
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
