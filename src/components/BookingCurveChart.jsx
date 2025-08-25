import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area,
  ComposedChart,
  ResponsiveContainer
} from 'recharts'

/**
 * BookingCurveChart - Interactive visualization of FFE booking curves for ocean carrier
 * @param {Array} baselineCurve - Historical baseline booking curve with confidence bands
 * @param {Array} currentCurves - Array of current booking curves for different sailing dates
 * @param {Object} tradeLane - Trade lane information (code, name, capacity)
 * @param {Function} onDataPointClick - Callback when user clicks on a data point
 */
function BookingCurveChart({ 
  baselineCurve, 
  currentCurves = [], 
  tradeLane = { code: 'C1E', name: 'Asia to North Europe', capacity: 45500 },
  onDataPointClick 
}) {
  
  // Prepare data for the chart by merging baseline and current curves
  const chartData = baselineCurve.map(basePoint => {
    const dataPoint = {
      daysTodeparture: basePoint.daysTodeparture,
      baseline: basePoint.ffeBooked,
      confidenceLower: basePoint.confidenceLower,
      confidenceUpper: basePoint.confidenceUpper,
    }
    
    // Add current curves data for this day
    currentCurves.forEach((curve, index) => {
      const currentPoint = curve.data.find(p => p.daysTodeparture === basePoint.daysTodeparture)
      if (currentPoint) {
        dataPoint[`curve_${index}`] = currentPoint.ffeBooked
      }
    })
    
    return dataPoint
  })

  // Custom tooltip to show detailed information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="booking-tooltip">
          <h4>{`Days to Departure: ${label}`}</h4>
          {payload.map((entry, index) => {
            if (entry.name === 'baseline') {
              return (
                <div key={index} className="tooltip-line">
                  <span style={{ color: entry.color }}>
                    Baseline: {entry.value?.toLocaleString()} FFE
                  </span>
                </div>
              )
            }
            if (entry.name.startsWith('curve_')) {
              const curveIndex = parseInt(entry.name.split('_')[1])
              const sailingDate = currentCurves[curveIndex]?.sailingDate
              return (
                <div key={index} className="tooltip-line">
                  <span style={{ color: entry.color }}>
                    {sailingDate}: {entry.value?.toLocaleString()} FFE
                  </span>
                </div>
              )
            }
            return null
          })}
          
          {/* Show capacity utilization for baseline */}
          {payload.find(p => p.name === 'baseline') && (
            <div className="tooltip-capacity">
              <small>
                Capacity: {((payload.find(p => p.name === 'baseline').value / tradeLane.capacity) * 100).toFixed(1)}%
              </small>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // Calculate if current curves are above/below baseline for pricing signals
  const getPricingSignal = (curve) => {
    // Compare last data point to baseline
    const lastPoint = curve.data[curve.data.length - 1]
    const baselineAtSameDay = baselineCurve.find(b => b.daysTodeparture === lastPoint.daysTodeparture)
    
    if (!baselineAtSameDay) return 'neutral'
    
    const deviation = (lastPoint.ffeBooked - baselineAtSameDay.ffeBooked) / baselineAtSameDay.ffeBooked
    
    if (deviation > 0.1) return 'above' // >10% above baseline
    if (deviation < -0.1) return 'below' // >10% below baseline
    return 'neutral'
  }

  return (
    <div className="booking-curve-chart">
      {/* Chart Header */}
      <div className="chart-header">
        <h3>FFE Booking Curve - {tradeLane.code}</h3>
        <p className="chart-subtitle">{tradeLane.name} • Capacity: {tradeLane.capacity.toLocaleString()} FFE</p>
      </div>

      {/* Pricing Signals */}
      <div className="pricing-signals">
        {currentCurves.map((curve, index) => {
          const signal = getPricingSignal(curve)
          return (
            <div key={index} className={`signal-indicator signal-${signal}`}>
              <div className="signal-dot" style={{ backgroundColor: curve.color }}></div>
              <span className="signal-date">{curve.sailingDate}</span>
              <span className="signal-text">
                {signal === 'above' && '📈 Consider price increase'}
                {signal === 'below' && '📉 Consider price decrease'}
                {signal === 'neutral' && '✅ On track'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Main Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            
            {/* X-axis: Days to Departure (reversed so 35 is left, 0 is right) */}
            <XAxis 
              dataKey="daysTodeparture" 
              reversed={true}
              label={{ value: 'Days to Departure', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            
            {/* Y-axis: FFE Booked */}
            <YAxis 
              label={{ value: 'Booked FFE', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            
            {/* Confidence band */}
            <Area
              dataKey="confidenceUpper"
              stroke="none"
              fill="#e0e0e0"
              fillOpacity={0.3}
            />
            <Area
              dataKey="confidenceLower"
              stroke="none"
              fill="#ffffff"
              fillOpacity={1}
            />
            
            {/* Baseline curve (thick black line) */}
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#2c3e50"
              strokeWidth={3}
              dot={false}
              name="baseline"
            />
            
            {/* Current booking curves (colored lines) */}
            {currentCurves.map((curve, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`curve_${index}`}
                stroke={curve.color}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
                name={`curve_${index}`}
                onClick={(data) => onDataPointClick && onDataPointClick(data, curve)}
              />
            ))}
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              content={() => (
                <div className="custom-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#2c3e50' }}></div>
                    <span>Baseline (10-90% band)</span>
                  </div>
                  {currentCurves.map((curve, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: curve.color }}></div>
                      <span>{curve.sailingDate}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Key Insights */}
      <div className="chart-footer">
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Booking Velocity</h4>
            <p>Monitor how quickly curves are building compared to baseline</p>
          </div>
          <div className="insight-card">
            <h4>Capacity Utilization</h4>
            <p>Current utilization: {((chartData[chartData.length - 1]?.baseline / tradeLane.capacity) * 100).toFixed(1)}%</p>
          </div>
          <div className="insight-card">
            <h4>Pricing Action</h4>
            <p>Curves above baseline → increase price | Below baseline → decrease price</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCurveChart
