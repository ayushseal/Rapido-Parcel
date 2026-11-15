import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  Camera, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Info, 
  Bike, 
  X,
  FileText,
  Sparkles
} from 'lucide-react'
import Header from '../components/layout/Header'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { checkRestrictedItems } from '../utils/helpers'

const packageCategories = [
  { id: 'documents', label: 'Documents', icon: '📄', hint: 'Passports, papers, books' },
  { id: 'food', label: 'Food / Tiffin', icon: '🍱', hint: 'Home cooked meals, sweets' },
  { id: 'clothes', label: 'Clothes', icon: '👕', hint: 'Apparel, laundry, fabric' },
  { id: 'gifts', label: 'Gifts & Toys', icon: '🎁', hint: 'Festive items, packed boxes' },
  { id: 'electronics', label: 'Electronics', icon: '💻', hint: 'Gadgets, accessories, chargers' },
  { id: 'household', label: 'Household', icon: '🏠', hint: 'Keys, utensils, small decor' },
  { id: 'other', label: 'Other Items', icon: '📦', hint: 'General permitted parcels' },
]

const packageSizes = [
  {
    id: 'small',
    label: 'Small Parcel',
    weight: 'Up to 2 kg',
    dimensions: '30 × 20 × 15 cm',
    example: 'Envelope, medicine, phone charger, keys',
    recommendedVehicle: 'bike',
    vehicleName: 'Bike Parcel',
  },
  {
    id: 'medium',
    label: 'Medium Parcel',
    weight: '2 to 5 kg',
    dimensions: '40 × 30 × 20 cm',
    example: 'Backpack, shoe box, tiffin set, clothes',
    recommendedVehicle: 'bike',
    vehicleName: 'Bike Parcel',
  },
  {
    id: 'large',
    label: 'Large Parcel',
    weight: '5 to 15 kg',
    dimensions: '50 × 40 × 30 cm',
    example: 'Heavy carton, large luggage, appliances',
    recommendedVehicle: 'auto',
    vehicleName: 'Auto Parcel (3-Wheeler)',
  },
]

export default function PackageScreen() {
  const navigate = useNavigate()
  const {
    packageCategory,
    packageSize,
    packageDescription,
    packagePhoto,
    setPackageCategory,
    setPackageSize,
    setPackageDescription,
    setPackagePhoto,
    setRecommendedVehicle,
    setSelectedVehicle,
  } = useAppStore()

  const [simulatedPhoto, setSimulatedPhoto] = useState<string | null>(packagePhoto)
  const [showPolicyModal, setShowPolicyModal] = useState(false)

  // Real-time restriction check
  const restrictedMatches = checkRestrictedItems(packageDescription)
  const isRestricted = restrictedMatches.length > 0

  // Category selection handler
  const handleSelectCategory = (catId: string) => {
    setPackageCategory(catId)
    // If user picks 'documents', auto-suggest small if not set
    if (catId === 'documents' && !packageSize) {
      handleSelectSize('small')
    }
  }

  // Size selection handler with smart vehicle recommendation
  const handleSelectSize = (sizeId: 'small' | 'medium' | 'large') => {
    setPackageSize(sizeId)
    if (sizeId === 'large') {
      setRecommendedVehicle('auto')
      setSelectedVehicle('auto')
    } else {
      setRecommendedVehicle('bike')
      setSelectedVehicle('bike')
    }
  }

  // Simulated photo upload
  const handleTogglePhoto = () => {
    if (simulatedPhoto) {
      setSimulatedPhoto(null)
      setPackagePhoto(null)
    } else {
      const mockImg = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80'
      setSimulatedPhoto(mockImg)
      setPackagePhoto(mockImg)
    }
  }

  // Handle proceed
  const handleContinue = () => {
    if (isRestricted) return
    if (!packageCategory) {
      alert('Please select a package category')
      return
    }
    if (!packageSize) {
      alert('Please select an approximate package size')
      return
    }
    navigate('/parcel/vehicle')
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <Header 
        showLocation={false} 
        showBack={true} 
        title="Package Details"
        subtitle="Step 2 of 4"
      />

      <div className="flex-1 px-4 space-y-4 pt-2">
        {/* Step Title */}
        <div>
          <h2 className="text-base font-black text-[#191919]">What are you sending?</h2>
          <p className="text-xs text-[#737373]">
            Select category & size to ensure captain acceptance and appropriate vehicle matching.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-2">
          {packageCategories.map((cat) => {
            const isSelected = packageCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all text-center ${
                  isSelected
                    ? 'border-2 border-[#FFD21F] bg-[#FFF8DC] shadow-xs'
                    : 'border-[#E9E9E9] bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl mb-0.5">{cat.icon}</span>
                <span className="text-[10px] font-bold text-[#191919] leading-tight line-clamp-1">
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Package Description Input + Restriction Checker */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#191919]">
              Describe Package Contents
            </label>
            <button
              onClick={() => setShowPolicyModal(true)}
              className="text-[10px] font-semibold text-amber-800 flex items-center gap-0.5 hover:underline"
            >
              <Info size={11} /> Permitted Items Policy
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              placeholder="e.g. Office document file, birthday gift box, tiffin set"
              className={`w-full bg-[#F8F9FA] rounded-2xl px-3.5 py-3 text-xs font-medium border focus:outline-hidden transition-colors ${
                isRestricted
                  ? 'border-red-400 bg-red-50/50 ring-2 ring-red-100'
                  : 'border-[#E9E9E9] focus:border-amber-400'
              }`}
            />
          </div>

          {/* Intelligent Restriction Guardrail Alert */}
          {isRestricted && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-3.5 space-y-2 animate-slide-down">
              <div className="flex items-start gap-2.5">
                <ShieldAlert size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-red-900">
                    Prohibited Item Detected ({restrictedMatches.join(', ')})
                  </p>
                  <p className="text-[11px] text-red-800 leading-snug">
                    This item cannot be transported through Rapido Parcel. Rapido's zero-tolerance safety policy strictly prohibits sending currency, precious jewellery, gold, weapons, and regulated substances.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPolicyModal(true)}
                className="w-full text-center py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Review Permitted Items Guidelines
              </button>
            </div>
          )}
        </div>

        {/* Package Size Attribute Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#191919] flex items-center justify-between">
            <span>Approximate Size & Weight</span>
            <span className="text-[10px] text-gray-500 font-normal">Prevents captain refusal</span>
          </label>

          <div className="space-y-2">
            {packageSizes.map((size) => {
              const isSelected = packageSize === size.id
              return (
                <div
                  key={size.id}
                  onClick={() => handleSelectSize(size.id as 'small' | 'medium' | 'large')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? 'border-2 border-[#FFD21F] bg-[#FFF8DC]/60 shadow-2xs'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#191919]">{size.label}</span>
                      <span className="text-[10px] bg-gray-200 text-gray-800 font-bold px-2 py-0.5 rounded-full">
                        {size.weight}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#737373]">{size.dimensions} • e.g. {size.example}</p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                      {size.recommendedVehicle === 'bike' ? '🏍️ Bike' : '🛺 Auto'}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Smart Package-Vehicle Matching Recommendation Banner */}
        {packageSize && (
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex items-start gap-2.5">
            <Sparkles size={16} className="text-amber-800 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <span className="font-bold">
                {packageSize === 'large'
                  ? 'Auto Parcel Recommended (3-Wheeler)'
                  : 'Bike Parcel Recommended (2-Wheeler)'}:
              </span>{' '}
              {packageSize === 'large'
                ? 'Packages over 5kg require a 3-wheeler auto to ensure captain acceptance and safe city transit.'
                : 'Ideal size for swift, low-cost two-wheeler navigation through city traffic.'}
            </div>
          </div>
        )}

        {/* Optional Package Photo Upload Simulation */}
        <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-gray-700">
              <Camera size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#191919]">Package Photo (Optional)</p>
              <p className="text-[10px] text-[#737373]">
                {simulatedPhoto ? 'Photo attached ✓' : 'Helps captain identify package at pickup'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTogglePhoto}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
              simulatedPhoto
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {simulatedPhoto ? 'Remove' : '+ Add Photo'}
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2">
          <button
            onClick={handleContinue}
            disabled={isRestricted || !packageCategory || !packageSize}
            className={`w-full py-3.5 font-bold text-sm rounded-2xl shadow-xs transition-transform flex items-center justify-center gap-2 ${
              isRestricted || !packageCategory || !packageSize
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#FFD21F] hover:bg-[#f0c400] text-black active:scale-[0.99]'
            }`}
          >
            <span>{isRestricted ? 'Cannot Proceed with Prohibited Item' : 'Choose Delivery Option'}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Permitted Items Policy Modal */}
      <Modal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        title="Permitted Items & Safety Policy"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#525252] leading-relaxed">
            Rapido Parcel connects senders with two-wheeler and three-wheeler captains. For public safety and regulatory compliance, strict rules apply:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
              <p className="text-xs font-bold text-red-900">🚫 Strictly Prohibited Items:</p>
              <ul className="text-[11px] text-red-800 list-disc list-inside space-y-0.5">
                <li>Cash, currency notes, coins, bank cheques</li>
                <li>Gold, diamonds, bullion, precious jewelry</li>
                <li>Narcotics, drugs, intoxicating substances</li>
                <li>Explosives, flammable liquids, fireworks</li>
                <li>Weapons, firearms, ammunition, sharp hazard tools</li>
                <li>Alcohol, liquor, tobacco products</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <p className="text-xs font-bold text-emerald-900">✅ Permitted Items:</p>
              <ul className="text-[11px] text-emerald-800 list-disc list-inside space-y-0.5">
                <li>Official documents, office files, study material, books</li>
                <li>Packed home-cooked food, sweets, fruits, groceries</li>
                <li>Garments, shoes, apparel, laundry packets</li>
                <li>Household keys, chargers, cables, small electronics</li>
                <li>Sealed gift boxes, toys, retail purchases</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowPolicyModal(false)}
            className="w-full py-2.5 bg-[#FFD21F] text-black font-bold text-xs rounded-xl"
          >
            I Understand the Policy
          </button>
        </div>
      </Modal>
    </div>
  )
}
