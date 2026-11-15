import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastData {
  id: string
  message: string
  type: ToastType
}

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const bgColors: Record<ToastType, string> = {
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-primary-text',
}

// Toast manager — singleton
let addToastFn: ((message: string, type: ToastType) => void) | null = null

export function showToast(message: string, type: ToastType = 'info') {
  addToastFn?.(message, type)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    addToastFn = (message: string, type: ToastType) => {
      const id = Date.now().toString()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }
    return () => {
      addToastFn = null
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="absolute top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`
                pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg max-w-sm w-full
                ${bgColors[toast.type]}
              `}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 hover:opacity-70">
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
