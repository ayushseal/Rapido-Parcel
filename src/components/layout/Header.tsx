import { MapPin, Bell, User, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title?: string
  subtitle?: string
  showLocation?: boolean
  showBack?: boolean
  onBack?: () => void
  rightElement?: React.ReactNode
}

export default function Header({
  title,
  subtitle,
  showLocation = true,
  showBack = false,
  onBack,
  rightElement,
}: HeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header className="flex-shrink-0 bg-white px-4 pt-4 pb-3 safe-top border-b border-border/40">
      <div className="flex items-center justify-between min-h-[44px]">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-surface text-primary-text transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {showLocation ? (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-rapido-yellow/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-primary-text fill-rapido-yellow" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-medium text-secondary-text uppercase tracking-wider">Location</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                </div>
                <p className="text-sm font-bold text-primary-text truncate leading-tight">
                  Koramangala 4th Block, BLR
                </p>
              </div>
            </div>
          ) : (
            <div className="truncate">
              <h1 className="text-base font-bold text-primary-text truncate">{title}</h1>
              {subtitle && <p className="text-xs text-secondary-text truncate">{subtitle}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {rightElement ? (
            rightElement
          ) : (
            <>
              <button
                className="relative p-2 rounded-full hover:bg-surface transition-colors"
                aria-label="Notifications"
                onClick={() => alert('No new notifications')}
              >
                <Bell size={18} className="text-primary-text" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-rapido-yellow text-primary-text font-bold text-xs flex items-center justify-center shadow-xs"
                aria-label="Profile"
                onClick={() => navigate('/parcel/pass')}
                title="Rapido Profile"
              >
                AY
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
