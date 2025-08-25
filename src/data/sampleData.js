// Sample data for ocean carrier booking curves
// FFE = Forty-Foot Equivalents (container volume)
// Days to departure: 35 days out to departure (day 0)

// Historical baseline curve (black line in your screenshot)
export const baselineBookingCurve = [
  { daysTodeparture: 35, ffeBooked: 2500, confidenceLower: 1800, confidenceUpper: 3200 },
  { daysTodeparture: 34, ffeBooked: 2800, confidenceLower: 2100, confidenceUpper: 3500 },
  { daysTodeparture: 33, ffeBooked: 3200, confidenceLower: 2400, confidenceUpper: 4000 },
  { daysTodeparture: 32, ffeBooked: 3600, confidenceLower: 2700, confidenceUpper: 4500 },
  { daysTodeparture: 31, ffeBooked: 4000, confidenceLower: 3000, confidenceUpper: 5000 },
  { daysTodeparture: 30, ffeBooked: 4500, confidenceLower: 3400, confidenceUpper: 5600 },
  { daysTodeparture: 28, ffeBooked: 5500, confidenceLower: 4200, confidenceUpper: 6800 },
  { daysTodeparture: 26, ffeBooked: 7000, confidenceLower: 5300, confidenceUpper: 8700 },
  { daysTodeparture: 24, ffeBooked: 8800, confidenceLower: 6600, confidenceUpper: 11000 },
  { daysTodeparture: 22, ffeBooked: 11000, confidenceLower: 8300, confidenceUpper: 13700 },
  { daysTodeparture: 20, ffeBooked: 13500, confidenceLower: 10200, confidenceUpper: 16800 },
  { daysTodeparture: 18, ffeBooked: 16500, confidenceLower: 12400, confidenceUpper: 20600 },
  { daysTodeparture: 16, ffeBooked: 20000, confidenceLower: 15000, confidenceUpper: 25000 },
  { daysTodeparture: 14, ffeBooked: 24000, confidenceLower: 18000, confidenceUpper: 30000 },
  { daysTodeparture: 12, ffeBooked: 28500, confidenceLower: 21400, confidenceUpper: 35600 },
  { daysTodeparture: 10, ffeBooked: 33000, confidenceLower: 24800, confidenceUpper: 41200 },
  { daysTodeparture: 8, ffeBooked: 37000, confidenceLower: 27800, confidenceUpper: 46200 },
  { daysTodeparture: 6, ffeBooked: 40500, confidenceLower: 30400, confidenceUpper: 50600 },
  { daysTodeparture: 4, ffeBooked: 43000, confidenceLower: 32300, confidenceUpper: 53700 },
  { daysTodeparture: 2, ffeBooked: 44800, confidenceLower: 33600, confidenceUpper: 56000 },
  { daysTodeparture: 0, ffeBooked: 45500, confidenceLower: 34100, confidenceUpper: 56900 },
]

// Current booking curves for different sailing dates (colored lines)
export const currentBookingCurves = [
  {
    sailingDate: '2025-08-03',
    color: '#1f77b4', // Blue
    data: [
      { daysTodeparture: 35, ffeBooked: 2200 },
      { daysTodeparture: 34, ffeBooked: 2600 },
      { daysTodeparture: 33, ffeBooked: 3100 },
      { daysTodeparture: 32, ffeBooked: 3700 },
      { daysTodeparture: 31, ffeBooked: 4200 },
      { daysTodeparture: 30, ffeBooked: 4800 },
      { daysTodeparture: 28, ffeBooked: 6000 },
      { daysTodeparture: 26, ffeBooked: 7800 },
      { daysTodeparture: 24, ffeBooked: 10200 },
      { daysTodeparture: 22, ffeBooked: 13000 },
      { daysTodeparture: 20, ffeBooked: 16200 },
      { daysTodeparture: 18, ffeBooked: 19800 },
      { daysTodeparture: 16, ffeBooked: 23500 },
      { daysTodeparture: 14, ffeBooked: 27000 },
      { daysTodeparture: 12, ffeBooked: 30200 },
      { daysTodeparture: 10, ffeBooked: 33000 },
      { daysTodeparture: 8, ffeBooked: 35200 },
      { daysTodeparture: 6, ffeBooked: 36800 },
      { daysTodeparture: 4, ffeBooked: 37900 },
      { daysTodeparture: 2, ffeBooked: 38500 },
      { daysTodeparture: 0, ffeBooked: 39000 },
    ]
  },
  {
    sailingDate: '2025-08-10',
    color: '#ff7f0e', // Orange
    data: [
      { daysTodeparture: 35, ffeBooked: 1800 },
      { daysTodeparture: 34, ffeBooked: 2100 },
      { daysTodeparture: 33, ffeBooked: 2500 },
      { daysTodeparture: 32, ffeBooked: 2900 },
      { daysTodeparture: 31, ffeBooked: 3400 },
      { daysTodeparture: 30, ffeBooked: 3900 },
      { daysTodeparture: 28, ffeBooked: 5000 },
      { daysTodeparture: 26, ffeBooked: 6500 },
      { daysTodeparture: 24, ffeBooked: 8500 },
      { daysTodeparture: 22, ffeBooked: 11000 },
      { daysTodeparture: 20, ffeBooked: 14000 },
      { daysTodeparture: 18, ffeBooked: 17500 },
      { daysTodeparture: 16, ffeBooked: 21200 },
      { daysTodeparture: 14, ffeBooked: 25000 },
      { daysTodeparture: 12, ffeBooked: 28500 },
      { daysTodeparture: 10, ffeBooked: 31800 },
      { daysTodeparture: 8, ffeBooked: 34500 },
      { daysTodeparture: 6, ffeBooked: 36500 },
      { daysTodeparture: 4, ffeBooked: 37800 },
      { daysTodeparture: 2, ffeBooked: 38600 },
      { daysTodeparture: 0, ffeBooked: 39200 },
    ]
  },
  {
    sailingDate: '2025-08-17',
    color: '#2ca02c', // Green
    data: [
      { daysTodeparture: 35, ffeBooked: 2800 },
      { daysTodeparture: 34, ffeBooked: 3200 },
      { daysTodeparture: 33, ffeBooked: 3700 },
      { daysTodeparture: 32, ffeBooked: 4300 },
      { daysTodeparture: 31, ffeBooked: 4900 },
      { daysTodeparture: 30, ffeBooked: 5600 },
      { daysTodeparture: 28, ffeBooked: 6900 },
      { daysTodeparture: 26, ffeBooked: 8800 },
      { daysTodeparture: 24, ffeBooked: 11200 },
      { daysTodeparture: 22, ffeBooked: 14000 },
      { daysTodeparture: 20, ffeBooked: 17200 },
      { daysTodeparture: 18, ffeBooked: 20800 },
      { daysTodeparture: 16, ffeBooked: 24500 },
      { daysTodeparture: 14, ffeBooked: 28000 },
      { daysTodeparture: 12, ffeBooked: 31200 },
      { daysTodeparture: 10, ffeBooked: 34000 },
      { daysTodeparture: 8, ffeBooked: 36200 },
      { daysTodeparture: 6, ffeBooked: 37800 },
      { daysTodeparture: 4, ffeBooked: 38900 },
      { daysTodeparture: 2, ffeBooked: 39500 },
      { daysTodeparture: 0, ffeBooked: 40000 },
    ]
  }
]

// Trade lane configurations
export const tradeLanes = [
  {
    code: 'C1E',
    name: 'Asia to North Europe',
    capacity: 45500, // Total FFE capacity
    currentCurves: currentBookingCurves
  },
  {
    code: 'X4FS',
    name: 'Transpacific Eastbound',
    capacity: 38000,
    currentCurves: [] // Will add data later
  }
]

export const elasticityData = [
  { segment: 'Price Sensitive', elasticity: -2.8, currentPrice: 25, optimalPrice: 22 },
  { segment: 'Standard', elasticity: -1.5, currentPrice: 30, optimalPrice: 32 },
  { segment: 'Premium', elasticity: -0.8, currentPrice: 40, optimalPrice: 45 },
]

export const scenarioComparison = [
  {
    scenario: 'Current Pricing',
    price: 30,
    volume: 50000,
    revenue: 1500000,
    margin: 0.35,
    profit: 525000,
  },
  {
    scenario: 'Aggressive Pricing',
    price: 25,
    volume: 65000,
    revenue: 1625000,
    margin: 0.28,
    profit: 455000,
  },
  {
    scenario: 'Premium Pricing',
    price: 35,
    volume: 35000,
    revenue: 1225000,
    margin: 0.42,
    profit: 514500,
  },
  {
    scenario: 'Optimized Pricing',
    price: 32,
    volume: 48000,
    revenue: 1536000,
    margin: 0.38,
    profit: 583680,
  },
]

export const marketSegments = [
  {
    name: 'Enterprise',
    size: 35,
    priceElasticity: -0.9,
    currentUptake: 45,
    averagePrice: 85,
  },
  {
    name: 'Mid-Market',
    size: 40,
    priceElasticity: -1.8,
    currentUptake: 65,
    averagePrice: 45,
  },
  {
    name: 'SMB',
    size: 25,
    priceElasticity: -2.5,
    currentUptake: 78,
    averagePrice: 25,
  },
]

export const forecastData = [
  { month: 'Jan', baseline: 1200000, optimistic: 1350000, pessimistic: 1050000 },
  { month: 'Feb', baseline: 1250000, optimistic: 1425000, pessimistic: 1100000 },
  { month: 'Mar', baseline: 1300000, optimistic: 1500000, pessimistic: 1150000 },
  { month: 'Apr', baseline: 1280000, optimistic: 1480000, pessimistic: 1120000 },
  { month: 'May', baseline: 1320000, optimistic: 1520000, pessimistic: 1180000 },
  { month: 'Jun', baseline: 1400000, optimistic: 1600000, pessimistic: 1250000 },
]
