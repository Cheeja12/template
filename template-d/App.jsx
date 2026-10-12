import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Car,
  Shield,
  UserCheck,
  Calendar,
  Clock,
  Fuel,
  Gauge,
  Users,
  Briefcase,
  Star,
  CheckCircle2,
  PlusCircle,
  X,
  Sparkles,
  Search,
  Tag,
  Key,
  ArrowRight,
  Check,
  ChevronDown,
  Headphones,
  FileCheck2,
  MapPin,
  Map as MapIcon,
  Grid,
  List,
  SlidersHorizontal,
  Navigation,
  Compass,
  DollarSign,
  Share2,
  Heart,
  ChevronRight,
  Filter,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

const FLEET_DATA = [
  {
    id: 'car-1',
    name: 'Porsche Taycan 4S Cross Turismo',
    brand: 'PORSCHE',
    category: 'ELECTRIC',
    bodyType: 'Sedan',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 249,
    seats: 4,
    bags: 3,
    fuelType: 'Electric',
    range: '280 miles',
    rating: 4.96,
    reviewsCount: 54,
    badge: 'Popular EV',
    canChauffeur: true,
    driverDailyRate: 95,
    city: 'Kathmandu',
    locationName: 'Tribhuvan International Airport (KTM)',
    coords: { x: 58, y: 44 }, // Map percentage coordinates
    features: ['Apple CarPlay', 'Adaptive Air Suspension', 'Panoramic Glass Roof', 'Fast DC Charging']
  },
  {
    id: 'car-2',
    name: 'Mercedes-Benz S-Class S580 Executive',
    brand: 'MERCEDES-BENZ',
    category: 'LUXURY',
    bodyType: 'Sedan',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 285,
    seats: 5,
    bags: 4,
    fuelType: 'Hybrid',
    range: '26 MPG',
    rating: 4.99,
    reviewsCount: 88,
    badge: 'Chauffeur Top Choice',
    canChauffeur: true,
    driverDailyRate: 110,
    city: 'Kathmandu',
    locationName: 'Durbar Marg, Diplomatic District',
    coords: { x: 48, y: 38 },
    features: ['Burmester 4D Audio', 'Rear Massaging Lounge', 'Acoustic Comfort Glass', 'Executive Tray']
  },
  {
    id: 'car-3',
    name: 'BMW X5 M-Competition xDrive',
    brand: 'BMW',
    category: 'SUV',
    bodyType: 'SUV',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 195,
    seats: 5,
    bags: 4,
    fuelType: 'Petrol',
    range: '22 MPG',
    rating: 4.91,
    reviewsCount: 42,
    badge: 'Elevate Drive Special',
    canChauffeur: true,
    driverDailyRate: 85,
    city: 'Lalitpur',
    locationName: 'Patan Hub & Jhamsikhel',
    coords: { x: 42, y: 62 },
    features: ['TwinPower V8 Turbo', 'Sky Lounge LED Roof', 'Laserlight Headlamps', 'All-Wheel Drive']
  },
  {
    id: 'car-4',
    name: 'Chevrolet Tahoe High Country 4WD',
    brand: 'CHEVROLET',
    category: 'SUV',
    bodyType: 'SUV',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 170,
    seats: 7,
    bags: 6,
    fuelType: 'Petrol',
    range: '20 MPG',
    rating: 4.88,
    reviewsCount: 65,
    badge: 'Week Start Special',
    canChauffeur: true,
    driverDailyRate: 80,
    city: 'Bhaktapur',
    locationName: 'Suryabinayak Express Terminal',
    coords: { x: 74, y: 56 },
    features: ['Magnetic Ride Control', 'Rear Seat Media System', 'Surround Vision 360', '7 Full Adult Seats']
  },
  {
    id: 'car-5',
    name: 'Tesla Model S Plaid AWD',
    brand: 'TESLA',
    category: 'ELECTRIC',
    bodyType: 'Sedan',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 220,
    seats: 5,
    bags: 3,
    fuelType: 'Electric',
    range: '390 miles',
    rating: 4.95,
    reviewsCount: 71,
    badge: 'Popular EV',
    canChauffeur: false,
    driverDailyRate: 0,
    city: 'Kathmandu',
    locationName: 'Naxal Central Station',
    coords: { x: 52, y: 32 },
    features: ['1,020 HP Tri-Motor', 'Full Self-Driving Capable', 'Yoke Steering', 'Supercharging Access']
  },
  {
    id: 'car-6',
    name: 'Ford Mustang GT 5.0 Convertible',
    brand: 'FORD',
    category: 'SPORTS',
    bodyType: 'Convertible',
    year: 2024,
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 140,
    seats: 4,
    bags: 2,
    fuelType: 'Petrol',
    range: '21 MPG',
    rating: 4.89,
    reviewsCount: 93,
    badge: 'Elevate Drive Special',
    canChauffeur: false,
    driverDailyRate: 0,
    city: 'Kathmandu',
    locationName: 'Thamel Tourist Promenade',
    coords: { x: 40, y: 36 },
    features: ['V8 Active Exhaust', 'Power Soft-Top Drop', 'Brembo 6-Piston Brakes', 'Rev-Matching 6-Speed']
  },
  {
    id: 'car-7',
    name: 'Audi RS e-tron GT Performance',
    brand: 'AUDI',
    category: 'ELECTRIC',
    bodyType: 'Sedan',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 260,
    seats: 4,
    bags: 3,
    fuelType: 'Electric',
    range: '250 miles',
    rating: 4.94,
    reviewsCount: 38,
    badge: 'Popular EV',
    canChauffeur: true,
    driverDailyRate: 95,
    city: 'Pokhara',
    locationName: 'Lakeside Baidam Terminal',
    coords: { x: 26, y: 48 },
    features: ['Bang & Olufsen 3D Sound', 'Carbon Ceramic Brakes', 'Matrix LED with Laser', 'Launch Control']
  },
  {
    id: 'car-8',
    name: 'Range Rover Autobiography LWB',
    brand: 'LAND ROVER',
    category: 'LUXURY',
    bodyType: 'SUV',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 310,
    seats: 5,
    bags: 5,
    fuelType: 'Hybrid',
    range: '24 MPG',
    rating: 4.98,
    reviewsCount: 62,
    badge: 'Chauffeur Top Choice',
    canChauffeur: true,
    driverDailyRate: 110,
    city: 'Kathmandu',
    locationName: 'Baluwatar Executive Centre',
    coords: { x: 46, y: 26 },
    features: ['Executive Class Seating', 'Meridian Signature Sound', 'All-Wheel Steering', 'Terrain Response 2']
  },
  {
    id: 'car-9',
    name: 'Porsche 911 Carrera GTS Coupe',
    brand: 'PORSCHE',
    category: 'SPORTS',
    bodyType: 'Coupe',
    year: 2025,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    pricePerDay: 299,
    seats: 2,
    bags: 2,
    fuelType: 'Petrol',
    range: '23 MPG',
    rating: 4.97,
    reviewsCount: 84,
    badge: 'Elevate Drive Special',
    canChauffeur: false,
    driverDailyRate: 0,
    city: 'Chitwan',
    locationName: 'Bharatpur Airport & Safari Hub',
    coords: { x: 62, y: 72 },
    features: ['Sport Chrono Package', 'Sport Design Aero Kit', 'PASM Sport Suspension', 'Twin Turbo Flat-6']
  }
];

const PATHIL_PROMOTIONS = [
  {
    id: 'promo-1',
    code: 'PATHILONE',
    title: 'PATHIL ONE: Turn Rentals Into Rewards',
    tagline: 'Unlock 20% discount on worldwide bookings with member privilege',
    discountPercent: 20,
    badge: 'UP TO 20% OFF'
  },
  {
    id: 'promo-2',
    code: 'PATHIL15',
    title: 'Start Your Week In Style',
    tagline: 'Up to 15% discount on week-start rentals across our premium SUVs',
    discountPercent: 15,
    badge: '15% DISCOUNT'
  },
  {
    id: 'promo-3',
    code: 'ELEVATE15',
    title: 'Elevate Your Drive.',
    tagline: 'Save 15% on Pathil top-tier European luxury models',
    discountPercent: 15,
    badge: '15% DISCOUNT'
  },
  {
    id: 'promo-4',
    code: 'PATHILPLUS',
    title: 'PATHIL+: Premium Cars. Month By Month.',
    tagline: 'Zero commitment monthly subscriptions starting at $679/month',
    discountPercent: 25,
    badge: 'FROM $679 / MONTH'
  },
  {
    id: 'promo-5',
    code: 'PATHILBIZ',
    title: 'Business Travel In Style',
    tagline: 'Become a corporate partner and enjoy exclusive daily rates',
    discountPercent: 18,
    badge: 'CARS FROM $35 A DAY'
  }
];

const COMMUNITY_VOICES = [
  {
    id: 'rev-1',
    rating: '5.0',
    stars: 5,
    name: 'Sabina Chaudhary',
    location: 'Nepalgunj, Nepal',
    initials: 'SC',
    avatarBg: 'bg-rose-500',
    text: 'First time renting a self-drive vehicle and I was worried about the process but Pathil made KYC verification so simple. Drove to Bardia for a jungle safari trip, the Hilux handled the dust and rough terrain flawlessly.'
  },
  {
    id: 'rev-2',
    rating: '4.0',
    stars: 4,
    name: 'Nabin Thapa',
    location: 'Bharatpur, Nepal',
    initials: 'NT',
    avatarBg: 'bg-amber-600',
    text: "Rented a Bolero for a trip up to Kathmandu, needed a reliable vehicle for the highway drive and this one didn't disappoint. Booking and extending the rental by two extra days was seamless."
  },
  {
    id: 'rev-3',
    rating: '5.0',
    stars: 5,
    name: 'Prashant Lama',
    location: 'Hetauda, Nepal',
    initials: 'PL',
    avatarBg: 'bg-emerald-600',
    text: 'Rented a Xpulse for a solo ride towards Daman, best decision ever. The vehicle was well-maintained and the owner gave me tips about fuel stops along the way. Booking through the app felt safe and transparent.'
  },
  {
    id: 'rev-4',
    rating: '4.0',
    stars: 4,
    name: 'Ritu Poudel',
    location: 'Itahari, Nepal',
    initials: 'RP',
    avatarBg: 'bg-indigo-600',
    text: 'Needed a car quickly for a day trip to Dharan and found a Maruti Alto nearby on Pathil. Pickup was on time and the Khalti payment option made it very convenient. Would definitely rent again!'
  },
  {
    id: 'rev-5',
    rating: '5.0',
    stars: 5,
    name: 'Manisha Adhikari',
    location: 'Bhaktapur, Nepal',
    initials: 'MA',
    avatarBg: 'bg-purple-600',
    text: 'Booked a Hyundai Creta for a weekend trip to Nagarkot and honestly it was so easy. Payment through eSewa took two minutes, car was delivered right to Suryabinayak, and the mileage policy was generous.'
  },
  {
    id: 'rev-6',
    rating: '4.0',
    stars: 4,
    name: 'Rabin Magar',
    location: 'Dharan, Nepal',
    initials: 'RM',
    avatarBg: 'bg-sky-600',
    text: 'Took a Scorpio for a family trip up to Dhankuta, 8 of us with luggage fit comfortably. Vehicle was clean and the owner explained everything properly before handover. Reliable suspension and smooth trip.'
  }
];

const CHAUFFEURS = [
  {
    id: 'drv-1',
    name: 'Alexander Wright',
    experienceYears: 14,
    rating: 4.99,
    trips: 940,
    languages: ['English', 'German', 'Nepali'],
    specialty: 'VIP Diplomatic & Corporate Escort',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    dailyRate: 95
  },
  {
    id: 'drv-2',
    name: 'Elena Rostova',
    experienceYears: 9,
    rating: 4.98,
    trips: 710,
    languages: ['English', 'French', 'Hindi'],
    specialty: 'Executive Transfers & Private Tours',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    dailyRate: 90
  },
  {
    id: 'drv-3',
    name: 'Marcus Sterling',
    experienceYears: 16,
    rating: 5.0,
    trips: 1280,
    languages: ['English', 'Spanish'],
    specialty: 'Executive Security & High Net-Worth Escort',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    dailyRate: 115
  }
];

const INSURANCE_PLANS = [
  { id: 'standard', name: 'Standard Pathil Care', pricePerDay: 19, desc: 'Third-party liability protection with $1,500 deductible cap.' },
  { id: 'premium', name: 'Pathil Zero-Excess Protection', pricePerDay: 35, desc: '$0 deductible, full tire, rim, glass guarantee with 24/7 priority concierge.' },
  { id: 'decline', name: 'Own Primary Insurance Policy', pricePerDay: 0, desc: 'Provide proof of valid comprehensive personal vehicle coverage.' }
];

export default function App() {
  // Navigation State: 'home' | 'listings' | 'chauffeurs' | 'deals' | 'my-bookings'
  const [activeTab, setActiveTab] = useState('home');

  // Listings page view mode: 'map' (Split Map View) | 'grid' | 'list'
  const [listingViewMode, setListingViewMode] = useState('map');
  const [highlightedCarId, setHighlightedCarId] = useState(null);
  const [selectedMapPinCar, setSelectedMapPinCar] = useState(null);
  const [isSidebarFilterOpen, setIsSidebarFilterOpen] = useState(false);

  // Sorting & Filtering State
  const [fleet, setFleet] = useState(FLEET_DATA);
  const [tripMode, setTripMode] = useState('self-drive'); // 'self-drive' | 'chauffeur'
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all'); // 'all' | 'self' | 'chauffeur'
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBodyType, setSelectedBodyType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [fuelFilter, setFuelFilter] = useState('All Types');
  const [maxPrice, setMaxPrice] = useState(350);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'

  // Booking & Trip parameters
  const [pickupStation, setPickupStation] = useState('Tribhuvan Intl Airport, Kathmandu');
  const [differentReturn, setDifferentReturn] = useState(false);
  const [pickupDate, setPickupDate] = useState('2026-10-15');
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [returnDate, setReturnDate] = useState('2026-10-18');
  const [returnTime, setReturnTime] = useState('10:00 AM');
  const [driverAge, setDriverAge] = useState('Driver age 30+');

  // Promotion codes & Toast
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoInput, setPromoInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState([]);

  // Modals State
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);
  const [isListCarOpen, setIsListCarOpen] = useState(false);
  const [myReservations, setMyReservations] = useState([]);
  const [includeDriverOption, setIncludeDriverOption] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState('premium');
  const [bookingConfirmedDetails, setBookingConfirmedDetails] = useState(null);

  // Toast trigger
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleFavorite = (carId, e) => {
    e?.stopPropagation();
    if (savedFavorites.includes(carId)) {
      setSavedFavorites(savedFavorites.filter((id) => id !== carId));
      showToast('Removed vehicle from saved wishlist.');
    } else {
      setSavedFavorites([...savedFavorites, carId]);
      showToast('❤️ Saved to your favorite vehicles!');
    }
  };

  const rentalDays = useMemo(() => {
    try {
      const p = new Date(pickupDate);
      const r = new Date(returnDate);
      const diffTime = r.getTime() - p.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    } catch {
      return 3;
    }
  }, [pickupDate, returnDate]);

  const applyPromo = (promoObj) => {
    setAppliedPromo(promoObj);
    setPromoInput(promoObj.code);
    showToast(`✨ Promo code "${promoObj.code}" applied! ${promoObj.discountPercent}% discount active.`);
  };

  const handleManualPromoSubmit = (e) => {
    e?.preventDefault();
    const found = PATHIL_PROMOTIONS.find(
      (p) => p.code.toUpperCase() === promoInput.trim().toUpperCase()
    );
    if (found) {
      applyPromo(found);
    } else {
      showToast('❌ Invalid code. Try "PATHILONE" or "PATHIL15"');
    }
  };

  const filteredFleet = useMemo(() => {
    let list = fleet.filter((car) => {
      if (selectedCategory !== 'ALL' && car.category !== selectedCategory) return false;
      if (selectedBodyType !== 'All' && car.bodyType !== selectedBodyType) return false;
      if (fuelFilter !== 'All Types' && car.fuelType !== fuelFilter) return false;
      if (selectedCity !== 'All' && car.city !== selectedCity) return false;
      if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) return false;
      if (car.pricePerDay > maxPrice) return false;
      if (minRating > 0 && car.rating < minRating) return false;

      if (serviceTypeFilter === 'chauffeur' && !car.canChauffeur) return false;
      if (serviceTypeFilter === 'self' && car.canChauffeur && !car.features) return false;

      if (tripMode === 'chauffeur' && !car.canChauffeur) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesCity = car.city.toLowerCase().includes(q);
        const matchesLocation = car.locationName.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCity && !matchesLocation) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // default: reviews count as popularity
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [
    fleet,
    selectedCategory,
    selectedBodyType,
    fuelFilter,
    selectedCity,
    selectedTransmission,
    maxPrice,
    minRating,
    serviceTypeFilter,
    tripMode,
    searchQuery,
    sortBy
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('ALL');
    setSelectedBodyType('All');
    setFuelFilter('All Types');
    setSelectedCity('All');
    setSelectedTransmission('All');
    setMaxPrice(350);
    setMinRating(0);
    setSearchQuery('');
    setServiceTypeFilter('all');
    setSortBy('popular');
  };

  const getBookingBreakdown = () => {
    if (!selectedCarForModal) {
      return { base: 0, driver: 0, insurance: 0, discount: 0, taxes: 0, total: 0, originalTotal: 0 };
    }
    const base = selectedCarForModal.pricePerDay * rentalDays;
    const driver = includeDriverOption ? (selectedCarForModal.driverDailyRate || 90) * rentalDays : 0;
    const ins = (INSURANCE_PLANS.find((p) => p.id === selectedInsurance)?.pricePerDay || 0) * rentalDays;

    const subtotal = base + driver + ins;
    let discount = 0;
    if (appliedPromo) {
      discount = Math.round((base * appliedPromo.discountPercent) / 100);
    }
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const taxes = Math.round(discountedSubtotal * 0.095);
    const total = discountedSubtotal + taxes;
    const originalTotal = subtotal + Math.round(subtotal * 0.095);

    return { base, driver, insurance: ins, discount, taxes, total, originalTotal };
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!selectedCarForModal) return;
    const breakdown = getBookingBreakdown();

    const reservation = {
      bookingId: 'PATHIL-' + Math.floor(100000 + Math.random() * 900000),
      car: selectedCarForModal,
      pickupStation: pickupStation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      days: rentalDays,
      withChauffeur: includeDriverOption,
      insurancePlan: INSURANCE_PLANS.find((p) => p.id === selectedInsurance)?.name,
      promoCode: appliedPromo?.code || null,
      savedAmount: breakdown.discount,
      totalAmount: breakdown.total,
      bookedAt: new Date().toLocaleDateString()
    };

    setMyReservations([reservation, ...myReservations]);
    setBookingConfirmedDetails(reservation);
    showToast(`Reservation verified! Car reserved under ID ${reservation.bookingId}`);
  };

  // Host listing form state
  const [hostForm, setHostForm] = useState({
    brand: '',
    name: '',
    category: 'LUXURY',
    bodyType: 'Sedan',
    year: 2025,
    pricePerDay: '',
    seats: 5,
    bags: 3,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    range: '24 MPG',
    canChauffeur: true,
    driverDailyRate: 90,
    city: 'Kathmandu',
    locationName: 'Thamel City Center',
    image: '',
    features: 'Apple CarPlay, Premium Sound, Panoramic Roof'
  });

  const handleCreateCarListing = (e) => {
    e.preventDefault();
    if (!hostForm.brand || !hostForm.name || !hostForm.pricePerDay) {
      showToast('Please provide car brand, model name, and daily rental rate.');
      return;
    }

    const newCar = {
      id: 'car-' + (fleet.length + 1),
      name: `${hostForm.brand.toUpperCase()} ${hostForm.name}`,
      brand: hostForm.brand.toUpperCase(),
      category: hostForm.category,
      bodyType: hostForm.bodyType,
      year: parseInt(hostForm.year) || 2025,
      transmission: hostForm.transmission,
      image: hostForm.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      pricePerDay: parseFloat(hostForm.pricePerDay),
      seats: parseInt(hostForm.seats) || 5,
      bags: parseInt(hostForm.bags) || 3,
      fuelType: hostForm.fuelType,
      range: hostForm.range || '25 MPG',
      rating: 5.0,
      reviewsCount: 1,
      badge: 'New Verified Listing',
      canChauffeur: hostForm.canChauffeur,
      driverDailyRate: hostForm.canChauffeur ? parseFloat(hostForm.driverDailyRate) : 0,
      city: hostForm.city,
      locationName: hostForm.locationName,
      coords: { x: 50, y: 50 },
      features: hostForm.features.split(',').map((f) => f.trim()).filter(Boolean)
    };

    setFleet([newCar, ...fleet]);
    setIsListCarOpen(false);
    showToast(`🚗 "${newCar.name}" has been published to Pathil Car Rental Fleet!`);
  };

  const renderInteractiveMap = () => {
    return (
      <div className="relative w-full h-full min-h-[460px] bg-[#EBE9E1] rounded-3xl overflow-hidden border border-stone-300 shadow-inner flex flex-col justify-between">
        {/* Mock Map Vector Grid & Topo Contours */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1CDC2" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Mountain Contour Curves for Nepal feel */}
            <path d="M 0,180 Q 200,90 400,210 T 800,160" fill="none" stroke="#C5BFB0" strokeWidth="2" strokeDasharray="6,4" />
            <path d="M 0,280 Q 300,180 600,320 T 1000,240" fill="none" stroke="#C5BFB0" strokeWidth="1.5" strokeDasharray="4,4" />
            <path d="M 120,40 Q 250,150 500,80 T 900,120" fill="none" stroke="#BAC1C9" strokeWidth="1" />
            {/* Simulated River Vector (Bagmati / Trisuli style) */}
            <path d="M 0,120 C 160,180 320,110 460,240 C 620,380 720,290 1000,420" fill="none" stroke="#B0CCE5" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* Top Controls on Map */}
        <div className="relative z-10 p-4 flex items-center justify-between pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-stone-200 flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-[#E85D04]" />
            <span className="text-xs font-bold text-stone-900">
              {selectedCity === 'All' ? 'Nepal Network' : `${selectedCity} Area`}
            </span>
            <span className="text-[10px] text-stone-500 font-semibold bg-stone-100 px-2 py-0.5 rounded-full">
              {filteredFleet.length} vehicles pinned
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedCity('All')}
              className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-stone-200 text-stone-700 hover:text-[#E85D04] shadow-md transition"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-stone-200 shadow-md flex flex-col p-1">
              <button
                onClick={() => showToast('Zoom in simulated')}
                className="p-1.5 hover:text-[#E85D04] text-stone-600 transition"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="h-[1px] bg-stone-200 my-0.5" />
              <button
                onClick={() => showToast('Zoom out simulated')}
                className="p-1.5 hover:text-[#E85D04] text-stone-600 transition"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map City Labels */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[28%] left-[45%] text-[10px] uppercase tracking-widest font-black text-stone-400">
            Kathmandu Valley
          </div>
          <div className="absolute top-[60%] left-[38%] text-[10px] uppercase tracking-widest font-black text-stone-400">
            Lalitpur Hub
          </div>
          <div className="absolute top-[52%] left-[72%] text-[10px] uppercase tracking-widest font-black text-stone-400">
            Bhaktapur
          </div>
          <div className="absolute top-[44%] left-[22%] text-[10px] uppercase tracking-widest font-black text-stone-400">
            Pokhara Corridor
          </div>
        </div>

        {/* Interactive Dynamic Price Pins */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {filteredFleet.map((car) => {
            const isHighlighted = highlightedCarId === car.id || selectedMapPinCar?.id === car.id;
            return (
              <div
                key={car.id}
                style={{ top: `${car.coords.y}%`, left: `${car.coords.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                onMouseEnter={() => setHighlightedCarId(car.id)}
                onMouseLeave={() => setHighlightedCarId(null)}
                onClick={() => setSelectedMapPinCar(car)}
              >
                <button
                  className={`px-3 py-1.5 rounded-full font-black text-xs shadow-lg transition-transform transform active:scale-90 flex items-center space-x-1 border-2 ${
                    isHighlighted
                      ? 'bg-[#E85D04] text-white scale-125 z-30 border-white shadow-xl shadow-[#E85D04]/40 ring-4 ring-[#E85D04]/20'
                      : 'bg-white text-stone-900 border-stone-300 hover:scale-110 hover:border-[#E85D04]'
                  }`}
                >
                  <span className="text-[10px] font-bold text-stone-400">$</span>
                  <span>{car.pricePerDay}</span>
                  {car.canChauffeur && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Selected Car Tooltip Overlay on the Map */}
        {selectedMapPinCar && (
          <div className="relative z-30 m-4 pointer-events-auto">
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center space-x-3 overflow-hidden">
                <img
                  src={selectedMapPinCar.image}
                  alt={selectedMapPinCar.name}
                  className="w-16 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-black text-[#E85D04] uppercase">{selectedMapPinCar.brand}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[10px] text-stone-500 font-semibold">{selectedMapPinCar.city}</span>
                  </div>
                  <h5 className="text-xs font-black text-stone-900 truncate">{selectedMapPinCar.name}</h5>
                  <div className="flex items-center space-x-2 text-[11px] text-stone-600 font-bold mt-0.5">
                    <span className="text-[#E85D04] font-black">${selectedMapPinCar.pricePerDay}/day</span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                      {selectedMapPinCar.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedCarForModal(selectedMapPinCar);
                    setIncludeDriverOption(tripMode === 'chauffeur' && selectedMapPinCar.canChauffeur);
                    setBookingConfirmedDetails(null);
                  }}
                  className="px-3.5 py-2 bg-[#E85D04] hover:bg-[#d05303] text-white text-xs font-black rounded-xl shadow-md transition"
                >
                  Book Now
                </button>
                <button
                  onClick={() => setSelectedMapPinCar(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Legend */}
        <div className="relative z-10 p-3 bg-white/90 backdrop-blur-md border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-600 font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E85D04]"></span>
              <span>Selected Pin</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Chauffeur Available</span>
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 font-mono text-[10px]">Click any price pin to preview</span>
        </div>
      </div>
    );
  };

  const renderFilterSidebar = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#E85D04]" />
            <h4 className="font-black text-sm text-stone-900 uppercase tracking-wider">Filters</h4>
          </div>
          <button
            onClick={resetAllFilters}
            className="text-xs text-[#E85D04] hover:underline font-bold"
          >
            Reset
          </button>
        </div>

        {/* Service Type Toggle (Rent Car / Rent Driver / Self Drive) */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Service Type</label>
          <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200 text-[11px] font-bold">
            <button
              onClick={() => setServiceTypeFilter('all')}
              className={`py-1.5 rounded-xl transition ${serviceTypeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
            >
              All
            </button>
            <button
              onClick={() => setServiceTypeFilter('self')}
              className={`py-1.5 rounded-xl transition ${serviceTypeFilter === 'self' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Self-Drive
            </button>
            <button
              onClick={() => setServiceTypeFilter('chauffeur')}
              className={`py-1.5 rounded-xl transition ${serviceTypeFilter === 'chauffeur' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Chauffeur
            </button>
          </div>
        </div>

        {/* City Location Filter */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Region / Hub</label>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition border ${
                  selectedCity === city
                    ? 'bg-[#E85D04] text-white border-[#E85D04]'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Max Daily Rate Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] font-black uppercase text-stone-400">Max Daily Rate</label>
            <span className="text-xs font-black text-[#E85D04]">${maxPrice} / day</span>
          </div>
          <input
            type="range"
            min="100"
            max="350"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#E85D04] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
            <span>$100</span>
            <span>$350+</span>
          </div>
        </div>

        {/* Body Type */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Vehicle Body Type</label>
          <div className="grid grid-cols-2 gap-2">
            {['All', 'Sedan', 'SUV', 'Convertible', 'Coupe'].map((body) => (
              <button
                key={body}
                onClick={() => setSelectedBodyType(body)}
                className={`text-xs py-2 px-3 rounded-xl border text-left font-bold transition ${
                  selectedBodyType === body
                    ? 'border-[#E85D04] bg-[#E85D04]/5 text-[#E85D04] ring-1 ring-[#E85D04]'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                {body}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Transmission</label>
          <div className="flex gap-2">
            {['All', 'Automatic', 'Manual'].map((trans) => (
              <button
                key={trans}
                onClick={() => setSelectedTransmission(trans)}
                className={`text-xs flex-1 py-1.5 rounded-xl border text-center font-bold transition ${
                  selectedTransmission === trans
                    ? 'border-[#E85D04] bg-[#E85D04] text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                {trans}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Fuel / Engine</label>
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 outline-none focus:border-[#E85D04]"
          >
            <option value="All Types">All Fuel Engines</option>
            <option value="Electric">Pure Electric (EV)</option>
            <option value="Hybrid">Hybrid Performance</option>
            <option value="Petrol">Petrol / Gasoline</option>
          </select>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="text-[11px] font-black uppercase text-stone-400 block mb-2">Minimum Customer Rating</label>
          <div className="flex items-center space-x-2">
            {[0, 4.8, 4.9].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1 ${
                  minRating === rating
                    ? 'border-[#E85D04] bg-[#E85D04]/10 text-[#E85D04]'
                    : 'border-stone-200 bg-white text-stone-600'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCarCard = (car, viewType) => {
    const isHighlighted = highlightedCarId === car.id || selectedMapPinCar?.id === car.id;
    const isFavorited = savedFavorites.includes(car.id);

    const effectivePrice = appliedPromo
      ? Math.round(car.pricePerDay * (1 - appliedPromo.discountPercent / 100))
      : car.pricePerDay;

    // ELONGATED HORIZONTAL LIST VIEW
    if (viewType === 'list') {
      return (
        <div
          key={car.id}
          onMouseEnter={() => setHighlightedCarId(car.id)}
          onMouseLeave={() => setHighlightedCarId(null)}
          className={`bg-white rounded-3xl border transition-all duration-200 p-4 sm:p-5 flex flex-col md:flex-row gap-5 shadow-xs hover:shadow-lg ${
            isHighlighted
              ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 shadow-md'
              : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          {/* Left: Image Container */}
          <div className="relative md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-stone-100">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            <button
              onClick={(e) => toggleFavorite(car.id, e)}
              className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 backdrop-blur text-stone-700 hover:text-rose-500 shadow-sm transition"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            {car.badge && (
              <span className="absolute top-2.5 left-2.5 bg-stone-900/90 text-white text-[10px] px-2.5 py-0.5 rounded-full font-black">
                {car.badge}
              </span>
            )}
          </div>

          {/* Center: Specs and Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#E85D04] tracking-widest uppercase">
                  {car.brand} • {car.category}
                </span>
                <div className="flex items-center space-x-1 text-xs font-bold text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{car.rating}</span>
                  <span className="text-stone-400 font-normal">({car.reviewsCount} reviews)</span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-black text-stone-900 mt-1">{car.name}</h4>

              <div className="flex items-center space-x-2 text-xs text-stone-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-medium truncate">{car.locationName}</span>
              </div>

              {/* 4 Specs badges */}
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-stone-600 font-semibold">
                <span className="flex items-center space-x-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>{car.seats} Seats</span>
                </span>
                <span className="flex items-center space-x-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                  <span>{car.bags} Luggage</span>
                </span>
                <span className="flex items-center space-x-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                  <Fuel className="w-3.5 h-3.5 text-stone-400" />
                  <span>{car.fuelType}</span>
                </span>
                <span className="flex items-center space-x-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                  <Gauge className="w-3.5 h-3.5 text-stone-400" />
                  <span>{car.transmission}</span>
                </span>
              </div>
            </div>

            {/* Bottom: Features & Pricing */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {car.features.slice(0, 2).map((feat, i) => (
                  <span key={i} className="text-[10px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md font-medium">
                    {feat}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 ml-auto">
                <div className="text-right">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl sm:text-2xl font-black text-[#E85D04]">${effectivePrice}</span>
                    <span className="text-xs text-stone-400">/ day</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block">Total for {rentalDays}d: ${effectivePrice * rentalDays}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCarForModal(car);
                    setIncludeDriverOption(tripMode === 'chauffeur' && car.canChauffeur);
                    setBookingConfirmedDetails(null);
                  }}
                  className="px-5 py-2.5 bg-[#E85D04] hover:bg-[#d05303] text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md shadow-[#E85D04]/20"
                >
                  Book Car
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // STANDARD CARD (For Split Map View & Grid View)
    return (
      <div
        key={car.id}
        onMouseEnter={() => setHighlightedCarId(car.id)}
        onMouseLeave={() => setHighlightedCarId(null)}
        className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg group ${
          isHighlighted
            ? 'border-[#E85D04] ring-2 ring-[#E85D04]/30 shadow-md'
            : 'border-stone-200 hover:border-stone-300'
        }`}
      >
        <div>
          {/* Card Image */}
          <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button
              onClick={(e) => toggleFavorite(car.id, e)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur text-stone-700 hover:text-rose-500 shadow-sm transition z-10"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {car.badge && (
                <span className="bg-white/95 backdrop-blur text-stone-900 text-[10px] px-2.5 py-0.5 rounded-full font-black shadow-xs">
                  {car.badge}
                </span>
              )}
              {car.canChauffeur && (
                <span className="bg-[#E85D04] text-white text-[10px] px-2.5 py-0.5 rounded-full font-black shadow-xs">
                  Chauffeur Ready
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-2 py-0.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs text-stone-900 z-10">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{car.rating}</span>
              <span className="text-stone-400 font-normal">({car.reviewsCount})</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <div className="flex items-center justify-between text-[11px] text-stone-400 font-bold uppercase tracking-wider">
              <span>{car.brand} • {car.year}</span>
              <span className="text-[#E85D04] font-black">{car.city}</span>
            </div>

            <h4 className="text-base font-black text-stone-900 mt-0.5 leading-snug line-clamp-1">
              {car.name}
            </h4>

            <p className="text-[11px] text-stone-500 flex items-center space-x-1 mt-1 truncate">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate">{car.locationName}</span>
            </p>

            {/* 4-Specs Icon Strip */}
            <div className="grid grid-cols-4 gap-1.5 my-3.5 py-2.5 border-y border-stone-100 text-stone-500 text-xs text-center">
              <div>
                <Users className="w-3.5 h-3.5 mx-auto mb-0.5 text-stone-400" />
                <span className="font-semibold text-[10px] block text-stone-700">{car.seats} Seats</span>
              </div>
              <div>
                <Briefcase className="w-3.5 h-3.5 mx-auto mb-0.5 text-stone-400" />
                <span className="font-semibold text-[10px] block text-stone-700">{car.bags} Bags</span>
              </div>
              <div>
                <Fuel className="w-3.5 h-3.5 mx-auto mb-0.5 text-stone-400" />
                <span className="font-semibold text-[10px] block text-stone-700">{car.fuelType}</span>
              </div>
              <div>
                <Gauge className="w-3.5 h-3.5 mx-auto mb-0.5 text-stone-400" />
                <span className="font-semibold text-[10px] block text-stone-700">{car.transmission}</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-1.5 mb-1">
              {car.features.slice(0, 2).map((feat, idx) => (
                <span key={idx} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-black text-[#E85D04]">${effectivePrice}</span>
            {appliedPromo && (
              <span className="text-xs line-through text-stone-400">${car.pricePerDay}</span>
            )}
            <span className="text-xs text-stone-400 font-semibold">/ day</span>
          </div>

          <button
            onClick={() => {
              setSelectedCarForModal(car);
              setIncludeDriverOption(tripMode === 'chauffeur' && car.canChauffeur);
              setBookingConfirmedDetails(null);
            }}
            className="px-4 py-2 bg-[#E85D04] hover:bg-[#d05303] text-white font-bold rounded-xl text-xs flex items-center space-x-1 transition active:scale-95 shadow-md shadow-[#E85D04]/20"
          >
            <span>Book Car</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 flex flex-col font-sans selection:bg-[#E85D04] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#E85D04] text-white px-5 py-3 rounded-2xl shadow-xl font-bold flex items-center space-x-3 transition-all animate-fade-in">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-10 bg-[#E85D04] rounded-xl flex items-center justify-center font-black text-xl tracking-tight text-white shadow-md shadow-[#E85D04]/25">
              P
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-stone-950 uppercase">
                PATHIL <span className="text-[#E85D04]">RENTAL</span>
              </span>
              <p className="text-[10px] tracking-widest text-stone-500 font-bold uppercase">Nepal's Most Trusted Self-Drive</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center space-x-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === 'home'
                  ? 'bg-white text-[#E85D04] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center space-x-1.5 ${
                activeTab === 'listings'
                  ? 'bg-white text-[#E85D04] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#E85D04]" />
              <span>Find Cars (Map & List)</span>
            </button>
            <button
              onClick={() => setActiveTab('chauffeurs')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === 'chauffeurs'
                  ? 'bg-white text-[#E85D04] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              Rent a Chauffeur
            </button>
            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition relative ${
                activeTab === 'my-bookings'
                  ? 'bg-white text-[#E85D04] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              My Bookings
              {myReservations.length > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-[10px] bg-[#E85D04] text-white rounded-full font-black">
                  {myReservations.length}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsListCarOpen(true)}
              className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#E85D04] bg-white border border-[#E85D04]/30 hover:bg-[#E85D04]/5 px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Car</span>
            </button>
            {appliedPromo && (
              <span className="hidden lg:flex items-center space-x-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>{appliedPromo.code}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Views Switch */}
      <main className="flex-1">
        {/* ======================================================== */}
        {/* VIEW: DEDICATED LISTINGS PAGE WITH MAP & SPLIT VIEW      */}
        {/* Inspired by: listing.html?service=rent&view=map          */}
        {/* ======================================================== */}
        {activeTab === 'listings' && (
          <div className="min-h-screen flex flex-col">
            {/* Sub-Header / Search & Switcher Bar */}
            <div className="bg-white border-b border-stone-200 sticky top-20 z-30 shadow-xs">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  {/* Left: Breadcrumbs & Location Search Input */}
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      onClick={() => setActiveTab('home')}
                      className="text-xs text-stone-500 hover:text-stone-900 font-semibold"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-xs font-bold text-stone-900">Vehicle Rental Listings</span>

                    <div className="relative ml-2 flex-1 md:w-72">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search city, model, or station..."
                        className="w-full bg-[#FBFBF9] border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#E85D04]"
                      />
                    </div>
                  </div>

                  {/* Right: Sort By & View Mode Buttons [Map View | Grid View | List View] */}
                  <div className="flex items-center justify-between md:justify-end space-x-3 w-full md:w-auto">
                    {/* Filter Toggle Mobile/Desktop */}
                    <button
                      onClick={() => setIsSidebarFilterOpen(!isSidebarFilterOpen)}
                      className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold"
                    >
                      <Filter className="w-3.5 h-3.5 text-[#E85D04]" />
                      <span>Filters</span>
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                      <span className="hidden sm:inline font-semibold">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-stone-100 border border-stone-200 text-stone-800 rounded-xl px-2.5 py-1.5 text-xs font-bold outline-none cursor-pointer"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>

                    {/* VIEW TOGGLES: [Split Map View] | [Grid View] | [List View] */}
                    <div className="bg-stone-100 p-1 rounded-2xl border border-stone-200 flex items-center space-x-1">
                      <button
                        onClick={() => setListingViewMode('map')}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition ${
                          listingViewMode === 'map'
                            ? 'bg-[#E85D04] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="Split Map View"
                      >
                        <MapIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Split Map</span>
                      </button>

                      <button
                        onClick={() => setListingViewMode('grid')}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition ${
                          listingViewMode === 'grid'
                            ? 'bg-[#E85D04] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="Grid View"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Grid</span>
                      </button>

                      <button
                        onClick={() => setListingViewMode('list')}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition ${
                          listingViewMode === 'list'
                            ? 'bg-[#E85D04] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="List View"
                      >
                        <List className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">List</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-bar Result Counters */}
            <div className="bg-[#FAF9F5] border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-2">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
                <span>
                  Showing <strong className="text-stone-900">{filteredFleet.length}</strong> available vehicles
                  {selectedCity !== 'All' ? ` in ${selectedCity}` : ' in Nepal'}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  ⚡ 100% Verified Fleet
                </span>
              </div>
            </div>

            {/* Layout Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
              {/* Mobile Filter Drawer Overlay */}
              {isSidebarFilterOpen && (
                <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex justify-end lg:hidden">
                  <div className="w-80 bg-white h-full p-6 overflow-y-auto shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-black text-sm text-stone-900 uppercase">Filter Options</h3>
                      <button onClick={() => setIsSidebarFilterOpen(false)} className="p-1 text-stone-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {renderFilterSidebar()}
                    <button
                      onClick={() => setIsSidebarFilterOpen(false)}
                      className="w-full mt-6 py-2.5 bg-[#E85D04] text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}

              {/* THREE VIEW MODES */}
              {/* 1. SPLIT MAP VIEW (Desktop 50/50 Split) */}
              {listingViewMode === 'map' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[700px]">
                  {/* Left Column: Filter Sidebar (collapsible/visible on large) */}
                  <div className="hidden xl:block xl:col-span-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs h-fit sticky top-40">
                    {renderFilterSidebar()}
                  </div>

                  {/* Center Column: Scrollable Vehicle Cards */}
                  <div className="lg:col-span-6 xl:col-span-4 space-y-4 overflow-y-auto max-h-[85vh] pr-1 scrollbar-thin">
                    {filteredFleet.length === 0 ? (
                      <div className="bg-white rounded-3xl p-8 border border-dashed border-stone-300 text-center">
                        <Car className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                        <h4 className="font-bold text-stone-800 text-sm">No vehicles match these criteria</h4>
                        <p className="text-xs text-stone-500 mt-1 mb-4">Try clearing one or more active filters.</p>
                        <button
                          onClick={resetAllFilters}
                          className="px-4 py-2 bg-[#E85D04] text-white rounded-xl text-xs font-bold"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    ) : (
                      filteredFleet.map((car) => renderCarCard(car, 'grid'))
                    )}
                  </div>

                  {/* Right Column: Sticky Interactive SVG Map with Pinned Markers */}
                  <div className="lg:col-span-6 xl:col-span-5 h-[500px] lg:h-[85vh] sticky top-36">
                    {renderInteractiveMap()}
                  </div>
                </div>
              )}

              {/* 2. GRID VIEW (Full 3-Column Grid with Left Sidebar) */}
              {listingViewMode === 'grid' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs h-fit sticky top-36">
                    {renderFilterSidebar()}
                  </div>
                  <div className="lg:col-span-9">
                    {filteredFleet.length === 0 ? (
                      <div className="bg-white rounded-3xl p-12 border border-dashed border-stone-300 text-center">
                        <Car className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                        <h4 className="font-bold text-stone-800 text-sm">No vehicles found</h4>
                        <button
                          onClick={resetAllFilters}
                          className="mt-3 px-4 py-2 bg-[#E85D04] text-white rounded-xl text-xs font-bold"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredFleet.map((car) => renderCarCard(car, 'grid'))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. LIST VIEW (Elongated Horizontal Rows) */}
              {listingViewMode === 'list' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs h-fit sticky top-36">
                    {renderFilterSidebar()}
                  </div>
                  <div className="lg:col-span-9 space-y-4">
                    {filteredFleet.length === 0 ? (
                      <div className="bg-white rounded-3xl p-12 border border-dashed border-stone-300 text-center">
                        <Car className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                        <h4 className="font-bold text-stone-800 text-sm">No vehicles found</h4>
                        <button
                          onClick={resetAllFilters}
                          className="mt-3 px-4 py-2 bg-[#E85D04] text-white rounded-xl text-xs font-bold"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      filteredFleet.map((car) => renderCarCard(car, 'list'))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW: HOME OVERVIEW (Main Landing Page)                   */}
        {/* ======================================================== */}
        {activeTab === 'home' && (
          <div>
            {/* HERO BOOKING SEARCH WIDGET */}
            <section className="relative pt-8 pb-14 bg-gradient-to-b from-[#F4F3EE] to-[#FBFBF9] border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white text-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl border border-stone-200 max-w-6xl mx-auto">
                  {/* Mode Selector */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setTripMode('self-drive')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                          tripMode === 'self-drive'
                            ? 'bg-[#E85D04] text-white shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Self Drive</span>
                      </button>
                      <button
                        onClick={() => setTripMode('chauffeur')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                          tripMode === 'chauffeur'
                            ? 'bg-[#E85D04] text-white shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Rent With Chauffeur</span>
                      </button>
                    </div>

                    <label className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-stone-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={differentReturn}
                        onChange={(e) => setDifferentReturn(e.target.checked)}
                        className="rounded text-[#E85D04] focus:ring-[#E85D04]"
                      />
                      <span>+ Different return location</span>
                    </label>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    {/* Station */}
                    <div className="md:col-span-4 bg-[#FBFBF9] border border-stone-200 rounded-2xl p-3 flex items-center space-x-3">
                      <Search className="w-5 h-5 text-stone-400 shrink-0" />
                      <div className="w-full">
                        <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Pick-up Station</label>
                        <input
                          type="text"
                          value={pickupStation}
                          onChange={(e) => setPickupStation(e.target.value)}
                          placeholder="Airport, central hub or address"
                          className="bg-transparent text-sm font-bold text-stone-900 w-full outline-none placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    {/* Pick-up Date & Time */}
                    <div className="md:col-span-3 bg-[#FBFBF9] border border-stone-200 rounded-2xl p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-stone-400" />
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Pick-up Date</label>
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-stone-900 outline-none cursor-pointer"
                          />
                        </div>
                      </div>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="text-xs font-bold bg-transparent border-l border-stone-200 pl-2 text-stone-700 outline-none"
                      >
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>

                    {/* Return Date & Time */}
                    <div className="md:col-span-3 bg-[#FBFBF9] border border-stone-200 rounded-2xl p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Return Date</label>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-stone-900 outline-none cursor-pointer"
                          />
                        </div>
                      </div>
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="text-xs font-bold bg-transparent border-l border-stone-200 pl-2 text-stone-700 outline-none"
                      >
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>

                    {/* Show Cars Action */}
                    <div className="md:col-span-2">
                      <button
                        onClick={() => setActiveTab('listings')}
                        className="w-full h-full min-h-[52px] bg-[#E85D04] hover:bg-[#d05303] text-white font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-1.5 transition active:scale-95 shadow-md shadow-[#E85D04]/30"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Find on Map</span>
                      </button>
                    </div>
                  </div>

                  {/* Sub-bar: Age & Rental Period */}
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                      <select
                        value={driverAge}
                        onChange={(e) => setDriverAge(e.target.value)}
                        className="bg-transparent text-stone-700 font-bold outline-none cursor-pointer"
                      >
                        <option>Driver age 30+</option>
                        <option>Driver age 25 - 29</option>
                        <option>Driver age 21 - 24</option>
                      </select>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">Rental Period: {rentalDays} day(s)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SIXT/PATHIL ONE FULL WIDTH ORANGE BANNER */}
            <section className="w-full bg-[#E85D04] text-white py-11 px-4 text-center shadow-xs">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
                  MEMBER-ONLY RATES WITH PATHIL ONE
                </h2>
                <p className="mt-2 text-sm sm:text-base font-semibold text-white/95">
                  Premium car rental at prices you'll love. Worldwide with Pathil.
                </p>
              </div>
            </section>

            {/* THREE-COLUMN VALUE PILLARS */}
            <section className="bg-white border-b border-stone-200 py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FBFBF9] border border-stone-200 flex items-center justify-center shrink-0 text-[#E85D04] shadow-xs">
                    <Shield className="w-5 h-5 text-[#E85D04]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900">Best price guaranteed</h4>
                    <p className="mt-1 text-xs sm:text-sm text-stone-600">Rent premium vehicles with transparent rates and price-match guarantee</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FBFBF9] border border-stone-200 flex items-center justify-center shrink-0 text-[#E85D04] shadow-xs">
                    <Car className="w-5 h-5 text-[#E85D04]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900">Distinctive fleet</h4>
                    <p className="mt-1 text-xs sm:text-sm text-stone-600">From high-end convertibles to executive VIP SUVs and EVs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FBFBF9] border border-stone-200 flex items-center justify-center shrink-0 text-[#E85D04] shadow-xs">
                    <Sparkles className="w-5 h-5 text-[#E85D04]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900">Exceptional service</h4>
                    <p className="mt-1 text-xs sm:text-sm text-stone-600">Stress-free, trustworthy, no hidden costs or surprise surcharges</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5-CARD PROMOTIONAL VISUAL COLLAGE */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="space-y-6">
                {/* Hero Promotion Card */}
                <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 border border-stone-300 shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80"
                    alt="Pathil One Rewards"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="absolute top-6 left-6 z-10">
                    <div className="border border-white/90 bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-center text-white font-black tracking-tight transform -rotate-1 shadow-lg">
                      <span className="text-[9px] block uppercase tracking-widest text-stone-300">UP TO</span>
                      <span className="text-xl sm:text-2xl font-black leading-none block">20%</span>
                      <span className="text-[10px] block uppercase font-bold tracking-wider">OFF</span>
                    </div>
                  </div>

                  <div className="relative z-10 max-w-xl text-white">
                    <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                      PATHIL ONE: TURN RENTALS INTO REWARDS
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-200 font-semibold">
                      Join Pathil One now to unlock savings, priority vehicle hand-off and exclusive rewards!
                    </p>
                    <div className="mt-5">
                      <button
                        onClick={() => {
                          applyPromo(PATHIL_PROMOTIONS[0]);
                          setActiveTab('listings');
                        }}
                        className="px-6 py-2.5 bg-black/80 hover:bg-[#E85D04] text-white border border-white/60 text-xs font-black uppercase tracking-wider rounded-xl transition duration-200 shadow-lg"
                      >
                        Explore Deals on Map
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2 Promo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 2: White SUV */}
                  <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 sm:p-8 border border-stone-300 shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"
                      alt="White Truck SUV"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 z-10">
                      <div className="border border-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 text-center text-white font-black">
                        <span className="text-[9px] block uppercase text-stone-300">UP TO</span>
                        <span className="text-lg font-black leading-none block">15%</span>
                        <span className="text-[10px] block uppercase font-bold">DISCOUNT</span>
                      </div>
                    </div>

                    <div className="relative z-10 text-white">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                        START YOUR WEEK IN STYLE
                      </h3>
                      <p className="mt-1 text-xs text-stone-200 font-medium">Save on week-start rentals across Pathil SUV collection.</p>
                      <button
                        onClick={() => {
                          applyPromo(PATHIL_PROMOTIONS[1]);
                          setActiveTab('listings');
                        }}
                        className="mt-4 px-5 py-2 bg-black/80 hover:bg-[#E85D04] text-white border border-white/60 text-xs font-black uppercase tracking-wider rounded-xl transition duration-200 shadow"
                      >
                        Book now
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Bronze BMW */}
                  <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 sm:p-8 border border-stone-300 shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
                      alt="Elevate Drive Bronze Car"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 z-10">
                      <div className="border border-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 text-center text-white font-black">
                        <span className="text-[9px] block uppercase text-stone-300">UP TO</span>
                        <span className="text-lg font-black leading-none block">15%</span>
                        <span className="text-[10px] block uppercase font-bold">DISCOUNT</span>
                      </div>
                    </div>

                    <div className="relative z-10 text-white">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                        ELEVATE YOUR DRIVE.
                      </h3>
                      <p className="mt-1 text-xs text-stone-200 font-medium">Save now on our top-tier European high-performance vehicles.</p>
                      <button
                        onClick={() => {
                          applyPromo(PATHIL_PROMOTIONS[2]);
                          setActiveTab('listings');
                        }}
                        className="mt-4 px-5 py-2 bg-black/80 hover:bg-[#E85D04] text-white border border-white/60 text-xs font-black uppercase tracking-wider rounded-xl transition duration-200 shadow"
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 3 Promo Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 4: Executive Woman */}
                  <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 sm:p-8 border border-stone-300 shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                      alt="Executive with car"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 z-10">
                      <div className="border border-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 text-center text-white font-black">
                        <span className="text-[9px] block uppercase text-stone-300">FROM</span>
                        <span className="text-lg font-black leading-none block">$679</span>
                        <span className="text-[10px] block uppercase font-bold">/ MONTH</span>
                      </div>
                    </div>

                    <div className="relative z-10 text-white">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                        PATHIL+: PREMIUM CARS. MONTH BY MONTH.
                      </h3>
                      <p className="mt-1 text-xs text-stone-200 font-medium">No debt. No down payment. Pure flexibility without commitment.</p>
                      <button
                        onClick={() => {
                          applyPromo(PATHIL_PROMOTIONS[3]);
                          setActiveTab('listings');
                        }}
                        className="mt-4 px-5 py-2 bg-black/80 hover:bg-[#E85D04] text-white border border-white/60 text-xs font-black uppercase tracking-wider rounded-xl transition duration-200 shadow"
                      >
                        Subscribe now
                      </button>
                    </div>
                  </div>

                  {/* Card 5: Businessman */}
                  <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 sm:p-8 border border-stone-300 shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                      alt="Business travel"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 z-10">
                      <div className="border border-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 text-center text-white font-black">
                        <span className="text-[9px] block uppercase text-stone-300">CARS FROM</span>
                        <span className="text-lg font-black leading-none block">$35</span>
                        <span className="text-[10px] block uppercase font-bold">A DAY</span>
                      </div>
                    </div>

                    <div className="relative z-10 text-white">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                        BUSINESS TRAVEL IN STYLE
                      </h3>
                      <p className="mt-1 text-xs text-stone-200 font-medium">Become a corporate customer and enjoy exclusive rental car benefits.</p>
                      <button
                        onClick={() => {
                          applyPromo(PATHIL_PROMOTIONS[4]);
                          setActiveTab('listings');
                        }}
                        className="mt-4 px-5 py-2 bg-black/80 hover:bg-[#E85D04] text-white border border-white/60 text-xs font-black uppercase tracking-wider rounded-xl transition duration-200 shadow"
                      >
                        Register now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3-ROW CAR CATALOG SHOWCASE WITH MAP CTA BANNER */}
            <section id="fleet-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
                <div>
                  <span className="text-xs font-black text-[#E85D04] uppercase tracking-wider">Instant Booking Ready</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900">Featured Fleet Selection</h3>
                </div>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-stone-900 hover:bg-[#E85D04] text-white font-bold rounded-2xl text-xs transition shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#E85D04]" />
                  <span>View All on Interactive Map</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

              {/* 3-Row Vehicle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fleet.slice(0, 9).map((car) => renderCarCard(car, 'grid'))}
              </div>
            </section>

            {/* NEPAL'S MOST TRUSTED SELF-DRIVE PLATFORM & TESTIMONIALS */}
            <section className="bg-[#FAF9F5] border-t border-stone-200 py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 tracking-tight">
                    Nepal's most trusted self-drive platform.
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
                    We started Pathil to give every traveller the freedom to explore Nepal on their own terms — safely, affordably, and without friction.
                  </p>
                </div>

                {/* 4 Trust Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                        <FileCheck2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 mb-2">KYC Verified Renters</h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                        Every renter completes government-ID verification before their first booking. Owners know exactly who is driving.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 mb-2">Comprehensive Insurance</h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                        All bookings include third-party liability coverage. Optional full coverage available. You're protected from the moment you drive.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
                        <Car className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 mb-2">Verified & Inspected Vehicles</h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                        Every vehicle passes a 60-point safety inspection before listing. All documents and fitness certificates are checked.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                        <Headphones className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 mb-2">24/7 Road Assistance</h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                        Our Nepal-wide support network means you're never alone on the road. Mechanical issues, accidents — we're a call away.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Statistics Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                  <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 text-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">350+</span>
                    <span className="text-[11px] text-stone-500 font-medium">Happy Renters</span>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 text-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">600+</span>
                    <span className="text-[11px] text-stone-500 font-medium">Trips Completed</span>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 text-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">5+</span>
                    <span className="text-[11px] text-stone-500 font-medium">Cities Covered</span>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 text-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">&lt; 4 min</span>
                    <span className="text-[11px] text-stone-500 font-medium">Avg Support Response</span>
                  </div>
                </div>

                {/* Testimonials Header */}
                <div className="relative pt-6 pb-4 text-center">
                  <span className="absolute -top-6 left-0 text-stone-200 text-7xl font-serif select-none pointer-events-none">“</span>
                  <span className="absolute -top-6 right-0 text-stone-200 text-7xl font-serif select-none pointer-events-none">”</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">Voices from our community</h3>
                </div>

                {/* Horizontal Scrollable Testimonial Cards Carousel */}
                <div className="relative mt-8">
                  <div className="flex space-x-5 overflow-x-auto pb-6 pt-2 scrollbar-thin">
                    {COMMUNITY_VOICES.map((review) => (
                      <div
                        key={review.id}
                        className="min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between shrink-0 hover:shadow-md transition-shadow"
                      >
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-black text-stone-900 leading-none">{review.rating}</span>
                            <span className="text-[11px] text-stone-400 font-medium">stars</span>
                          </div>

                          <div className="flex items-center space-x-1 mb-4 text-amber-500">
                            {[...Array(review.stars)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                            ))}
                          </div>

                          <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed italic mb-6">
                            "{review.text}"
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 pt-3 border-t border-stone-100">
                          <div className={`w-9 h-9 rounded-full ${review.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                            {review.initials}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-stone-900 leading-snug">{review.name}</h4>
                            <p className="text-[10px] text-stone-400 font-medium">From {review.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW: CHAUFFEURS DIRECTORY                               */}
        {/* ======================================================== */}
        {activeTab === 'chauffeurs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#E85D04] bg-[#E85D04]/10 px-3.5 py-1.5 rounded-full border border-[#E85D04]/20">
                Pathil Executive Chauffeur Service
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-stone-950 mt-3">
                Certified Personal Drivers On-Demand
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Every Pathil chauffeur undergoes exhaustive background security checks, discrete non-disclosure agreements, and precision defensive road certification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CHAUFFEURS.map((chauffeur) => (
                <div
                  key={chauffeur.id}
                  className="bg-white border border-stone-200 rounded-3xl p-6 flex flex-col justify-between hover:border-[#E85D04]/40 hover:shadow-lg transition"
                >
                  <div>
                    <div className="flex items-center space-x-4 mb-5">
                      <img
                        src={chauffeur.avatar}
                        alt={chauffeur.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-stone-200"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-stone-900 text-base">{chauffeur.name}</h4>
                          <CheckCircle2 className="w-4 h-4 text-[#E85D04]" />
                        </div>
                        <p className="text-xs text-[#E85D04] font-bold">{chauffeur.specialty}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-stone-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="font-bold text-stone-800">{chauffeur.rating}</span>
                          <span>•</span>
                          <span>{chauffeur.trips} completed trips</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FBFBF9] p-4 rounded-2xl border border-stone-200 text-xs space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Experience:</span>
                        <span className="text-stone-900 font-bold">{chauffeur.experienceYears} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Languages:</span>
                        <span className="text-stone-900 font-bold">{chauffeur.languages.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Vetting Status:</span>
                        <span className="text-emerald-600 font-bold">100% Background Screened</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-stone-900">${chauffeur.dailyRate}</span>
                      <span className="text-xs text-stone-500"> / day chauffeur</span>
                    </div>
                    <button
                      onClick={() => {
                        setTripMode('chauffeur');
                        setActiveTab('listings');
                        showToast(`Selected chauffeur ${chauffeur.name}. Now pick a car on the map!`);
                      }}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#E85D04] text-white font-bold rounded-xl text-xs transition"
                    >
                      Pair With Car
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW: MY BOOKINGS                                         */}
        {/* ======================================================== */}
        {activeTab === 'my-bookings' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-black text-stone-950 mb-2">My Bookings & Receipts</h2>
            <p className="text-stone-600 text-sm mb-8">Manage active Pathil Car Rental reservations, view collection stations, and verify digital credentials.</p>

            {myReservations.length === 0 ? (
              <div className="bg-white border border-dashed border-stone-300 rounded-3xl p-12 text-center shadow-xs">
                <Car className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-stone-800">No Active Reservations</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  Ready to book an executive sedan, luxury SUV or private chauffeur? Explore our full fleet today.
                </p>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="px-6 py-2.5 bg-[#E85D04] text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Explore Cars On Map
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myReservations.map((res) => (
                  <div key={res.bookingId} className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
                      <div className="flex items-center space-x-4">
                        <img src={res.car.image} alt={res.car.name} className="w-20 h-14 object-cover rounded-xl" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-bold text-stone-900">{res.car.name}</h4>
                            <span className="font-mono text-xs bg-[#E85D04]/10 text-[#E85D04] px-2 py-0.5 rounded font-black">
                              {res.bookingId}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500">
                            {res.withChauffeur ? 'With Pathil Chauffeur' : 'Self-Drive Keyless Access'} • {res.insurancePlan}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Due at Pickup</span>
                        <span className="text-2xl font-black text-[#E85D04]">${res.totalAmount}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                      <div>
                        <span className="text-stone-400 block">Pickup Location</span>
                        <span className="font-bold text-stone-900">{res.pickupStation}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Pickup Date</span>
                        <span className="font-bold text-stone-900">{res.pickupDate} ({res.pickupTime})</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Return Date</span>
                        <span className="font-bold text-stone-900">{res.returnDate} ({res.returnTime})</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Status</span>
                        <span className="font-bold text-emerald-600 flex items-center">
                          <Check className="w-3.5 h-3.5 mr-1" /> Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: CAR BOOKING ENGINE & CHECKOUT                     */}
      {/* ======================================================== */}
      {selectedCarForModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#FBFBF9] border border-stone-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-stone-900">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#FBFBF9]/95 backdrop-blur border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#E85D04] font-black uppercase tracking-widest">PATHIL ONE Express Checkout</p>
                <h3 className="text-xl font-black text-stone-900">{selectedCarForModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCarForModal(null)}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-900 border border-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {bookingConfirmedDetails ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900">Reservation Confirmed!</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Booking Voucher Reference: <span className="font-mono text-[#E85D04] font-bold">{bookingConfirmedDetails.bookingId}</span>
                  </p>

                  <div className="bg-white border border-stone-200 rounded-2xl p-5 my-6 max-w-md mx-auto text-left text-xs space-y-2 shadow-xs">
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">Vehicle:</span>
                      <span className="font-bold text-stone-900">{bookingConfirmedDetails.car.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">Location:</span>
                      <span className="font-bold text-stone-900">{bookingConfirmedDetails.car.locationName}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">Service Mode:</span>
                      <span className="font-bold text-[#E85D04]">{bookingConfirmedDetails.withChauffeur ? 'Pathil Chauffeur Assigned' : 'Self-Drive Digital Key'}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">Trip Window:</span>
                      <span className="font-bold text-stone-900">{bookingConfirmedDetails.pickupDate} to {bookingConfirmedDetails.returnDate} ({bookingConfirmedDetails.days}d)</span>
                    </div>
                    {bookingConfirmedDetails.savedAmount > 0 && (
                      <div className="flex justify-between border-b border-stone-100 pb-2 text-emerald-700 font-bold">
                        <span>Pathil One Savings:</span>
                        <span>-${bookingConfirmedDetails.savedAmount} ({bookingConfirmedDetails.promoCode})</span>
                      </div>
                    )}
                    <div className="flex justify-between font-black text-base text-[#E85D04] pt-2">
                      <span>Total Due at Pickup:</span>
                      <span>${bookingConfirmedDetails.totalAmount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCarForModal(null);
                      setActiveTab('my-bookings');
                    }}
                    className="px-6 py-2.5 bg-[#E85D04] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
                  >
                    View in My Bookings
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmReservation} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Configuration */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative h-60 rounded-2xl overflow-hidden border border-stone-200 shadow-xs">
                      <img src={selectedCarForModal.image} alt={selectedCarForModal.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                        <div>
                          <p className="text-xs text-[#E85D04] font-bold">{selectedCarForModal.brand}</p>
                          <h4 className="text-xl font-bold">{selectedCarForModal.name}</h4>
                          <p className="text-xs text-stone-300 flex items-center space-x-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#E85D04]" />
                            <span>{selectedCarForModal.locationName}</span>
                          </p>
                        </div>
                        <span className="text-xs bg-white/90 text-stone-900 px-3 py-1 rounded-full font-bold">
                          {selectedCarForModal.fuelType}
                        </span>
                      </div>
                    </div>

                    {/* Driver Mode selection */}
                    <div>
                      <label className="text-xs font-black uppercase text-stone-500 block mb-2">Driver Option</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIncludeDriverOption(false)}
                          className={`p-3 rounded-2xl border text-left transition ${
                            !includeDriverOption
                              ? 'bg-white border-[#E85D04] shadow-xs ring-1 ring-[#E85D04]'
                              : 'bg-stone-100 border-stone-200 text-stone-500'
                          }`}
                        >
                          <Key className="w-4 h-4 text-[#E85D04] mb-1" />
                          <span className="font-bold text-xs block text-stone-900">Self-Drive</span>
                          <span className="text-[10px] text-stone-500">Digital unlock via smartphone</span>
                        </button>

                        <button
                          type="button"
                          disabled={!selectedCarForModal.canChauffeur}
                          onClick={() => setIncludeDriverOption(true)}
                          className={`p-3 rounded-2xl border text-left transition ${
                            !selectedCarForModal.canChauffeur
                              ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200'
                              : includeDriverOption
                              ? 'bg-white border-[#E85D04] shadow-xs ring-1 ring-[#E85D04]'
                              : 'bg-stone-100 border-stone-200 text-stone-500'
                          }`}
                        >
                          <UserCheck className="w-4 h-4 text-[#E85D04] mb-1" />
                          <span className="font-bold text-xs block text-stone-900">
                            With Chauffeur (+${selectedCarForModal.driverDailyRate || 90}/d)
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {selectedCarForModal.canChauffeur ? 'Certified executive driver' : 'Chauffeur not available'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Insurance selection */}
                    <div>
                      <label className="text-xs font-black uppercase text-stone-500 block mb-2">Protection Package</label>
                      <div className="space-y-2">
                        {INSURANCE_PLANS.map((plan) => (
                          <label
                            key={plan.id}
                            className={`flex items-start justify-between p-3 rounded-2xl border cursor-pointer transition ${
                              selectedInsurance === plan.id
                                ? 'bg-white border-[#E85D04] ring-1 ring-[#E85D04] shadow-xs'
                                : 'bg-[#FBFBF9] border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <input
                                type="radio"
                                name="ins"
                                checked={selectedInsurance === plan.id}
                                onChange={() => setSelectedInsurance(plan.id)}
                                className="mt-1 text-[#E85D04] focus:ring-[#E85D04]"
                              />
                              <div>
                                <p className="font-bold text-xs text-stone-900">{plan.name}</p>
                                <p className="text-[11px] text-stone-500">{plan.desc}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#E85D04] whitespace-nowrap ml-2">
                              {plan.pricePerDay === 0 ? 'INCLUDED' : `+$${plan.pricePerDay}/d`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Breakdown */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black uppercase text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
                        <span>Price Breakdown</span>
                        <span className="text-xs text-stone-500 font-semibold">{rentalDays} rental days</span>
                      </h4>

                      {/* Promo Code Input in Checkout */}
                      <div className="my-4 bg-[#FBFBF9] p-3 rounded-2xl border border-stone-200">
                        <label className="text-[10px] font-black uppercase text-stone-500 block mb-1">Coupon / PATHIL ONE Code</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="e.g. PATHILONE"
                            className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900 uppercase font-mono outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleManualPromoSubmit}
                            className="px-3.5 py-1.5 bg-[#E85D04] hover:bg-[#d05303] text-white font-black text-xs rounded-xl transition"
                          >
                            Apply
                          </button>
                        </div>
                        {appliedPromo && (
                          <div className="mt-2 text-[11px] text-emerald-700 flex items-center justify-between font-bold">
                            <span>Code {appliedPromo.code} Applied ({appliedPromo.discountPercent}% OFF)</span>
                            <button type="button" onClick={() => setAppliedPromo(null)} className="text-stone-400 hover:text-stone-700">✕</button>
                          </div>
                        )}
                      </div>

                      {/* Computations */}
                      {(() => {
                        const b = getBookingBreakdown();
                        return (
                          <div className="space-y-2.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-stone-500">Base Car Rate ({rentalDays}d):</span>
                              <span className="font-semibold text-stone-900">${b.base}</span>
                            </div>

                            {b.discount > 0 && (
                              <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                                <span>PATHIL ONE Discount:</span>
                                <span>-${b.discount}</span>
                              </div>
                            )}

                            {includeDriverOption && (
                              <div className="flex justify-between text-[#E85D04] font-semibold">
                                <span>Chauffeur Service:</span>
                                <span>+${b.driver}</span>
                              </div>
                            )}

                            <div className="flex justify-between">
                              <span className="text-stone-500">Insurance Protection:</span>
                              <span className="font-semibold text-stone-900">${b.insurance}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-stone-500">Taxes & Concession Fees:</span>
                              <span className="font-semibold text-stone-900">${b.taxes}</span>
                            </div>

                            <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-baseline">
                              <div>
                                <span className="text-xs font-bold text-stone-900 block">Total Rental Fee</span>
                                <span className="text-[10px] text-stone-400">Pay at collection</span>
                              </div>
                              <div className="text-right">
                                {b.discount > 0 && (
                                  <span className="text-xs line-through text-stone-400 block">${b.originalTotal}</span>
                                )}
                                <span className="text-3xl font-black text-[#E85D04]">${b.total}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#E85D04] hover:bg-[#d05303] text-white font-black uppercase tracking-wider text-xs rounded-2xl transition shadow-lg shadow-[#E85D04]/30 active:scale-95"
                      >
                        Confirm & Reserve Vehicle
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: HOST LIST YOUR CAR PORTAL                         */}
      {/* ======================================================== */}
      {isListCarOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBFBF9] border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-black text-[#E85D04] uppercase tracking-widest">Pathil Host Partner Portal</span>
                <h3 className="text-2xl font-black text-stone-900">List Your Car on Pathil</h3>
              </div>
              <button
                onClick={() => setIsListCarOpen(false)}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-500 border border-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCarListing} className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Make / Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Audi, Porsche, Mahindra, Toyota"
                    value={hostForm.brand}
                    onChange={(e) => setHostForm({ ...hostForm, brand: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none focus:border-[#E85D04]"
                  />
                </div>
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scorpio, Fortuner, Taycan"
                    value={hostForm.name}
                    onChange={(e) => setHostForm({ ...hostForm, name: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none focus:border-[#E85D04]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Category</label>
                  <select
                    value={hostForm.category}
                    onChange={(e) => setHostForm({ ...hostForm, category: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none"
                  >
                    <option value="LUXURY">Luxury</option>
                    <option value="SUV">SUV</option>
                    <option value="SPORTS">Sports</option>
                    <option value="ELECTRIC">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-600 font-bold block mb-1">City / Region</label>
                  <select
                    value={hostForm.city}
                    onChange={(e) => setHostForm({ ...hostForm, city: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none"
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Lalitpur">Lalitpur</option>
                    <option value="Bhaktapur">Bhaktapur</option>
                    <option value="Pokhara">Pokhara</option>
                    <option value="Chitwan">Chitwan</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-600 font-bold block mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={hostForm.pricePerDay}
                    onChange={(e) => setHostForm({ ...hostForm, pricePerDay: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-stone-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hostForm.canChauffeur}
                    onChange={(e) => setHostForm({ ...hostForm, canChauffeur: e.target.checked })}
                    className="rounded text-[#E85D04] focus:ring-[#E85D04]"
                  />
                  <span className="font-bold text-stone-900">Enable Pathil Chauffeur / Driver service for this vehicle</span>
                </label>
              </div>

              <div>
                <label className="text-stone-600 font-bold block mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={hostForm.image}
                  onChange={(e) => setHostForm({ ...hostForm, image: e.target.value })}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-900 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsListCarOpen(false)}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E85D04] hover:bg-[#d05303] text-white rounded-xl font-black"
                >
                  Publish Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-stone-200 py-10 mt-auto text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="bg-[#E85D04] text-white font-black px-2.5 py-0.5 rounded-lg text-xs">PATHIL</span>
            <span className="text-stone-900 font-bold">CAR RENTAL & CHAUFFEURS • NEPAL</span>
          </div>
          <p className="text-center">
            Member-Only Rates with Pathil One. Best price guaranteed. Distinctive fleet. Certified VIP Chauffeur network.
          </p>
          <div className="flex space-x-5 font-semibold text-stone-600">
            <span onClick={() => setActiveTab('listings')} className="hover:text-[#E85D04] cursor-pointer">
              Find Cars (Map)
            </span>
            <span onClick={() => setActiveTab('chauffeurs')} className="hover:text-[#E85D04] cursor-pointer">
              Chauffeurs
            </span>
            <span onClick={() => setIsListCarOpen(true)} className="hover:text-[#E85D04] cursor-pointer">
              List Car
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}