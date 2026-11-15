import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  showClose?: boolean
  height?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  height = 'auto',
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            style={{ height }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between px-4 pb-3 flex-shrink-0">
                {title && <h2 className="text-lg font-bold text-primary-text">{title}</h2>}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-surface transition-colors ml-auto"
                  >
                    <X size={20} className="text-secondary-text" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6 safe-bottom">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
