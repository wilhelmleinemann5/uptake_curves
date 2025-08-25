## Table of contents

- [Need help or support](#need-help-or-support)
- [What are MDS packages](#what-are-mds-packages)
- [Setting up your local environment](#setting-up-your-local-environment)
  - [Before you start](#before-you-start)
  - [Private artifact repositories access](#private-artifact-repositories-access)
  - [GitHub Packages](#github-packages)
  - [Nexus.maerskdev.net](#nexus-maerskdev-net)
- [Installing MDS packages](#installing-mds-packages)
  - [Installing individual packages](#installing-individual-packages)
  - [Installing the whole package](#installing-the-whole-package)
  - [Installing packages in React](#installing-packages-in-react)
  - [Getting MDS packages from CDN](#getting-mds-packages-from-cdn)
- [Using MDS in your application](#general-guide-on-using-mds-in-your-application)
  - [Importing needed files](#importing-needed-files)
  - [Icons import path configuration](#icons-import-path-configuration)
  - [How to use design tokens and CSS properties in your application](#how-to-use-design-tokens-and-css-properties-in-your-application)
  - [How to style MDS components](#how-to-style-mds-components)
- [Using packages within frameworks](#using-packages-within-frameworks)
  - [Vue 3](#vue-3)
  - [React](#react)
  - [Angular](#angular)
  - [Vanilla JS](#vanilla-js)
  - [Nuxt](#nuxt-3)
  - [Next.js](#nextjs)
- [Other integrations](#other-integrations)
  - [Typescript and VSCode IntelliSense support](#typescript-and-vscode-intellisense-support)
  - [JEST and Testing Library](#jest-and-testing-library)
  - [Cypress](#cypress)
  - [Webpack 4](#webpack-4)
  - [General SSR](#general-ssr)
- [Migration guide from mds-components-core package](#migration-guide-from-mds-components-core-package)

# Need help or support?

We’re here to help! If you need assistance or have any questions, please visit our [help and support](https://designsystem.maersk.com/about/help-and-support/) page for detailed information on how to reach us.

# What are MDS packages?

Before you start using MDS components, please read our [components usage documentation](https://designsystem.maersk.com/components/) and check out [components developer documentation](https://mds.maersk.com/) - here you will find detailed API documentation for each component, advanced use case scenarios and code examples for different JS frameworks.

You can see the latest versions of our packages in [Storybook](https://mds.maersk.com/) or in [change-log](https://github.com/Maersk-Global/mds/releases).

# Setting up your local environment

## Before you start

There are a few things you need to set up on your local environment:

- Make sure you have an access to one of our [private repositories](#private-artifact-repositories-access)
- You need to have Node & npm installed in your local environment ([Node.js v20](https://nodejs.org/en/blog/release/v20.15.1))

## Private artifact repositories access

All packages related to the Maersk Design System are hosted on four different repositories. Depending on your project set-up and where the source code is hosted, you can choose to install package from different private repositories:

- Maersk Global GitHub Packages
- Private npm repository hosted on nexus.maerskdev.net
- Azure DevOps

## GitHub Packages

If you use GitHub Actions for your CI/CD pipeline, then you can benefit from and use Maersk Global GitHub Packages registry.

Before you can install any dependencies, you need to authenticate to Maersk Global GitHub Packages registry (where our private packages are stored), and for the authentication, you need to generate a personal access token out of your corporate GitHub account by following the step below:

1. Sign in to your corporate GitHub account.
2. Go to `Settings` -> `Developer Settings` -> `Personal Access Token` -> `Generate new token`.
3. Give your token a name and then in the scopes list, select (check) repo and also read:packages, click Generate token.
4. Copy your token. You need to remember this as it's the only time that you can see and copy your token, otherwise, you’ll lose it and will have to delete and generate a new one.
5. Select Enable SSO from the dropdown and click on `Authorize` (follow the instructions on the screen). Now you can authenticate to `Maersk Global GitHub Packages` registry using your personal access token by following one of the authentication methods below:

### Authentication method 1

In the terminal run:

```bash
npm login --scope=@maersk-global --registry=https://npm.pkg.github.com
```

Then you’ll be prompted to enter your credentials, please follow the exact below instructions for that:

```bash
Username: YOUR_GITHUB_CORPORATE_USERNAME
Password: YOUR_GITHUB_PERSONAL_ACCESS_TOKEN #(!!remember this's not your GitHub password!!)
Email: YOUR_CORPORATE_EMAIL
```

### Authentication method 2

Edit the `~/.npmrc` global file to include the following line, replacing TOKEN with your copied personal access token. Create a new `~/.npmrc` file if one doesn’t exist.

```bash
//npm.pkg.github.com/:_authToken=TOKEN
@maersk-global:registry=https://npm.pkg.github.com
```

## Nexus.maerskdev.net

You can get access to nexus.maerskdev.net by engaging with a bot on [DevOps and Tooling MS Teams channel](https://teams.microsoft.com/l/channel/19%3a65e2929b7d99447793cb5bdf79b001e2%40thread.skype/Engage%2520with%2520the%2520bot?groupId=45232fe3-ee6a-4878-9671-a88c4068332e&tenantId=05d75c05-fa1a-42e7-9cf1-eb416c396f2d). Once you get the username and password please follow the guidelines here: [Maerskdev.net Developer guide on Maersk Tools Wiki](https://maersk-tools.atlassian.net/wiki/spaces/MDevNet/pages/140764381119/Developer+Guide#DeveloperGuide-NPM).

# Installing MDS packages

MDS packages are published as individual packages to private NPM registries. Please have a look at the full list of all published [MDS packages](https://github.com/orgs/Maersk-Global/packages?repo_name=mds).

Before you can install the packages locally in your project, you have to be authenticated to one of the Maersk Global private registries. Please read more about it in [setting up your local environment](#setting-up-your-local-environment).

You can either install individual packages or the whole MDS components core package which includes all components.

## Installing individual packages

To install individual packages, you can run the following command (i.e. for the button component):

```bash
npm install @maersk-global/mds-components-core-button@latest
```

This will install the package along side with all required dependencies.

The list of all available packages can be found in the [MDS](https://github.com/orgs/Maersk-Global/packages?repo_name=mds) repo.

## Installing the whole package

We provide also a wrapper package that includes all the components, and to install it you can run the following command:

```bash
npm install @maersk-global/mds-components-core@latest
```

This will install the wrapper package that includes all the components along side with all required dependencies.

## Installing packages in React

To use MDS components in React, we've created a septate wrapper package. To install it you can run the following command:

```bash
npm install @maersk-global/mds-react-wrapper@latest
```

This will install the package along side with all required dependencies.

## Getting MDS packages from CDN

MDS libraries get also deployed to our CDN, so you can use them directly in your application without the need of installing them as NPM packages.

You can include MDS libraries in your project by using the latest version of MDS and fonts, like:

```html
<link rel="stylesheet" href="https://assets.maerskline.com/mds/fonts/fonts-cdn.css" />
<link
  rel="stylesheet"
  href="https://assets.maerskline.com/mds/latest/design-tokens/maersk/light/css/design-tokens-px.min.css"
/>
<link rel="stylesheet" href="https://assets.maerskline.com/mds/latest/foundations/foundations.min.css" />
<script type="module" src="https://assets.maerskline.com/mds/latest/components-core/index.bundle.esm.min.js"></script>
```

or use the specific version of MDS libraries, like:

```html
<link rel="stylesheet" href="https://assets.maerskline.com/mds/fonts/2.0.0/fonts-cdn.css" />
<link
  rel="stylesheet"
  href="https://assets.maerskline.com/mds/2.132.0/design-tokens/maersk/light/css/design-tokens-px.min.css"
/>
<link rel="stylesheet" href="https://assets.maerskline.com/mds/2.132.0/foundations/foundations.min.css" />
<script type="module" src="https://assets.maerskline.com/mds/2.132.0/components-core/index.bundle.esm.min.js"></script>
```

# Using MDS in your application

## Importing needed files

After installing the package, you can start using MDS components in your app:

- Import the component you want to use e.g. button in the example below.
- And if you haven't already imported them:
  - The MDS theme design tokens required for your product. Read more about [themes and design tokens](https://designsystem.maersk.com/design-language/themes/) on the MDS website.
  - The MDS foundations.css file

```javascript
import '@maersk-global/mds-components-core-button';

// import design tokens for your brand and theme
// where <BRAND_NAME> can be: 'maersk', 'apmterminals', 'alianca'
// and <THEME_NAME> can be: light or dark
import '@maersk-global/mds-design-tokens/<BRAND_NAME>/<THEME_NAME>/css/design-tokens-px.css';
// optional: import MDS foundations, if you need some global stylesheet i.e. CSS resets, classes that support our typography and colors
import '@maersk-global/mds-foundations/css/foundations.css';
```

Please have a look at each component's [documentation and code examples](https://mds.maersk.com/) to see how to use them in the JS framework you are using.

## Icons import path configuration

For optimisation purposes, we’ve introduced dynamic import of icons (we use async `await import()` function in `mc-icon` component). That means that your app will import only those icons that are used in your project.

In most cases your bundler (i.e. webpack) is able to handle dynamic imports and resolve paths automatically for you. But if your bundler doesn’t support dynamic imports, you can pass the path where icons are located in your project in the `index.ts` file by using `mdsConfig` abstract class & `iconsDynamicImportPath` static variable, and use it i.e. like this in your project using Vite:

```javascript
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = process.env.NODE_ENV === 'development' ? '/node_modules/' : '/assets/node_modules/';
```

## How to use design tokens and CSS properties in your application

Maersk Design System supports multiple [themes](https://designsystem.maersk.com/design-language/themes/).
The `@maersk-global/mds-design-tokens` package contains the CSS variables that you can use to apply a theme in your web solutions. This package will be automatically installed in your project, if you install MDS components.

### Usage in application code

Design tokens are distributed as [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). All design tokens follow the same naming pattern despite different `themes` or `brands` being available.

You can find all available design tokens in our [design tokens list](https://designsystem.maersk.com/design-language/themes/maersk/light/).

It is enough to just import the `@maersk-global/mds-design-tokens` package to get the desired styles for the MDS components, but you can also use design tokens to style other parts of your application i.e. set the `background-color` property to use brand's `primary` color.

```css
:root {
  --your-primary-background-color-token: var(--mds_brand_appearance_primary_default_background-color);
}
.your-class {
  background-color: var(--your-primary-background-color-token);
}
```

### Creating a mapping file for MDS design tokens

MDS design tokens names may change in the future major version releases of MDS. To make it easier to keep your code up to date, we recommend creating a wrapper around the MDS design tokens you are using directly in your application.

A wrapper can be as simple as creating another CSS variable in your code over the token you want to consume.

```css
:root {
  --your-primary-background-color-token: var(--mds_brand_appearance_primary_default_background-color);
}
```

And instead of using our design tokens directly in your application, you can use the wrapper tokens.

```css
.your-class {
  background-color: var(--your-primary-background-color-token);
}
```

If the MDS design token name changes, you need to adjust it only in one place in your application.

### Switching themes

You can leverage the fact, that design tokens are distributed as CSS variables in your application and switch between `themes` or `brands` by simply importing a different set of design tokens, even at the run time.

## How to style MDS components

All MDS components are built with [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), meaning their functionality and styles are encapsulated and isolated from the rest of your code. This offers several benefits, making MDS components consistent, reliable, and safe to integrate into your application without concerns about style conflicts. However, this also means you cannot directly modify or override their styles as you would with components from JavaScript frameworks.

In certain situations, you can use [css parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) to customize styles. But be cautious—excessive custom styling may cause components to diverge from the MAERSK brand. Use CSS parts and overrides sparingly to maintain alignment with the brand guidelines.

For some DOM elements, within MDS components, we expose css parts, which you can target in your code, i.e. like this:

```css
mc-button::part(button) {
  background-color: #00897a;
  color: #aaeae0;
}
```

The code above will change the background colour of the button to green, and text colour to white. You can also access pseudo-classes (such as `mc-button::part(button):hover`), but structural pseudo-classes that match based on tree information, such as `:empty`, `:last-child`, cannot be accessed.

In our [Storybook](https://mds.maersk.com/), under each component documentation, you will find a tab in the Addons panel called: `CSS parts`. There you can check what parts are exposed for each component and how you can use them. In addition, under `Examples` folder, for most of our components, we have a story called `Customised Appearance` - here you can see how custom styles can be applied for some parts of the component.

# Using packages within frameworks

There are few extra steps you need to follow to start using components in the framework of your choice:

- [Vue 3](#vue-3)
- [React](#react)
- [Angular](#angular)
- [Vanilla JS](#vanilla-js)
- [Nuxt](#nuxt)
- [Next.js](#nextjs)

## Vue 3

Before start using MDS components, there are some Vite/Webpack configurations you need to do. Please have look at [Vite](#vite-configuration-for-vue) or [Webpack](#webpack-configuration-for-vue) integration guide for VUE.

Add [font, design-tokens and foundation.css](#general-guide-on-using-mds-in-your-application) files imports to your application (if you don't already imported those).

You can now start using MDS components in VUE like:

```html
<template>
  <mc-button icon="star" @click="clickButton()" type="button">Hello!!</mc-button>
</template>

<script lang="ts">
  import '@maersk-global/mds-components-core/mc-button';

  export default {
    name: 'HelloWorld',
    methods: {
      clickButton: () => {
        console.log('Button got clicked!!');
      },
    },
  };
</script>
```

Just remember, if you are importing the foundations package to a scss file, you need to drop the .css extension in the import statement like below, otherwise you cannot use SASS operators e.g. `@extend`:

```css
@import '~@maersk-global/mds-foundations/css/foundations';
```

### More advanced examples

For more advanced examples, see our [kitchen sink application](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/spa-vue).

### Vite configuration for VUE

In your `vite.config.js` file, add following:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^mc-/.test(tag),
        },
      },
    }),
  ],
});
```

### Webpack configuration for VUE

If you are using on-the-fly template compilation just add the following, in your `main.js` file:

```javascript
app.config.isCustomElement = (tag) => tag.startsWith('mc-');
```

If you are using a build step, pass the isCustomElement option to the Vue template compiler in your `vue.config.js`:

```javascript
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => /^mc-/.test(tag),
        };
        return options;
      });
  },
};
```

## React

Install [MDS react wrapper package](#installing-packages-in-react). That acts as a bridge to our web components for React applications.

**React v17, 18, or higher is required by our React wrapper packages, so upgrade to one of those versions for the best experience.**

Add [font, design-tokens and foundation.css](#general-guide-on-using-mds-in-your-application) files imports to your application (if you haven't already imported these).

Now you can start using MDS components in React like:

```javascript
import React from 'react';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

const App = () => {
  return (
    <div>
      <McButton
        click={(): void => {
          console.log('Button got clicked!!');
        }}
        variant="primary"
        icon="star"
      >
        Hello!!
      </McButton>
    </div>
  );
};

export default App;
```

### More advanced examples

For more advanced examples, see our [kitchen sink application](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/spa-react).

## Angular

Before you can start using MDS components, make sure `CUSTOM_ELEMENTS_SCHEMA` is added to your `app.module.ts` file:

```javascript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

Add [font, design-tokens and foundation.css](#general-guide-on-using-mds-in-your-application) files imports to your application (if you don't already imported those). You can also enable those styles by adding them to `angular.json` file, like:

```json
"styles": [
  "node_modules/@maersk-global/fonts/<BRAND_NAME>/fonts.css",
  "node_modules/@maersk-global/mds-design-tokens/<BRAND_NAME>/<THEME_NAME>/css/design-tokens-px.css",
  "node_modules/@maersk-global/mds-foundations/css/foundations.css"
]
```

Now you can start using MDS components in Angular like:

```html
<mc-button icon="magnifying-glass" (click)="clickButton()" type="button">Hello!!</mc-button>
```

```javascript
import { Component, OnInit } from "@angular/core";
import "@maersk-global/mds-components-core/mc-button";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public clickButton(): void {
    console.log('Button got clicked!!');
  }
}
```

**If you are importing the foundations package to a SCSS file, you need to drop the .css extension in the import statement like below, otherwise you cannot use sass operators e.g. `@extend`:**

```css
@import '~@maersk-global/mds-foundations/css/foundations';
```

If you are using form element components in the reactive form, remember to add ngDefaultControl to the component, e.g.:

```html
<mc-input name="fullname" ngDefaultControl formControlName="fullname" label="Full Name"></mc-input>
```

### More advanced examples

For more advanced examples, see our [kitchen sink application](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/spa-angular).

## Vanilla JS

You can use MDS components in plain JS applications that don't use any frameworks.

Add [font, design-tokens and foundation.css](#general-guide-on-using-mds-in-your-application) files imports to your application (if you didn't already import those).

Now you can start using MDS components like:

```html
<mc-button icon="magnifying-glass" onclick="clickButton()" type="button">Hello!!</mc-button>
```

### More advanced examples

For more advanced examples, see our [kitchen sink application](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/vanillajs).

## Nuxt 3

In order to utilise our components, it is necessary to import the global design tokens and fonts. Additionally, if you choose to use the Foundations CSS, you must import it globally.

To import either the global design tokens, fonts or Foundations CSS, please add the following configuration snippets to your `nuxt.config.js` file.

```javascript
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: [
    '@maersk-global/fonts/maeu/fonts.css',
    '@maersk-global/mds-foundations/css/foundations.css',
    '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css',
  ],
});
```

### Setting up icons

The icons must be copied from the `node_modules` into the Nuxt `public` folder. Nuxt will handle the inclusion of these assets during development and production.

To copy the icons, install the `copyfiles` package as a dev dependency by running the following command:

```bash
npm i copyfiles -D
```

And then make an NPM script called `copy:icons` like below in your `package.json` file and use it before the `dev` and `build` scripts:

```json
"scripts": {
  "dev": "npm run copy:icons && nuxi dev",
  "build": "npm run copy:icons && nuxi build",
  "copy:icons": "copyfiles --up 1 node_modules/@maersk-global/icons/js/**/* public"
}
```

As a final step, the base path for icons in Nuxt must be provided globally before the application initializes.

This can be done by creating an empty plugin, such as mds-config (or any other preferred name), in the plugins folder, where the base icons path is set:

```javascript
// mds-config plugin
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = '/';

export default () => {};
```

Finally, import the plugin into `nuxt.config.js`:

```javascript
// nuxt.config.js
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: [
    '@maersk-global/fonts/<YOUR_BRAND>/fonts.css',
    '@maersk-global/mds-foundations/css/foundations.css',
    '@maersk-global/mds-design-tokens/<YOUR_BRAND>/light/css/design-tokens-px.css',
  ],
  plugins: [{ src: '~/plugins/mds-config.ts' }], // => the plugin must be imported here
});
```

### Using components

Now you can start using MDS components in NUXT 3 like:

```html
<template>
  <mc-button icon="star" @click="goToStep(1)" type="button">Hello!!</mc-button>
</template>

<script lang="ts" setup>
  import '@maersk-global/mds-components-core/mc-button';

  const goToStep = (currentindex: number) => {
    stepIndicatorCurrentIndex.value = currentindex;
  };
</script>
```

## Next.js

### Rendering MDS components on the client side

Install [MDS react wrapper package](#installing-packages-in-react). That acts as a bridge to our web components for React applications.

Add [font, design-tokens and foundation.css](#general-guide-on-using-mds-in-your-application) files imports to your application (if you don't already imported those).

Now you can start using MDS components in React like:

```javascript
'use client';
import { useState, useEffect } from 'react';
import { McButton } from '@maersk-global/mds-react-wrapper';

export const Button = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McButton
      icon="star"
      label="Hello!!"
      click={(): void => {
        console.log('Button got clicked!!');
      }}
    ></McButton>
  ) : null;
};
```

**If you’re importing the foundations package to a scss file, you would need to drop the .css extension in the import statement like below, otherwise you cannot use sass operators e.g. `@extend`:**

```css
@import '~@maersk-global/mds-foundations/css/foundations';
```

### Rendering MDS components on the server side

If your use case requires server-side rendering (SSR), follow the additional steps below to achieve it:

- Install the latest of @lit-labs/nextjs.
- Configure Next.js to leverage the plugin which you just installed:

#### Next.js 12 and below:

```javascript
const withTM = require('next-transpile-modules')(['@maersk-global/mds-react-wrapper']);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
```

#### Next.js 13 and above:

```javascript
const withLitSSR = require('@lit-labs/nextjs')();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@maersk-global/mds-react-wrapper'],
};

module.exports = withLitSSR(nextConfig);
```

SSR rendering will work in this version of Next only when used within `Page Router`. If you use `App Router`, you can render MDS components in client only mode.

Please ensure you set up the transpilePackages configuration in Next.js to get it to include components from our React wrapper during SSR compilation.

### Caveat for Windows users

You will need to set up WSL 2.0 and move your solution folder there in order to be able to run your apps in Windows; otherwise, you will encounter problems @lit-labs/nextjs issue with Windows.

### Known issues

As part of our ongoing work to improve the developer experience for Next.js and server rendering of MDS components, there are some issues that are listed [here](https://github.com/Maersk-Global/mds/issues/2235) about which we are already aware. If you encounter any other problems, kindly add a comment to the ticket.

### More advanced examples

For more advanced examples, see our [kitchen sink application](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/nextjs).

# Other integrations

## Typescript and VSCode IntelliSense support

### General TypeScript Notes

When working with MDS components and TypeScript, keep these important points in mind:

#### Importing types

When importing types from MDS components, we recommend using the `type` keyword to ensure the imports are only used for type checking and are removed during compilation:

```typescript
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
```

#### TypeScript configuration

If you experience TypeScript errors when using MDS components, you may need to enable `skipLibCheck: true` in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
    // ... other options
  }
}
```

This can help prevent TypeScript errors from dependencies, including potential conflicts in type definitions.

### React

Our React components props are typed using TypeScript, so VSCode IntelliSense should work out of the box when using the `mds-react-wrapper` package.

**Props are strictly typed and may require special typings in your state hook e.g.:**

```javascript
import { IconPosition } from '@maersk-global/mds-components-core/mc-button/types';
const [buttonIconPosition, setButtonIconPosition] = React.useState < IconPosition > 'left';
<McButton iconposition={buttonIconPosition}></McButton>;
```

### Angular & plain HTML

To enable IntelliSense in Angular and plain HTML, we ship a web components definition file so VSCode understands `web-components.html-data.json`. The path to this file must be added in the root of your project directory under the `.vscode/settings.json` file:

```json
{
  "html.customData": ["node_modules/@maersk-global/mds-components-core/web-components.html-data.json"]
}
```

After adding the file, please restart VSCode.

### Vue

For improved typing support, you can declare each component type globally in Vue, enabling attribute/property-level intellisense within your editor. This works for both Vue's Option API and Composition API, enabling intellisense for all components used in SFCs (single-file-components, the `.vue` extension).

```typescript
/* src/declarations.d.ts */

import type { McButton, McInput } from '@maersk-global/mds-components-core';
import type { LitElement } from 'lit';
import type { DefineComponent } from 'vue';
// and so on...

// Denotes a class type.
type Constructable = abstract new (...args: unknown[]) => unknown;

// A string union of all static and instance/prototype properties keys.
type LitElementKey = keyof typeof LitElement | keyof InstanceType<typeof LitElement>;

// Generic type for defining a Vue component.
type DefineMaerskComponent<T extends Constructable> = DefineComponent<Partial<Omit<InstanceType<T>, LitElementKey>>>;

declare module 'vue' {
  export interface GlobalComponents {
    McInput: DefineMaerskComponent<typeof McInput>;
    McButton: DefineMaerskComponent<typeof McButton>;
    // and so on...
  }
}
```

It is possible to define all the components globally in Vue using a mapped type, selecting only exports starting with `Mc`.

```typescript
/* src/declarations.d.ts */

import type { LitElement } from 'lit';
import type { DefineComponent } from 'vue';

// Denotes a class type.
type Constructable = abstract new (...args: unknown[]) => unknown;

// A string union of all static and instance/prototype properties keys.
type LitElementKey = keyof typeof LitElement | keyof InstanceType<typeof LitElement>;

// Generic type for defining a Vue component.
type DefineMaerskComponent<T extends Constructable> = DefineComponent<Partial<Omit<InstanceType<T>, LitElementKey>>>;

// Import of the "@maersk-global/mds-components-core" module as an object type.
type MaerskComponentsModule = typeof import('@maersk-global/mds-components-core');

// Mapped type over "@maersk-global/mds-components-core", selecting any keys staring with `Mc`.
type MaerskComponents = {
  [K in keyof MaerskComponentsModule]: K extends `Mc${infer _Rest}`
    ? DefineMaerskComponent<MaerskComponentsModule[K]>
    : never;
};

declare module 'vue' {
  // Extend the `MaerskComponents` type to include all component definitions globally in Vue.
  export interface GlobalComponents extends MaerskComponents {
    // More custom global components can be added here...
  }
}
```

**In order for this to be detected by TypeScript in your editor, you must ensure that the file wherein the component declarations are placed is included in the `tsconfig.json`.**

You can find a pre-made declaration file for the MDS Core components in the vite-maersk-template.

## JEST and Testing Library

### Setting up JEST

Install JEST & Testing Library:

```bash
npm i -D @testing-library/react @testing-library/jest-dom @babel/preset-env babel-jest ts-jest jest-environment-jsdom
```

Create `babel.config.js` file in your project, and add following:

```javascript
module.exports = {
  presets: ['@babel/preset-env'],
};
```

Create `jest.config.js` file and add following lines into your:

```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@maersk-global)|(@material)|(lit)|(@lit)|(@lit-labs)|(lit-element)|(lit-html)|(.*\\.mjs$))',
  ],
};
```

Create `jest.setup.js` file and add following lines into your:

```javascript
import '@testing-library/jest-dom';

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

HTMLDialogElement.prototype.show = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function () {
  this.open = false;
});
// See https://github.com/jsdom/jsdom/issues/3236 - JSDOM doesn't support container queries or the
// most modern CSS. This suppresses that error
const originalConsoleError = console.error;
console.error = (message, ...optionalParams) => {
  if (message.toString().includes('Could not parse CSS stylesheet')) {
    return;
  }
  originalConsoleError(message, ...optionalParams);
};
```

Create mocks for css imports and font imports in the root of your project in folder `__mocks__`:

```javascript
// fileMock.js
module.exports = 'test-file-stub';

// styleMock.js
module.exports = {};
```

If you are using Typescript, add following in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "__tests__/**/*.tsx"]
}
```

### Testing your app that uses mc-\* components

Add file under `__tests__/app.spec.tsx`, you can start writing your unit tests like this:

```javascript
import { render } from '@testing-library/react';
import App from '../src/app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
```

Testing mc-button click:

```javascript
// src/App.tsx
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { useState } from 'react';

export const App = () => {
  const [label, setLabel] = useState('Test');
  return <McButton data-testid="mcButton" click={() => setLabel('Another Test')} label={label}></McButton>;
};

// __tests__/app.spec.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { IMcButton } from '@maersk-global/mds-components-core-button/types';
import { App } from '../src/app';

describe('App', () => {
  it('should be able to click on mc-button', () => {
    render(<App />);
    const button = screen.getByTestId('mcButton') as IMcButton & HTMLElement;
    // OR:
    // const button = container.querySelector('mc-button') as IMcButton & HTMLElement;
    fireEvent.click(button);
    expect(button.label).toBe('Another Test');
  });
});
```

### Shadow DOM and unit testing

The MDS components are web components. This means that the inner markup (except what you put in the slots) are wrapped by the `shadowDOM` and you cannot step into that nor can you find or select any nested HTML elements in there with Jest.
However, there is a NPM package that makes it really easy to interact with the shadow Dom using Testing Library methods:
[shadow-dom-testing-library](https://www.npmjs.com/package/shadow-dom-testing-library).

```javascript
// src/App.tsx
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { useState } from 'react';

export const App = () => {
  const [label, setLabel] = useState('Test');
  return <McButton data-testid="mcButton" click={() => setLabel('Another Test')} label={label}></McButton>;
};

// __tests__/app.spec.tsx
import { render } from '@testing-library/react';
import { screen, findByShadowLabelText } from 'shadow-dom-testing-library';
import { IMcButton } from '@maersk-global/mds-components-core-button/types';
import { App } from '../src/app';

describe('App', () => {
  it('can test elements in shadowDOM in mc-button using findByShadowText', async () => {
    render(<Button />);
    const button = screen.findByShadowText('Test') as unknown as IMcButton & HTMLElement;
    expect(await button).toBeInTheDocument();
  });

  it('can test elements in shadowDOM in mc-button using findByShadowLabelText', async () => {
    const { container } = render(<Button />);
    const mcButton = container.querySelector('mc-button') as unknown as IMcButton & HTMLElement;
    const button = await findByShadowLabelText(mcButton, 'Test');
    expect(await button).toBeInTheDocument();
  });
});
```

## Cypress

You can test integration with MDS components using Cypress.

### Setting up Cypress

To make it more convenient to query the shadow DOM, enable `includeShadowDom` option in your Cypress config file.

```javascript
includeShadowDom: true,
```

It is not not unnecessary to use a shadow() function to query through the MDS components shadow DOM.

### Testing a component

Now that you no longer need to use the `shadow()` function to query the shadow dom, you can query for the `mc-button` label as if it was a standard HTML structure.

Below you can see an example of such a query.

```javascript
const testLabel = 'Hello World';

//set the label in Cypress if needed
cy.get('mc-button').invoke('attr', 'label', testLabel);

//query for the label element's text, trim it and compare to the arraged one
cy.get('mc-button').find('[data-cy="label"]')(($label) => {
  expect($label.text().trim()).equal(testLabel);
});
```

### Simulating clicks and typing into the component

To simulate interactions like clicking and typing we recommend you use the `cypress-real-events` plugin.

Below you can find an example of clicking and typing on the mc-input component.

```javascript
const testText = 'Hello World';

// perform a native real click on the component
cy.get('mc-input').realClick();

// fires native system keydown events and fills the input
cy.realType(testText);

// check that the input's value is the arranged text
cy.get('mc-input').should('have.attr', 'value', testText);
```

## Webpack 4

There are known, possible issues you may encounter during installation and how to solve them:

**"Module parse failed: Unexpected token" Error in imask library**

To solve this issue, please try to add `imask` to your transpiled dependencies (i.e. vue.config.js, webpack.config.js etc.).

```javascript
module.exports = {
  transpileDependencies: ['imask'],
};
```

## General SSR

Our components now support SSR and implementation for various frameworks can be found below:

- Implementation example of SSR using [Next.js](https://github.com/Maersk-Global/mds/tree/main/kitchen-sinks/nextjs):
  - CSR components function properly
  - SSR for raw components from @maersk-global/mds-components-core work well (there are only few components that don't render in ssr: `McCalendar, McInputTime, McTimePicker, McTable`)
- Implementation example of SSR using [Nuxt3](#nuxt-3)

# Migration guide from mds-components-core package

At the moment we provide a mds-components-core wrapper package, that should make the migration process seamless.

Install the latest version of that package in your repo: [@maersk-global/mds-components-core](https://github.com/Maersk-Global/mds/pkgs/npm/mds-components-core).

We recommend however to start using the new single package components.

To start using components in your app, install the component and change import path to the component like this (i.e. for the mc-button component):

```javascript
import '@maersk-global/mds-components-core-button';
```

Instead of this:

```javascript
import '@maersk-global/mds-components-core/mc-button';
```

The tag names and API of components are still the same, so you don't have to change anything in your code.
