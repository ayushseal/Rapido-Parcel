import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  Target, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import Header from '../components/layout/Header'
import { useAppStore } from '../store/useAppStore'

export default function RationaleScreen() {
  const navigate = useNavigate()
  const { resetDemo } = useAppStore()

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-8 font-sans">
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate('/')} 
        title="Product Rationale & PM Audit"
        subtitle="Business Strategy Case Challenge"
      />

      <div className="flex-1 px-4 space-y-5 pt-3">
        {/* Executive Summary Card */}
        <div className="p-4 rounded-3xl bg-[#191919] text-white space-y-2 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD21F] bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
            Strategic Product Thesis
          </span>
          <h2 className="text-base font-black leading-tight text-white">
            "Rapido = Move yourself or send something anywhere within the city."
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Rapido's direct-to-consumer delivery generated ₹340 Cr in FY25 (Rapido's fastest growing segment). However, 72% of existing users still don't know Parcel exists, and only 3% use it monthly.
          </p>
          <div className="pt-1 text-[11px] text-amber-200 font-semibold">
            Guiding Formula: Discover in 1 glance • Book in 4 steps • Track with proof • Repeat effortlessly.
          </div>
        </div>

        {/* 1. Feature to Bottleneck Strategic Mapping */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <Target size={16} className="text-amber-800" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
              1. Innovation to Bottleneck Mapping
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">Prominent Home Parcel Card</span>
                <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                  72% Unaware
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Placed above the fold; discoverable within 3 seconds of app open without digging into menus.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">5-Step Interactive Guided Tour</span>
                <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                  82% Don't Know Access
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Educates first-time users on how simple and safe booking is, converting awareness into trial.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">Smart Package Size Engine</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  Captain Refusal Friction
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Intelligently recommends Bike vs Auto based on dimensions and weight to stop captain dropouts.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">3-Layer Trust Shield (OTP + Photos)</span>
                <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                  Theft & Verification Risks
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Addresses reported ₹5,000 cash incident by enforcing pre-screening, pickup photo, and receiver OTP.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">Repeat Booking & Saved Recipient</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  One-Off Dropoff
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                1-tap re-ordering with recipient memory creates immediate return loops for urban routines.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">Rapido Parcel Pass (₹49/mo)</span>
                <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                  3% Monthly Retention
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                High-utility subscription covering 5 deliveries converts occasional users into predictable regulars.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 space-y-0.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#191919]">Receiver-Side Tracking Experience</span>
                <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  Organic Viral Loop
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Every parcel sent introduces Rapido Parcel to the receiver, doubling acquisition without ad spend.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Visual Adoption Funnel Comparison */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={16} className="text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
                2. Adoption Funnel: Baseline vs Target
              </h3>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {/* Metric 1: Awareness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#191919]">
                <span>1. Service Awareness</span>
                <span>28% → 65% (+37%)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full" style={{ width: '28%' }} title="Baseline 28%" />
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '65%' }} title="Target 65%" />
                </div>
              </div>
            </div>

            {/* Metric 2: Access Knowledge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#191919]">
                <span>2. Access Knowledge</span>
                <span>18% → 55% (+37%)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full" style={{ width: '18%' }} />
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '55%' }} />
                </div>
              </div>
            </div>

            {/* Metric 3: Ever Tried */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#191919]">
                <span>3. Ever Tried (First Booking)</span>
                <span>8% → 20% (+12%)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full" style={{ width: '8%' }} />
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            {/* Metric 4: Monthly Active */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#191919]">
                <span>4. Monthly Active (Retention)</span>
                <span>3% → 10% (+7%)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full" style={{ width: '3%' }} />
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-gray-500 pt-1 justify-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm" /> Current Baseline (Case)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> 6-Month Target (Projected)
              </span>
            </div>
            <p className="text-[9px] text-gray-400 text-center italic">
              *Projections based on team modeling assumptions; not guaranteed company statistics.
            </p>
          </div>
        </div>

        {/* 3. Theoretical Behavioral Frameworks Applied */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-amber-800" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
              3. Behavioral & Economic Principles
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-bold text-[#191919]">A. Hick's Law (Decision Latency)</p>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Reduced cognitive load by elevating Parcel to a top-level choice instead of hiding it inside multi-level Explore/All-Services catalogs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-bold text-[#191919]">B. Fogg Behavior Model (B = MAP)</p>
              <p className="text-[11px] text-[#737373] mt-0.5">
                • <strong>Motivation:</strong> Emphasized city speed & low cost (~₹25 base).<br />
                • <strong>Ability:</strong> 4-step streamlined booking with address autocomplete.<br />
                • <strong>Prompt:</strong> Non-intrusive contextual cards after passenger rides.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-bold text-[#191919]">C. Principal-Agent Mechanism Design</p>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Eliminates moral hazard and package tampering by requiring timestamped pickup photos, tamper sleeves, and a receiver-only OTP. Captains cannot falsify delivery.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-bold text-[#191919]">D. Habit Formation (Nir Eyal Hook Model)</p>
              <p className="text-[11px] text-[#737373] mt-0.5">
                • <strong>Trigger:</strong> Contextual post-ride prompts & saved recipient alerts.<br />
                • <strong>Action:</strong> 1-tap repeat delivery.<br />
                • <strong>Variable Reward:</strong> Live transparent tracking & verified safety.<br />
                • <strong>Investment:</strong> Parcel Pass subscription & saved address book.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Exception Recovery Quick Launchers */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={16} className="text-amber-800" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
              4. Test Exception Scenarios
            </h3>
          </div>

          <p className="text-xs text-[#525252]">
            Test how the redesigned application handles critical real-world edge cases:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => navigate('/error/oversized')}
              className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-left font-bold text-amber-900 hover:bg-amber-100"
            >
              1. Oversized Parcel
            </button>
            <button
              onClick={() => navigate('/error/captain-cancelled')}
              className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-left font-bold text-red-900 hover:bg-red-100"
            >
              2. Captain Cancelled
            </button>
            <button
              onClick={() => navigate('/error/recipient-unavailable')}
              className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-left font-bold text-blue-900 hover:bg-blue-100"
            >
              3. Recipient Away
            </button>
            <button
              onClick={() => navigate('/error/payment-failed')}
              className="p-2.5 rounded-xl bg-gray-100 border border-gray-300 text-left font-bold text-gray-900 hover:bg-gray-200"
            >
              4. Payment Failure
            </button>
          </div>
        </div>

        {/* 5. Recommended Judge Demonstration Script */}
        <div className="bg-amber-50 rounded-3xl p-4 border border-amber-300 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-950">
            5. Recommended Evaluation Demo Flow
          </h3>

          <ol className="text-xs text-amber-950 space-y-1.5 list-decimal list-inside font-medium">
            <li>Open Home Screen → Notice <strong>Send a Parcel</strong> card in &lt;3s.</li>
            <li>Tap "Send a Parcel" → Notice Bike vs Auto options & confidence pillars.</li>
            <li>Complete address selection → Select saved recipient <em>Priya</em>.</li>
            <li>In Package Details → Try typing "cash" or "gold" to test restriction guardrail.</li>
            <li>Select "Large Parcel" → Notice automatic <strong>Auto Parcel</strong> recommendation.</li>
            <li>In Vehicle & Fare → Toggle tamper-evident packaging sleeve (+₹15).</li>
            <li>Review & Confirm → Check sender safety declaration & Book.</li>
            <li>In Live Tracking → Use Judge Controls to step through live phases.</li>
            <li>In Handover modal → Test wrong OTP rejection, then verify.</li>
            <li>In Delivered Screen → Use <strong>Send Again</strong> to test retention loop.</li>
          </ol>
        </div>

        {/* Reset Demo CTA */}
        <div className="pt-2">
          <button
            onClick={() => {
              resetDemo()
              navigate('/')
            }}
            className="w-full py-3 bg-[#191919] hover:bg-black text-[#FFD21F] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <RotateCcw size={14} />
            <span>Reset Demo & Return to Home Screen</span>
          </button>
        </div>
      </div>
    </div>
  )
}
