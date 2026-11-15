import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Clock, 
  Heart, 
  Sparkles, 
  ChevronRight,
  Zap,
  ShieldCheck,
  MapPin,
  Lock
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { mockLocations } from '../data/mockData'
import RealMap from '../components/shared/RealMap'

// 3D Parcel Packages Illustration for Card 1
function ParcelPackagesSvg() {
  return (
    <svg viewBox="0 0 68 52" className="w-13 h-10 select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back Box */}
      <rect x="10" y="10" width="28" height="28" rx="3" fill="#d97706" stroke="#b45309" strokeWidth="1" />
      <line x1="24" y1="10" x2="24" y2="38" stroke="#fef3c7" strokeWidth="2.5" />
      <line x1="10" y1="24" x2="38" y2="24" stroke="#fef3c7" strokeWidth="2.5" />
      {/* Front Box */}
      <rect x="25" y="18" width="28" height="26" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <line x1="39" y1="18" x2="39" y2="44" stroke="#fef3c7" strokeWidth="2.5" />
      <line x1="25" y1="31" x2="53" y2="31" stroke="#fef3c7" strokeWidth="2.5" />
      {/* Front Accent Label */}
      <rect x="28" y="22" width="7" height="5" rx="1" fill="#fffbeb" opacity="0.9" />
      {/* Purple / Magenta Shopping Bag */}
      <rect x="42" y="24" width="18" height="22" rx="2.5" fill="#ec4899" />
      <path d="M47 24 C47 19 55 19 55 24" stroke="#be185d" strokeWidth="2" fill="none" />
      {/* Blue Shopping Bag */}
      <rect x="2" y="24" width="16" height="20" rx="2" fill="#3b82f6" />
      <path d="M6 24 C6 19 14 19 14 24" stroke="#1d4ed8" strokeWidth="2" fill="none" />
    </svg>
  )
}

// Speeding Bike Taxi Illustration for Card 2
function BikeTaxiSpeedSvg() {
  return (
    <svg viewBox="0 0 74 52" className="w-14 h-10 select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Speed lines */}
      <line x1="4" y1="22" x2="16" y2="22" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="1" y1="28" x2="13" y2="28" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="34" x2="18" y2="34" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />

      {/* Wheels */}
      <circle cx="24" cy="38" r="9" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <circle cx="56" cy="38" r="9" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <circle cx="24" cy="38" r="3" fill="#e2e8f0" />
      <circle cx="56" cy="38" r="3" fill="#e2e8f0" />

      {/* Bike Chassis */}
      <path d="M24 38 L38 36 L48 26 L56 38" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 36 L44 38" stroke="#334155" strokeWidth="3" />

      {/* Rider Helmet & Yellow Delivery Bag */}
      <rect x="26" y="16" width="11" height="14" rx="2.5" fill="#FFD21F" stroke="#ca8a04" strokeWidth="1.2" />
      {/* Rider Body */}
      <path d="M36 20 L42 27 L48 28" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Rider Helmet */}
      <circle cx="39" cy="13" r="6" fill="#FFD21F" stroke="#ca8a04" strokeWidth="1.2" />
      <path d="M41 12 L45 13 L43 16 Z" fill="#0f172a" />
    </svg>
  )
}

// Full Courier Bike Rider on Motorcycle with Parcel Box for Blue Hero Banner
function CourierMotorcycleHeroSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-28 h-20 drop-shadow-md select-none flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Motion Speed Lines */}
      <path d="M10 75 H35 M5 82 H28 M15 90 H38" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Rear Wheel */}
      <circle cx="42" cy="78" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
      <circle cx="42" cy="78" r="12" fill="#0f172a" />
      <circle cx="42" cy="78" r="5" fill="#e2e8f0" />
      <line x1="42" y1="60" x2="42" y2="96" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="24" y1="78" x2="60" y2="78" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Front Wheel */}
      <circle cx="128" cy="78" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
      <circle cx="128" cy="78" r="12" fill="#0f172a" />
      <circle cx="128" cy="78" r="5" fill="#e2e8f0" />
      <line x1="128" y1="60" x2="128" y2="96" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="110" y1="78" x2="146" y2="78" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Motorcycle Frame & Engine */}
      <path d="M42 78 L68 76 L86 80 L76 60 Z" fill="#334155" />
      <path d="M66 75 L84 75 L80 62 L62 62 Z" fill="#64748b" />
      {/* Exhaust Pipe */}
      <path d="M68 78 L48 83 L28 83" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

      {/* Front Fork & Mudguard */}
      <path d="M106 42 L128 78" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M112 62 A18 18 0 0 1 140 68" stroke="#FFD21F" strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* Fuel Tank (Rapido Yellow & Black) */}
      <path d="M84 50 C88 44 98 44 105 48 C105 54 94 58 84 54 Z" fill="#FFD21F" stroke="#ca8a04" strokeWidth="1" />
      <path d="M90 49 C94 46 99 46 103 48" stroke="#191919" strokeWidth="2.5" strokeLinecap="round" />

      {/* Headlight */}
      <path d="M112 43 L118 45 L116 51 L110 49 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      <ellipse cx="120" cy="46" rx="4" ry="7" fill="#fef08a" opacity="0.8" />

      {/* Motorcycle Seat */}
      <path d="M60 54 C66 52 78 52 84 54 C82 58 64 58 60 54 Z" fill="#0f172a" />

      {/* Rear Luggage Carrier Rack */}
      <rect x="36" y="52" width="22" height="4" rx="2" fill="#94a3b8" />

      {/* Big Parcel Box strapped on rear rack */}
      <rect x="34" y="28" width="26" height="24" rx="3" fill="#d97706" stroke="#b45309" strokeWidth="1" />
      {/* Parcel Box Tape Cross */}
      <line x1="47" y1="28" x2="47" y2="52" stroke="#fde68a" strokeWidth="2.5" />
      <line x1="34" y1="40" x2="60" y2="40" stroke="#fde68a" strokeWidth="2.5" />
      <rect x="37" y="32" width="6" height="4" rx="0.5" fill="#f59e0b" />

      {/* Courier Rider Body */}
      <path d="M72 54 L68 68 L78 74" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 74 L84 75" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />

      {/* Rider Torso & Blue Uniform */}
      <path d="M74 48 C72 38 78 30 88 32 C92 36 90 46 80 50 Z" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1" />
      <path d="M82 32 L88 44" stroke="#FFD21F" strokeWidth="2.5" strokeLinecap="round" />

      {/* Rider Arm & Handle Grip */}
      <path d="M84 36 L98 42 L106 43" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="106" cy="43" r="3.5" fill="#0f172a" />

      {/* Rider Helmet (Rapido Bright Yellow) */}
      <ellipse cx="90" cy="20" rx="9" ry="9" fill="#FFD21F" stroke="#ca8a04" strokeWidth="1.5" />
      <path d="M93 17 C97 18 99 22 97 25 L92 25 Z" fill="#0f172a" />
      <path d="M85 15 C88 13 93 14 95 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const {
    bookingStatus,
    setDropLocation,
  } = useAppStore()

  // Active delivery check
  const hasActiveOrder = ['searching', 'matched', 'pickup', 'pickedUp', 'inTransit', 'arriving'].includes(bookingStatus)

  // Handle clicking a recent location
  const handleSelectRecent = (loc: typeof mockLocations[0]) => {
    setDropLocation(loc)
    navigate('/parcel/location')
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f5f7] relative overflow-hidden font-sans select-none">
      {/* ============================================================== */}
      {/* 1. TOP REAL MAP BACKGROUND (Visible Sovabazar/Ahiritola Streets) */}
      {/* ============================================================== */}
      <div className="relative h-24 w-full bg-[#dfe5ee] overflow-hidden flex-shrink-0 border-b border-gray-200">
        <RealMap mode="pickup" interactive={false} height="100%" />

        {/* Current Location Floating Pill (Exact from Screenshot) */}
        <div className="absolute top-2 left-3 right-3 z-10 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1 shadow-sm border border-gray-200/90 flex items-center gap-2 max-w-full">
            <div className="w-2 h-2 rounded-full border-2 border-emerald-500 bg-white flex-shrink-0" />
            <span className="text-[10px] font-semibold text-gray-800 truncate">
              32B, Brindaban Basak St, Ahiritola, Beniatola, Kolkata
            </span>
          </div>
        </div>

        {/* Active Parcel Delivery Floating Pill */}
        {hasActiveOrder && (
          <div 
            onClick={() => navigate('/parcel/tracking')}
            className="absolute bottom-1.5 left-3 right-3 z-20 bg-[#191919] text-white rounded-xl px-2.5 py-1 shadow-md flex items-center justify-between cursor-pointer border border-[#FFD21F]/40 animate-pulse"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
              <span className="text-[9px] font-bold text-white">
                Active Parcel: Captain approaching drop location
              </span>
            </div>
            <span className="text-[9px] font-bold text-[#FFD21F] flex items-center gap-0.5">
              Track <ChevronRight size={10} />
            </span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN BOTTOM SHEET (Zero-Scroll Production Layout)           */}
      {/* ============================================================== */}
      <div className="flex-1 bg-white rounded-t-[20px] -mt-2.5 shadow-lg z-10 flex flex-col justify-between overflow-hidden border-t border-gray-100 px-3.5 pb-2.5 pt-1">
        {/* Subtle Drag Handle */}
        <div className="flex justify-center pb-0.5 flex-shrink-0">
          <div className="w-8 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* SECTION A: Search Input & Recents List */}
        <div className="space-y-1">
          {/* "Where do you want to go?" Search Input Box */}
          <div className="relative">
            <div 
              onClick={() => navigate('/parcel/location')}
              className="bg-white rounded-full border border-gray-200 px-3.5 py-1.5 shadow-xs hover:border-gray-400 cursor-pointer flex items-center gap-2.5 transition-colors"
            >
              <Search size={13} className="text-gray-800 flex-shrink-0 stroke-[2.2]" />
              <span className="text-[11px] font-semibold text-gray-900">
                Where do you want to go?
              </span>
            </div>
            {/* Real Rapido yellow underline accent */}
            <div className="mx-auto w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD21F] to-transparent mt-0.5" />
          </div>

          {/* Saved / Recent Destinations List */}
          <div className="space-y-0 text-xs">
            {/* Item 1: Jadavpur University */}
            <div 
              onClick={() => handleSelectRecent(mockLocations[1])}
              className="py-0.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 -mx-1 px-1 rounded-lg transition-colors border-b border-gray-100/70"
            >
              <div className="flex items-center gap-2 truncate">
                <Clock size={11} className="text-gray-400 flex-shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-[#191919] text-[10px] leading-tight">Jadavpur University</p>
                  <p className="text-[8px] text-gray-500 truncate leading-none">
                    Raja Subodh Chandra Mallick Road, Jadavpur, Kolk...
                  </p>
                </div>
              </div>
              <Heart size={11} className="text-gray-400 flex-shrink-0 hover:text-red-500 ml-1" />
            </div>

            {/* Item 2: Jadavpur 8B */}
            <div 
              onClick={() => handleSelectRecent(mockLocations[2])}
              className="py-0.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 -mx-1 px-1 rounded-lg transition-colors border-b border-gray-100/70"
            >
              <div className="flex items-center gap-2 truncate">
                <Clock size={11} className="text-gray-400 flex-shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-[#191919] text-[10px] leading-tight">Jadavpur 8B</p>
                  <p className="text-[8px] text-gray-500 truncate leading-none">
                    Central Road, Bidhanpally, Jadavpur, Kolkata, Wes...
                  </p>
                </div>
              </div>
              <Heart size={11} className="text-gray-400 flex-shrink-0 hover:text-red-500 ml-1" />
            </div>

            {/* Item 3: Howrah Railway Station */}
            <div 
              onClick={() => handleSelectRecent(mockLocations[3])}
              className="py-0.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 -mx-1 px-1 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Clock size={11} className="text-gray-400 flex-shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-[#191919] text-[10px] leading-tight">Howrah Railway Station</p>
                  <p className="text-[8px] text-gray-500 truncate leading-none">
                    Howrah, West Bengal, India
                  </p>
                </div>
              </div>
              <Heart size={11} className="text-gray-400 flex-shrink-0 hover:text-red-500 ml-1" />
            </div>
          </div>
        </div>

        {/* SECTION B: 4 BLOCKS SECTION: EVERYTHING IN MINUTES */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-black text-[#191919] tracking-tight">
              Everything In Minutes
            </h2>
            <span className="text-[7.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1 shadow-2xs">
              <Sparkles size={8} className="text-emerald-600" /> 100% Safe Handover
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {/* CARD 1: BIKE TAXI (1ST BOX) */}
            <div
              onClick={() => alert('Rapido Bike Taxi selected.')}
              className="rounded-2xl bg-[#f8f9fb] border border-gray-200/90 p-2 cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between h-15 shadow-2xs group"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[7.5px] text-gray-500 font-medium leading-none">Beat the traffic</p>
                  <p className="text-[11.5px] font-bold text-[#191919] leading-tight">Bike Taxi</p>
                </div>
              </div>

              {/* Speeding Bike Taxi Art */}
              <div className="group-hover:scale-105 transition-transform">
                <BikeTaxiSpeedSvg />
              </div>
            </div>

            {/* CARD 2: PARCEL (2ND BOX - ELEVATED WITH YELLOW BORDER & 1ST FREE BADGE) */}
            <div
              onClick={() => navigate('/parcel')}
              className="relative rounded-2xl bg-[#fffef7] border-2 border-[#FFD21F] p-2 cursor-pointer hover:bg-[#fff9e6] transition-all flex items-center justify-between h-15 shadow-2xs group"
            >
              {/* 1ST FREE Top-Right Tag */}
              <span className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full bg-[#191919] text-[#FFD21F] text-[7px] font-black tracking-wider uppercase shadow-2xs">
                1ST FREE
              </span>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-[7.5px] text-gray-500 font-semibold leading-none">Send anything</p>
                  <p className="text-[12px] font-black text-[#191919] leading-tight">Parcel</p>
                </div>
                <div className="text-[7.5px] font-bold text-amber-950 bg-[#FFF8DC] px-1.5 py-0.2 rounded border border-amber-200 inline-block w-fit">
                  From ₹25*
                </div>
              </div>

              {/* 3D Parcel Packages & Shopping Bags Art */}
              <div className="group-hover:scale-105 transition-transform">
                <ParcelPackagesSvg />
              </div>
            </div>

            {/* CARD 3: BOOK NOW (Cabs & Auto) */}
            <div
              onClick={() => alert('Rapido Everyday Rides (Auto / Cab) selected.')}
              className="rounded-xl bg-[#f8f9fb] border border-gray-200/80 p-1.5 cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between h-10 shadow-2xs"
            >
              <div>
                <p className="text-[7px] text-gray-500 font-medium leading-none">Everyday rides</p>
                <p className="text-[9.5px] font-bold text-[#191919]">Book now</p>
              </div>
              <div className="flex items-center gap-0.5 text-sm leading-none">
                🚗🛺
              </div>
            </div>

            {/* CARD 4: ALL SERVICES */}
            <div
              onClick={() => navigate('/parcel/pass')}
              className="rounded-xl bg-[#f8f9fb] border border-gray-200/80 p-1.5 cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between h-10 shadow-2xs"
            >
              <div>
                <p className="text-[9.5px] font-bold text-[#191919]">All Services</p>
                <p className="text-[7px] text-gray-400 leading-none">Parcel Pass & more</p>
              </div>
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <div className="bg-gray-300 rounded-2xs" />
                <div className="bg-[#FFD21F] rounded-2xs" />
                <div className="bg-gray-300 rounded-2xs" />
                <div className="bg-gray-300 rounded-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION C: THE ELECTRIC BLUE PROMOTIONAL BANNER SECTION        */}
        {/* (Exact Replica matching screenshot: pills, courier rider, etc) */}
        {/* ============================================================== */}
        <div 
          onClick={() => navigate('/parcel')}
          className="rounded-2xl bg-gradient-to-r from-[#003db3] via-[#0057df] to-[#0c6cf5] text-white p-2.5 shadow-md border border-blue-400/40 cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-300/20 rounded-full blur-xl pointer-events-none" />

          {/* Top Row: 3 Badges */}
          <div className="flex items-center justify-between z-10 gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[7.5px] bg-[#FFD21F] text-black font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs leading-none">
                FREEPARCEL • 1ST PARCEL FREE
              </span>
              <span className="text-[7.5px] font-bold text-amber-300 bg-[#3a2000]/70 border border-amber-400/40 px-1.5 py-0.5 rounded-full leading-none">
                From ₹25*
              </span>
            </div>
            <span className="text-[7.5px] font-bold text-emerald-300 bg-[#003828]/80 border border-emerald-400/50 px-2 py-0.5 rounded-full flex items-center gap-0.5 leading-none shadow-2xs">
              <Zap size={8} className="fill-emerald-300 text-emerald-300" /> ~2 min pickup
            </span>
          </div>

          {/* Middle Row: Headlines + Courier Rider Motorcycle SVG */}
          <div className="flex items-center justify-between z-10 py-1">
            <div className="space-y-0.5 pr-1">
              <h2 className="text-[14px] font-black tracking-tight text-white uppercase leading-none drop-shadow-xs">
                SEND PACKAGES.
              </h2>
              <h3 className="text-[12px] font-black text-[#FFD21F] leading-tight drop-shadow-xs">
                We'll handle the journey.
              </h3>
              <p className="text-[8.5px] text-blue-100 font-medium leading-snug mt-0.5 max-w-[190px]">
                Fast, secure city courier on Rapido's 2-wheeler network across Kolkata.
              </p>
            </div>

            {/* Courier Rider Art */}
            <div className="group-hover:scale-105 transition-transform">
              <CourierMotorcycleHeroSvg />
            </div>
          </div>

          {/* Bottom Row: 3 Feature Badges + Yellow "Send Now →" CTA */}
          <div className="flex items-center justify-between z-10 pt-1 border-t border-blue-400/30">
            <div className="flex items-center gap-1.5 text-[7.5px] text-blue-100 font-semibold">
              <span className="flex items-center gap-0.5">📦 Any item up to 20kg</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><Lock size={8} className="text-cyan-300" /> Secure OTP & Photo proof</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><MapPin size={8} className="text-pink-300" /> Live tracking</span>
            </div>

            <div className="bg-[#FFD21F] group-hover:bg-[#ffe043] text-black font-black text-[9px] px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 transition-transform active:scale-95 flex-shrink-0">
              <span>Send Now</span>
              <span className="text-[10px] leading-none">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
