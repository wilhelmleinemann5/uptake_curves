import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <TrendingUp size={32} />
            <h1>Uptake Curves Analytics</h1>
          </div>
          <p className="subtitle">Pricing Intelligence for Better Decisions</p>
        </div>
      </header>

      <main className="main">
        <div className="hero-section">
          <h2>Welcome to Your Pricing Analytics Prototype</h2>
          <p>
            This prototype demonstrates how uptake curves, elasticity models, and pricing analytics 
            can help pricing managers make data-driven decisions.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <BarChart3 size={48} />
            <h3>Uptake Curves</h3>
            <p>Visualize how demand responds to price changes across different market segments</p>
          </div>
          
          <div className="feature-card">
            <Activity size={48} />
            <h3>Elasticity Analysis</h3>
            <p>Understand price sensitivity and optimal pricing points for maximum revenue</p>
          </div>
          
          <div className="feature-card">
            <DollarSign size={48} />
            <h3>Revenue Optimization</h3>
            <p>Compare scenarios and find the sweet spot between volume and margin</p>
          </div>
          
          <div className="feature-card">
            <TrendingUp size={48} />
            <h3>Forecasting</h3>
            <p>Predict market response to pricing strategies with confidence intervals</p>
          </div>
        </div>

        <div className="coming-soon">
          <h3>🚧 Prototype in Development</h3>
          <p>
            This is the foundation for your pricing analytics tool. 
            Interactive charts, data input forms, and scenario planning tools will be added next.
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>Uptake Curves Prototype © 2024</p>
      </footer>
    </div>
  )
}

export default App
