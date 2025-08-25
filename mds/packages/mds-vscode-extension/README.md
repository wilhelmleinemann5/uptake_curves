VSCode extension that provides utilities for better DX using Maersk Design System.

## Features

- Autocompletion for MDS foundations CSS classes
- Autocompletion for MDS design tokens
- Autocompletion for MDS icons in components

### Autocompletion for MDS foundations CSS Classes

You can trigger the autocompletion by pressing ctrl + space on Windows or option + ESC on Mac inside class/className attributes.
It also pops up after you press space to concatenate multiple classes.

The extension provides intelligent suggestions for MDS foundations CSS classes including:

- Grid
- Breadcrumb
- Color
- Gap
- Link
- Table
- Typography

**Inside class/className attributes**:

```html
<!-- In HTML -->
<div class=""></div>
<!-- ctrl + space or option + ESC Triggers autocompletion -->

<!-- In React/JSX -->
<div className=""></div>
<!-- ctrl + space or option + ESC Triggers autocompletion -->
```

![Grid classes demo](https://assets.maerskline.com/mds/vscode-ext/mds-vscode-ext-foundations.gif)

### Autocompletion for MDS design tokens

The extension provides autocompletion for MDS design tokens in CSS, SCSS, and other style files(also in framework specific files). It triggers when you start typing a CSS variable with `var(` or by pressing ctrl + space on Windows or option + ESC on Mac when the cursor is inside a `var()`

```css
/* In CSS/SCSS */
.my-class {
  color: var(; /* Triggers autocompletion for design tokens */
}

/* In JSX/TSX style attribute */
<div style={{ color: "var(" }}></div>
```

The autocompletion will show all available MDS design tokens with their values(currently for Maersk light theme only, theme picker coming soon).

You can also hover over any MDS design token to see its current value in a tooltip.

![Design tokens demo](https://assets.maerskline.com/mds/vscode-ext/mds-vscode-ext-design-tokens.gif)

### Autocompletion for MDS icons

The extension provides autocompletion for MDS icons in components. It triggers when you start typing inside an icon-related attribute or by pressing ctrl + space on Windows or option + ESC on Mac.

The extension supports icon completion in the following components and attributes:

```html
<!-- In mc-icon component -->
<mc-icon icon=""></mc-icon>
<!-- Start typing or ctrl + space triggers autocompletion -->

<!-- In mc-button component -->
<mc-button icon=""></mc-button>
<!-- Icon autocompletion -->

<mc-button trailingicon=""></mc-button>
<!-- Trailing icon autocompletion -->
```

![Icons demo](https://assets.maerskline.com/mds/vscode-ext/mds-vscode-ext-icons.gif)

## Installation

You can install the extension from the [VSCode marketplace](https://marketplace.visualstudio.com/items?itemName=MaerskDesignSystem.mds-vscode-extension).
