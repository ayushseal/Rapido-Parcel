import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Home, 
  Briefcase, 
  User, 
  Phone, 
  BookUser, 
  Crosshair, 
  Info
} from 'lucide-react'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { mockLocations } from '../data/mockData'
import RealMap from '../components/shared/RealMap'

const packageCategories = [
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'food', label: 'Food / Tiffin', icon: '🍱' },
  { id: 'clothes', label: 'Clothes', icon: '👕' },
  { id: 'gifts', label: 'Festive / Gifts', icon: '🎁' },
  { id: 'electronics', label: 'Electronics', icon: '💻' },
  { id: 'other', label: 'Other Permitted', icon: '📦' },
]

export default function LocationScreen() {
  const navigate = useNavigate()
  const {
    dropLocation,
    recipientName,
    recipientPhone,
    packageCategory,
    packageSize,
    packageDescription,
    setDropLocation,
    setRecipientName,
    setRecipientPhone,
    setPackageCategory,
    setPackageSize,
    setPackageDescription,
    setSelectedVehicle,
  } = useAppStore()

  const currentDrop = dropLocation || mockLocations[1] // Jadavpur University

  const [houseNo, setHouseNo] = useState('Department of Computer Science, Ground Floor')
  const [name, setName] = useState(recipientName || 'Ayush Seal')
  const [phone, setPhone] = useState(recipientPhone || '9830730788')
  const [useMyContact, setUseMyContact] = useState(true)
  const [savedAs, setSavedAs] = useState<'Home' | 'Work' | 'Other'>('Home')
  const [selectedCat] = useState(packageCategory || 'documents')
  const [selectedSz, setSelectedSz] = useState<'small' | 'medium' | 'large'>(packageSize || 'small')
  const [showPolicyModal, setShowPolicyModal] = useState(false)

  const handleSelectSize = (sz: 'small' | 'medium' | 'large') => {
    setSelectedSz(sz)
    setPackageSize(sz)
    if (sz === 'large') {
      setSelectedVehicle('auto')
    } else {
      setSelectedVehicle('bike')
    }
  }

  const handleConfirm = () => {
    setRecipientName(name)
    setRecipientPhone(phone)
    setPackageCategory(selectedCat)
    setPackageSize(selectedSz)
    navigate('/parcel/vehicle')
  }

  return (
    <div className="flex flex-col h-full bg-[#e8ecf2] relative overflow-hidden font-sans">
      {/* ============================================================== */}
      {/* 1. REAL MAP BACKGROUND WITH ROUTE & CONTROLS                  */}
      {/* ============================================================== */}
      <div className="relative h-28 w-full bg-[#dfe5ee] flex-shrink-0 overflow-hidden border-b border-gray-200">
        <RealMap mode="route" interactive={false} height="100%" />

        {/* Circular Back Button on Map */}
        <button
          onClick={() => navigate('/parcel')}
          className="absolute top-2.5 left-3 w-7 h-7 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center z-20 hover:bg-gray-100"
        >
          <ArrowLeft size={15} />
        </button>

        {/* Circular GPS Target Button */}
        <button
          onClick={() => alert('Centered on destination coordinates.')}
          className="absolute top-2.5 right-3 w-7 h-7 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center z-20 hover:bg-gray-100"
        >
          <Crosshair size={15} />
        </button>

        {/* Floating Destination Pill (Exact from Screenshot 4) */}
        <div className="absolute bottom-1.5 left-3 right-3 z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <div className="w-2 h-2 rounded-full border-2 border-red-500 bg-white flex-shrink-0" />
              <span className="text-[10.5px] font-semibold text-gray-900 truncate">
                {currentDrop.name}, {currentDrop.address}
              </span>
            </div>
            <button 
              onClick={() => navigate('/parcel')}
              className="text-[10px] font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-0.2 rounded-full ml-1 flex-shrink-0"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. BOTTOM DETAILS SHEET (Exact from Screenshot 4)              */}
      {/* ============================================================== */}
      <div className="flex-1 bg-white rounded-t-[28px] -mt-1 shadow-lg z-10 flex flex-col overflow-hidden border-t border-gray-100">
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
          <div className="w-9 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Scrollable Form Content (Zero Scroll Layout) */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 space-y-2 pb-2 pt-1">
          {/* ============================================================== */}
          {/* SECTION 1: WHAT ARE YOU SENDING & SIZE (Brought to Top)        */}
          {/* ============================================================== */}
          <div className="bg-[#f8f9fa] rounded-2xl p-2.5 border border-gray-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">
                What are you sending?
              </span>
              <button 
                onClick={() => setShowPolicyModal(true)}
                className="text-[9.5px] text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
              >
                <Info size={10} /> Prohibited Policy
              </button>
            </div>

            {/* Single Selected Category Card (from previous Parcel Home screen) */}
            <div className="bg-white rounded-xl p-2 border border-[#FFD21F] bg-[#FFF8DC]/40 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xl flex-shrink-0">
                  {packageCategories.find((c) => c.id === (packageCategory || selectedCat))?.icon || '📦'}
                </span>
                <div>
                  <p className="text-xs font-black text-[#191919] leading-tight">
                    {packageCategories.find((c) => c.id === (packageCategory || selectedCat))?.label || 'General Parcel'}
                  </p>
                  <p className="text-[8px] text-emerald-700 font-semibold leading-none mt-0.5">
                    ✓ Selected from Parcel Home
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/parcel')}
                className="text-[9.5px] font-bold text-blue-600 underline px-1.5 py-0.5"
              >
                Change
              </button>
            </div>

            {/* Size Selector (Brought up so user never has to scroll down) */}
            <div className="space-y-1 pt-0.5">
              <span className="text-[10px] font-bold text-gray-700">Select Approximate Size:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleSelectSize('small')}
                  className={`p-1.5 rounded-xl border text-center transition-all ${
                    selectedSz === 'small' ? 'border-black bg-white font-bold ring-1 ring-black' : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <p className="text-[10.5px] font-bold">Small (≤2kg)</p>
                  <p className="text-[8.5px] text-gray-500">Bike Parcel</p>
                </button>

                <button
                  onClick={() => handleSelectSize('medium')}
                  className={`p-1.5 rounded-xl border text-center transition-all ${
                    selectedSz === 'medium' ? 'border-black bg-white font-bold ring-1 ring-black' : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <p className="text-[10.5px] font-bold">Medium (2-5kg)</p>
                  <p className="text-[8.5px] text-gray-500">Bike Parcel</p>
                </button>

                <button
                  onClick={() => handleSelectSize('large')}
                  className={`p-1.5 rounded-xl border text-center transition-all ${
                    selectedSz === 'large' ? 'border-amber-500 bg-amber-50 font-bold text-amber-900 ring-1 ring-amber-400' : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <p className="text-[10.5px] font-bold">Large (&gt;5kg)</p>
                  <p className="text-[8.5px] text-amber-800 font-semibold">Auto Parcel 🛺</p>
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 2: DROP DETAILS & CONTACT (Screenshot 4)               */}
          {/* ============================================================== */}
          <div className="space-y-1.5">
            {/* House No / Building Input (Screenshot 4) */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-2xs bg-white">
              <Home size={14} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                placeholder="House no. / Building (optional)"
                className="w-full text-[11px] font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden"
              />
            </div>

            {/* Recipient Name Input */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-2xs bg-white">
              <div className="flex items-center gap-2 flex-1">
                <User size={14} className="text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full text-[11px] font-bold text-gray-900 focus:outline-hidden"
                />
              </div>
              <BookUser size={14} className="text-gray-500 cursor-pointer hover:text-black ml-1.5" />
            </div>

            {/* Phone Number Input (Screenshot 4) */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-2xs bg-white">
              <Phone size={14} className="text-gray-500 flex-shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number for Handover OTP"
                className="w-full text-[11px] font-bold text-gray-900 focus:outline-hidden"
              />
            </div>

            {/* Saved As Pills: Home / Work / Other */}
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[10.5px] font-bold text-gray-700">Saved as:</span>
              <div className="flex items-center gap-1.5">
                {(['Home', 'Work', 'Other'] as const).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSavedAs(tag)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                      savedAs === tag
                        ? 'bg-[#1e3a5f] text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BIG YELLOW CTA (Exact from Screenshot 4: Confirm drop details) */}
        {/* ============================================================== */}
        <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleConfirm}
            disabled={!name || !phone}
            className={`w-full py-3.5 rounded-full font-bold text-sm shadow-xs transition-transform flex items-center justify-center gap-1 ${
              !name || !phone
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#FFC72C] hover:bg-[#f0ba24] text-black active:scale-[0.99]'
            }`}
          >
            Confirm drop details
          </button>
        </div>
      </div>

      {/* Prohibited Policy Modal */}
      <Modal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        title="Rapido Permitted Items"
      >
        <div className="space-y-3 pt-1 text-xs">
          <p className="text-gray-600">Items permitted for transport:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-[11px]">
            <li>Books, documents, envelopes, stationery</li>
            <li>Home-cooked food, packed tiffins, sweets</li>
            <li>Clothes, apparel, footwear</li>
            <li>Keys, chargers, small electronics</li>
          </ul>
          <p className="text-red-700 font-bold text-[11px]">
            Strictly NO cash, gold, jewelry, liquor, or weapons.
          </p>
          <button
            onClick={() => setShowPolicyModal(false)}
            className="w-full py-2.5 bg-[#FFC72C] text-black font-bold rounded-xl"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}
