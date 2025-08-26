# Uptake Curves Tool - Evolution Roadmap

## Context

This roadmap emerged from pricing manager feedback on rate performance analysis needs. The current tool serves as a solid foundation/MVP that demonstrates the visualization layer pricing managers need, before adding forecast model complexity.

## Current Tool vs. Pricing Manager Needs

### ✅ Already Implemented

1. **Time-Based Comparative Analysis**
   - ✅ Historical baseline vs. live booking trajectory
   - ✅ "Today" marker and day-by-day progression  
   - ✅ Historical confidence bands for benchmarking

2. **Rate Sensitivity Analysis**
   - ✅ Price elasticity simulation (-50% to +50%)
   - ✅ Real-time volume impact visualization
   - ✅ Business-friendly sensitivity presets (Conservative → Extreme)

3. **Decision Flow Based on Lead Time**
   - ✅ Target-anchored guardrails (threshold buffer)
   - ✅ Visual alerts when forecasts drop below thresholds
   - ✅ Recommendation engine ("Consider price reduction")
   - ✅ Day-0 focused panel for final outcome assessment

### 🎯 Pricing Manager Core Needs

From feedback memo, key requirements include:

1. **Core Metrics for Rate Performance**
   - Booking Velocity: Daily volumes post-rate release vs. historical benchmarks
   - Search-to-Book Ratio: Conversion rates indicating rate alignment
   - Offer Failure Rate: Customer abandonment after viewing rates

2. **Time-Based Comparative Analysis** 
   - Same-Day Benchmarking: Day 1 pace vs. prior cycles
   - x-Day Booking Trends: 3-day, 7-day momentum vs. previous weeks

3. **Corridor-Level Insights**
   - Demand Shifts by POR/POD: Booking surges/declines by corridor
   - Rate Sensitivity Analysis: Price point thresholds and booking momentum

4. **Decision Flow Based on Lead Time**
   - 14–7 Days Before ETD: <50% expected volume → Drop rate 3–5%
   - 7–3 Days Before ETD: <70% volume → Aggressive discounts 7–10%

## Evolution Strategy

### Philosophy: "Ford would've built faster horses!"
- Build the **visualization layer** that pricing managers didn't know they needed
- **Forecast-based alerts > Heuristic rules**: "if forecast range drops below threshold" vs. "if bookings <50% then alert"
- **Simple forecast models** are key - complexity comes later

### Phase 1: Simple Forecast Models
Replace hardcoded sigmoid with data-driven forecasts:

```javascript
const forecastModel = {
    dayOfWeek: getDayOfWeekEffect(corridor, departure),
    timeFeatures: getTimeBasedFeatures(daysToETD), 
    searchVolume: getSearchTrends(corridor, timeWindow),
    conversionRate: getHistoricalConversion(corridor, rateLevel)
};
```

### Phase 2: Rolling Features  
Add momentum indicators:

```javascript
const rollingFeatures = {
    bookingVelocity3Day: getBookingVelocity(3),
    bookingVelocity7Day: getBookingVelocity(7),
    searchToBookRatio: getCurrentConversionRate()
};
```

### Phase 3: Better Price Sensitivity
Replace static elasticity with corridor-specific:

```javascript
const elasticity = getPriceSensitivity(corridor, leadTime, marketConditions);
```

## Technical Architecture Benefits

The current **centralized CONFIG structure** makes evolution straightforward:
- `generateSigmoidBookingCurve()` → `generateMLForecast()`
- Static elasticity → Dynamic corridor-specific sensitivity  
- Hardcoded confidence bands → Search/conversion-based uncertainty

## Current Focus: Polish MVP

Before adding forecast complexity, focus on:
- Smoothing rough edges in current tool
- Demonstrating value proposition for buy-in
- Proving key concepts with stakeholders

The current tool is the **perfect foundation** for the pricing manager's dream tool.

---

*This roadmap captures the strategic vision while keeping the current tool focused and valuable as an MVP.*
