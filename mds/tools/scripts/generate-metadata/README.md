# MDS Metadata Generation System

This folder contains scripts and tools for generating comprehensive metadata for the Maersk Design System (MDS) components, foundations, design tokens, and configuration packages. The metadata system enriches component and foundation documentation with UX guidelines, design principles, and accessibility information sourced from the MDS documentation repository.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Cache System](#cache-system)
- [Generated Metadata Structure](#generated-metadata-structure)
- [Package-Specific Generators](#package-specific-generators)
- [Development](#development)

## 🎯 Overview

The metadata generation system provides:

- **Enhanced Documentation**: Automatically enriches component docs with relevant UX guidelines
- **Design Principles Integration**: Links components to relevant design language principles
- **Accessibility Guidelines**: Automatically includes accessibility best practices
- **Local Caching**: Efficient caching system for MDS documentation content
- **Validation**: Scripts to verify metadata completeness across all packages

## 🚀 Quick Start

### Generate All Metadata

```bash
npm run build
npm run metadata
```

### Cache UX Documentation

```bash
npm run generate-metadata:cache:ux-docs
```

To run this command you need to create in the root folder `.env` file that has your GH access token like:

```bash
GITHUB_TOKEN=<YOUR_TOKEN>
```

Remember not to ever commit to git the`.env` file, as your token will be compromised.

### Check for Missing Metadata Files

```bash
npm run generate-metadata:check-files
```

## 📜 Available Scripts

### `npm run metadata`

**Purpose**: Generates metadata for all packages in the monorepo using Nx parallel execution.

**What it does**:

- Runs `nx run-many --target=generate:metadata`
- Executes metadata generation for all packages that have a `generate:metadata` target
- Includes components, foundations, design tokens, and config packages
- Uses Nx caching and parallelization for optimal performance

**Output**: Creates `metadata.json` files in each package's `dist` folder

---

### `npm run generate-metadata:cache:ux-docs`

**Purpose**: Populates the local cache with UX documentation from the MDS docs repository.

**What it does**:

- Fetches `index.mdx` files from the MDS docs GitHub repository
- Recursively scans `src/pages/design-language` and `src/pages/guidelines` folders
- Extracts metadata (title, description, tags) from each documentation file
- Saves cached content with readable file names (e.g., `component-button.json`)
- Creates mappings between components and relevant guidelines

**Cache Location**: `/cache/ux-docs/`

**Files Cached**:

- Component guidelines: `component-{name}.json`
- Design language docs: `design-language-{topic}.json`
- General guidelines: `guidelines-{topic}.json`
- Layout docs: `layout-{topic}.json`
- Content docs: `content-{topic}.json`

---

### `npm run generate-metadata:check-files`

**Purpose**: Validates that all expected metadata files have been generated.

**What it checks**:

- **Components**: All `mc-*` packages have metadata.json in `dist/packages/mds-components-core-{component}/`
- **Foundations**: All CSS files with `_` prefix have corresponding `.metadata.json` files
- **Design Tokens**: All required brands (`maersk`, `apmterminals`, `alianca`) have metadata.json
- **Config**: Main metadata.json exists

**Output**:

- ✅ Lists packages with complete metadata
- ❌ Reports missing metadata files with specific details
- Provides commands to regenerate missing metadata
- Exit code 0 if all metadata exists, 1 if any are missing

## 🏗️ Architecture

```
tools/scripts/generate-metadata/
├── README.md                           # This file
├── components/                         # Component metadata generation
│   ├── generate.mjs                   # Main component generator
│   ├── get-ux-docs.mjs               # UX docs fetching and caching
│   ├── ux-general-mapping.mjs        # Component to guideline mappings
│   └── component-guidelines-mapping.json
├── foundations/                        # Foundation CSS metadata
│   ├── generate.mjs                   # Foundation generator
│   └── ux-general-mapping.mjs        # Foundation guideline mappings
├── design-tokens/                      # Design token metadata
│   └── generate.mjs                   # Token generator
├── config/                            # Config package metadata
│   └── generate.mjs                   # Config generator
├── check-missing-metadata.mjs         # Validation script
├── populate-ux-docs-cache.mjs         # Cache population script
└── utils.mjs                          # Shared utilities
```

## 💾 Cache System

The cache system efficiently stores UX documentation to avoid repeated API calls:

### Cache Structure

```
cache/ux-docs/
├── component-button.json              # Button component guidelines
├── component-input.json               # Input component guidelines
├── design-language-colour-roles.json  # Color role documentation
├── guidelines-accessibility.json      # Accessibility guidelines
├── layout-grid.json                   # Grid layout documentation
└── ...
```

### Cache Benefits

- **Performance**: Avoids GitHub API rate limits
- **Offline Development**: Works without internet connection
- **Consistency**: Ensures all developers use the same documentation version
- **Debugging**: Allows inspection of cached content

### Cache Management

- **Populate**: `npm run generate-metadata:cache:ux-docs`
- **Location**: `/cache/ux-docs/`
- **Format**: JSON files with metadata and content
- **Naming**: Readable format without long prefixes

## 📊 Generated Metadata Structure

### Component Metadata

```json
{
  "packageName": "mds-components-core-button",
  "version": "2.131.3",
  "component": {
    "name": "McButton",
    "tagName": "mc-button",
    "description": "Interactive button component...",
    "properties": [...],
    "events": [...],
    "slots": [...],
    "cssParts": [...]
  },
  "guidelines": {
    "title": "Button Guidelines",
    "description": "Usage guidelines for buttons...",
    "content": "...",
    "designPrinciples": [
      {
        "title": "Colour roles",
        "path": "design-language/colour-roles",
        "description": "Understanding color usage..."
      }
    ],
    "relatedGuidelines": [
      {
        "title": "Disabled and readonly states",
        "path": "guidelines/disabled-and-readonly-states",
        "description": "Guidelines for disabled states..."
      }
    ]
  }
}
```

### Foundation Metadata

```json
{
  "cssFile": "_button.css",
  "foundation": "button",
  "guidelines": {
    "themes": {...},
    "designPrinciples": [...],
    "relatedGuidelines": [...]
  }
}
```

### Design Token Metadata

```json
{
  "brand": "maersk",
  "themes": {
    "light": {
      "tokenCount": 470,
      "categories": ["color", "typography", "spacing", ...]
    },
    "dark": {...}
  },
  "guidelines": {
    "designPrinciples": [...],
    "relatedGuidelines": [...]
  }
}
```

## 📦 Package-Specific Generators

### Components (`components/generate.mjs`)

- Generates metadata for all `mc-*` components
- Merges component specifications with UX guidelines
- Adds design principles and related guidelines
- Outputs to `dist/packages/mds-components-core-{component}/metadata.json`

### Foundations (`foundations/generate.mjs`)

- Processes CSS files with `_` prefix
- Links foundation CSS to relevant guidelines
- Generates individual metadata files per CSS file
- Outputs to `dist/packages/mds-foundations/css/{file}.metadata.json`

### Design Tokens (`design-tokens/generate.mjs`)

- Generates metadata for design token brands
- Processes token files for maersk, apmterminals, and alianca
- Includes token counts and categories
- Outputs to `dist/packages/mds-design-tokens/{brand}/metadata.json`

### Config (`config/generate.mjs`)

- Parses README.md for configuration documentation
- Supports nested sections and subsections
- Avoids empty objects in output
- Outputs to `dist/packages/mds-config/metadata.json`

## 🛠️ Development

### Adding New Guidelines

1. Update `ux-general-mapping.mjs` in the relevant package folder
2. Add component/foundation to guideline mappings
3. Run cache population to fetch new guidelines
4. Regenerate metadata to test integration

### Debugging

1. **Check Cache**: Inspect files in `/cache/ux-docs/`
2. **Validate Metadata**: Use `npm run generate-metadata:check-files`
3. **Manual Generation**: Run specific generators directly:
   ```bash
   node tools/scripts/generate-metadata/components/generate.mjs
   ```

### Testing

- Component tests are in `tests/` folder
- Run validation script after making changes
- Check generated metadata files in `dist/` folders
