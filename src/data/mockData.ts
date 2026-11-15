import type { Location, Captain, Recipient, Order } from '../store/useAppStore'

// Exact locations from real Rapido user screenshots (Kolkata) + popular transit points
export const mockLocations: Location[] = [
  {
    id: 'loc-pickup',
    name: '32B, Brindaban Basak St',
    address: 'Ahiritola, Beniatola, Kolkata, West Bengal 700005',
    lat: 22.5936,
    lng: 88.3582,
  },
  {
    id: 'loc-jadavpur',
    name: 'Jadavpur University',
    address: 'Raja Subodh Chandra Mallick Road, Jadavpur, Kolkata, West Bengal 700032',
    lat: 22.4989,
    lng: 88.3714,
  },
  {
    id: 'loc-jadavpur-8b',
    name: 'Jadavpur 8B',
    address: 'Central Road, Bidhanpally, Jadavpur, Kolkata, West Bengal 700032',
    lat: 22.4975,
    lng: 88.3702,
  },
  {
    id: 'loc-howrah',
    name: 'Howrah Railway Station',
    address: 'Station Road, Howrah, West Bengal 711101',
    lat: 22.5839,
    lng: 88.3426,
  },
  {
    id: 'loc-rangoli',
    name: 'Forum Rangoli Mall',
    address: 'Grand Trunk Road, Belur, Howrah, West Bengal 711204',
    lat: 22.6231,
    lng: 88.3496,
  },
  {
    id: 'loc-park-street',
    name: 'Park Street',
    address: 'Park Street, Kolkata, West Bengal 700016',
    lat: 22.5510,
    lng: 88.3526,
  },
  {
    id: 'loc-salt-lake',
    name: 'Sector V, Salt Lake',
    address: 'Bidhannagar, Kolkata, West Bengal 700091',
    lat: 22.5804,
    lng: 88.4378,
  },
]

export const mockCaptains: Captain[] = [
  {
    id: 'cap-1',
    name: 'Subhash Ghosh',
    phone: '+91 98310 44210',
    photo: '',
    rating: 4.85,
    totalDeliveries: 1842,
    vehicleType: 'bike',
    vehicleNumber: 'WB 02 AD 4421',
    vehicleModel: 'Hero Splendor Plus',
  },
  {
    id: 'cap-2',
    name: 'Bikram Das',
    phone: '+91 98312 91823',
    photo: '',
    rating: 4.72,
    totalDeliveries: 964,
    vehicleType: 'auto',
    vehicleNumber: 'WB 04 CD 1982',
    vehicleModel: 'Bajaj RE Auto',
  },
  {
    id: 'cap-3',
    name: 'Manoj Mondal',
    phone: '+91 98315 77129',
    photo: '',
    rating: 4.9,
    totalDeliveries: 2310,
    vehicleType: 'bike',
    vehicleNumber: 'WB 06 EF 8921',
    vehicleModel: 'Honda Activa 6G',
  },
]

export const mockSavedRecipients: Recipient[] = [
  {
    id: 'rec-1',
    name: 'Ayush Seal (Hostel/Office)',
    phone: '9830730788',
    address: mockLocations[1], // Jadavpur University
  },
  {
    id: 'rec-2',
    name: 'Rohan Sen',
    phone: '9830112233',
    address: mockLocations[2], // Jadavpur 8B
  },
  {
    id: 'rec-3',
    name: 'Debopriya Roy',
    phone: '9830445566',
    address: mockLocations[3], // Howrah
  },
]

export const mockRecentLocations: Location[] = [
  mockLocations[1], // Jadavpur University
  mockLocations[2], // Jadavpur 8B
  mockLocations[3], // Howrah Station
]

export const mockOrderHistory: Order[] = [
  {
    id: 'ord-1049',
    date: 'Today, 10:48 AM',
    status: 'delivered',
    pickup: mockLocations[0],
    drop: mockLocations[1],
    recipientName: 'Ayush Seal',
    captain: mockCaptains[0],
    fare: 175,
    packageCategory: 'Documents & Books',
    rating: 5,
  },
  {
    id: 'ord-1022',
    date: '3 days ago',
    status: 'delivered',
    pickup: mockLocations[0],
    drop: mockLocations[2],
    recipientName: 'Rohan Sen',
    captain: mockCaptains[0],
    fare: 180,
    packageCategory: 'Festive Sweets & Gifts',
    rating: 5,
  },
]
