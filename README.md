# 📊 Uptake Curves - Pricing Decision Dashboard

A front-end prototype for pricing managers to visualize booking curves, price sensitivity, and make better pricing decisions for ocean freight.

## 🚀 Live Demo

**🌐 [View Live Dashboard](https://wilhelmleinemann5.github.io/uptake_curves/)**

- **Historical Analysis**: [index.html](https://wilhelmleinemann5.github.io/uptake_curves/index.html) - Completed booking curves and performance analysis
- **Live Pricing Dashboard**: [live-pricing-simple.html](https://wilhelmleinemann5.github.io/uptake_curves/live-pricing-simple.html) - Real-time pricing simulation with elasticity modeling

## ✨ Features

### 📈 Historical Analysis Dashboard
- Completed FFE booking curves with confidence bands
- Multiple sailing dates comparison
- Final performance outcomes
- Dark theme with Maersk Design System colors

### 💰 Live Pricing Dashboard
- **Real-time pricing simulation** with exponential elasticity
- **Interactive FFE target setting** with feasibility analysis
- **Price sensitivity presets**:
  - 📈 Conservative (-0.5): Low price responsiveness
  - 🎯 Balanced (-1.0): Standard sensitivity  
  - ⚡ Moderate (-1.5): Typical trade lane *(default)*
  - 🔥 Aggressive (-2.0): High price sensitivity
  - 💥 Extreme (-3.0): Very responsive demand
  - 🧮 Custom: User-defined values
- **Uncertainty cone visualization** showing original vs simulated projections
- **"Today" marker** with incomplete vs projected booking curves

## 🧮 Pricing Simulation

Uses exponential elasticity formula: `New Volume = Original Volume × (1 + Price Change)^(sensitivity)`

**Example scenarios:**
- **-5% rate change** with Moderate sensitivity → **+7.9% volume increase**
- **-10% rate change** with Aggressive sensitivity → **+21.4% volume increase**

## 🎯 Business Value

- **Practical language**: "Price sensitivity" instead of "elasticity" 
- **Rate & volume sensitivity** modeling without economics jargon
- **What-if scenarios** for pricing decisions
- **Visual uncertainty ranges** for risk assessment
- **Target feasibility analysis** with real-time feedback

## 🛠️ Tech Stack

- **Frontend**: Static HTML, CSS, JavaScript
- **Charts**: Chart.js v4.4.0 with annotations plugin
- **Deployment**: GitHub Pages
- **Design**: Maersk Design System dark theme colors
- **No dependencies**: Pure web technologies for easy deployment

## 📁 Project Structure

```
├── index.html                 # Historical Analysis Dashboard
├── live-pricing-simple.html   # Live Pricing Dashboard  
├── LICENSE                    # MIT License
└── README.md                  # This file
```

## 🚀 Development

This is a static site - just open the HTML files in a browser or serve them with any web server.

For local development:
```bash
# Simple Python server
python -m http.server 8000

# Or Node.js server  
npx serve .
```

## 📊 Use Cases

1. **Historical Performance Review**: Analyze completed booking curves against baselines
2. **Live Pricing Decisions**: Simulate price changes and see volume impact
3. **Sensitivity Analysis**: Test different elasticity assumptions
4. **Target Setting**: Set FFE goals and assess feasibility
5. **Risk Assessment**: Visualize uncertainty ranges for forecasts

## 🎨 Design Principles

- **Business-friendly terminology** (avoid academic jargon)
- **Visual uncertainty communication** (cones, confidence bands)
- **Real-time interactivity** (immediate feedback on changes)
- **Clean, professional UI** (Maersk brand alignment)
- **Mobile-responsive design** (works on all devices)

---

Built for Maersk pricing managers to make data-driven rate decisions with confidence. 🚢