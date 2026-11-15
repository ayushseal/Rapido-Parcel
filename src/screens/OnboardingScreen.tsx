import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Package, 
  Bike, 
  Navigation, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle,
  X
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const onboardingSteps = [
  {
    title: 'Enter Pickup & Drop-Off',
    subtitle: 'Step 1 of 5',
    description: 'Set your address with instant GPS detection and select recipient contact for direct handover notifications.',
    icon: '📍',
    color: 'from-amber-400/20 to-amber-100/10',
    highlight: 'No multiple pages — seamless single-screen address entry.',
  },
  {
    title: 'Describe Your Package',
    subtitle: 'Step 2 of 5',
    description: 'Select package category and size. Intelligent guardrails screen prohibited items like cash or gold upfront.',
    icon: '📦',
    color: 'from-yellow-400/20 to-yellow-100/10',
    highlight: 'Automated size validation stops captain refusals before they happen.',
  },
  {
    title: 'Smart Vehicle Matching',
    subtitle: 'Step 3 of 5',
    description: 'Bike Parcel for smaller items up to 5kg; Auto Parcel for larger cartons and bulkier goods up to 15kg.',
    icon: '🛵',
    color: 'from-amber-500/20 to-amber-200/10',
    highlight: 'Transparent pricing breakdown with tamper-evident packaging sleeve options.',
  },
  {
    title: 'Live Real-Time Tracking',
    subtitle: 'Step 4 of 5',
    description: 'Track the delivery captain on a live route map with continuous ETA updates and one-click tracking share.',
    icon: '🗺️',
    color: 'from-blue-400/20 to-blue-100/10',
    highlight: 'Both sender and receiver can follow progress in real-time.',
  },
  {
    title: 'Verified Handover & Proof',
    subtitle: 'Step 5 of 5',
    description: 'Mandatory pickup photo + Receiver 4-digit OTP + Drop photo. The delivery is never completed without verification.',
    icon: '🔐',
    color: 'from-emerald-400/20 to-emerald-100/10',
    highlight: 'Eliminates delivery disputes and theft through dual-party confirmation.',
  },
]

export default function OnboardingScreen() {
  const navigate = useNavigate()
  const { setHasSeenOnboarding } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)

  const handleFinish = () => {
    setHasSeenOnboarding(true)
    navigate('/parcel/location')
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleFinish()
    }
  }

  const step = onboardingSteps[currentStep]

  return (
    <div className="flex flex-col h-full bg-white justify-between p-6">
      {/* Top Bar with Skip */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-black tracking-wider uppercase text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full">
          Rapido Parcel Tour
        </span>
        <button
          onClick={handleFinish}
          className="text-xs font-bold text-[#737373] hover:text-[#191919] p-1"
        >
          Skip
        </button>
      </div>

      {/* Main Animated Card */}
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center max-w-xs space-y-4"
          >
            {/* Visual Icon Halo */}
            <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.color} border border-amber-200/50 flex items-center justify-center text-5xl shadow-sm`}>
              <span>{step.icon}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
                {step.subtitle}
              </span>
              <h2 className="text-xl font-black text-[#191919] leading-tight">
                {step.title}
              </h2>
            </div>

            <p className="text-xs text-[#525252] leading-relaxed px-2">
              {step.description}
            </p>

            {/* Innovation Badge */}
            <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-[#191919] font-medium text-left flex items-start gap-2 shadow-2xs">
              <CheckCircle size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{step.highlight}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-4 pb-4">
        {/* Step Indicator Dots */}
        <div className="flex justify-center gap-1.5">
          {onboardingSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-[#FFD21F]' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <span>{currentStep === onboardingSteps.length - 1 ? 'Start Sending Now' : 'Next Step'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
