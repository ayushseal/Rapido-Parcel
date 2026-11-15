import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Package, 
  KeyRound, 
  Phone, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Camera, 
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { mockCaptains } from '../data/mockData'

export default function ReceiverTrackingScreen() {
  const navigate = useNavigate()
  const {
    deliveryOTP,
    bookingStatus,
    captain,
    pickupLocation,
    dropLocation,
    packageCategory,
  } = useAppStore()

  const [copiedOtp, setCopiedOtp] = useState(false)
  const currentCaptain = captain || mockCaptains[0]
  const currentOtp = deliveryOTP || '4829'

  const handleCopy = () => {
    setCopiedOtp(true)
    setTimeout(() => setCopiedOtp(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-8 font-sans">
      {/* Standalone Recipient Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3.5 safe-top flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFD21F] flex items-center justify-center font-black text-black text-sm shadow-xs">
            R
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#191919]">Rapido Parcel Track</h1>
            <p className="text-[10px] text-gray-500">Recipient Handover Portal</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/parcel/tracking')}
          className="text-xs text-amber-900 bg-amber-100 font-bold px-2.5 py-1 rounded-lg hover:bg-amber-200 flex items-center gap-1"
        >
          <ArrowLeft size={12} />
          <span>Sender View</span>
        </button>
      </header>

      <div className="flex-1 px-4 space-y-4 pt-3">
        {/* Recipient Announcement Hero */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-white p-4 space-y-1 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full inline-block">
            Incoming Parcel
          </span>
          <h2 className="text-base font-black">
            A package is on its way to you!
          </h2>
          <p className="text-xs text-amber-100">
            From {pickupLocation?.name || 'Ahiritola, Kolkata'} • Est. arrival in ~12 mins
          </p>
        </div>

        {/* PRIMARY TOUCHPOINT: THE RECIPIENT DELIVERY OTP */}
        <div className="rounded-3xl bg-white p-5 border-2 border-amber-400 shadow-sm space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <KeyRound size={14} className="text-amber-800" />
            <span>Your Delivery Verification OTP</span>
          </div>

          <div className="py-1">
            <span className="text-4xl font-black tracking-widest text-[#191919] font-mono bg-[#FFFBE6] px-5 py-2 rounded-2xl border-2 border-amber-300 inline-block shadow-inner">
              {currentOtp}
            </span>
          </div>

          <div className="space-y-1 max-w-xs mx-auto">
            <p className="text-xs font-bold text-amber-950">
              Share this code with the captain ONLY after you receive the package.
            </p>
            <p className="text-[11px] text-[#737373]">
              The captain cannot mark this delivery completed without this 4-digit code.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#191919] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedOtp ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copiedOtp ? 'OTP Copied' : 'Copy 4-Digit OTP'}</span>
          </button>
        </div>

        {/* Live Delivery Status Stepper */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#191919] flex items-center gap-1.5">
              <Clock size={14} className="text-amber-800" /> Live Status
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ● In Transit
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-gray-700">Picked up from sender (Photo verified)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-bold text-[#191919]">Captain moving towards your address</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span>Handover confirmation via your OTP</span>
            </div>
          </div>
        </div>

        {/* Captain Details & Contact */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFD21F] flex items-center justify-center text-xl font-bold">
                👨‍✈️
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#191919]">{currentCaptain.name}</h3>
                <p className="text-[11px] text-gray-500">
                  {currentCaptain.vehicleModel} • <strong className="text-black">{currentCaptain.vehicleNumber}</strong>
                </p>
                <p className="text-[10px] text-amber-900 font-semibold">★ {currentCaptain.rating} (Verified Captain)</p>
              </div>
            </div>

            <button
              onClick={() => alert(`Calling Captain ${currentCaptain.name}...`)}
              className="p-2.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              title="Call Captain"
            >
              <Phone size={16} />
            </button>
          </div>
        </div>

        {/* Trust Shield Note */}
        <div className="p-3 bg-white rounded-2xl border border-gray-200 text-center space-y-1 text-xs text-gray-500">
          <div className="flex items-center justify-center gap-1 font-bold text-gray-800">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Protected by Rapido 3-Layer Trust Shield</span>
          </div>
          <p className="text-[10px]">
            GPS audit trail active • Timestamped photo logged • Secure OTP verified
          </p>
        </div>
      </div>
    </div>
  )
}
