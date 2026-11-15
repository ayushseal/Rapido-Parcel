import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowUpDown, 
  Edit2, 
  Search, 
  ShieldCheck, 
  BookmarkCheck,
  Zap,
  Package,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { mockLocations } from '../data/mockData'

// 6 Complete Categories including Electronics and Other Items
const parcelCategories = [
  { id: 'documents', label: 'Docs & Keys', desc: 'Up to 1 kg', icon: '📄' },
  { id: 'food', label: 'Food / Tiffin', desc: 'Fresh & safe', icon: '🍱' },
  { id: 'gifts', label: 'Festive Gifts', desc: 'Diwali special', icon: '🎁' },
  { id: 'clothes', label: 'Clothes / Items', desc: 'Up to 5 kgs', icon: '👕' },
  { id: 'electronics', label: 'Electronics', desc: 'Gadgets & parts', icon: '💻' },
  { id: 'other', label: 'Other Items', desc: 'Permitted boxes', icon: '📦' },
]

export default function ParcelHome() {
  const navigate = useNavigate()
  const {
    pickupLocation,
    dropLocation,
    setPickupLocation,
    setDropLocation,
    setRecipientName,
    setRecipientPhone,
    packageCategory,
    setPackageCategory,
  } = useAppStore()

  const [showPolicyModal, setShowPolicyModal] = useState(false)
  const [showSafetyModal, setShowSafetyModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [validationError, setValidationError] = useState('')

  const currentPickup = pickupLocation || mockLocations[0]

  // Quick select a saved destination
  const handleSelectDropAddress = (loc: typeof mockLocations[0], recipientName = 'Ayush Seal', phone = '9830730788') => {
    setDropLocation(loc)
    setRecipientName(recipientName)
    setRecipientPhone(phone)
    setValidationError('')
    setShowSearchModal(false)
  }

  // Handle category selection
  const handleSelectCategory = (catId: string) => {
    setPackageCategory(catId)
    setValidationError('')
  }

  // Handle swap
  const handleSwap = () => {
    if (pickupLocation && dropLocation) {
      const temp = pickupLocation
      setPickupLocation(dropLocation)
      setDropLocation(temp)
    }
  }

  // Validation: BOTH drop address AND category must be chosen
  const isAddressSelected = Boolean(dropLocation)
  const isCategorySelected = Boolean(packageCategory)
  const canProceed = isAddressSelected && isCategorySelected

  const handleProceed = () => {
    if (!isAddressSelected && !isCategorySelected) {
      setValidationError('Please select a drop address and what you are sending.')
      return
    }
    if (!isAddressSelected) {
      setValidationError('Please select or search a drop address above.')
      return
    }
    if (!isCategorySelected) {
      setValidationError('Please choose what you are sending below.')
      return
    }

    setValidationError('')
    navigate('/parcel/location')
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f5f7] relative overflow-hidden font-sans select-none">
      {/* Content Container (Zero Scroll, Balanced Layout) */}
      <div className="flex-1 flex flex-col space-y-1.5 overflow-hidden pb-1">
        {/* ============================================================== */}
        {/* HERO FESTIVE BANNER (Exact from Screenshot 2: First Parcel Free)*/}
        {/* ============================================================== */}
        <div className="relative bg-gradient-to-b from-[#fcedea] via-[#fdf4f1] to-white px-3.5 pt-1.5 pb-3.5 overflow-hidden border-b border-orange-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5 z-10 max-w-[190px]">
              <h1 className="text-sm font-black text-[#b91c1c] tracking-tight font-serif drop-shadow-2xs leading-tight">
                First Parcel Free
              </h1>
              <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md border border-dashed border-[#b91c1c] bg-white/90">
                <span className="text-[9px] font-black text-[#b91c1c] tracking-wider">DIWALI100</span>
              </div>
              <p className="text-[8px] text-gray-600 font-medium leading-none">
                Use code at checkout • 100% off 1st delivery
              </p>
            </div>

            {/* Festive Delivery Gift Icon */}
            <div className="relative flex items-center justify-end z-10 pr-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xl -ml-1">🛵</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN ADDRESS CARD (Pickup & Drop Selection)                    */}
        {/* ============================================================== */}
        <div className="px-3 -mt-3 z-20 relative">
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-200/80 space-y-1.5 relative overflow-hidden">
            {/* Switch Floating Button */}
            {dropLocation && (
              <button
                onClick={handleSwap}
                className="absolute right-2.5 top-[38px] z-30 bg-white border border-gray-200 rounded-full px-2 py-0.5 text-[8.5px] font-bold text-gray-700 shadow-xs flex items-center gap-1 hover:bg-gray-50 active:scale-95 transition-all"
              >
                <ArrowUpDown size={9} className="text-gray-600" />
                <span>Switch</span>
              </button>
            )}

            {/* Section 1: Pickup from current location */}
            <div className="flex items-start gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>

              <div className="flex-1 min-w-0 pr-12">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-[#191919] truncate">
                    Pickup from current location
                  </p>
                  <Edit2 size={9} className="text-gray-500 cursor-pointer hover:text-black flex-shrink-0 ml-1" />
                </div>
                <p className="text-[9px] text-gray-600 truncate mt-0.2">
                  {currentPickup.address}
                </p>
                <p className="text-[9px] font-semibold text-gray-800 leading-tight truncate">
                  Ayush seal (8910128997)
                </p>
              </div>
            </div>

            {/* Dotted separator line */}
            <div className="border-t border-dashed border-gray-200 my-0.5" />

            {/* Section 2: Drop to Search / Selected Drop State */}
            <div className="flex items-start gap-2 pt-0.5">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-red-500 bg-white flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[10px] font-bold text-[#191919]">Drop to</p>
                  {dropLocation && (
                    <span className="text-[8px] text-emerald-700 font-bold flex items-center gap-0.5 flex-shrink-0">
                      <CheckCircle2 size={9} /> Address Chosen
                    </span>
                  )}
                </div>

                {dropLocation ? (
                  <div 
                    onClick={() => setShowSearchModal(true)}
                    className="bg-[#f0f9ff] rounded-xl border border-blue-400 px-2.5 py-1.5 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-blue-50 transition-colors w-full min-w-0"
                  >
                    <div className="flex-1 min-w-0 pr-1.5">
                      <p className="text-[10px] font-bold text-gray-900 truncate leading-tight">{dropLocation.name}</p>
                      <p className="text-[8px] text-gray-600 truncate mt-0.5 leading-tight">{dropLocation.address}</p>
                    </div>
                    <span className="text-[9px] font-bold text-blue-600 underline flex-shrink-0 ml-1">
                      Change
                    </span>
                  </div>
                ) : (
                  <div 
                    onClick={() => setShowSearchModal(true)}
                    className={`bg-white rounded-xl border-2 px-3 py-1 flex items-center gap-2 cursor-pointer shadow-2xs hover:bg-blue-50/20 transition-colors w-full min-w-0 ${
                      !isAddressSelected && validationError ? 'border-red-400 bg-red-50/30' : 'border-blue-500'
                    }`}
                  >
                    <Search size={12} className="text-gray-800 flex-shrink-0" />
                    <span className="text-[10px] font-medium text-gray-500 truncate">
                      Search drop address
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 1-Tap Saved Recipient Quick Chips */}
            <div className="pt-0.5 space-y-0.5">
              <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <BookmarkCheck size={9} className="text-[#FFD21F]" /> Frequent Recipients:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.2">
                <button
                  onClick={() => handleSelectDropAddress(mockLocations[1], 'Ayush Seal', '9830730788')}
                  className={`px-2 py-0.5 rounded-lg border text-left flex-shrink-0 transition-all flex items-center gap-1 ${
                    dropLocation?.id === mockLocations[1].id
                      ? 'bg-[#FFF8DC] border-[#FFD21F] shadow-2xs'
                      : 'bg-[#f8f9fa] hover:bg-[#fff9e6] border-gray-200'
                  }`}
                >
                  <span className="text-[8.5px]">🎓</span>
                  <div>
                    <p className="text-[8.5px] font-bold text-gray-800 leading-none">Jadavpur Univ</p>
                    <p className="text-[7px] text-gray-500 leading-none mt-0.5">Ayush Seal</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDropAddress(mockLocations[2], 'Rohan Sen', '9830112233')}
                  className={`px-2 py-0.5 rounded-lg border text-left flex-shrink-0 transition-all flex items-center gap-1 ${
                    dropLocation?.id === mockLocations[2].id
                      ? 'bg-[#FFF8DC] border-[#FFD21F] shadow-2xs'
                      : 'bg-[#f8f9fa] hover:bg-[#fff9e6] border-gray-200'
                  }`}
                >
                  <span className="text-[8.5px]">📍</span>
                  <div>
                    <p className="text-[8.5px] font-bold text-gray-800 leading-none">Jadavpur 8B</p>
                    <p className="text-[7px] text-gray-500 leading-none mt-0.5">Rohan Sen</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectDropAddress(mockLocations[3], 'Debopriya Roy', '9830445566')}
                  className={`px-2 py-0.5 rounded-lg border text-left flex-shrink-0 transition-all flex items-center gap-1 ${
                    dropLocation?.id === mockLocations[3].id
                      ? 'bg-[#FFF8DC] border-[#FFD21F] shadow-2xs'
                      : 'bg-[#f8f9fa] hover:bg-[#fff9e6] border-gray-200'
                  }`}
                >
                  <span className="text-[8.5px]">🚉</span>
                  <div>
                    <p className="text-[8.5px] font-bold text-gray-800 leading-none">Howrah Stn</p>
                    <p className="text-[7px] text-gray-500 leading-none mt-0.5">Debopriya</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LIVE 2-MIN PICKUP STRIP                                        */}
        {/* ============================================================== */}
        <div className="px-3">
          <div className="bg-gradient-to-r from-emerald-50 via-[#ecfdf5] to-emerald-50 border border-emerald-200/90 rounded-xl px-2.5 py-1 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-md bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <Zap size={10} className="fill-emerald-600 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-[9.5px] font-bold text-emerald-950 leading-tight">
                  Captains active near Ahiritola
                </p>
                <p className="text-[8px] text-emerald-800 leading-none">
                  Pickup in ~2 mins at your doorstep
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white px-1.5 py-0.2 rounded-md border border-emerald-300 shadow-2xs flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black text-emerald-800">2 MINS</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* USER REQUEST 1: WHAT ARE YOU SENDING? (6 Categories)           */}
        {/* Includes Electronics & Other Items                             */}
        {/* ============================================================== */}
        <div className="px-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              <Package size={10} className="text-[#FFD21F]" /> What are you sending?
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {parcelCategories.map((c) => {
              const isSelected = packageCategory === c.id
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCategory(c.id)}
                  className={`rounded-xl p-1.5 border cursor-pointer transition-all flex flex-col justify-between h-13 shadow-2xs ${
                    isSelected
                      ? 'border-[#FFD21F] bg-[#FFF8DC] ring-1 ring-[#FFD21F]'
                      : 'border-gray-200/80 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base leading-none">{c.icon}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#191919] flex-shrink-0" />
                    )}
                  </div>
                  <div>
                    <p className={`text-[9px] font-bold leading-tight truncate ${
                      isSelected ? 'text-black font-black' : 'text-[#191919]'
                    }`}>
                      {c.label}
                    </p>
                    <p className="text-[7.5px] text-gray-500 leading-none truncate">
                      {c.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* VALIDATION & PROCEED BUTTON (Requires Address + Type)          */}
        {/* ============================================================== */}
        <div className="px-3 pt-0.5">
          <button
            onClick={handleProceed}
            className={`w-full py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs ${
              canProceed
                ? 'bg-[#FFD21F] hover:bg-[#f0ba24] text-black active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-pointer'
            }`}
          >
            <span>Proceed to Parcel Details</span>
            <span>→</span>
          </button>

          {/* Contextual Guidance / Error message */}
          {validationError ? (
            <p className="text-[8px] text-red-600 font-bold text-center mt-0.5 flex items-center justify-center gap-1">
              <AlertCircle size={10} /> {validationError}
            </p>
          ) : !canProceed ? (
            <p className="text-[7.5px] text-gray-500 text-center mt-0.5">
              {!isAddressSelected && !isCategorySelected
                ? 'Choose drop address and package type above to proceed'
                : !isAddressSelected
                ? 'Select a drop address above to proceed'
                : 'Choose what you are sending above to proceed'}
            </p>
          ) : null}
        </div>

        {/* ============================================================== */}
        {/* FOOTER: TRUST SHIELD & PROHIBITED ITEMS                        */}
        {/* ============================================================== */}
        <div className="px-3 space-y-0.5 text-center text-xs flex-shrink-0 pt-0.5">
          <div 
            onClick={() => setShowSafetyModal(true)}
            className="p-1 rounded-lg bg-[#f0f9ff] border border-blue-200/80 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-1 text-left">
              <ShieldCheck size={11} className="text-blue-700 flex-shrink-0" />
              <p className="text-[8.5px] text-blue-950 font-bold leading-none">
                3-Layer Trust Shield: Captain photo + Receiver OTP handover
              </p>
            </div>
            <span className="text-[8px] font-bold text-blue-700 flex-shrink-0">Know More →</span>
          </div>

          <p className="text-[8px] text-gray-500 leading-none pt-0.5">
            Read about{' '}
            <button 
              onClick={() => setShowPolicyModal(true)}
              className="text-blue-600 underline font-semibold cursor-pointer"
            >
              prohibited items
            </button>
            {' '}• By continuing, agree to <span className="text-gray-700 font-medium">T&Cs</span>
          </p>
        </div>
      </div>

      {/* MODAL: Search / Select Drop Address */}
      <Modal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        title="Select Drop Address"
      >
        <div className="space-y-3 text-xs text-gray-800">
          <p className="text-xs font-semibold text-gray-600">
            Select a verified delivery destination in Kolkata:
          </p>
          <div className="space-y-2">
            {mockLocations.slice(1).map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelectDropAddress(loc)}
                className="p-2.5 rounded-xl border border-gray-200 hover:border-[#FFD21F] hover:bg-[#fff9e6] cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-xs text-[#191919]">{loc.name}</p>
                  <p className="text-[10px] text-gray-500">{loc.address}</p>
                </div>
                <span className="text-xs font-bold text-blue-600">Select</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* MODAL: Prohibited Items Policy */}
      <Modal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        title="Prohibited Items Policy"
      >
        <div className="space-y-3 text-xs text-gray-700">
          <p className="text-xs font-semibold text-red-600">
            For safety and compliance, the following items are strictly prohibited on Rapido Parcel:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px]">
            <li>Cash, currency notes, bearer cheques, coins</li>
            <li>Gold, jewellery, precious stones, bullion</li>
            <li>Flammable substances, chemicals, fireworks</li>
            <li>Illegal drugs, narcotics, alcohol, contraband</li>
            <li>Weapons, ammunition, hazardous materials</li>
          </ul>
          <button
            onClick={() => setShowPolicyModal(false)}
            className="w-full py-2 bg-[#FFD21F] text-black font-bold rounded-xl text-xs hover:bg-[#e6bd1c] transition-colors mt-2"
          >
            I Understand
          </button>
        </div>
      </Modal>

      {/* MODAL: 3-Layer Trust Shield Details */}
      <Modal
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
        title="Rapido 3-Layer Trust Shield"
      >
        <div className="space-y-2.5 text-xs text-gray-700">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="font-bold text-emerald-900 text-xs">Layer 1: Pre-Screening</p>
            <p className="text-[10px] text-emerald-800 mt-0.5">
              Category screening & prohibited-items guardrail prevent risky package dispatches.
            </p>
          </div>
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="font-bold text-blue-900 text-xs">Layer 2: Captain Photo Audit</p>
            <p className="text-[10px] text-blue-800 mt-0.5">
              Captain captures package photo at pickup with timestamp and tamper-proof verification.
            </p>
          </div>
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="font-bold text-amber-900 text-xs">Layer 3: Receiver OTP Handover</p>
            <p className="text-[10px] text-amber-800 mt-0.5">
              Handover requires the receiver's private 4-digit OTP. Delivery cannot complete without it.
            </p>
          </div>
          <button
            onClick={() => setShowSafetyModal(false)}
            className="w-full py-2 bg-[#FFD21F] text-black font-bold rounded-xl text-xs hover:bg-[#e6bd1c] transition-colors"
          >
            Got It
          </button>
        </div>
      </Modal>
    </div>
  )
}
