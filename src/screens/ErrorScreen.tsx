import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  AlertTriangle, 
  RefreshCw, 
  Phone, 
  ArrowLeft, 
  Truck, 
  Clock, 
  CreditCard, 
  HelpCircle, 
  XCircle, 
  ShieldAlert, 
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import Header from '../components/layout/Header'
import Modal from '../components/shared/Modal'
import { useAppStore } from '../store/useAppStore'
import { showToast } from '../components/shared/Toast'

export default function ErrorScreen() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()
  const { 
    setSelectedVehicle, 
    setBookingStatus, 
    recipientName, 
    recipientPhone,
    captain 
  } = useAppStore()

  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)

  // Handlers for Scenario A: Oversized
  const handleUpgradeToAuto = () => {
    setSelectedVehicle('auto')
    showToast('Upgraded to Auto Parcel for larger package capacity', 'info')
    navigate('/parcel/vehicle')
  }

  // Handlers for Scenario B: Re-search
  const handleFindAnotherCaptain = () => {
    setBookingStatus('searching')
    showToast('Searching for a new nearby captain...', 'info')
    navigate('/parcel/searching')
  }

  // Scenario C: Return to sender
  const handleConfirmReturn = () => {
    setShowReturnModal(false)
    showToast('Return to sender initiated. Captain is heading back.', 'warning')
    navigate('/parcel/tracking')
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-6 font-sans">
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate('/parcel/tracking')}
        title="Delivery Exception"
        subtitle="Intelligent Recovery Assistant"
      />

      <div className="flex-1 px-4 space-y-4 pt-3">
        {/* ============================================================== */}
        {/* SCENARIO A: OVERSIZED PARCEL REFUSAL */}
        {/* ============================================================== */}
        {type === 'oversized' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 text-2xl">
                🛺
              </div>
              <h2 className="text-base font-black text-[#191919]">
                Package Exceeds Bike Capacity
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed">
                Captain inspected the item and noted it exceeds the 5kg / 40cm two-wheeler safety threshold. Don't worry — your booking details are preserved.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
              <span className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Recommended Resolution
              </span>

              {/* Action 1: Upgrade to Auto */}
              <button
                onClick={handleUpgradeToAuto}
                className="w-full p-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-xs rounded-xl shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🛺</span>
                  <div className="text-left">
                    <p className="font-black">Upgrade to Auto Parcel (3-Wheeler)</p>
                    <p className="text-[10px] text-black/75">Handles boxes up to 15kg • +₹20 est. fare</p>
                  </div>
                </div>
                <ArrowRight size={15} />
              </button>

              {/* Action 2: Find Another Bike Captain */}
              <button
                onClick={handleFindAnotherCaptain}
                className="w-full p-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs rounded-xl border border-gray-300 flex items-center justify-between"
              >
                <span>Request Another Bike Captain</span>
                <RefreshCw size={14} className="text-gray-500" />
              </button>

              {/* Action 3: Cancel without penalty */}
              <button
                onClick={() => {
                  setBookingStatus('cancelled')
                  showToast('Order cancelled with zero penalty fee', 'info')
                  navigate('/')
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-red-600 hover:underline"
              >
                Cancel Booking with No Cancellation Fee
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENARIO B: CAPTAIN CANCELLED AFTER ACCEPTING */}
        {/* ============================================================== */}
        {type === 'captain-cancelled' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-red-50 border-2 border-red-300 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-base font-black text-[#191919]">
                Captain Cancelled Due to Vehicle Issue
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed">
                Captain reported an unavoidable road puncture. We apologize for the delay. Your package details and address are completely preserved.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
              <span className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Instant Recovery
              </span>

              <button
                onClick={handleFindAnotherCaptain}
                className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} />
                <span>Auto-Match Replacement Captain</span>
              </button>

              <button
                onClick={() => {
                  setBookingStatus('cancelled')
                  navigate('/')
                }}
                className="w-full py-2.5 bg-white text-gray-700 font-semibold text-xs rounded-xl border border-gray-300"
              >
                Cancel Without Restarting
              </button>

              <button
                onClick={() => setShowHelpModal(true)}
                className="w-full py-2 text-center text-xs font-bold text-amber-800 hover:underline"
              >
                Connect with Priority Support
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENARIO C: RECIPIENT UNAVAILABLE */}
        {/* ============================================================== */}
        {type === 'recipient-unavailable' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Phone size={24} />
              </div>
              <h2 className="text-base font-black text-[#191919]">
                Recipient Not Answering at Drop Location
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed">
                Captain has arrived at the drop address and tried calling {recipientName || 'recipient'} twice without answer.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
              <button
                onClick={() => alert(`Dialing recipient ${recipientName} (${recipientPhone || '+91 98765 11111'})...`)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <Phone size={14} />
                <span>Call Recipient ({recipientPhone || '+91 98765 11111'})</span>
              </button>

              <button
                onClick={() => {
                  showToast('Captain informed to wait 5 more minutes at gate', 'info')
                  navigate('/parcel/tracking')
                }}
                className="w-full py-2.5 bg-white text-gray-800 font-semibold text-xs rounded-xl border border-gray-300 flex items-center justify-center gap-2"
              >
                <Clock size={14} />
                <span>Request Captain to Wait 5 Mins</span>
              </button>

              <button
                onClick={() => setShowReturnModal(true)}
                className="w-full py-2.5 bg-red-50 text-red-700 font-bold text-xs rounded-xl border border-red-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                <span>Arrange Safe Return to Sender</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENARIO D: DELAYED DELIVERY */}
        {/* ============================================================== */}
        {type === 'delayed' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-blue-50 border-2 border-blue-300 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Clock size={24} />
              </div>
              <h2 className="text-base font-black text-[#191919]">
                Delivery Running Behind Schedule
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed">
                Heavy traffic reported on Outer Ring Road. New estimated arrival is 14 minutes later than original ETA.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
              <button
                onClick={() => navigate('/parcel/tracking')}
                className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <span>Return to Live Tracking</span>
              </button>

              <button
                onClick={() => alert('Calling Captain...')}
                className="w-full py-2.5 bg-white text-gray-800 font-semibold text-xs rounded-xl border border-gray-300"
              >
                Call Captain for Direct Update
              </button>

              <button
                onClick={() => {
                  showToast('Delay update sent to recipient via SMS', 'success')
                }}
                className="w-full py-2 text-center text-xs font-bold text-blue-700 hover:underline"
              >
                Send Updated ETA Notification to Recipient
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENARIO E: PAYMENT FAILURE */}
        {/* ============================================================== */}
        {type === 'payment-failed' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-red-50 border-2 border-red-300 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                <CreditCard size={24} />
              </div>
              <h2 className="text-base font-black text-[#191919]">
                Payment Transaction Incomplete
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed">
                Bank payment gateway timed out. Your parcel booking details are intact and have not been lost.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5">
              <button
                onClick={() => {
                  showToast('Switched to Cash on Handover. Order confirmed!', 'success')
                  setBookingStatus('searching')
                  navigate('/parcel/searching')
                }}
                className="w-full py-3 bg-[#FFD21F] hover:bg-[#f0c400] text-black font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <span>Switch to Cash on Handover (Instant Confirmation)</span>
              </button>

              <button
                onClick={() => {
                  showToast('Retrying payment gateway...', 'info')
                  navigate('/parcel/confirm')
                }}
                className="w-full py-2.5 bg-white text-gray-800 font-semibold text-xs rounded-xl border border-gray-300"
              >
                Retry Online Payment (UPI / Wallet)
              </button>
            </div>
          </div>
        )}

        {/* Fallback for unknown type */}
        {!['oversized', 'captain-cancelled', 'recipient-unavailable', 'delayed', 'payment-failed'].includes(type || '') && (
          <div className="text-center py-8 space-y-3">
            <AlertTriangle size={36} className="text-amber-500 mx-auto" />
            <h2 className="text-base font-bold">Exception Scenarios Testing</h2>
            <p className="text-xs text-gray-500">Select an error scenario from the desktop companion panel.</p>
            <button
              onClick={() => navigate('/parcel/tracking')}
              className="px-4 py-2 bg-[#FFD21F] text-black text-xs font-bold rounded-xl"
            >
              Go to Tracking
            </button>
          </div>
        )}

        {/* Persistent Bottom Bar */}
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setBookingStatus('cancelled')
              navigate('/')
            }}
            className="text-red-600 font-bold hover:underline"
          >
            Cancel Order
          </button>
          <button
            onClick={() => setShowHelpModal(true)}
            className="text-gray-700 font-semibold flex items-center gap-1 hover:underline"
          >
            <HelpCircle size={14} /> 24x7 Support
          </button>
        </div>
      </div>

      {/* Return to Sender Confirmation Modal */}
      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        title="Arrange Return to Sender"
      >
        <div className="space-y-4 pt-1 text-xs">
          <p className="text-[#525252] leading-relaxed">
            The captain will securely return your package to the pickup address. A standard return transit charge of <strong className="text-black">₹30</strong> will apply.
          </p>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
            <strong>Return Protocol:</strong> Captain will verify package condition and return code with sender upon delivery.
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmReturn}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            >
              Confirm Return to Sender (₹30)
            </button>
            <button
              onClick={() => setShowReturnModal(false)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Help Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Emergency Parcel Support"
      >
        <div className="space-y-3 pt-1 text-xs">
          <p className="text-[#525252]">We have routed your ticket to Rapido Rapid-Response Logistics Team.</p>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-200">
            A support executive will contact both sender and captain within 90 seconds.
          </div>
          <button
            onClick={() => setShowHelpModal(false)}
            className="w-full py-2.5 bg-[#FFD21F] text-black font-bold rounded-xl"
          >
            Close Support Ticket
          </button>
        </div>
      </Modal>
    </div>
  )
}
