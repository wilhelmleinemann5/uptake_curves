# Copilot Code Instructions for MDS Components

## Project Structure and Context

This is the Maersk Design System (MDS) monorepo containing web components built with Lit, TypeScript, and SCSS. Each component follows a standardized structure:

```
packages/mc-[component-name]/
├── src/
│   ├── lib/
│   │   ├── index.ts          # Main component class
│   │   ├── types.ts          # TypeScript interfaces
│   │   └── styles/           # SCSS files
│   └── index.ts              # Public exports
├── stories/
│   ├── index.stories.ts      # Storybook documentation
│   └── argTypes.ts           # Storybook controls
└── tests/
    ├── index.component-spec.ts # Cypress component tests
    └── accessibility.cy.ts     # A11y tests
```

## Component Development Guidelines

### Naming Conventions

- **Component classes**: CamelCase with `Mc` prefix (e.g., `McButton`, `McTypeahead`)
- **Interfaces**: `IMc` prefix (e.g., `IMcButton`, `IMcTypeahead`)
- **Types**: Component name prefix (e.g., `McButtonAppearance`)
- **Public properties**: lowercase (e.g., `clearalllabel`, `hiddentags`)
- **Private/protected properties**: camelCase (e.g., `enterKeyDisabled`, `selectedData`)
- **Events**: lowercase (e.g., `optionselected`, `clearbuttonclick`)

### Property Management

1. **Property declarations**

   - Use `@property()` decorator for all reactive public properties
   - Set appropriate `type` in decorator: `{ type: Array }`, `{ type: Boolean }`, etc.
   - Initialize properties with sensible defaults
   - Document properties in JSDoc and types interface

2. **Boolean attributes**

   - Boolean attributes are true if they exist (even if set to "false")
   - Use `?attribute="${value}"` binding for boolean attributes in templates

3. **Property binding patterns**
   - Use `.property=${value}` for complex types (objects, arrays)
   - Use `property="${value}"` for strings and primitives
   - Use `?property="${value}"` for boolean attributes

### Component Lifecycle

1. **Lifecycle methods**

   - Use `willUpdate()` to handle property changes before rendering
   - Use `updated()` for post-render side effects
   - Override parent methods with proper `override` keyword
   - Maintain method visibility consistency with parent classes

2. **State management**
   - Keep internal state separate from public properties
   - Use private/protected members for internal state
   - Trigger `requestUpdate()` when internal state changes
   - Use reactive properties for external API

### Inheritance and Extension

1. **When extending components**

   - Check parent class method signatures and visibility
   - Use `override` keyword for method overrides
   - Use `protected` for members that child classes need access to
   - Use extension points like `renderExtraContent()` instead of overriding entire `render()` methods

2. **Component patterns**
   - Extend existing base components when there's shared functionality
   - Don't duplicate functionality already available in parent classes
   - Always call `super()` methods when overriding

### Event Handling

- Use CustomEvent for component-specific events
- Include proper event detail types
- Use consistent event naming (lowercase)
- Bubble events appropriately for parent consumption
- Add event listeners with action() in Storybook for demonstration

### JSDoc Documentation

Add comprehensive JSDoc to component files:

```javascript
/**
 * @element `mc-component-name`
 *
 * @event {CustomEvent} `eventname` - Description of when event fires
 * @event {MouseEvent} `click` - Emitted when clicked
 *
 * @slot The default slot description
 * @slot `slotname` - Named slot description
 *
 * @csspart `partname` - Description of CSS part usage
 */
```

## Testing Guidelines

### Test Structure

- Focus on testing component-specific functionality (don't duplicate parent class tests)
- Group related tests in `describe` blocks with clear context
- Use descriptive test names that explain expected behavior
- Use `beforeEach` for common setup and viewport configuration

### Cypress Patterns

- Use `cy.mount()` for component mounting
- Use direct selectors: `cy.get('component').find('element')` (includeShadowDom: true is configured)
- Create meaningful test data (e.g., fruits array with clear labels/values)
- Use aliases (`cy.as()`) for frequently accessed elements
- Use proper assertions instead of arbitrary waits: `cy.get('@element').should('be.visible')`
- Test both positive and negative scenarios
- Prefer data attributes or semantic selectors over CSS classes
- **Avoid unsafe command chaining** - Split chains when commands are unsafe
- **Don't assign Cypress command return values** - Use aliases instead
- **Use proper typing** - Use `($wrapper)` parameter instead of `(wrapper: any)`
- **Web Component Text Assertions** - For text content in web components with slots, use direct slot selectors:

  ```typescript
  // ✅ Correct - Use direct slot selector for text assertions
  cy.get('@component').find('mc-tag').find('slot[data-cy="label"]').should('contain', 'text');

  // ❌ Incorrect - Generic text assertions don't work with Shadow DOM slots
  cy.get('@component').find('mc-tag').should('contain', 'text');
  ```

### Test Coverage

- Add interaction & accessibility tests
- Test all public properties and methods
- Verify component state changes with proper assertions
- For multi-step interactions, verify intermediate states

## Storybook Integration

### ArgTypes Structure

- Group related properties by category
- Provide clear descriptions with usage examples
- Set appropriate default values
- Use correct control types (boolean, text, object, etc.)

### Story Templates

- Include all public properties in the main Documentation story
- Use proper binding syntax as described in Property Management
- Add event listeners with action() for event demonstration
- Create example stories for complex states that can't be represented by controls

## Styling Guidelines

### SCSS and Design Tokens

- Rely on core MDS SASS mixins and design tokens
- Don't import external libraries
- Use simple class names separated by `-`

```css
@import '@maersk-global/mds-foundations/scss/mixins/_typography.scss';

.mc-component {
  @include mds-apply-font('text', 'x-small', 'normal');
}
```

### CSS Classes

```html
<div class="mc-component medium primary-filled">My component</div>
```

## Accessibility Requirements

- Ensure WCAG 2.2 Level AA compliance
- Verify proper ARIA attributes and roles
- Check color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Ensure keyboard navigation and focus management
- Implement proper error messaging and form validation
- Ensure sufficient touch target sizes (minimum 44x44px)
- Use semantic HTML

## Code Quality Patterns

### ✅ Do:

- Extend existing base components when there's shared functionality
- Use extension points like `renderExtraContent()` for customization
- Add proper TypeScript types and interfaces
- Use semantic HTML and ARIA attributes
- Group related functionality in logical methods
- Add comprehensive test coverage for new features

### ❌ Don't:

- Override entire `render()` methods unnecessarily
- Duplicate functionality already available in parent classes
- Use camelCase for public property names
- Forget to call `super()` methods when overriding
- Mix private state with public properties
- Skip property reactivity decorators for public APIs
- Write tests that duplicate parent class functionality

### Code Quality Checklist:

- [ ] All public properties have `@property()` decorator
- [ ] TypeScript interfaces are updated
- [ ] JSDoc comments are complete and accurate
- [ ] Tests cover all new functionality
- [ ] Storybook args include all new properties
- [ ] Event handling follows established patterns
- [ ] Accessibility requirements are met
- [ ] No compilation errors
- [ ] No duplicate functionality from parent classes

## Code Generation Approach

### Before Making Changes

- Always read existing files to understand current structure
- Check for compilation errors before and after changes
- Use semantic search to understand component relationships
- Look for similar patterns in other components
- Check parent classes and inheritance structure

### Making Changes

1. Start with TypeScript interfaces and types
2. Add properties with proper decorators
3. Implement core functionality
4. Add lifecycle methods if needed
5. Update tests and stories

### Validation

- Check for compilation errors after each major change
- Run tests to ensure functionality works
- Verify Storybook integration
- Ensure accessibility compliance

## Security and Performance

- Don't commit API secrets/keys/access tokens
- Validate input sanitization and check for XSS vulnerabilities
- Review computed property dependencies
- Check for unnecessary re-renders
- Monitor bundle size impact

## Response Format

When providing code changes, explain:

- **What** you're changing and why
- **How** it fits with existing patterns
- **Testing** approach for the new functionality
- **Dependencies** or requirements for the change

## Ignored Areas

- Generated files in `/dist`
- Third-party dependencies in `node_modules`
- Environment-specific configuration files
- Test mock data files

## Project Commands and Workflows

### Using NX Commands

This project uses NX for managing tasks. Always use NX commands for running project tasks:

**✅ Correct:**

```bash
npx nx run [package-name]:lint
npx nx run [package-name]:test:headless
npx nx run [package-name]:build
npx nx run [package-name]:storybook
```

**❌ Incorrect:**

```bash
cd packages/[package-name] && npm run lint
```

### Common Commands

- **Linting**: `npx nx run mc-[component-name]:lint`
- **Testing**: `npx nx run mc-[component-name]:test`
- **Building**: `npx nx run mc-[component-name]:build`
- **Storybook**: `npx nx run mc-[component-name]:storybook`

## Linting and Code Quality

### Critical Linting Rules

Follow these patterns to avoid common linting violations:

#### TypeScript Linting

- **Never use `any` type** - Always specify proper types:

  ```typescript
  // ❌ Wrong
  cy.get('@component').then((wrapper: any) => {});

  // ✅ Correct
  cy.get('@component').then(($wrapper) => {});
  ```

- **Use `const` instead of `let`** when variables are not reassigned:

  ```typescript
  // ❌ Wrong
  let selectedPorts = [{ label: 'Port', value: 'port' }];

  // ✅ Correct
  const selectedPorts = [{ label: 'Port', value: 'port' }];
  ```

#### Cypress-Specific Rules

- **Avoid unsafe command chaining** - Split chains when unsafe:

  ```typescript
  // ❌ Wrong
  cy.get('@input').focus().type('{enter}');

  // ✅ Correct
  cy.get('@input').focus();
  cy.get('@input').type('{enter}');
  ```

- **Don't use arbitrary waits** - Use proper assertions instead:

  ```typescript
  // ❌ Wrong
  cy.wait(100);

  // ✅ Correct
  cy.get('@element').should('be.visible');
  ```

- **Don't assign Cypress command return values**:

  ```typescript
  // ❌ Wrong
  const component = cy.mount(html`<component></component>`);

  // ✅ Correct
  cy.mount(html`<component></component>`).as('component');
  ```

- **Remove unused variables**:

  ```typescript
  // ❌ Wrong
  const component = cy.mount(...).as('component'); // 'component' never used

  // ✅ Correct
  cy.mount(...).as('component');
  ```

### Pre-commit Checklist

Always run these commands before committing:

```bash
npx nx run [package-name]:lint
npx nx run [package-name]:test:headless
npx nx run [package-name]:build
```
