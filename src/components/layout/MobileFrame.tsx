import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  RotateCcw, 
  AlertTriangle, 
  Sparkles, 
  Wifi, 
  ChevronRight,
  Route
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface MobileFrameProps {
  children: React.ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const resetDemo = useAppStore((state) => state.resetDemo)

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#070b12] to-black p-1 md:py-2 md:px-3 select-none font-sans text-white">
      {/* ============================================================== */}
      {/* DESKTOP LEFT PANEL: NEW FEATURES & EXCEPTION SCENARIOS         */}
      {/* ============================================================== */}
      <div className="hidden lg:flex flex-col gap-2 w-68 xl:w-72 h-[min(670px,calc(100vh-16px))] mr-2.5 xl:mr-4 overflow-hidden py-0.5 flex-shrink-0 justify-between">
        {/* Brand Header */}
        <div className="flex items-center justify-between bg-slate-900/95 backdrop-blur-xl rounded-xl p-2.5 border border-slate-700/70 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFD21F] flex items-center justify-center text-black font-black text-xs shadow-sm shadow-[#FFD21F]/30">
              R
            </div>
            <div>
              <h1 className="text-xs font-extrabold text-white tracking-tight flex items-center gap-1.5">
                Rapido Parcel
                <span className="text-[9px] bg-[#FFD21F] text-black font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
                  REDESIGN
                </span>
              </h1>
            </div>
          </div>

          <button
            onClick={() => {
              resetDemo()
              navigate('/')
            }}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/80 shadow-2xs"
            title="Reset Demo State"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        {/* BOX 1: NEW FEATURES (Compact High-Contrast Showcase) */}
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl rounded-xl p-2.5 border border-slate-700/70 shadow-xl space-y-1.5">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-800">
            <div className="w-5 h-5 rounded-md bg-[#FFD21F]/15 border border-[#FFD21F]/30 flex items-center justify-center text-[#FFD21F]">
              <Sparkles size={11} />
            </div>
            <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFD21F]">
              New Features
            </h2>
          </div>

          <div className="space-y-1 text-xs">
            {/* Feature 1 */}
            <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-[#FFD21F]/40 rounded-lg py-1 px-2 transition-all">
              <p className="font-bold text-[#FFD21F] text-[11px] leading-tight">
                &lt;3s Discoverability
              </p>
              <p className="text-slate-200 text-[9.5px] mt-0.5 leading-tight">
                Elevated in "Everything In Minutes" & bottom nav tab.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-[#FFD21F]/40 rounded-lg py-1 px-2 transition-all">
              <p className="font-bold text-[#FFD21F] text-[11px] leading-tight">
                Smart Package Sizing
              </p>
              <p className="text-slate-200 text-[9.5px] mt-0.5 leading-tight">
                Bike (up to 20kg) vs Auto Parcel matching stops refusals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-[#FFD21F]/40 rounded-lg py-1 px-2 transition-all">
              <p className="font-bold text-[#FFD21F] text-[11px] leading-tight">
                Prohibited-Items Guardrail
              </p>
              <p className="text-slate-200 text-[9.5px] mt-0.5 leading-tight">
                Real-time keyword filter screens cash/gold/valuables.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-[#FFD21F]/40 rounded-lg py-1 px-2 transition-all">
              <p className="font-bold text-[#FFD21F] text-[11px] leading-tight">
                3-Layer Trust Shield
              </p>
              <p className="text-slate-200 text-[9.5px] mt-0.5 leading-tight">
                Pre-screening + Pickup photo audit + Receiver 4-digit OTP.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-[#FFD21F]/40 rounded-lg py-1 px-2 transition-all">
              <p className="font-bold text-[#FFD21F] text-[11px] leading-tight">
                Retention Engine
              </p>
              <p className="text-slate-200 text-[9.5px] mt-0.5 leading-tight">
                Rapido Parcel Pass (₹49/mo) and 1-tap repeat booking.
              </p>
            </div>
          </div>
        </div>

        {/* BOX 2: TEST EXCEPTION SCENARIOS (Compact & Fully Visible) */}
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl rounded-xl p-2.5 border border-slate-700/70 shadow-xl space-y-1.5">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-800">
            <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#FFD21F]">
              <AlertTriangle size={11} />
            </div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFD21F]">
              Test Exception Scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs">
            <button
              onClick={() => navigate('/error/oversized')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-750 hover:border-[#FFD21F]/40 border border-slate-700/60 text-slate-100 font-semibold text-[11px] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-slate-700/80 group-hover:bg-[#FFD21F] group-hover:text-black text-slate-300 font-bold text-[9px] flex items-center justify-center transition-colors">1</span>
                <span className="group-hover:text-white">Oversized Parcel Refusal</span>
              </div>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-[#FFD21F] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => navigate('/error/captain-cancelled')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-750 hover:border-[#FFD21F]/40 border border-slate-700/60 text-slate-100 font-semibold text-[11px] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-slate-700/80 group-hover:bg-[#FFD21F] group-hover:text-black text-slate-300 font-bold text-[9px] flex items-center justify-center transition-colors">2</span>
                <span className="group-hover:text-white">Captain Cancellation</span>
              </div>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-[#FFD21F] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => navigate('/error/recipient-unavailable')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-750 hover:border-[#FFD21F]/40 border border-slate-700/60 text-slate-100 font-semibold text-[11px] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-slate-700/80 group-hover:bg-[#FFD21F] group-hover:text-black text-slate-300 font-bold text-[9px] flex items-center justify-center transition-colors">3</span>
                <span className="group-hover:text-white">Recipient Unreachable</span>
              </div>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-[#FFD21F] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => navigate('/error/payment-failed')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-750 hover:border-[#FFD21F]/40 border border-slate-700/60 text-slate-100 font-semibold text-[11px] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-slate-700/80 group-hover:bg-[#FFD21F] group-hover:text-black text-slate-300 font-bold text-[9px] flex items-center justify-center transition-colors">4</span>
                <span className="group-hover:text-white">Payment Failure Recovery</span>
              </div>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-[#FFD21F] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 5. Receiver Tracking & OTP — Exactly matches 1-4, NO GREEN */}
            <button
              onClick={() => navigate('/receiver/demo')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-750 hover:border-[#FFD21F]/40 border border-slate-700/60 text-slate-100 font-semibold text-[11px] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-md bg-slate-700/80 group-hover:bg-[#FFD21F] group-hover:text-black text-slate-300 font-bold text-[9px] flex items-center justify-center transition-colors">5</span>
                <span className="group-hover:text-white">Receiver Tracking & OTP</span>
              </div>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-[#FFD21F] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHONE MOCKUP CONTAINER (SLIMMED DOWN & CONSTRAINED HEIGHT)      */}
      {/* ============================================================== */}
      <div 
        className="
          relative bg-white overflow-hidden flex flex-col flex-shrink-0
          w-full h-full md:w-[340px] xl:w-[350px]
          md:h-[min(670px,calc(100vh-16px))]
          md:rounded-[36px]
          md:shadow-[0_20px_50px_rgba(0,0,0,0.85)]
          md:border-[5px] md:border-neutral-900
        "
      >
        {/* REAL ANDROID STATUS BAR (Matching user screenshot: 10:46, VoWiFi, 72%) */}
        <div className="flex-shrink-0 bg-white/95 backdrop-blur-md px-4 pt-1.5 pb-1 flex items-center justify-between text-black text-[10px] font-semibold z-40 select-none border-b border-gray-100/50">
          <div className="flex items-center gap-1">
            <span className="font-bold">10:46</span>
            <span className="text-[9px] text-gray-500">💬</span>
          </div>

          {/* Notch pill */}
          <div className="hidden md:flex w-14 h-2.5 bg-neutral-900 rounded-full items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black/60 mr-1" />
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex items-center gap-1 text-gray-700 text-[9px]">
            <span className="font-mono text-[8px] font-bold">VoWiFi</span>
            <Wifi size={10} className="text-gray-800" />
            <span className="font-bold">72%</span>
            <div className="w-3.5 h-1.5 border border-gray-800 rounded-2xs p-0.2 flex items-center">
              <div className="h-full w-[72%] bg-black rounded-2xs" />
            </div>
          </div>
        </div>

        {/* MOBILE VIEW FLOATING STRIP (Small screens only) */}
        <div className="md:hidden flex items-center justify-between bg-black text-white px-3 py-1 text-[10px] z-40">
          <span className="font-bold text-[#FFD21F] text-[10px]">Rapido Parcel</span>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/rationale')} className="text-xs text-amber-300 underline font-bold">
              Rationale
            </button>
            <button onClick={() => { resetDemo(); navigate('/') }} className="text-xs text-gray-400">
              Reset
            </button>
          </div>
        </div>

        {/* INTERNAL SCREEN CONTENT (STRICTLY SCROLLS INTERNALLY) */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-white text-[#191919]">
          {children}
        </div>

        {/* REAL ANDROID SYSTEM NAVIGATION BAR (Pills / Home gesture line) */}
        <div className="flex-shrink-0 bg-white py-0.5 px-8 flex items-center justify-center gap-10 text-gray-400 text-xs select-none border-t border-gray-100">
          <div className="w-2 h-2 border-t-2 border-l-2 border-gray-400 rotate-[-45deg] rounded-2xs cursor-pointer" onClick={() => navigate(-1)} />
          <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 cursor-pointer" onClick={() => navigate('/')} />
          <div className="w-2 h-2 rounded-2xs border-2 border-gray-400 cursor-pointer" onClick={() => navigate('/parcel/history')} />
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP RIGHT PANEL: BOX 3 - FLOW STEPS                        */}
      {/* ============================================================== */}
      <div className="hidden xl:flex flex-col gap-2 w-64 xl:w-68 h-[min(670px,calc(100vh-16px))] ml-2.5 xl:ml-4 overflow-hidden py-0.5 flex-shrink-0 justify-start">
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl rounded-xl p-2.5 border border-slate-700/70 shadow-xl space-y-2">
          {/* Small clean heading */}
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-800">
            <div className="w-5 h-5 rounded-md bg-[#FFD21F]/15 border border-[#FFD21F]/30 flex items-center justify-center text-[#FFD21F]">
              <Route size={11} />
            </div>
            <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFD21F]">
              Interactive Flow
            </h2>
          </div>

          {/* Clean Step Cards without any "Screenshot 1", "Screenshot 2" labels */}
          <div className="space-y-1.5 text-xs">
            {/* Step 1 */}
            <div 
              onClick={() => navigate('/')} 
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-[#FFD21F]/20 via-amber-400/10 to-transparent border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.15)]' 
                  : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black ${
                  location.pathname === '/' ? 'bg-[#FFD21F] text-black shadow-xs' : 'bg-slate-700/90 text-slate-300'
                }`}>
                  1
                </span>
                <span className={`font-bold text-[11.5px] ${location.pathname === '/' ? 'text-white' : 'text-slate-100'}`}>
                  Rapido Homepage
                </span>
              </div>
              <p className={`text-[10px] font-normal pl-5 mt-0.5 leading-tight ${
                location.pathname === '/' ? 'text-amber-200/90' : 'text-slate-300'
              }`}>
                Everything in Minutes + Parcel Tile
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => navigate('/parcel')} 
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                location.pathname === '/parcel' 
                  ? 'bg-gradient-to-r from-[#FFD21F]/20 via-amber-400/10 to-transparent border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.15)]' 
                  : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black ${
                  location.pathname === '/parcel' ? 'bg-[#FFD21F] text-black shadow-xs' : 'bg-slate-700/90 text-slate-300'
                }`}>
                  2
                </span>
                <span className={`font-bold text-[11.5px] ${location.pathname === '/parcel' ? 'text-white' : 'text-slate-100'}`}>
                  Parcel Landing
                </span>
              </div>
              <p className={`text-[10px] font-normal pl-5 mt-0.5 leading-tight ${
                location.pathname === '/parcel' ? 'text-amber-200/90' : 'text-slate-300'
              }`}>
                First Parcel Free + 2min Pickup
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => navigate('/parcel/location')} 
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                location.pathname === '/parcel/location' 
                  ? 'bg-gradient-to-r from-[#FFD21F]/20 via-amber-400/10 to-transparent border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.15)]' 
                  : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black ${
                  location.pathname === '/parcel/location' ? 'bg-[#FFD21F] text-black shadow-xs' : 'bg-slate-700/90 text-slate-300'
                }`}>
                  3
                </span>
                <span className={`font-bold text-[11.5px] ${location.pathname === '/parcel/location' ? 'text-white' : 'text-slate-100'}`}>
                  Drop Details & Contact
                </span>
              </div>
              <p className={`text-[10px] font-normal pl-5 mt-0.5 leading-tight ${
                location.pathname === '/parcel/location' ? 'text-amber-200/90' : 'text-slate-300'
              }`}>
                House No + Contact + Smart Sizing
              </p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => navigate('/parcel/vehicle')} 
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                location.pathname === '/parcel/vehicle' 
                  ? 'bg-gradient-to-r from-[#FFD21F]/20 via-amber-400/10 to-transparent border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.15)]' 
                  : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black ${
                  location.pathname === '/parcel/vehicle' ? 'bg-[#FFD21F] text-black shadow-xs' : 'bg-slate-700/90 text-slate-300'
                }`}>
                  4
                </span>
                <span className={`font-bold text-[11.5px] ${location.pathname === '/parcel/vehicle' ? 'text-white' : 'text-slate-100'}`}>
                  Vehicle & Bidding
                </span>
              </div>
              <p className={`text-[10px] font-normal pl-5 mt-0.5 leading-tight ${
                location.pathname === '/parcel/vehicle' ? 'text-amber-200/90' : 'text-slate-300'
              }`}>
                Parcel on Bike (₹175) + Flexible Price
              </p>
            </div>

            {/* Step 5 */}
            <div 
              onClick={() => navigate('/parcel/tracking')} 
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                location.pathname === '/parcel/tracking' 
                  ? 'bg-gradient-to-r from-[#FFD21F]/20 via-amber-400/10 to-transparent border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.15)]' 
                  : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black ${
                  location.pathname === '/parcel/tracking' ? 'bg-[#FFD21F] text-black shadow-xs' : 'bg-slate-700/90 text-slate-300'
                }`}>
                  5
                </span>
                <span className={`font-bold text-[11.5px] ${location.pathname === '/parcel/tracking' ? 'text-white' : 'text-slate-100'}`}>
                  Tracking & Trust Shield
                </span>
              </div>
              <p className={`text-[10px] font-normal pl-5 mt-0.5 leading-tight ${
                location.pathname === '/parcel/tracking' ? 'text-amber-200/90' : 'text-slate-300'
              }`}>
                Photo Audit + Receiver OTP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
