import { useLocation, useNavigate } from 'react-router-dom'
import { Navigation2, HandMetal, Package, Luggage, User } from 'lucide-react'

// Exact 5 tabs from real Rapido app (Screenshot 1 & 2)
const tabs = [
  { path: '/', label: 'Ride', icon: Navigation2 },
  { path: '/ownly', label: 'Ownly', icon: HandMetal },
  { path: '/parcel', label: 'Parcel', icon: Package, badge: 'NEW' },
  { path: '/travel', label: 'Travel', icon: Luggage },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  // Hide bottom nav on searching & delivered screens (keep visible on tracking)
  const hideOnPaths = ['/parcel/searching', '/parcel/delivered', '/receiver']
  if (hideOnPaths.some((p) => location.pathname.startsWith(p))) return null

  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-200 z-30 select-none">
      <div className="flex items-center justify-around h-13 px-1">
        {tabs.map((tab) => {
          const isParcel = tab.path === '/parcel'
          const isActive =
            tab.path === '/'
              ? location.pathname === '/'
              : tab.path === '/parcel'
              ? location.pathname.startsWith('/parcel')
              : location.pathname.startsWith(tab.path)

          const Icon = tab.icon

          return (
            <button
              key={tab.path}
              onClick={() => {
                if (tab.path === '/ownly') {
                  alert('Rapido Ownly: Rent vehicles on daily / weekly basis.')
                  return
                }
                navigate(tab.path)
              }}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all ${
                isActive ? 'text-black font-extrabold' : 'text-gray-500 hover:text-black font-medium'
              }`}
            >
              {/* Parcel "New!" badge matching official Rapido design */}
              {isParcel && (
                <span className="absolute -top-1.5 px-1.5 py-0.2 rounded-full bg-[#FFD21F] text-black text-[8px] font-black border border-black/15 shadow-2xs leading-none">
                  New!
                </span>
              )}

              <div className="relative">
                <Icon size={19} strokeWidth={isActive ? 2.6 : 1.8} className={isParcel && isActive ? 'text-black' : ''} />
              </div>
              <span className={`text-[10px] leading-tight ${isActive ? 'font-bold text-black' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
