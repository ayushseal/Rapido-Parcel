import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Share2, 
  ShieldCheck, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  MapPin, 
  KeyRound, 
  Copy, 
  Check, 
  X,
  Sparkles,
  RefreshCw,
  Ban
} from 'lucide-react'
import Header from '../components/layout/Header'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { mockCaptains } from '../data/mockData'
import RealMap from '../components/shared/RealMap'

const stages: Array<'matched' | 'pickup' | 'pickedUp' | 'inTransit' | 'arriving' | 'delivered'> = [
  'matched',
  'pickup',
  'pickedUp',
  'inTransit',
  'arriving',
  'delivered',
]

const stageLabels: Record<string, { title: string; subtitle: string; percent: number }> = {
  matched: { title: 'Captain Assigned', subtitle: 'Subhash Ghosh is heading to Ahiritola pickup (~4 mins)', percent: 15 },
  pickup: { title: 'At Pickup Point', subtitle: 'Verifying package & taking pickup photo at Ahiritola', percent: 35 },
  pickedUp: { title: 'Package Collected', subtitle: 'Photo audit verified with GPS stamp at 32B Brindaban St', percent: 55 },
  inTransit: { title: 'On the Way', subtitle: 'In transit via AJC Bose Flyover towards Jadavpur (~18 mins)', percent: 75 },
  arriving: { title: 'Approaching Destination', subtitle: 'Captain arriving at Jadavpur Univ in ~2 mins. OTP needed.', percent: 92 },
  delivered: { title: 'Delivered', subtitle: 'Handover verified via recipient OTP', percent: 100 },
}

export default function TrackingScreen() {
  const navigate = useNavigate()
  const {
    captain,
    setCaptain,
    pickupLocation,
    dropLocation,
    recipientName,
    recipientPhone,
    packageCategory,
    deliveryOTP,
    bookingStatus,
    setBookingStatus,
    addOrderToHistory,
    totalFare,
  } = useAppStore()

  const currentCaptain = captain || mockCaptains[0]
  const currentStatus = (bookingStatus === 'searching' || bookingStatus === 'idle') ? 'matched' : bookingStatus

  // Modals
  const [showShareModal, setShowShareModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [enteredOtp, setEnteredOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)

  // Pickup photo verification state
  const [pickupPhotoVerified, setPickupPhotoVerified] = useState(true)

  // Stepper for demo
  const currentStageIndex = stages.indexOf(currentStatus as any) >= 0 ? stages.indexOf(currentStatus as any) : 0

  const handleNextStage = () => {
    const nextIndex = currentStageIndex + 1
    if (nextIndex < stages.length) {
      const nextStatus = stages[nextIndex]
      if (nextStatus === 'delivered') {
        // Trigger OTP verification dialog
        setShowOtpModal(true)
      } else {
        setBookingStatus(nextStatus)
      }
    } else {
      setShowOtpModal(true)
    }
  }

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setBookingStatus(stages[currentStageIndex - 1])
    }
  }

  // OTP Verification
  const handleVerifyOtp = () => {
    if (enteredOtp !== deliveryOTP) {
      setOtpError('Invalid OTP! Captain cannot complete delivery without correct recipient code.')
      return
    }

    setOtpError('')
    setShowOtpModal(false)
    setBookingStatus('delivered')

    // Add order to history
    addOrderToHistory({
      id: `ord-${Date.now()}`,
      date: 'Just now',
      status: 'delivered',
      pickup: pickupLocation || { id: 'loc-pickup', name: '32B, Brindaban Basak St', address: 'Ahiritola, Kolkata', lat: 22.593, lng: 88.358 },
      drop: dropLocation || { id: 'loc-jadavpur', name: 'Jadavpur University', address: 'Kolkata', lat: 22.498, lng: 88.371 },
      recipientName: recipientName || 'Ayush Seal',
      captain: currentCaptain,
      fare: totalFare || 175,
      packageCategory: packageCategory || 'Documents',
    })

    navigate('/parcel/delivered')
  }

  const handleCopyLink = () => {
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleReassign = () => {
    // Select alternate captain from mockCaptains
    const alternateCaptain = mockCaptains.find((c) => c.id !== currentCaptain.id) || mockCaptains[1]
    setCaptain(alternateCaptain)
    setBookingStatus('searching')
    navigate('/parcel/searching')
  }

  const currentInfo = stageLabels[currentStatus] || stageLabels.matched

  return (
    <div className="flex flex-col min-h-full bg-white pb-6 relative">
      {/* Top Header */}
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate('/')}
        title="Live Delivery Tracking"
        subtitle={`Order #${currentCaptain.id.slice(-4).toUpperCase()}`}
        rightElement={
          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full hover:bg-gray-200"
          >
            <HelpCircle size={14} />
            <span>Help</span>
          </button>
        }
      />

      <div className="flex-1 flex flex-col px-4 space-y-3 pt-2">
        {/* Interactive Real Map Simulation with Moving Captain */}
        <div className="relative w-full h-44 rounded-3xl bg-slate-100 border border-gray-200 overflow-hidden shadow-inner flex flex-col justify-between">
          <div className="absolute inset-0">
            <RealMap 
              mode="tracking" 
              captainProgress={currentInfo.percent / 100} 
              interactive={false} 
              height="100%" 
            />
          </div>

          {/* Top Floating ETA Badge */}
          <div className="relative z-10 p-2.5 flex items-center justify-between pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs text-[10.5px] font-bold text-[#191919] border border-gray-200 flex items-center gap-1.5">
              <Clock size={12} className="text-amber-800" />
              <span>
                {currentStatus === 'matched' && 'ETA ~6 mins to pickup'}
                {currentStatus === 'pickup' && 'Captain arrived at pickup'}
                {currentStatus === 'pickedUp' && 'ETA ~18 mins to drop'}
                {currentStatus === 'inTransit' && 'ETA ~12 mins to drop'}
                {currentStatus === 'arriving' && 'ETA ~2 mins (Drop location)'}
                {currentStatus === 'delivered' && 'Delivered successfully'}
              </span>
            </span>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-2 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs text-[10px] font-bold text-blue-700 border border-blue-200 flex items-center gap-1 hover:bg-blue-50"
            >
              <Share2 size={11} /> Share
            </button>
          </div>

          {/* Simulated Route Path with Moving Vehicle */}
          <div className="relative z-10 my-auto py-2">
            <div className="relative w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-700" 
                style={{ width: `${currentInfo.percent}%` }}
              />
            </div>

            {/* Vehicle Icon on Progress Track */}
            <div 
              className="absolute -top-3 transition-all duration-700 -translate-x-1/2"
              style={{ left: `${Math.min(92, Math.max(8, currentInfo.percent))}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-[#191919] border-2 border-[#FFD21F] text-white flex items-center justify-center text-xs shadow-md">
                🛵
              </div>
            </div>

            {/* Pickup & Drop Points */}
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-700 mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {pickupLocation?.name || 'Pickup Point'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {dropLocation?.name || 'Drop Point'}
              </span>
            </div>
          </div>

          {/* Active status caption */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-gray-500">
            <span>Live GPS Audit Tracking Active</span>
            <span className="font-semibold text-emerald-600">● 4G Connected</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* REARRANGED ORDER OF SECTIONS AS REQUESTED                      */}
        {/* 1st: Driver details section                                    */}
        {/* 2nd: OTP section                                               */}
        {/* 3rd: Proof of pickup                                           */}
        {/* 4th: Captain assigned / Progress status                        */}
        {/* ============================================================== */}

        {/* 1ST: DRIVER DETAILS SECTION */}
        <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFD21F] flex items-center justify-center text-xl font-bold shadow-2xs">
                👨‍✈️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-[#191919]">{currentCaptain.name}</h3>
                  <span className="text-[10px] bg-white border border-gray-200 font-bold px-1.5 py-0.2 rounded text-amber-900">
                    ★ {currentCaptain.rating}
                  </span>
                </div>
                <p className="text-[11px] text-[#737373] leading-tight">
                  {currentCaptain.vehicleModel}
                </p>
                <p className="text-[11px] font-bold text-black leading-tight">
                  {currentCaptain.vehicleNumber}
                </p>
                <p className="text-[10px] text-emerald-600 font-medium leading-tight">
                  {currentCaptain.totalDeliveries}+ deliveries verified
                </p>
              </div>
            </div>

            {/* Quick Action Contacts */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert(`Calling Captain ${currentCaptain.name} (${currentCaptain.phone})...`)}
                className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                title="Call Captain"
              >
                <Phone size={15} />
              </button>
              <button 
                onClick={() => alert(`Opening chat with ${currentCaptain.name}...`)}
                className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors"
                title="Message Captain"
              >
                <MessageSquare size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 2ND: OTP SECTION */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-amber-950 flex items-center gap-1.5">
              <KeyRound size={15} className="text-amber-800" />
              Delivery Handover OTP (Secure Verification)
            </span>
          </div>

          <p className="text-[11px] text-amber-900 leading-tight">
            Share with recipient <strong className="text-black">{recipientName || 'Ayush Seal'}</strong>. The captain cannot complete delivery without this 4-digit code.
          </p>

          <div className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-amber-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 font-semibold">Handover OTP:</span>
              <span className="text-lg font-black tracking-widest text-[#191919] bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
                {deliveryOTP || '4829'}
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="text-xs font-bold text-amber-900 flex items-center gap-1 hover:underline px-2 py-1 bg-amber-50 rounded-lg"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Copied' : 'Share OTP'}</span>
            </button>
          </div>
        </div>

        {/* 3RD: PROOF OF PICKUP AUDIT */}
        <div className="p-3 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#191919] flex items-center gap-1.5">
              <Camera size={14} className="text-amber-800" />
              Proof of Pickup Audit
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              ['pickedUp', 'inTransit', 'arriving', 'delivered'].includes(currentStatus)
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {['pickedUp', 'inTransit', 'arriving', 'delivered'].includes(currentStatus)
                ? 'Verified ✓'
                : 'Pending Handover'}
            </span>
          </div>

          {['pickedUp', 'inTransit', 'arriving', 'delivered'].includes(currentStatus) ? (
            <div className="flex items-center gap-3 bg-[#F9F9F9] p-2 rounded-xl text-[11px] text-[#525252]">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xl overflow-hidden border border-gray-300">
                📦
              </div>
              <div>
                <p className="font-bold text-[#191919]">Timestamped Package Photo Recorded</p>
                <p className="text-[10px] text-gray-500">Ahiritola, Kolkata • GPS accuracy ±3m</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Tamper sleeve inspected</p>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-[#737373]">
              Captain will take a photo of your parcel before departing to guarantee initial condition.
            </p>
          )}
        </div>

        {/* 4TH: CAPTAIN ASSIGNED / PROGRESS STATUS HEADLINE */}
        <div className="bg-[#FFFBE6] rounded-2xl p-3.5 border border-amber-300/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <p className="text-xs font-black text-[#191919]">{currentInfo.title}</p>
            </div>
            <p className="text-[11px] text-[#737373]">{currentInfo.subtitle}</p>
          </div>
          <span className="text-xs font-black text-amber-900 bg-white px-2 py-1 rounded-lg border border-amber-200">
            {currentInfo.percent}% Done
          </span>
        </div>

        {/* Persistent Action Bar: Cancel / Reassign / Support */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setShowCancelModal(true)}
            className="py-2.5 px-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 flex items-center justify-center gap-1 transition-colors"
          >
            <Ban size={13} />
            <span>Cancel</span>
          </button>

          <button
            onClick={handleReassign}
            className="py-2.5 px-2 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl border border-gray-200 flex items-center justify-center gap-1 transition-colors active:scale-95 cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Reassign</span>
          </button>

          <button
            onClick={() => setShowHelpModal(true)}
            className="py-2.5 px-2 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl border border-gray-200 flex items-center justify-center gap-1 transition-colors"
          >
            <HelpCircle size={13} />
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* Share Tracking Bottom Sheet Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Live Parcel Tracking"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#525252] leading-relaxed">
            Send this live link to recipient <strong className="text-black">{recipientName}</strong> so they can view the approaching captain and access the delivery verification OTP.
          </p>

          <div className="p-3 bg-gray-100 rounded-xl text-xs font-mono text-gray-800 break-all border border-gray-200 flex items-center justify-between">
            <span>https://rapido.bike/track/parcel/{deliveryOTP}</span>
            <button
              onClick={handleCopyLink}
              className="ml-2 p-1.5 bg-white rounded-lg shadow-xs text-amber-900 hover:bg-amber-50"
            >
              {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                setShowShareModal(false)
                navigate('/receiver/demo')
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <span>Preview Receiver-Side Screen</span>
              <span>→</span>
            </button>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Handover OTP Verification Modal (Simulated Captain Handover Entry) */}
      <Modal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        title="Verify Delivery Handover OTP"
      >
        <div className="space-y-4 pt-1">
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-1">
            <p className="text-xs font-bold text-amber-900">
              Captain Handover Security Check
            </p>
            <p className="text-[11px] text-amber-800 leading-snug">
              Ask recipient for the 4-digit code sent to their mobile to complete this delivery.
            </p>
            <p className="text-[10px] text-gray-500 font-mono mt-1">
              [Judge Demo Note: Recipient OTP is <strong>{deliveryOTP}</strong>. Try wrong OTP to test error rejection.]
            </p>
          </div>

          {otpError && (
            <div className="p-2.5 bg-red-50 border border-red-300 text-red-700 text-xs font-semibold rounded-xl">
              {otpError}
            </div>
          )}

          <div className="space-y-1 text-center">
            <label className="text-xs font-bold text-[#191919] block mb-2">
              Enter 4-Digit Handover OTP
            </label>
            <input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => {
                setEnteredOtp(e.target.value)
                setOtpError('')
              }}
              placeholder="••••"
              className="w-36 text-center text-2xl font-black tracking-widest py-2 bg-gray-100 border-2 border-gray-300 rounded-xl focus:border-amber-400 focus:outline-hidden mx-auto block"
            />
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-xs rounded-xl shadow-xs"
            >
              Verify OTP & Complete Delivery
            </button>

            <button
              onClick={() => {
                setEnteredOtp(deliveryOTP)
              }}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs rounded-xl"
            >
              Auto-fill Correct OTP ({deliveryOTP})
            </button>
          </div>
        </div>
      </Modal>

      {/* Cancel Order Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Delivery?"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#525252] leading-relaxed">
            {['pickedUp', 'inTransit', 'arriving'].includes(currentStatus)
              ? 'Package has already been collected. Cancelling now will arrange safe return to sender with standard return fare.'
              : 'You can cancel free of charge before the captain reaches the pickup location.'}
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setShowCancelModal(false)
                setBookingStatus('cancelled')
                navigate('/')
              }}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-xs rounded-xl"
            >
              Keep Delivery
            </button>
          </div>
        </div>
      </Modal>

      {/* Help / Support Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Rapido Parcel Support"
      >
        <div className="space-y-3 pt-1 text-xs">
          <p className="text-[#525252]">Need help with this active delivery?</p>
          <div className="space-y-2">
            <button 
              onClick={() => alert('Connecting you to Rapido Priority Parcel Support...')}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-left font-bold text-[#191919] hover:bg-gray-100 flex items-center justify-between"
            >
              <span>💬 Chat with Parcel Support Executive</span>
              <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/error/delayed')}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-left font-bold text-[#191919] hover:bg-gray-100 flex items-center justify-between"
            >
              <span>⏰ Delivery is delayed</span>
              <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/error/recipient-unavailable')}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-left font-bold text-[#191919] hover:bg-gray-100 flex items-center justify-between"
            >
              <span>📞 Recipient is unreachable</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
