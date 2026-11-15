import { Routes, Route } from 'react-router-dom'
import MobileFrame from './components/layout/MobileFrame'
import BottomNav from './components/layout/BottomNav'
import ToastContainer from './components/shared/Toast'

// Screens
import HomeScreen from './screens/HomeScreen'
import ParcelHome from './screens/ParcelHome'
import OnboardingScreen from './screens/OnboardingScreen'
import LocationScreen from './screens/LocationScreen'
import PackageScreen from './screens/PackageScreen'
import VehicleScreen from './screens/VehicleScreen'
import ConfirmScreen from './screens/ConfirmScreen'
import SearchingScreen from './screens/SearchingScreen'
import TrackingScreen from './screens/TrackingScreen'
import DeliveredScreen from './screens/DeliveredScreen'
import HistoryScreen from './screens/HistoryScreen'
import ParcelPassScreen from './screens/ParcelPassScreen'
import ReceiverTrackingScreen from './screens/ReceiverTrackingScreen'
import RationaleScreen from './screens/RationaleScreen'
import ErrorScreen from './screens/ErrorScreen'
import ProfileScreen from './screens/ProfileScreen'
import TravelScreen from './screens/TravelScreen'

export default function App() {
  return (
    <MobileFrame>
      <ToastContainer />
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/parcel" element={<ParcelHome />} />
            <Route path="/parcel/onboarding" element={<OnboardingScreen />} />
            <Route path="/parcel/location" element={<LocationScreen />} />
            <Route path="/parcel/package" element={<PackageScreen />} />
            <Route path="/parcel/vehicle" element={<VehicleScreen />} />
            <Route path="/parcel/confirm" element={<ConfirmScreen />} />
            <Route path="/parcel/searching" element={<SearchingScreen />} />
            <Route path="/parcel/tracking" element={<TrackingScreen />} />
            <Route path="/parcel/delivered" element={<DeliveredScreen />} />
            <Route path="/parcel/history" element={<HistoryScreen />} />
            <Route path="/parcel/pass" element={<ParcelPassScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/travel" element={<TravelScreen />} />
            <Route path="/receiver/:id" element={<ReceiverTrackingScreen />} />
            <Route path="/rationale" element={<RationaleScreen />} />
            <Route path="/error/:type" element={<ErrorScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  )
}
