// Sample data for uptake curves and pricing analytics
// This will be used to populate charts and demonstrate functionality

export const sampleUptakeCurve = [
  { price: 10, uptake: 95, confidence: { lower: 92, upper: 98 } },
  { price: 15, uptake: 88, confidence: { lower: 84, upper: 92 } },
  { price: 20, uptake: 78, confidence: { lower: 73, upper: 83 } },
  { price: 25, uptake: 65, confidence: { lower: 59, upper: 71 } },
  { price: 30, uptake: 50, confidence: { lower: 43, upper: 57 } },
  { price: 35, uptake: 35, confidence: { lower: 28, upper: 42 } },
  { price: 40, uptake: 22, confidence: { lower: 16, upper: 28 } },
  { price: 45, uptake: 12, confidence: { lower: 8, upper: 16 } },
  { price: 50, uptake: 6, confidence: { lower: 3, upper: 9 } },
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
