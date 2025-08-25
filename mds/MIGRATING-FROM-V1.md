## Table of contents

- [Need help or support](#need-help-or-support)
- [Components](#components)
- [Design tokens](#design-tokens)
- [CSS](#css)
- [Deprecated packages](#deprecated-packages)

# Need help or support?

We’re here to help! If you need assistance or have any questions, please visit our [help and support](https://designsystem.maersk.com/about/help-and-support/) page for detailed information on how to reach us.

# Components

## Core components

### mc-button

**Button "variant" and "appearance" combinations have been re-written to support the new multi-brand theming architecture. Please read the changes below carefully.**

- `variant` values changed to: "filled, outlined and plain"
- `appearance` values changed to: "primary, secondary, neutral, inverse & error"
- `iconposition` prop is deprecated. Use icon to display `icon` to the left, and `trailingicon` to show icon to the right.
- `trailingIcon` slot renamed to `trailingicon`

| v1 variant/appearance | v2 variant/appearance |
| --------------------- | --------------------- |
| primary/default       | filled/secondary      |
| primary/alt           | filled/primary        |
| primary/inverse       | filled/inverse        |
| secondary/default     | filled/neutral        |
| secondary/alt         | outlined/neutral      |
| secondary/inverse     | outlined/inverse      |
| plain/default         | plain/neutral         |
| plain/alt             | plain/primary         |
| plain/inverse         | plain/inverse         |

Check out the [button guidelines](https://designsystem.maersk.com/components/button/) for more information on the new variant and appearance combinations.

### mc-card

- named `body` slot changed to be a default slot

### mc-calendar

- `mindate` renamed to `min`
- `maxdate` renamed to `max`

### mc-input

- `iconposition` prop is deprecated. Use icon to display `icon` to the left, and `trailingicon` to show icon to the right.

### mc-input-date

- `usenativeonmobile` renamed to `dontusenativeonmobile`
- `iconposition` prop is deprecated. Use icon to display `icon` to the left.

### mc-modal

- `dialogAction` renamed to `dialogaction`
- `large` fit deprecated

### mc-notification

- `variant` renamed to `appearance`
- Default `appearance` is "neutral" and not "info"
- `body` is now passed as default slot, not as named body slot
- rename `close` dispatch event detail to `cancel` so it's consistent across modal component. When user clicks on cancel or close button, press esp or clicks on scrim, `cancel` action will be dispatched in `closed` and `closing` event

Check out the <PageLink path="/components/notification/">notification guidelines</PageLink> for more information on the new appearances.

### mc-pagination

- `change` event is renamed to `pagechange`.

### mc-select

The `mc-select` is renamed to `mc-select-native`. You can still keep using it, the only thing you need to do is to rename the tag name in you code.

You can also try and use our new single select component - check out the <PageLink path="/components/select/">select guidelines</PageLink> for more information.

### mc-step-indicator

- `label` is now passed as default slot, not as named label slot

### mc-tab

- `iconposition` prop is deprecated. Use icon to display `icon` to the left, and `trailingicon` to show icon to the right.

### mc-tab-bar

- `change` event is renamed to `tabchange`.

### mc-tag

- `variant` renamed to `appearance`
- variant `default` is now appearance `neutral`
- `iconposition` prop is deprecated. Use icon to display `icon` to the left, and `trailingicon` to show icon to the right.
- `trailingIcon` slot renamed to `trailingicon`

Check out the <PageLink path="/components/tag/">tag guidelines</PageLink> for more information on the new appearances.

### mc-tooltip

- slots name change, trigger element should now be put into a `trigger` slot and the content should be put into a default slot

### mc-avatar, mc-card & mc-list

Avatar, Card and List components were moved from the Community package to Core. For those components you need to:

- replace `mc-c-*` prefix with `mc-*`
- change imports to: `@maersk-global/mds-components-core/*`.
- for React applications, change imports to: `@maersk-global/mds-react-wrapper/components-core`

## Community components

MDS community components have been deprecated in favour of the new [Community UI](https://designsystem.maersk.com/community-ui/initiatives/#code-libraries) library.

# Design tokens

**Design tokens and themes other than Maersk in v1 were not officially supported by the MDS.**

v1 design tokens and themes have been completely re-written for v2.

Design tokens are officially supported from v2 onwards. Please read the changes below carefully.

Read more about [themes and design tokens](https://designsystem.maersk.com/themes/).

## New folder structure

The new path must be used in place of the old one.

Replace the `<brand_name>` with one of the following: `maersk` or `apmt`:

**hamburgsud and sealand are no longer supported**

```javascript
import '@maersk-global/mds-design-tokens/<brand_name>/light/css/design-tokens-px.css';
```

```javascript
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
```

# CSS

**The CSS foundations has had a major overhaul in v2. Please read the changes below carefully.**

## New folder structure

New dist folder structure for the `@maersk-global/mds-foundations` package:

- SASS is now bundled `scss/*.scss`
- CSS has been moved to its own folder `css/foundations.css` &amp; `css/foundations.min.css`

The foundations package should be imported using the new paths (containing extra CSS segment) e.g.:

```javascript
import '@maersk-global/mds-foundations/css/foundations.css';
```

Additionally, remember to apply the `mds` class name to the root container of the sections in your page where the MDS foundations are required.

## mds-rich-text

**The `mds-rich-text` class is no longer supported.**

All CSS classes are now scoped to the `mds` class, you have to add `mds` class to an outer container wrapper, e.g. `<body>`.

In addition there is new a `mds-content` class. Adding this class to a container element e.g. `<article>` will provide spacing/margins for headers, paragraphs, unordered lists etc.

## Typography class name changes

| v1 class                       | v2 class                     |
| ------------------------------ | ---------------------------- |
| mds-font--display-5            | mds-headline--x-large        |
| mds-font--display-4            | mds-headline--large          |
| mds-font--display-3            | mds-headline--medium         |
| mds-font--display-2            | mds-headline--small          |
| mds-font--display-1            | mds-headline--x-small        |
| mds-font--default              | mds-text--medium-normal      |
| mds-font--default--bold        | mds-text--medium-bold        |
| mds-font--default--italic      | mds-text--medium-italic      |
| mds-font--default--bold-italic | mds-text--medium-bolditalic  |
| mds-font--small                | mds-text--small-normal       |
| mds-font--small--bold          | mds-text--small-bold         |
| mds-font--small--italic        | mds-text--small-italic       |
| mds-font--small--bold-italic   | mds-text--small-bolditalic   |
| mds-font--x-small              | mds-text--x-small-normal     |
| mds-font--x-small--bold        | mds-text--x-small-bold       |
| mds-font--x-small--italic      | mds-text--x-small-italic     |
| mds-font--x-small--bold-italic | mds-text--x-small-bolditalic |

The followg classes have also been deprecated in favour of using the `text-align` css property directly:

- `mds-text-left`
- `mds-text-center`
- `mds-text-right`

## Table class name changes

| v1 class                          | v2 class                                  |
| --------------------------------- | ----------------------------------------- |
| mds-table--vertical-grid-lines    | mds-table--vertical-lines-solid           |
| mds-table--no-wrap                | mds-table--nowrap                         |
| mds-table--hidden-header          | mds-table--header-hidden                  |
| mds-table--row-highlight-on-hover | mds-table--disable-row-highlight-on-hover |

## Other

- `clearfix` is no longer support

# Deprecated packages

The following packages have been deprecated with v2:

- `@maersk-global/mds-ie11`
- `@maersk-global/mds-react-components` in favour of `@maersk-global/mds-react-wrapper`. See below.
- `@maersk-global/mds-ssr-react`
- `@maersk-global/mds-v2-legacy` use `@maersk-global/mds-legacy` instead
- `@maersk-global/vite-plugin-mds-ie11`
- `@maersk-global/vue-cli-plugin-mds-ie11`

## Migration from @maersk-global/mds-react-web-components

The below migration path guides the current users of our former React wrapper `@maersk-global/mds-react-web-components` to move to `@maersk-global/mds-react-wrapper`:

Uninstall the `@maersk-global/mds-react-web-components` by running:

```bash
npm uninstall @maersk-global/mds-react-web-components --save
```

Install the `@maersk-global/mds-react-wrapper` by running:

```bash
npm install @maersk-global/mds-react-wrapper --save
```

Rename all the imports on `@maersk-global/mds-react-web-components` to `@maersk-global/mds-react-wrapper`, look the example below:

```javascript
import { McButton } from '@maersk-global/mds-react-web-components';
/** The package name above should be renamed, like below: **/
import { McButton } from '@maersk-global/mds-react-wrapper';
```

All event bindings stay the same as they are, the only change is the structure of the event arguments. Now the passing event object is aligned with how `CustomEvent`s work in the sense that the root of the passing event arg now contains overall data around the event itself and the payload resides in the `detail` property in that object. If TypeScript is applied, then you can even specify the type of the payload using the generic type of the `CustomEvent` type.

The example below illustrates how the refinement should take place to migrate the code from the former wrapper to the new one on i.e. an `McSelect` element:

```html
// Event binding with the former wrapper
<McSelect
  name="skills"
  placeholder="Select your skills"
  variant="multiple"
  fit={fit}
  options={skillsOptions}
  change={(selectedStatus: {
    selectedIndexes: [];
    selectedOptions: { label: string; value: string }[];
  }, event: CustomEvent) => {
    console.log('selected skills: ', selectedStatus);
  }}
></McSelect>

// Event binding with the new wrapper (code above should be migrated to below)
<McSelect
  name="skills"
  placeholder="Select your skills"
  variant="multiple"
  fit={fit}
  options={skillsOptions}
  change={(event: CustomEvent<{ selectedIndexes: []; selectedOptions: string[] }>) => {
    console.log('selected skills: ', event.detail);
  }}
></McSelect>
```

If React is used along with TypeScript, now there's no longer a need to have the following setting in the `tsconfing.json` file and it should be removed:

```json
{
  "files": ["./node_modules/@maersk/react-web-components/types/index.d.ts"]
}
```

## Removal of IE11

### VanillaJS static website

#### Dependencies

Make sure to remove the packages `css-vars-ponyfill` and `@maersk-global/mds-ie11` from your dependencies (`package.json`).

#### Imports

Remove the script tag that imports our components into all html files:

```html
<script src="./node_modules/@maersk-global/mds-ie11/load-components.js"></script>
```

And replace it with the following (remembering `type="module"`):

```html
<script type="module" src="./node_modules/@maersk-global/mds-components-core/index.bundle.js"></script>
```

### Vue2

#### Dependencies

Remove the packages `css-vars-ponyfill`, `@maersk-global/mds-ie11` and `vue-cli-plugin-mds-ie11` from your dependencies (`package.json`).

#### vue.config.js

Remove any `IE11` specific config from `vue.config.js`:

```javascript
{
  context: "node_modules/css-vars-ponyfill/dist",
  from: "**.js",
  to: "css-vars-ponyfill/dist",
},
{
  context: "node_modules/@maersk-global/mds-ie11",
  from: "**/*.js",
  to: "maersk-global/mds-ie11",
},
{
  context: "node_modules/@maersk-global/mds-components-core/css/ie11",
  from: "**.css",
  to: "maersk-global/mds-components-core/css/ie11",
}
```

#### main.js

Replace all `@maersk-global/mds-components-core/index.es5` and `@maersk-global/mds-components-community/index.es5` imports with the following (default barrel):

```javascript
import '@maersk-global/mds-components-community';
import '@maersk-global/mds-components-core';
```

### Angular

#### Dependencies

Remove the packages `css-vars-ponyfill`, `@maersk-global/mds-ie11` and `@webcomponents/webcomponentsjs` from your dependencies (`package.json`).

#### angular.json

Drop the lines below from the global `scripts` config:

```javascript
'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', 'node_modules/lit/polyfill-support.js';
```

Remember to remove the following from the static assets configuration:

```json
{
  "glob": "**/*",
  "input": "node_modules/@maersk-global/mds-components-core/css/ie11",
  "output": "./maersk-design-system-ie11/"
}
```

#### polyfills.ts

Omit the following lines from `polyfills.ts`:

```javascript
import '@maersk-global/mds-ie11/load-components-angular.js';
```
