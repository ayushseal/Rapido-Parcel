import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Car, 
  Plane, 
  ChevronRight, 
  Clock, 
  Sparkles 
} from 'lucide-react'
import Header from '../components/layout/Header'

const popularRoutes = [
  { destination: 'Digha Beach', dist: '185 km', time: '4h 15m', fare: '₹2,450', tag: 'Weekend Getaway', icon: '🏖️' },
  { destination: 'Mandarmani', dist: '170 km', time: '4h 00m', fare: '₹2,699', tag: 'Popular', icon: '🌊' },
  { destination: 'Bolpur (Shantiniketan)', dist: '160 km', time: '3h 30m', fare: '₹2,899', tag: 'Cultural Hub', icon: '🎨' },
  { destination: 'Kolkata Airport (CCU)', dist: '16 km', time: '35m', fare: '₹349', tag: 'Airport Express', icon: '✈️' },
  { destination: 'Siliguri / NJP', dist: '560 km', time: '11h 30m', fare: '₹8,900', tag: 'North Bengal', icon: '🏔️' },
]

export default function TravelScreen() {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState<'oneway' | 'round'>('oneway')

  return (
    <div className="flex flex-col min-h-full bg-[#f4f5f7] pb-14 font-sans select-none">
      {/* Top Header */}
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate('/')} 
        title="Rapido Travel"
      />

      <div className="flex-1 px-3.5 space-y-2.5 pt-1.5 pb-4 overflow-y-auto no-scrollbar">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#191919] via-[#242730] to-[#12141a] rounded-2xl p-3 text-white relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[8px] bg-[#FFD21F] text-black font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
              INTERCITY & AIRPORT
            </span>
            <span className="text-[8.5px] text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles size={10} /> Verified Outstation Fleet
            </span>
          </div>

          <div className="py-2">
            <h2 className="text-xs font-black text-white">
              Cabs for outstation & airport journeys
            </h2>
            <p className="text-[9px] text-gray-300 mt-0.5">
              One-way and round trips with certified commercial drivers.
            </p>
          </div>

          {/* Toggle One-way vs Round-trip */}
          <div className="flex bg-white/10 rounded-xl p-0.5">
            <button
              onClick={() => setTripType('oneway')}
              className={`flex-1 py-1 rounded-lg text-[9.5px] font-bold transition-all ${
                tripType === 'oneway' ? 'bg-[#FFD21F] text-black shadow-2xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              One-Way Trip
            </button>
            <button
              onClick={() => setTripType('round')}
              className={`flex-1 py-1 rounded-lg text-[9.5px] font-bold transition-all ${
                tripType === 'round' ? 'bg-[#FFD21F] text-black shadow-2xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              Round-Trip
            </button>
          </div>
        </div>

        {/* Pickup Location Card */}
        <div className="bg-white rounded-2xl p-2.5 border border-gray-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-500 bg-white" />
            <div className="truncate">
              <p className="text-[8px] text-gray-500 font-bold leading-none">FROM</p>
              <p className="text-[10px] font-bold text-gray-900 truncate mt-0.5">
                32B, Brindaban Basak St, Ahiritola, Kolkata
              </p>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white" />
            <div className="truncate">
              <p className="text-[8px] text-gray-500 font-bold leading-none">TO</p>
              <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">
                Enter destination city or airport
              </p>
            </div>
          </div>
        </div>

        {/* Popular Intercity Routes from Kolkata */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1">
            Popular Getaways from Kolkata
          </p>

          <div className="space-y-1.5">
            {popularRoutes.map((route) => (
              <div 
                key={route.destination}
                onClick={() => alert(`Selected Outstation Route: Kolkata to ${route.destination} for ${route.fare}.`)}
                className="bg-white rounded-xl p-2.5 border border-gray-200 hover:border-[#FFD21F] cursor-pointer transition-colors flex items-center justify-between shadow-2xs group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl flex-shrink-0">{route.icon}</span>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px] font-bold text-[#191919] truncate">{route.destination}</p>
                      <span className="text-[7.5px] font-semibold bg-gray-100 text-gray-700 px-1 py-0.2 rounded">
                        {route.tag}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-gray-500 mt-0.5">
                      {route.dist} • ~{route.time}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-xs font-black text-[#191919]">{route.fare}</p>
                  <span className="text-[8.5px] text-blue-600 font-bold underline flex items-center justify-end gap-0.5">
                    Book →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

