import type { Location } from '../store/useAppStore'
import { restrictedKeywords } from '../data/restrictedItems'

/**
 * Generate a random 4-digit OTP string.
 */
export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

/**
 * Calculate fare breakdown for a delivery.
 */
export function calculateFare(
  distance: number,
  vehicleType: 'bike' | 'auto',
  hasPackaging: boolean
): {
  baseFare: number
  distanceFare: number
  packagingFee: number
  discount: number
  totalFare: number
} {
  const baseFare = vehicleType === 'bike' ? 25 : 40
  const perKmRate = vehicleType === 'bike' ? 8 : 12
  const distanceFare = Math.round(distance * perKmRate)
  const packagingFee = hasPackaging ? 20 : 0
  const subtotal = baseFare + distanceFare + packagingFee
  const discount = 0 // Can be applied via promo codes
  const totalFare = subtotal - discount

  return { baseFare, distanceFare, packagingFee, discount, totalFare }
}

/**
 * Format an amount in Indian Rupees.
 */
export function formatCurrency(amount: number): string {
  return `₹${amount}`
}

/**
 * Format time in minutes to a human-readable string.
 */
export function formatTime(minutes: number): string {
  if (minutes < 1) return 'Less than a min'
  if (minutes === 1) return '1 min'
  if (minutes < 60) return `${Math.round(minutes)} mins`
  const hrs = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  if (mins === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`
  return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} min${mins > 1 ? 's' : ''}`
}

/**
 * Get an estimated distance between two locations (mock Haversine-like calculation).
 */
export function getEstimatedDistance(pickup: Location, drop: Location): number {
  const R = 6371 // Earth radius in km
  const dLat = ((drop.lat - pickup.lat) * Math.PI) / 180
  const dLng = ((drop.lng - pickup.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pickup.lat * Math.PI) / 180) *
      Math.cos((drop.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const straightLine = R * c
  // Multiply by ~1.4 to estimate road distance
  return Math.round(straightLine * 1.4 * 10) / 10
}

/**
 * Check if a package description contains restricted item keywords.
 * Returns the matched keywords.
 */
export function checkRestrictedItems(description: string): string[] {
  const lower = description.toLowerCase()
  return restrictedKeywords.filter((keyword) => lower.includes(keyword))
}
