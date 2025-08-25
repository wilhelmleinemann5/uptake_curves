import { useState } from 'react'
import { Ship, TrendingUp, BarChart3, Calendar } from 'lucide-react'
import BookingCurveChart from './components/BookingCurveChart'
import { baselineBookingCurve, tradeLanes } from './data/sampleData'
import './styles/App.css'
import './styles/BookingCurveChart.css'

function App() {
  const [selectedTradeLane, setSelectedTradeLane] = useState(tradeLanes[0])
  const [showDemo, setShowDemo] = useState(false)

  const handleDataPointClick = (data, curve) => {
    console.log('Clicked data point:', data, 'for curve:', curve.sailingDate)
    // Here you could open a detailed view or pricing action modal
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Ship size={32} />
            <h1>Ocean Carrier Booking Analytics</h1>
          </div>
          <p className="subtitle">FFE Booking Curves & Pricing Intelligence for Container Shipping</p>
        </div>
      </header>

      <main className="main">
        {!showDemo ? (
          <>
            <div className="hero-section">
              <h2>Dynamic Pricing with Booking Curves</h2>
              <p>
                Monitor FFE booking velocity against baseline curves to make data-driven pricing decisions. 
                Track how your container bookings are pacing compared to historical performance and 
                adjust pricing strategies accordingly.
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowDemo(true)}
                style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem', padding: 'var(--spacing-md) var(--spacing-xl)' }}
              >
                View Live Booking Curves →
              </button>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <BarChart3 size={48} />
                <h3>FFE Booking Curves</h3>
                <p>Track forty-foot equivalent bookings from 35 days out to departure with confidence bands</p>
              </div>
              
              <div className="feature-card">
                <TrendingUp size={48} />
                <h3>Booking Velocity</h3>
                <p>Monitor booking pace against baseline to identify pricing opportunities early</p>
              </div>
              
              <div className="feature-card">
                <Calendar size={48} />
                <h3>Multiple Sailing Dates</h3>
                <p>Compare booking performance across different sailing dates and trade lanes</p>
              </div>
              
              <div className="feature-card">
                <Ship size={48} />
                <h3>Trade Lane Analysis</h3>
                <p>Analyze booking patterns for Asia-Europe, Transpacific, and other major routes</p>
              </div>
            </div>

            <div className="ocean-carrier-info">
              <h3>📊 How Booking Curves Guide Pricing Decisions</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Above Baseline:</strong> Bookings pacing ahead → Consider price increases to maximize revenue
                </div>
                <div className="info-item">
                  <strong>Below Baseline:</strong> Bookings lagging → Consider price decreases to stimulate demand
                </div>
                <div className="info-item">
                  <strong>Confidence Bands:</strong> 10-90% range helps identify significant deviations requiring action
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="demo-header">
              <h2>Live Booking Curve Analysis</h2>
              <p>Real-time FFE booking data for {selectedTradeLane.name}</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowDemo(false)}
                style={{ marginTop: 'var(--spacing-md)' }}
              >
                ← Back to Overview
              </button>
            </div>

            {/* Trade Lane Selector */}
            <div className="trade-lane-selector">
              <h4>Select Trade Lane:</h4>
              <div className="selector-buttons">
                {tradeLanes.map((lane) => (
                  <button
                    key={lane.code}
                    className={`btn ${selectedTradeLane.code === lane.code ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedTradeLane(lane)}
                  >
                    {lane.code} - {lane.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Booking Curve Chart */}
            <BookingCurveChart
              baselineCurve={baselineBookingCurve}
              currentCurves={selectedTradeLane.currentCurves}
              tradeLane={selectedTradeLane}
              onDataPointClick={handleDataPointClick}
            />

            {/* Key Insights Section */}
            <div className="key-insights">
              <h3>📈 Key Insights & Recommendations</h3>
              <div className="insights-content">
                <div className="insight-box success">
                  <h4>2025-08-17 Sailing</h4>
                  <p>Booking ahead of baseline by 8%. Consider moderate rate increase (+$50-100/FFE) to capitalize on strong demand.</p>
                </div>
                <div className="insight-box neutral">
                  <h4>2025-08-03 Sailing</h4>
                  <p>Tracking close to baseline. Monitor velocity over next 7 days before adjusting rates.</p>
                </div>
                <div className="insight-box warning">
                  <h4>2025-08-10 Sailing</h4>
                  <p>Booking 12% below baseline. Consider rate reduction (-$75/FFE) or promotional activity to stimulate bookings.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>Ocean Carrier Booking Analytics © 2024 • Powered by Booking Curve Intelligence</p>
      </footer>
    </div>
  )
}

export default App
