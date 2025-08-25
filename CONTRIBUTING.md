# Contributing to Uptake Curves Analytics

Thank you for your interest in contributing to this pricing analytics prototype! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/uptake-curves-prototype.git
   cd uptake-curves-prototype
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠 Development Workflow

### Local Development

- `npm run dev` - Start the development server
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues
- `npm run build` - Test production build

### Code Style

This project uses ESLint for code quality. Please ensure your code:

- Follows the existing code style
- Passes all linting checks (`npm run lint`)
- Uses meaningful variable and function names
- Includes comments for complex logic

### Component Guidelines

When creating new React components:

1. **Use functional components** with hooks
2. **Place components** in `src/components/`
3. **Follow naming conventions**: PascalCase for components
4. **Include prop documentation** in comments
5. **Keep components focused** on a single responsibility

Example component structure:
```jsx
/**
 * UptakeCurveChart - Displays an interactive uptake curve visualization
 * @param {Array} data - Array of price/uptake data points
 * @param {Function} onPriceSelect - Callback when user selects a price point
 */
function UptakeCurveChart({ data, onPriceSelect }) {
  // Component implementation
}

export default UptakeCurveChart
```

## 📊 Adding New Features

### Data Visualization Components

When adding new charts or visualizations:

1. **Use Recharts** for consistency
2. **Place in** `src/components/charts/`
3. **Include responsive design**
4. **Add accessibility features** (ARIA labels, keyboard navigation)
5. **Test with sample data** from `src/data/sampleData.js`

### Utility Functions

For data processing or calculations:

1. **Place in** `src/utils/`
2. **Write pure functions** when possible
3. **Include JSDoc comments**
4. **Add unit tests** (when testing is set up)

Example utility:
```javascript
/**
 * Calculate price elasticity from two data points
 * @param {number} price1 - Initial price
 * @param {number} quantity1 - Initial quantity
 * @param {number} price2 - New price
 * @param {number} quantity2 - New quantity
 * @returns {number} Price elasticity coefficient
 */
export function calculateElasticity(price1, quantity1, price2, quantity2) {
  // Implementation
}
```

## 🎨 Styling Guidelines

### CSS Organization

- **Use CSS custom properties** for consistent theming
- **Follow BEM methodology** for class naming
- **Keep styles modular** - one CSS file per component when needed
- **Use the design system** defined in `src/styles/index.css`

### Responsive Design

- **Mobile-first approach** - start with mobile styles
- **Use CSS Grid and Flexbox** for layouts
- **Test on multiple screen sizes**
- **Ensure touch-friendly interfaces** on mobile

## 🔧 Adding Dependencies

Before adding new dependencies:

1. **Check if existing dependencies** can solve the problem
2. **Consider bundle size impact**
3. **Ensure compatibility** with React 18
4. **Update both** `package.json` and lock file

Preferred libraries:
- **Charts**: Recharts (already included)
- **Icons**: Lucide React (already included)
- **Utilities**: Native JavaScript when possible
- **Styling**: CSS-in-JS solutions should be avoided

## 📝 Documentation

### Code Documentation

- **Comment complex algorithms** and business logic
- **Use JSDoc** for function documentation
- **Explain "why" not just "what"**
- **Update README** for significant features

### User-Facing Documentation

- **Update README.md** for new features
- **Include screenshots** for visual features
- **Provide usage examples**
- **Document configuration options**

## 🧪 Testing (Future)

While testing is not yet set up, when it is added:

- **Write unit tests** for utilities and pure functions
- **Add integration tests** for critical user flows
- **Test accessibility** with screen readers
- **Verify responsive behavior** across devices

## 📤 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Run linting** and fix any issues
4. **Write a clear PR description**:
   - What problem does this solve?
   - How did you solve it?
   - How should reviewers test it?

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested in development environment
- [ ] Responsive design verified
- [ ] Accessibility checked

## Screenshots (if applicable)
[Add screenshots of visual changes]

## Additional Notes
Any additional context or considerations
```

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: add interactive uptake curve chart
fix: resolve mobile responsive layout issue
docs: update setup instructions in README
style: improve button hover animations
refactor: extract price calculation utilities
```

## 🐛 Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** first
2. **Use issue templates** (when available)
3. **Provide detailed descriptions**
4. **Include steps to reproduce** for bugs
5. **Add screenshots/videos** when helpful

## 💡 Feature Requests

For new feature ideas:

1. **Describe the business value**
2. **Explain the user story**
3. **Consider implementation complexity**
4. **Suggest possible approaches**

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Code Review**: Learning opportunity for all contributors

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor statistics

---

Thank you for contributing to make pricing analytics more accessible and powerful! 🚀
