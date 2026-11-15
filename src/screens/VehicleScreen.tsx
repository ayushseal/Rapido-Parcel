import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Crosshair, 
  Tag, 
  ChevronRight, 
  TrendingUp, 
  RotateCcw, 
  PackageCheck, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Lock
} from 'lucide-react'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { mockLocations } from '../data/mockData'
import { generateOTP } from '../utils/helpers'
import RealMap from '../components/shared/RealMap'

export default function VehicleScreen() {
  const navigate = useNavigate()
  const {
    selectedVehicle,
    setSelectedVehicle,
    addPackaging,
    setAddPackaging,
    setDeliveryOTP,
    setBookingStatus,
    setFare,
  } = useAppStore()

  // Base price from real screenshot: ₹175 for Bike, ₹230 for Auto
  const basePrice = selectedVehicle === 'auto' ? 230 : 175
  const [biddingDelta, setBiddingDelta] = useState(0) // slider delta: -10, 0, +10, +20, +30, +40
  const [showBiddingSheet, setShowBiddingSheet] = useState(false)
  const [payAt, setPayAt] = useState<'Pickup' | 'Drop'>('Pickup')
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Wallet'>('Cash')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showOffersModal, setShowOffersModal] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState('DIWALI100')

  // Packaging fee
  const packagingFee = addPackaging ? 15 : 0
  const currentFare = basePrice + biddingDelta + packagingFee

  const handleBook = () => {
    // Generate secure 4-digit handover OTP
    const otp = generateOTP()
    setDeliveryOTP(otp)
    setFare({
      baseFare: basePrice,
      distanceFare: 0,
      packagingFee: packagingFee,
      discount: appliedPromo ? 20 : 0,
      totalFare: currentFare,
    })
    setBookingStatus('searching')
    navigate('/parcel/searching')
  }

  return (
    <div className="flex flex-col h-full bg-[#dfe5ee] relative overflow-hidden font-sans">
      {/* ============================================================== */}
      {/* 1. REAL MAP BACKGROUND WITH ROUTE OVER HOOGHLY RIVER          */}
      {/* ============================================================== */}
      <div className="relative h-36 w-full bg-[#d0d9e5] flex-shrink-0 overflow-hidden border-b border-gray-200">
        <RealMap mode="route" interactive={false} height="100%" />

        {/* Circular Back Button on Map */}
        <button
          onClick={() => navigate('/parcel/location')}
          className="absolute top-2.5 left-3 w-7 h-7 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center z-20 hover:bg-gray-100"
        >
          <ArrowLeft size={15} />
        </button>

        {/* Circular GPS Target Button */}
        <button
          onClick={() => alert('Recentered route.')}
          className="absolute top-2.5 right-3 w-7 h-7 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center z-20 hover:bg-gray-100"
        >
          <Crosshair size={15} />
        </button>

        {/* Floating Route Pill */}
        <div className="absolute top-2 left-12 right-12 z-10 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-0.5 shadow-sm text-center border border-gray-200 pointer-events-none">
          <p className="text-[9.5px] font-bold text-gray-800 truncate">
            Ahiritola ➔ Jadavpur University (~13.2 km)
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. BOTTOM BOOKING SHEET (Exact from Screenshot 3)              */}
      {/* ============================================================== */}
      <div className="flex-1 bg-white rounded-t-[28px] -mt-2 shadow-lg z-10 flex flex-col overflow-hidden border-t border-gray-100">
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
          <div className="w-9 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Scrollable Sheet Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-3 pb-3">
          {/* VEHICLE OPTION CARD 1: Parcel on Bike (Exact from Screenshot 3) */}
          <div
            onClick={() => setSelectedVehicle('bike')}
            className={`rounded-2xl p-3 border-2 cursor-pointer transition-all flex items-center justify-between ${
              selectedVehicle !== 'auto'
                ? 'border-[#2563eb] bg-[#f0f7ff] shadow-xs'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Real Rapido yellow chevron paper bag icon */}
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shadow-2xs">
                🛍️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-[#191919]">Parcel on Bike</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                    FASTEST
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Send upto 20 kgs</p>
                <p className="text-[10px] text-gray-600">2 mins away • Drop 11:26 pm</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-black text-[#191919]">
                ₹{175 + biddingDelta + packagingFee}
              </span>
            </div>
          </div>

          {/* VEHICLE OPTION CARD 2: Auto Parcel (Redesign Innovation for Heavy Items) */}
          <div
            onClick={() => setSelectedVehicle('auto')}
            className={`rounded-2xl p-3 border-2 cursor-pointer transition-all flex items-center justify-between ${
              selectedVehicle === 'auto'
                ? 'border-[#2563eb] bg-[#f0f7ff] shadow-xs'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shadow-2xs">
                🛺
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-[#191919]">Auto Parcel (3-Wheeler)</h3>
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                    LARGE
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">For heavy cartons & luggage</p>
                <p className="text-[10px] text-gray-600">3 mins away • Covered transport</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-black text-[#191919]">
                ₹{230 + biddingDelta + packagingFee}
              </span>
            </div>
          </div>

          {/* Tamper-Evident Packaging Sleeve Toggle (Trust Shield Innovation) */}
          <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck size={16} className="text-amber-800" />
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Add Tamper-Evident Security Sleeve (+₹15)
                </p>
                <p className="text-[9px] text-amber-800">
                  Barcoded, waterproof seal inspected at pickup & drop
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={addPackaging}
              onChange={(e) => setAddPackaging(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
          </div>

          {/* Flexible Price / Bidding Launcher (Exact from Screenshot 5) */}
          <div 
            onClick={() => setShowBiddingSheet(true)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-between cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-emerald-600" />
              <span className="font-bold text-gray-800 text-[11px]">
                {biddingDelta !== 0 ? `Custom price set: ₹${currentFare}` : 'Set a price that works for you (Bidding)'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5">
              Adjust <ChevronRight size={13} />
            </span>
          </div>

          {/* Payment Method & Offers Row (Exact from Screenshot 3) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Cash Selector */}
            <div 
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <span>💵</span>
                <span>{paymentMethod}</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </div>

            {/* Offers Selector */}
            <div 
              onClick={() => setShowOffersModal(true)}
              className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 truncate">
                <Tag size={13} />
                <span className="truncate">{appliedPromo || '% Offers'}</span>
              </div>
              <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* PAY AT: Pickup vs Drop Toggle (Exact from Screenshot 3) */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-bold text-gray-700">PAY AT</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPayAt('Pickup')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  payAt === 'Pickup'
                    ? 'bg-[#1e3a5f] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pickup
              </button>
              <button
                onClick={() => setPayAt('Drop')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  payAt === 'Drop'
                    ? 'bg-[#1e3a5f] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Drop
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BIG YELLOW BOOKING CTA (Exact from Screenshot 3)               */}
        {/* ============================================================== */}
        <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleBook}
            className="w-full py-3.5 bg-[#FFC72C] hover:bg-[#f0ba24] text-black font-bold text-sm rounded-full shadow-xs active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
          >
            <span>Book Parcel on {selectedVehicle === 'auto' ? 'Auto' : 'Bike'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BIDDING SHEET MODAL (Exact from Screenshot 5)                  */}
      {/* ============================================================== */}
      <Modal
        isOpen={showBiddingSheet}
        onClose={() => setShowBiddingSheet(false)}
        title=""
      >
        <div className="space-y-4 pt-1 text-center font-sans">
          <h2 className="text-base font-black text-gray-900 leading-tight">
            Now you can set a price<br />that works for you
          </h2>

          {/* Price Card */}
          <div className="w-48 mx-auto py-3 bg-[#f8f9fa] rounded-2xl border border-gray-200 shadow-inner">
            <span className="text-3xl font-black text-gray-900">
              ₹{basePrice + biddingDelta}
            </span>
          </div>

          {/* Higher chance of getting a ride indicator */}
          <p className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
            <TrendingUp size={14} />
            <span>Higher chance of getting a ride</span>
          </p>

          {/* Slider with -10, 0, +10, +20, +30, +40 */}
          <div className="space-y-2 max-w-xs mx-auto px-2">
            <div className="flex justify-between text-[11px] font-bold text-gray-600 px-1">
              <span>-10</span>
              <span>◆</span>
              <span className="text-emerald-600">+10</span>
              <span className="text-emerald-600">+20</span>
              <span className="text-emerald-600">+30</span>
              <span className="text-emerald-600">+40</span>
            </div>

            <input
              type="range"
              min={-10}
              max={40}
              step={10}
              value={biddingDelta}
              onChange={(e) => setBiddingDelta(Number(e.target.value))}
              className="w-full h-2 bg-emerald-500 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Reset to Base Price */}
          <button
            onClick={() => setBiddingDelta(0)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            <RotateCcw size={13} />
            <span>Reset to ₹{basePrice}</span>
          </button>

          {/* Book with New Price CTA */}
          <button
            onClick={() => {
              setShowBiddingSheet(false)
              handleBook()
            }}
            className="w-full py-3.5 bg-[#FFC72C] text-black font-bold text-xs rounded-full shadow-xs"
          >
            Book Parcel on {selectedVehicle === 'auto' ? 'Auto' : 'Bike'} for ₹{currentFare}
          </button>
        </div>
      </Modal>

      {/* Payment Selection Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Select Payment Method"
      >
        <div className="space-y-2 pt-1 text-xs">
          {['Cash', 'UPI', 'Wallet'].map((m) => (
            <div
              key={m}
              onClick={() => {
                setPaymentMethod(m as any)
                setShowPaymentModal(false)
              }}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === m ? 'border-black bg-amber-50 font-bold' : 'border-gray-200'
              }`}
            >
              <span>{m === 'Cash' ? '💵 Cash on Handover' : m === 'UPI' ? '📱 UPI (GPay / PhonePe)' : '💳 Rapido Wallet (₹120)'}</span>
              {paymentMethod === m && <Check size={16} className="text-black" />}
            </div>
          ))}
        </div>
      </Modal>

      {/* Offers Modal */}
      <Modal
        isOpen={showOffersModal}
        onClose={() => setShowOffersModal(false)}
        title="Available Offers"
      >
        <div className="space-y-2 pt-1 text-xs">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-red-900">DIWALI100</p>
              <p className="text-[10px] text-red-700">First parcel delivery free (up to ₹50)</p>
            </div>
            <button
              onClick={() => {
                setAppliedPromo('DIWALI100')
                setShowOffersModal(false)
              }}
              className="text-xs bg-red-700 text-white px-3 py-1 rounded-lg font-bold"
            >
              Applied ✓
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
