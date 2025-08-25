# 📈 Uptake Curves Analytics Prototype

A modern front-end prototype for pricing managers to visualize uptake curves, elasticity models, and make data-driven pricing decisions.

![Prototype Status](https://img.shields.io/badge/Status-Prototype-orange)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-green)
![React](https://img.shields.io/badge/Built%20with-React-blue)

## 🎯 Purpose

This prototype demonstrates how pricing analytics tools can help pricing managers:

- **Visualize Uptake Curves**: See how demand responds to price changes across market segments
- **Analyze Elasticity**: Understand price sensitivity and find optimal pricing points
- **Optimize Revenue**: Compare scenarios to balance volume and margin
- **Forecast Impact**: Predict market response to pricing strategies

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/uptake-curves-prototype.git
   cd uptake-curves-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Visit `http://localhost:3000`
   - The app will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Check code quality with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run deploy` - Deploy to GitHub Pages (requires setup)

## 🌐 Deployment to GitHub Pages

This project is configured for seamless GitHub Pages deployment:

### Automatic Deployment (Recommended)

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / root
3. **Access your deployed app** at: `https://your-username.github.io/uptake-curves-prototype`

### Manual Deployment

```bash
npm run deploy
```

### Important Configuration Notes

- **Repository name**: Update `vite.config.js` base path to match your repo name
- **Package.json**: Update the homepage URL to your GitHub Pages URL
- **Custom domain**: Add a `CNAME` file to the public folder if using a custom domain

## 📁 Project Structure

```
uptake-curves-prototype/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── data/              # Mock data and constants
│   ├── styles/            # CSS stylesheets
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties
- **Charts**: Recharts (for data visualization)
- **Icons**: Lucide React
- **Code Quality**: ESLint
- **Deployment**: GitHub Pages with GitHub Actions

## 🎨 Features Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and configuration
- [x] Modern build tooling (Vite)
- [x] GitHub Pages deployment
- [x] Responsive design system

### Phase 2: Core Functionality (Next)
- [ ] Interactive uptake curve visualization
- [ ] Price elasticity calculator
- [ ] Scenario comparison tools
- [ ] Data input forms

### Phase 3: Advanced Features
- [ ] Monte Carlo simulations
- [ ] Confidence intervals
- [ ] Export functionality
- [ ] Multiple product comparison

### Phase 4: Polish
- [ ] Advanced animations
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] User testing integration

## 🔧 Customization

### Updating Repository Settings

1. **Change repository name**: Update `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/your-new-repo-name/',
     // ... other config
   })
   ```

2. **Update package.json homepage**:
   ```json
   {
     "homepage": "https://your-username.github.io/your-new-repo-name"
   }
   ```

### Adding New Features

1. **Components**: Add to `src/components/`
2. **Utilities**: Add to `src/utils/`
3. **Styles**: Add to `src/styles/`
4. **Data**: Add mock data to `src/data/`

## 🐛 Troubleshooting

### Common Issues

**Build fails on GitHub Actions**
- Check Node.js version in `.github/workflows/deploy.yml`
- Ensure all dependencies are listed in `package.json`

**Site not loading on GitHub Pages**
- Verify the base path in `vite.config.js` matches your repository name
- Check that GitHub Pages is enabled in repository settings

**Development server won't start**
- Run `npm install` to ensure dependencies are installed
- Check that port 3000 is available

### Getting Help

1. Check the browser console for errors
2. Review the GitHub Actions logs for deployment issues
3. Ensure all environment requirements are met

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a prototype project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy coding!** 🚀 This prototype provides a solid foundation for building sophisticated pricing analytics tools.

## 🔧 Latest Updates

- ✅ Fixed GitHub Pages deployment configuration  
- ✅ Interactive FFE booking curve visualization live
- ✅ Ocean carrier pricing recommendations working
