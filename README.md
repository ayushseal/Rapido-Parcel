# Rapido Parcel — Product Adoption & Hyperlocal Delivery Prototype

> **Transforming a Hidden Feature into a Habit-Forming Hyperlocal Delivery Experience**  
> *Developed for Competitive Business Strategy & Product Design Case Challenge*

---

## 🚀 Live Demo & Quick Start

The application runs a complete, mobile-first, high-fidelity interactive prototype built with **React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, and Zustand**.

### 1. Prerequisites
- Node.js (v18+)
- pnpm (v9+ or v10+)

### 2. Run Locally
```bash
cd rapido-parcel
pnpm install
pnpm approve-builds --all   # if prompted by pnpm
pnpm run dev --host 0.0.0.0 --port 5173
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🎯 Case Problem Context & Funnel Breakdown

Based on the case challenge survey of **1,000 existing Rapido mobility users**:

| Funnel Stage | Current Baseline | Drop-off Count | Strategic Product Diagnosis |
|---|---:|---:|---|
| **Aware of Parcel** | **28%** (280) | 720 unaware | **Discoverability Deficit**: Hidden inside secondary "All Services" or "Explore" menus. |
| **Know How to Access** | **18%** (180) | 100 drop-off | **Mental Model Collision**: Users associate Rapido strictly with passenger bike/auto rides. |
| **Have Ever Tried** | **8%** (80) | 100 drop-off | **Activation Friction**: Concerns over delivery theft, captain cancellations, or item sizing. |
| **Monthly Repeat Users** | **3%** (30) | 50 drop-off | **Retention Deficit**: Lack of re-order hooks, habit loops, or loyalty incentives. |

---

## 💡 The 5 Core Product Innovations

### 1. < 3-Second Discoverability (Home Screen Architecture)
- **Top Service Tab**: Elevated Parcel alongside Bike, Auto, and Cab as a top-level primary service.
- **Hero "Send a Parcel" Card**: Visible above the fold with transparent starting fares (`From ₹25*`) and delivery speeds (`~30 mins*`).
- **Contextual Ride Prompts**: Non-intrusive banner after passenger trips: *"Did you know Rapido delivers packages too?"*
- **Cross-Service Active Delivery Indicator**: Persistent banner at the top of the home screen whenever an order is in transit, matching Rapido's multi-modal conventions.

### 2. Smart Package-Vehicle Matching & Intelligent Sizing
- **Categorization**: 7 intuitive visual categories (Documents, Food, Clothes, Gifts, Electronics, Household, Other).
- **Automated Size Recommendation**:
  - Small / Medium (≤ 5kg) → **Bike Parcel (2-Wheeler)** recommended for speed and low cost.
  - Large (> 5kg up to 15kg) → **Auto Parcel (3-Wheeler)** automatically recommended with clear explanation, solving captain refusals for oversized packages.

### 3. Automated Restricted-Items Guardrail
- Real-time screening rule engine scanning descriptions for high-risk and illegal goods:
  - `Cash`, `Currency`, `Gold`, `Jewellery`, `Diamonds`, `Weapons`, `Narcotics`, `Liquor`.
- Directly addresses reported theft incidents (e.g., ₹5,000 cash incident) by halting invalid bookings upfront and educating the user on the zero-tolerance safety policy.

### 4. 3-Layer Trust Shield & Verification Architecture
1. **Layer 1 (Pre-Booking)**: Item declaration & prohibited-goods filter.
2. **Layer 2 (Pickup Audit)**: Mandatory timestamped, GPS-logged parcel condition photo by the captain before departing.
3. **Layer 3 (Handover Verification)**: Secure 4-digit OTP sent strictly to the recipient. The captain cannot complete the booking without the receiver's code.

### 5. Habit Formation & Retention Engine
- **1-Tap Repeat Booking**: Carries forward pickup/drop/recipient details while allowing instant package updates.
- **Saved Address Book**: Instant recipient selection chips.
- **Rapido Parcel Pass (₹49/month)**: Experimental loyalty tier including 5 deliveries, priority peak matching, and free tamper-evident sleeves to convert one-off senders into predictable monthly regulars.
- **Recipient-Side Viral Loop**: Receiver tracking portal introduces the service to new users organically.

---

## 📱 Guided Walkthrough for Judges & Evaluators

Follow this sequence to experience the end-to-end prototype:

1. **Home Screen (`/`)**:
   - Observe the marquee **SEND A PARCEL** card and the top service selector.
   - Tap **Send Parcel** or **Parcel** tab.

2. **Parcel Introduction (`/parcel`)**:
   - Review the 3 confidence indicators (Transparent Pricing, Live Tracking, Verified Handover).
   - Tap **"Learn about Parcel Safety"** to open the Trust Shield modal.
   - Tap **SEND A PARCEL (Bike)**.

3. **Location & Recipient (`/parcel/location`)**:
   - Tap **"Use current location"** or search addresses.
   - Use the **⇅ Swap button**.
   - Tap a saved recipient chip (e.g. *Priya Sharma*).
   - Tap **Continue to Package Details**.

4. **Smart Package Description (`/parcel/package`)**:
   - Tap **Documents** or **Gifts**.
   - In description, type `"cash"` or `"gold"` to see the **Intelligent Restriction Guardrail** block the form.
   - Clear the text and type `"Office files"`.
   - Select **Large Parcel** and observe the recommendation dynamically switch to **Auto Parcel**.
   - Tap **Choose Delivery Option**.

5. **Vehicle Selection & Transparent Fare (`/parcel/vehicle`)**:
   - Compare Bike Parcel vs Auto Parcel with capacity notes.
   - Toggle **"Add Tamper-Evident Package Sleeve (+₹15)"** and watch the fare breakdown recalculate in real-time.
   - Tap **Review & Confirm**.

6. **Confirm Booking (`/parcel/confirm`)**:
   - Check the sender safety declaration checkbox.
   - Tap **Confirm & Book**.

7. **Captain Dispatch (`/parcel/searching`)**:
   - Experience the radar search animation.
   - Watch the captain reveal animation (Rajesh Kumar / Suresh M).

8. **Live Tracking & Verification (`/parcel/tracking`)**:
   - Inspect the moving vehicle on the map route.
   - Observe the **Proof of Pickup Audit** photo card.
   - View the **Delivery Handover OTP** card.
   - Tap **Share Tracking** to test the receiver link simulation.
   - Use the bottom **Judge Stage Controls** to step through the phases (`Heading to Pickup` → `Package Collected` → `On the Way` → `Approaching Drop`).
   - When reaching handover, test entering an **incorrect OTP** to verify security rejection, then verify with the correct 4-digit code.

9. **Delivery Success & Repeat Retention (`/parcel/delivered`)**:
   - Review the verified audit summary (photos + OTP).
   - Rate the captain and select feedback tags.
   - Tap **"Send Again"** to verify that route data is carried forward into a repeat booking.

10. **Test Error Handling & PM Rationale**:
    - Tap **Product Rationale & PM Audit** in the desktop companion panel (or navigate to `/rationale`).
    - Inspect the visual funnel comparison (28% → 65% awareness).
    - Click any of the 4 exception scenario launchers:
      - Oversized parcel refusal → Upgrade to Auto.
      - Captain cancellation → Instant auto-reassignment.
      - Recipient unreachable → Return to sender protocol.
      - Payment failure recovery.

---

## 🛠️ Architecture & Tech Stack

```
rapido-parcel/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # App header with location & notifications
│   │   │   ├── BottomNav.tsx        # Bottom tab bar (Home, Activity, Pass, Profile)
│   │   │   └── MobileFrame.tsx      # Desktop phone frame + Judge companion drawer
│   │   └── shared/
│   │       ├── Button.tsx           # Rapido yellow CTA button variants
│   │       ├── Card.tsx             # Surface card wrapper
│   │       ├── Modal.tsx            # Bottom sheet overlay
│   │       ├── Badge.tsx            # Status pills
│   │       └── Toast.tsx            # Feedback toast notifications
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Marquee discovery & active order banner
│   │   ├── ParcelHome.tsx           # Service landing & Trust Shield panel
│   │   ├── OnboardingScreen.tsx     # 5-step interactive tour
│   │   ├── LocationScreen.tsx       # Address search, swap & recipient details
│   │   ├── PackageScreen.tsx        # Smart categorization & restriction checker
│   │   ├── VehicleScreen.tsx        # Bike vs Auto & transparent fare calculator
│   │   ├── ConfirmScreen.tsx        # Summary & sender declaration
│   │   ├── SearchingScreen.tsx      # Radar dispatch simulation
│   │   ├── TrackingScreen.tsx       # Live map, ETAs, proof of pickup & OTP verification
│   │   ├── DeliveredScreen.tsx      # Verified proof, ratings & repeat booking
│   │   ├── HistoryScreen.tsx        # Order history with 1-tap re-order
│   │   ├── ParcelPassScreen.tsx     # ₹49/month retention subscription
│   │   ├── ReceiverTrackingScreen.tsx # Standalone recipient view with handover OTP
│   │   ├── ErrorScreen.tsx          # 5 working exception recovery scenarios
│   │   └── RationaleScreen.tsx      # PM audit, funnel graphs & theoretical framework
│   ├── store/
│   │   └── useAppStore.ts           # Persisted Zustand state management
│   ├── data/
│   │   ├── mockData.ts              # Bangalore locations, captains, recipients
│   │   └── restrictedItems.ts       # Prohibited item detection dictionary
│   └── utils/
│       └── helpers.ts               # Haversine distance, fare math, OTP generator
```

