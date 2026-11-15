import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateOTP } from '../utils/helpers'
import { mockLocations, mockSavedRecipients, mockOrderHistory, mockRecentLocations } from '../data/mockData'

export interface Location {
  id: string
  name: string
  address: string
  lat: number
  lng: number
}

export interface Captain {
  id: string
  name: string
  phone: string
  photo: string
  rating: number
  totalDeliveries: number
  vehicleType: 'bike' | 'auto'
  vehicleNumber: string
  vehicleModel: string
}

export interface Recipient {
  id: string
  name: string
  phone: string
  address: Location
}

export interface Order {
  id: string
  date: string
  status: 'delivered' | 'cancelled' | 'failed'
  pickup: Location
  drop: Location
  recipientName: string
  captain: Captain
  fare: number
  packageCategory: string
  rating?: number
}

export interface AppState {
  // Navigation
  currentScreen: string

  // User
  isFirstTimeUser: boolean
  hasSeenOnboarding: boolean
  hasCompletedRide: boolean

  // Booking
  pickupLocation: Location | null
  dropLocation: Location | null
  recipientName: string
  recipientPhone: string
  deliveryInstructions: string
  packageCategory: string
  packageSize: 'small' | 'medium' | 'large' | null
  packageDescription: string
  packagePhoto: string | null
  selectedVehicle: 'bike' | 'auto' | null
  recommendedVehicle: 'bike' | 'auto' | null
  addPackaging: boolean

  // Fare
  baseFare: number
  distanceFare: number
  packagingFee: number
  discount: number
  totalFare: number

  // Booking status
  bookingStatus: 'idle' | 'searching' | 'matched' | 'pickup' | 'pickedUp' | 'inTransit' | 'arriving' | 'delivered' | 'cancelled' | 'failed'
  captain: Captain | null
  deliveryOTP: string
  enteredOTP: string
  pickupPhoto: boolean
  dropPhoto: boolean
  estimatedPickupTime: number
  estimatedDeliveryTime: number

  // History
  savedRecipients: Recipient[]
  recentLocations: Location[]
  orderHistory: Order[]

  // Parcel Pass
  hasParcelPass: boolean
  parcelPassDeliveriesLeft: number

  // UI
  showOnboarding: boolean
  showContextualCard: boolean
  contextualCardType: 'first-time' | 'post-ride' | 'repeat' | null
  activeModal: string | null

  // Demo
  demoMode: boolean

  // Error scenarios
  activeScenario: string | null

  // Actions
  setCurrentScreen: (screen: string) => void
  setPickupLocation: (location: Location | null) => void
  setDropLocation: (location: Location | null) => void
  setRecipientName: (name: string) => void
  setRecipientPhone: (phone: string) => void
  setDeliveryInstructions: (instructions: string) => void
  setPackageCategory: (category: string) => void
  setPackageSize: (size: 'small' | 'medium' | 'large' | null) => void
  setPackageDescription: (description: string) => void
  setPackagePhoto: (photo: string | null) => void
  setSelectedVehicle: (vehicle: 'bike' | 'auto' | null) => void
  setRecommendedVehicle: (vehicle: 'bike' | 'auto' | null) => void
  setAddPackaging: (add: boolean) => void
  setFare: (fare: { baseFare: number; distanceFare: number; packagingFee: number; discount: number; totalFare: number }) => void
  setBookingStatus: (status: AppState['bookingStatus']) => void
  setCaptain: (captain: Captain | null) => void
  setDeliveryOTP: (otp: string) => void
  setEnteredOTP: (otp: string) => void
  setPickupPhoto: (taken: boolean) => void
  setDropPhoto: (taken: boolean) => void
  setEstimatedPickupTime: (time: number) => void
  setEstimatedDeliveryTime: (time: number) => void
  addSavedRecipient: (recipient: Recipient) => void
  removeSavedRecipient: (id: string) => void
  addRecentLocation: (location: Location) => void
  addOrderToHistory: (order: Order) => void
  setHasParcelPass: (has: boolean) => void
  setParcelPassDeliveriesLeft: (count: number) => void
  setShowOnboarding: (show: boolean) => void
  setShowContextualCard: (show: boolean) => void
  setContextualCardType: (type: AppState['contextualCardType']) => void
  setActiveModal: (modal: string | null) => void
  setHasSeenOnboarding: (seen: boolean) => void
  setHasCompletedRide: (completed: boolean) => void
  setIsFirstTimeUser: (isFirst: boolean) => void
  setDemoMode: (demo: boolean) => void
  setActiveScenario: (scenario: string | null) => void
  resetBooking: () => void
  resetDemo: () => void
}

const initialState = {
  currentScreen: 'home',
  isFirstTimeUser: false,
  hasSeenOnboarding: true,
  hasCompletedRide: true,
  pickupLocation: mockLocations[0],
  dropLocation: mockLocations[1],
  recipientName: 'Ayush Seal',
  recipientPhone: '9830730788',
  deliveryInstructions: 'Department of Computer Science, Ground Floor',
  packageCategory: 'documents',
  packageSize: 'small' as 'small' | 'medium' | 'large' | null,
  packageDescription: 'Official study notes and documents',
  packagePhoto: null as string | null,
  selectedVehicle: 'bike' as 'bike' | 'auto' | null,
  recommendedVehicle: 'bike' as 'bike' | 'auto' | null,
  addPackaging: false,
  baseFare: 175,
  distanceFare: 0,
  packagingFee: 0,
  discount: 0,
  totalFare: 175,
  bookingStatus: 'idle' as const,
  captain: null as Captain | null,
  deliveryOTP: generateOTP(),
  enteredOTP: '',
  pickupPhoto: false,
  dropPhoto: false,
  estimatedPickupTime: 2,
  estimatedDeliveryTime: 24,
  savedRecipients: mockSavedRecipients,
  recentLocations: mockRecentLocations,
  orderHistory: mockOrderHistory,
  hasParcelPass: false,
  parcelPassDeliveriesLeft: 0,
  showOnboarding: false,
  showContextualCard: true,
  contextualCardType: 'post-ride' as AppState['contextualCardType'],
  activeModal: null as string | null,
  demoMode: false,
  activeScenario: null as string | null,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // Navigation
      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      // User
      setIsFirstTimeUser: (isFirst) => set({ isFirstTimeUser: isFirst }),
      setHasSeenOnboarding: (seen) => set({ hasSeenOnboarding: seen }),
      setHasCompletedRide: (completed) => set({ hasCompletedRide: completed }),

      // Booking
      setPickupLocation: (location) => set({ pickupLocation: location }),
      setDropLocation: (location) => set({ dropLocation: location }),
      setRecipientName: (name) => set({ recipientName: name }),
      setRecipientPhone: (phone) => set({ recipientPhone: phone }),
      setDeliveryInstructions: (instructions) => set({ deliveryInstructions: instructions }),
      setPackageCategory: (category) => set({ packageCategory: category }),
      setPackageSize: (size) => set({ packageSize: size }),
      setPackageDescription: (description) => set({ packageDescription: description }),
      setPackagePhoto: (photo) => set({ packagePhoto: photo }),
      setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
      setRecommendedVehicle: (vehicle) => set({ recommendedVehicle: vehicle }),
      setAddPackaging: (add) => set({ addPackaging: add }),

      // Fare
      setFare: (fare) => set(fare),

      // Booking status
      setBookingStatus: (status) => set({ bookingStatus: status }),
      setCaptain: (captain) => set({ captain }),
      setDeliveryOTP: (otp) => set({ deliveryOTP: otp }),
      setEnteredOTP: (otp) => set({ enteredOTP: otp }),
      setPickupPhoto: (taken) => set({ pickupPhoto: taken }),
      setDropPhoto: (taken) => set({ dropPhoto: taken }),
      setEstimatedPickupTime: (time) => set({ estimatedPickupTime: time }),
      setEstimatedDeliveryTime: (time) => set({ estimatedDeliveryTime: time }),

      // History
      addSavedRecipient: (recipient) =>
        set((state) => ({ savedRecipients: [...state.savedRecipients, recipient] })),
      removeSavedRecipient: (id) =>
        set((state) => ({ savedRecipients: state.savedRecipients.filter((r) => r.id !== id) })),
      addRecentLocation: (location) =>
        set((state) => ({
          recentLocations: [location, ...state.recentLocations.filter((l) => l.id !== location.id)].slice(0, 10),
        })),
      addOrderToHistory: (order) =>
        set((state) => ({ orderHistory: [order, ...state.orderHistory] })),

      // Parcel Pass
      setHasParcelPass: (has) => set({ hasParcelPass: has }),
      setParcelPassDeliveriesLeft: (count) => set({ parcelPassDeliveriesLeft: count }),

      // UI
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      setShowContextualCard: (show) => set({ showContextualCard: show }),
      setContextualCardType: (type) => set({ contextualCardType: type }),
      setActiveModal: (modal) => set({ activeModal: modal }),

      // Demo
      setDemoMode: (demo) => set({ demoMode: demo }),
      setActiveScenario: (scenario) => set({ activeScenario: scenario }),

      // Reset booking
      resetBooking: () =>
        set({
          pickupLocation: null,
          dropLocation: null,
          recipientName: '',
          recipientPhone: '',
          deliveryInstructions: '',
          packageCategory: '',
          packageSize: null,
          packageDescription: '',
          packagePhoto: null,
          selectedVehicle: null,
          recommendedVehicle: null,
          addPackaging: false,
          baseFare: 0,
          distanceFare: 0,
          packagingFee: 0,
          discount: 0,
          totalFare: 0,
          bookingStatus: 'idle',
          captain: null,
          deliveryOTP: generateOTP(),
          enteredOTP: '',
          pickupPhoto: false,
          dropPhoto: false,
          estimatedPickupTime: 0,
          estimatedDeliveryTime: 0,
          activeScenario: null,
        }),

      // Full reset
      resetDemo: () =>
        set({
          ...initialState,
          deliveryOTP: generateOTP(),
          savedRecipients: mockSavedRecipients,
          recentLocations: mockRecentLocations,
          orderHistory: mockOrderHistory,
        }),
    }),
    {
      name: 'rapido-parcel-storage',
      partialize: (state) => ({
        isFirstTimeUser: state.isFirstTimeUser,
        hasSeenOnboarding: state.hasSeenOnboarding,
        hasCompletedRide: state.hasCompletedRide,
        savedRecipients: state.savedRecipients,
        recentLocations: state.recentLocations,
        orderHistory: state.orderHistory,
        hasParcelPass: state.hasParcelPass,
        parcelPassDeliveriesLeft: state.parcelPassDeliveriesLeft,
      }),
    }
  )
)
