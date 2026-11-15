import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

interface RealMapProps {
  mode?: 'pickup' | 'route' | 'tracking'
  interactive?: boolean
  className?: string
  captainProgress?: number // 0 to 1 for live tracking animation
  height?: string
}

// Kolkata coordinates along actual arterial route (Ahiritola -> Jadavpur)
export const KOLKATA_COORDS = {
  pickup: [22.5975, 88.3585] as [number, number], // Ahiritola, BK Paul Ave
  drop: [22.4988, 88.3716] as [number, number], // Jadavpur University
  route: [
    [22.5975, 88.3585], // Ahiritola, BK Paul Ave
    [22.5850, 88.3610], // Girish Park / Central Ave
    [22.5760, 88.3620], // MG Road
    [22.5645, 88.3525], // Esplanade
    [22.5510, 88.3530], // Park Street
    [22.5380, 88.3500], // Rabindra Sadan / Exide
    [22.5220, 88.3510], // Hazra
    [22.5140, 88.3660], // Gariahat / Golpark
    [22.4995, 88.3710], // Jadavpur 8B
    [22.4988, 88.3716], // Jadavpur University
  ] as [number, number][],
}

export default function RealMap({
  mode = 'route',
  interactive = false,
  className = '',
  captainProgress = 0.5,
  height = '100%',
}: RealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const captainMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Prevent duplicate initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const { pickup, drop, route } = KOLKATA_COORDS

    // Determine initial center and zoom
    // Center slightly offset so marker sits gracefully in the visible window
    const initialCenter = mode === 'pickup' ? [22.5960, 88.3585] as [number, number] : [22.548, 88.365] as [number, number]
    const initialZoom = mode === 'pickup' ? 14 : 12

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
      dragging: interactive,
      touchZoom: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      boxZoom: false,
      keyboard: false,
    })

    // Clean OpenStreetMap tiles (Real Kolkata street names, Hooghly river, bridges, zero watermarks)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map)

    // Custom Marker Icons
    const pickupIcon = L.divIcon({
      className: 'custom-pickup-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;">
          <div style="position: absolute; width: 26px; height: 26px; background: rgba(34, 197, 94, 0.4); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 14px; height: 14px; background: #16a34a; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4); z-index: 2;"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    const dropIcon = L.divIcon({
      className: 'custom-drop-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;">
          <div style="position: absolute; width: 24px; height: 24px; background: rgba(239, 68, 68, 0.3); border-radius: 50%;"></div>
          <div style="width: 14px; height: 14px; background: #dc2626; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4); z-index: 2;"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    // Add pickup pin
    L.marker(pickup, { icon: pickupIcon }).addTo(map)

    // Add drop pin and route if mode is 'route' or 'tracking'
    if (mode === 'route' || mode === 'tracking') {
      L.marker(drop, { icon: dropIcon }).addTo(map)

      // Polyline route connecting Ahiritola to Jadavpur
      const polyline = L.polyline(route, {
        color: '#2563EB',
        weight: 4.5,
        opacity: 0.9,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)

      // Fit bounds to show both points with comfortable padding
      if (!interactive) {
        map.fitBounds(polyline.getBounds(), {
          padding: [20, 20],
          maxZoom: 13,
        })
      }

      // Add Captain Marker for live tracking mode
      if (mode === 'tracking') {
        const clampedProgress = Math.max(0, Math.min(1, captainProgress))
        const routeIndex = Math.floor(clampedProgress * (route.length - 1))
        const captainPos = route[routeIndex] || route[3]

        const captainIcon = L.divIcon({
          className: 'custom-captain-pin',
          html: `
            <div style="width: 32px; height: 32px; background: #FFD21F; border: 2px solid #191919; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 3px 10px rgba(0,0,0,0.45);">
              🛵
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const captainMarker = L.marker(captainPos, { icon: captainIcon }).addTo(map)
        captainMarkerRef.current = captainMarker
      }
    }

    mapInstanceRef.current = map

    // Fix container dimension timing
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mode, interactive])

  // Update captain position smoothly when progress changes
  useEffect(() => {
    if (mode === 'tracking' && captainMarkerRef.current) {
      const { route } = KOLKATA_COORDS
      const clampedProgress = Math.max(0, Math.min(1, captainProgress))
      const routeIndex = Math.floor(clampedProgress * (route.length - 1))
      const nextPos = route[routeIndex]
      if (nextPos) {
        captainMarkerRef.current.setLatLng(nextPos)
      }
    }
  }, [captainProgress, mode])

  return (
    <div 
      className={`relative w-full overflow-hidden bg-[#e5e9ec] ${className}`} 
      style={{ height }}
    >
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  )
}
