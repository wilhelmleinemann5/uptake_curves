# Maersk Design System MCP Server Improvements

This document outlines improvements for the MCP (Model Context Protocol) server to enhance AI agents' understanding of Maersk Design System (MDS) components.

Improvements in MDS library:

- improve/ add comments, JS docs to components, tokens and foundations
- add kitchen sink examples for each component
- improve docs that we get from mds-docs
- setup - add metadata to mds config package
- add related components or other names that can be associated with component, i.e. typeahead-multi-select = combobox
- add sb examples to foundations

Improvements to MDS-MCP server:

- deploy MCP server, so it's accessible from external link (not localhost). Follow up with Microsoft about security issues, that should be resolved after summer.
- split into multiple focused tools:
  - get_setup_documentation - Setup instructions (get mds readme.md)
  - get_related (???)

## Ideal structure for responses

2. Components:

```json
{
  "overview": {
    "name": "mc-button",
    "purpose": "Primary action element",
    "category": "Interactive"
  },
  "usage": {
    "basic": "<mc-button>Click me</mc-button>",
    "import": "import '@maersk-global/mds-components-core-button';",
    "framework_examples": {
      "react": "...",
      "vue": "..."
    }
  },
  "api": {
    "props": [...],
    "events": [...],
    "slots": [...]
  },
  "styling": {
    "css_parts": [...],
    "css_variables": [...],
    "theme_support": "..."
  },
  "guidelines": {
    "accessibility": [...],
    "best_practices": [...],
    "common_issues": [...]
  }
}
```

3. Styling:

```json
get_design_tokens: {
  "tokens_by_category": {
    "colors": {...},
    "typography": {...},
    "spacing": {...}
  },
  "theme_variants": [...],
  "usage_examples": {...},
  "related_tools": [
    "get_styling_documentation for using color css classes that use design-tokens",
    "get_setup_documentation for design tokens setup for specific brand and/or theme"
  ],
}

get_grid_system: {
  "breakpoints": [...],
  "classes": [...],
  "examples": [...],
  "best_practices": [...],
  "related_tools": [...]
}

get_layout_patterns: {
  "page_layouts": [...],
  "navigation_patterns": [...],
  "content_patterns": [...],
  "related_tools": [...]
}
```

4. metadata.json improvements

```js
{
  // Real-World Context & Decision Making
  "guidelines": {
    "decisionMatrix": {
      "vs_link": "Use mc-button for actions, <a> for navigation",
      "vs_input": "Use mc-button for form actions, input[type=submit] for simple forms",
      "appearance_selection": {
        "primary": "Main call-to-action, use sparingly (1 per screen)",
        "secondary": "Supporting actions, can have multiple",
        "neutral": "Less prominent actions, tertiary importance",
        "error": "Destructive actions (delete, remove)"
      }
    }
  }

  // Practical Implementation Patterns
  "usage": {
    "patterns": {
      "form_submission": {
        "code": "<form><mc-button type=\"submit\">Save</mc-button></form>",
        "description": "Form submission with proper type attribute"
      },
      "async_actions": {
        "code": "<mc-button :loading=\"isSubmitting\" @click=\"handleSubmit\">Submit</mc-button>",
        "description": "Handle async operations with loading state"
      },
      "confirmation_dialogs": {
        "code": "<mc-button appearance=\"error\" @click=\"showConfirmation\">Delete</mc-button>",
        "description": "Destructive actions should use error appearance"
      }
    }
  }

  // Common Mistakes & Solutions
  "guidelines": {
    "commonIssues": [
      {
        "issue": "Multiple primary buttons on same screen",
        "problem": "Creates visual hierarchy confusion",
        "solution": "Use only one primary button per screen/section",
        "badExample": "<mc-button appearance=\"primary\">Save</mc-button><mc-button appearance=\"primary\">Cancel</mc-button>",
        "goodExample": "<mc-button appearance=\"primary\">Save</mc-button><mc-button appearance=\"secondary\">Cancel</mc-button>"
      },
      {
        "issue": "Using buttons for navigation",
        "problem": "Breaks semantic HTML and accessibility",
        "solution": "Use anchor tags with router-link for navigation",
        "badExample": "<mc-button @click=\"navigate('/page')\">Go to Page</mc-button>",
        "goodExample": "<mc-button><router-link to=\"/page\">Go to Page</router-link></mc-button>"
      }
    ]
  }

  // Framework-Specific Gotchas
  "frameworkExamples": {
    "react": {
      "code": "...",
      "gotchas": [
        "Event handlers use all lower case without on: click, focus",
        "Use ref for direct DOM access: useRef<HTMLElement>()"
      ]
    },
    "vue": {
      "code": "...",
      "gotchas": [
        "Use @click not onClick",
        "Template refs: <mc-button ref=\"buttonRef\">"
      ]
    }
  }

  // Accessibility Implementation Details
  "guidelines": {
    "accessibility": [
      {
        "requirement": "Keyboard navigation",
        "implementation": "Automatic with mc-button, focus with Tab key",
        "testing": "Ensure all buttons are reachable via keyboard"
      },
      {
        "requirement": "Screen reader support",
        "implementation": "Use arialabel for context: <mc-button arialabel=\"Delete user John Doe\">Delete</mc-button>",
        "testing": "Test with screen reader, ensure meaningful labels"
      },
      {
        "requirement": "Loading states",
        "implementation": "Use loading prop, announces state change to screen readers",
        "testing": "Verify loading announcement and button becomes non-interactive"
      }
    ]
  }

  // Redundant Basic Example
  "examples": {
    "minimal": "<mc-button>Click me</mc-button>",
    "recommended": "<mc-button appearance=\"primary\" @click=\"handleClick\">Save Changes</mc-button>"
  }

  // Overly Complex Framework Examples
  "frameworkExamples": {
    "react": {
      "setup": "npm install @maersk-global/mds-react-wrapper",
      "import": "import { McButton } from '@maersk-global/mds-react-wrapper';",
      "basic": "<McButton onClick={handleClick}>Save</McButton>",
      "withState": "const [loading, setLoading] = useState(false);\n<McButton loading={loading}>Submit</McButton>"
    }
  }
}
```

## 1. Add Structured Component Overview

Include a high-level overview section that summarizes the component's purpose, key features, and common use cases:

```typescript
// In src/tools/components_documentation.ts
response.overview = {
  purpose: `The Avatar component represents users visually in the interface through images, initials, or icons.`,
  keyFeatures: [
    "Multiple size options (x-small through xx-large)",
    "Color variations with four predefined themes",
    "Support for images or text initials",
    "Built-in tooltip accessibility",
    "Customizable via CSS parts",
  ],
  commonUseCases: [
    "User profiles and account representations",
    "Team member listings",
    "Comment and activity feeds",
    "User presence indicators",
  ],
};
```

## 2. Add Component Relationships

Show how components relate to each other, which can help with architectural understanding:

```typescript
response.relatedComponents = [
  { name: "tooltip", relationship: "Used internally to display information" },
  { name: "badge", relationship: "Can be used with avatar via badge slot" },
];
```

## 3. Include Framework-Specific Implementation Examples

Provide framework-specific integration examples:

```typescript
response.frameworkExamples = {
  react: `import { McAvatar } from '@maersk-global/mds-react-wrapper';

function UserProfile() {
  return (
    <McAvatar 
      fit="medium"
      appearance="color-1"
      initials="JD"
      info="Jane Doe"
    />
  );
}`,
  vue: `<template>
  <mc-avatar
    fit="medium"
    appearance="color-1"
    initials="JD"
    info="Jane Doe"
  ></mc-avatar>
</template>

<script>
import '@maersk-global/mds-components-core-avatar';
</script>`,
  angular: `<!-- In your component template -->
<mc-avatar 
  fit="medium"
  appearance="color-1"
  initials="JD"
  info="Jane Doe">
</mc-avatar>

<!-- In your NgModule -->
// Remember to add CUSTOM_ELEMENTS_SCHEMA to your module`,
};
```

## 4. Add Accessibility Information

Include clear accessibility information:

```typescript
response.accessibility = {
  ariaSupport: "Uses aria-labelledby to associate avatar with description",
  keyboardNavigation: "Not focusable by default as it's primarily decorative",
  screenReaderConsiderations:
    "Always provide info text for screen reader users",
  bestPractices: [
    "Use high contrast colors for initials",
    "Ensure image avatars have sufficient size for recognition",
    "Provide descriptive tooltip information",
  ],
};
```

## 5. Include Common Pitfalls and Solutions

Document common issues and their solutions:

```typescript
response.commonIssues = [
  {
    issue: "Avatar image not displaying",
    cause: "Incorrect image path or missing image file",
    solution:
      "Verify image path and ensure the file exists at the specified location",
  },
  {
    issue: "Tooltip not showing",
    cause: "Missing info property or hiddentooltip set to true",
    solution: "Provide info text and ensure hiddentooltip is not enabled",
  },
  {
    issue: "Custom styling not applied",
    cause: "Not using ::part selector correctly",
    solution: "Use mc-avatar::part(avatar) for styling the avatar element",
  },
];
```

## 6. Include Design System Context

Add information about where the component fits in the broader design system:

```typescript
response.designSystemContext = {
  designPrinciples:
    "Follows Maersk's design principles for consistency and simplicity",
  themeSupport: "Adapts to light and dark themes via design tokens",
  responsiveBehavior: "Adjusts font size based on viewport width",
  designTokens: [
    "--mds_core_avatar_color-1_background-color",
    "--mds_core_avatar_color-1_color",
    "--mds_core_avatar_medium_element_size",
  ],
};
```

## 7. Improve Code Examples with Comments

Enhance code examples with better comments and explanations:

```typescript
// When processing examples in src/utils/github.ts
function enhanceExampleWithComments(example) {
  // Add contextual comments to the example
  return example.replace(
    /<mc-avatar/g,
    "<!-- Avatar component with customized styling -->\n<mc-avatar"
  );
}
```

## 8. Include Version Information

Add component version history and changes:

```typescript
response.versionInfo = {
  currentVersion: packageJson.version,
  lastUpdated: "2023-05-15",
  recentChanges: [
    { version: "1.2.0", change: "Added support for custom part styling" },
    { version: "1.1.0", change: "Added hiddentooltip property" },
  ],
};
```

## 9. Add Performance Considerations

Include performance best practices:

```typescript
response.performance = {
  rendering: "Lightweight web component with minimal DOM impact",
  bestPractices: [
    "Optimize avatar images before use",
    "Consider using initials for performance-critical lists with many avatars",
  ],
};
```

## 10. Add Component API References

Include detailed TypeScript interfaces for each component:

```typescript
response.apiReference = {
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'tertiary'",
      default: "'primary'",
      description: "Controls the visual style of the component",
      required: false,
      examples: [
        { code: 'variant="primary"', description: "Standard emphasis button" },
        { code: 'variant="secondary"', description: "Medium emphasis button" },
      ],
    },
    {
      name: "size",
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: "Controls the size of the component",
      required: false,
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "When true, disables the component",
      required: false,
    },
  ],
  events: [
    {
      name: "click",
      description: "Fired when the component is clicked",
      eventDetail: { type: "Event" },
    },
  ],
  slots: [
    {
      name: "default",
      description: "Content to display inside the component",
    },
    {
      name: "icon",
      description: "Optional icon to display alongside content",
    },
  ],
  cssProperties: [
    {
      name: "--mds-button-primary-background",
      description: "Background color for primary variant",
      default: "#0170B9",
    },
  ],
  cssParts: [
    {
      name: "base",
      description: "The component's base wrapper element",
    },
    {
      name: "content",
      description: "The container for component content",
    },
  ],
};
```

## 11. Add Visual References

Include visual references showing components in different states:

```typescript
response.visualReferences = {
  preview: "https://assets.maerskline.com/mds/components/button/preview.png",
  states: {
    hover: "https://assets.maerskline.com/mds/components/button/hover.png",
    active: "https://assets.maerskline.com/mds/components/button/active.png",
    disabled:
      "https://assets.maerskline.com/mds/components/button/disabled.png",
  },
  variants: {
    primary: "https://assets.maerskline.com/mds/components/button/primary.png",
    secondary:
      "https://assets.maerskline.com/mds/components/button/secondary.png",
  },
};
```

## 12. Include UX Best Practices

Add UX design principles and best practices:

```typescript
response.uxBestPractices = {
  doGuidelines: [
    {
      description: "Use primary buttons for main actions",
      example:
        "https://assets.maerskline.com/mds/components/button/do-primary.png",
    },
    {
      description: "Keep button labels concise and action-oriented",
      example:
        "https://assets.maerskline.com/mds/components/button/do-labels.png",
    },
  ],
  dontGuidelines: [
    {
      description: "Avoid using multiple primary buttons in a single section",
      example:
        "https://assets.maerskline.com/mds/components/button/dont-multiple.png",
    },
    {
      description: "Don't use vague or generic labels like 'Click Here'",
      example:
        "https://assets.maerskline.com/mds/components/button/dont-labels.png",
    },
  ],
  usagePatterns: [
    "Use in forms for submit and cancel actions",
    "Use in dialogs for confirmation actions",
    "Use in navigation for key user journeys",
  ],
};
```

## 13. Include Interactive Demo References

Add references to interactive demos and sandboxes:

```typescript
response.interactiveExamples = {
  storybook:
    "https://maersk-design-system.github.io/storybook/?path=/story/components-button--default",
  codesandbox: "https://codesandbox.io/s/maersk-button-example-12345",
  playground: "https://maersk-design-system.github.io/playground/button",
};
```

## Implementation Approach

To implement these improvements:

1. Update the `src/types/index.ts` file with new interface properties
2. Enhance the component documentation tools to fetch and structure this additional data
3. Update the response format in `src/tools/components_documentation.ts`
4. Add methods to process and format the more detailed documentation
5. Create new utility functions to generate the additional documentation sections
6. Update the MCP response schema to include all new metadata fields
