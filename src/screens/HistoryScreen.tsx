import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  RotateCcw, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Plus
} from 'lucide-react'
import Header from '../components/layout/Header'
import { useAppStore, Order } from '../store/useAppStore'
import { mockOrderHistory } from '../data/mockData'
import { formatCurrency } from '../utils/helpers'

export default function HistoryScreen() {
  const navigate = useNavigate()
  const { 
    orderHistory, 
    setPickupLocation, 
    setDropLocation, 
    setRecipientName,
    setPackageCategory 
  } = useAppStore()

  // Use orders from store or fallback to mock orders
  const orders: Order[] = orderHistory.length > 0 ? orderHistory : mockOrderHistory

  const handleRepeatOrder = (order: Order) => {
    setPickupLocation(order.pickup)
    setDropLocation(order.drop)
    setRecipientName(order.recipientName)
    setPackageCategory(order.packageCategory.toLowerCase())
    navigate('/parcel/package')
  }

  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <Header 
        showLocation={false} 
        showBack={true} 
        onBack={() => navigate(-1)} 
        title="Delivery Activity"
        subtitle="Past & Completed Orders"
      />

      <div className="flex-1 px-4 space-y-3 pt-2">
        {/* Quick Send CTA Banner */}
        <div className="bg-[#FFF8DC] p-3 rounded-2xl border border-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFD21F] flex items-center justify-center text-sm font-bold">
              📦
            </div>
            <div>
              <p className="text-xs font-bold text-[#191919]">Send a new package</p>
              <p className="text-[10px] text-[#737373]">City courier from ₹25*</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/parcel/location')}
            className="px-3 py-1.5 bg-[#191919] text-[#FFD21F] text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs"
          >
            <Plus size={13} /> Send
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
            Recent Deliveries ({orders.length})
          </span>

          {orders.map((order) => {
            const isDelivered = order.status === 'delivered'
            return (
              <div
                key={order.id}
                className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200 space-y-2.5 hover:shadow-2xs transition-shadow"
              >
                {/* Header line */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#191919] capitalize">
                      {order.packageCategory} Parcel
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isDelivered ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isDelivered ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {isDelivered ? 'Delivered' : 'Cancelled'}
                    </span>
                  </div>

                  <span className="text-xs font-black text-[#191919]">
                    {formatCurrency(order.fare)}
                  </span>
                </div>

                {/* Route */}
                <div className="space-y-1 text-xs text-[#525252]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="truncate">{order.pickup.name}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="truncate">{order.drop.name} ({order.recipientName})</span>
                  </div>
                </div>

                {/* Footer line with Captain & Repeat Button */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200/80 text-[11px]">
                  <span className="text-gray-400">
                    {order.date} • {order.captain?.name || 'Rajesh'}
                  </span>

                  <button
                    onClick={() => handleRepeatOrder(order)}
                    className="flex items-center gap-1 text-amber-900 font-bold hover:underline bg-white px-2.5 py-1 rounded-lg border border-amber-300 shadow-2xs"
                  >
                    <RotateCcw size={11} />
                    <span>Send Again</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
