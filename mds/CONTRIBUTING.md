## Table of contents

- [Need help or support](#need-help-or-support)
- [What can be contributed?](#what-can-be-contributed)
- [Before you start contributing](#before-you-start-contributing)
  - [Get access](#get-access)
  - [Configure workspace](#configure-workspace)
- [Run locally](#run-locally)
  - [Clone and branch](#clone-and-branch)
  - [Run the project](#run-the-project)
  - [Kitchen sink apps](#kitchen-sink-apps)
- [Implement](#implement)
  - [Create components using CLI](#create-components-using-cli)
  - [Coding best practices](#coding-best-practices)
  - [Styling of components and css class names](#styling-of-components-and-css-class-names)
- [Test](#test)
  - [Cypress components tests](#cypress-components-tests)
  - [VR tests](#vr-tests)
  - [Accessibility tests](#accessibility-tests)
  - [SSR tests](#ssr-tests)
  - [Vitest](#vitest)
  - [Lighthouse](#lighthouse)
  - [Integration tests](#integration-tests)
- [Review](#review)
  - [Pull request](#pull-request)
- [Release](#release)
  - [Publish and deploy your component](#publish-and-deploy-your-component)
- [Your contribution is live 🎉](#your-contribution-is-live-)

# Need help or support?

We’re here to help! If you need assistance or have any questions, please visit our [help and support](https://designsystem.maersk.com/about/help-and-support/) page for detailed information on how to reach us.

# What can be contributed?

We welcome contributions of all shapes and sizes, whether it’s bug fixes, proposing a new component, enhancing an existing component, or sharing documentation best practices.

Examples of contributions:

- Bug fixes
- New components
- Enhancements to existing components

# Before you start contributing

Alongside the standard developer tools, like: [Node.js v20](https://nodejs.org/en/blog/release/v20.15.1) & [GitHub](https://github.com/Maersk-Global), we also use private NPM repositories for hosting our packages and [Chromatic](https://www.chromatic.com/) & [Cypress](https://www.cypress.io/) for testing.

We also recommend installing following VS Code plugins:

- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) & [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) - you need a license to use those extension, [request it using the CoPilot Onboarding Repo](https://github.com/Maersk-Global/copilot-user-onboarding).
- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Lit Plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)
- [Nx Console extensions](https://nx.dev/nx-console), it provides autocomplete support, a UI for exploring and running tasks & generators, and more.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype) helps with creating types based on the JSON response from your API endpoint

## Get access

### Maersk-Global GitHub Organisation

Make sure you have a GitHub account that has an access to Maersk-Global organisation, otherwise engage with the [DevOps and Tooling - User Support bot](https://teams.microsoft.com/l/channel/19%3a65e2929b7d99447793cb5bdf79b001e2%40thread.skype/Engage%2520with%2520the%2520bot?groupId=45232fe3-ee6a-4878-9671-a88c4068332e&tenantId=05d75c05-fa1a-42e7-9cf1-eb416c396f2d).

### MDS repository

Maersk Design System repository is open for contribution to all with access to Maersk-global organization in GitHub.

### MDS packages

Before you start contributing to the Maersk Design System you need to [get access to our packages](https://github.com/Maersk-Global/mds/blob/main/README.md#private-artifact-repositories-access) and set up your local environment.

## Configure workspace

### Install Node.js

Our repository runs on Node v20, so please follow [Node.js installation guide](https://nodejs.org/en/download/).

If you use different version of Node than v20, we recommend installing [NVM](https://github.com/nvm-sh/nvm). It is a version management tool for Node.js and allows you to have installed multiple versions on Node on your local machine.

To install nvm run the following curl command in the terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

#### On a Mac machine:

- Go to user folder by opening the `File explorer->Go->Home`
- Press `Command+Shift+.` in order to see the hidden files
- Create a profile file `.zshrc`
- Copy the following content to it, just remember to replace the Username with the local username:

```bash
export NVM_DIR='/Users/Username/.nvm' [ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'
```

### Install version control

We use Git as our version control system, make sure that you have it installed on your machine.

### Install git bash (Windows OS only)

Since bash files are used widely in our npm scripts, you would have to install git bash and use that as your terminal when running the scripts. In order to do that please follow the following steps:

#### Download and install git bash

Run the below command in your terminal, which would tell npm to use git bash, remember to replace the `GIT_BASH_PATH` with the one that it’s installed on which normally is `C:\Program Files\git\bin\bash.exe`

```bash
npm config set script-shell GIT_BASH_PATH
```

If you use VSCode, config your terminal to use git bash as well, so that you can run the npm scripts directly in your terminal, by for instance following this guideline

# Run locally

Now that you have your local environment set up you can clone our GitHub repository, create a new branch, install all dependencies locally and run Storybook.

## Clone and branch

### Clone the Maersk Design System GitHub repository

To clone the repository run the following command in the desired path:

```bash
git clone git@github.com:Maersk-Global/mds.git
```

### Create a branch

We use Husky to validate the branch names & commit messages. The branch name should be all lower-case and prefixed with one of the following:

- `feat/` - new feature
- `fix/` - bug fix or hotfix
- `refactor/` - refactoring code
- `chore/` - changes that don’t modify src or test files (workflow/build config, new dependencies, etc.)
- `docs/` - changes to the documentation (storybook, README or JsDoc)

In addition, the `feat` branches will get automatically deployed to Azure CDN, which means that the branch name after prefix must be a valid DNS name, conforming to the following naming rules:

- branch name after prefix must start or end with a letter or number, and can contain only letters, numbers, and the hyphen/minus (-) character
- every hyphen/minus (-) character must be immediately preceded and followed by a letter or number; consecutive hyphens aren't permitted
- all letters in a branch name must be lowercase
- branch name must be from 3 through 63 characters long

## Run the project

### Install dependencies

Navigate into the project root folder and run:

```bash
npm i
```

### Run Storybook

To make sure that the environment has been set-up correctly, we recommend running storybook, where our components are showcased:

```bash
npm run serve
```

This will run Storybook on your localhost. You can also use Nx Console to run this task `Projects->storybook`.

### Build packages

```bash
npm run build
```

This command will build all packages. You can also use Nx Console to build all packages `Common Nx Commands->run-many->build` or only the package you are working on `Projects->Packages->the package you want to build->build`.

### Adding new dependencies to packages

We use NX monorepo to manage all dependencies in the project, and for that we chose to use [Single version policy](https://nx.dev/concepts/decisions/dependency-management#single-version-policy).

This requires that you install all dependencies that your package depends on in the project root. You can just do it by running in the root:

```bash
npm i -D %PACKAGE-TO-BE-INSTALLED%
```

After installing your dependency, go to you components `package.json` file and copy over the dependency from the root `package.json` file.

## Kitchen sink apps

The kitchen sink apps are an advanced examples showing how MDS components are used in most popular JS frameworks like: VUE, React Angular, etc.

### Running kitchen sink apps

Go to Nx Console ans run i.e.: `Projects->kitchen-sinks->spa-vue->dev`.

### Creating new kitchen sink app

Are we missing any framework that you work with in our kitchen sink? Feel free to create a new kitchen sink example app.

Use Nx console to generate sample app under `kitchen-sinks` folder.

# Implement

You are now all set up and ready to start coding. There are many ways you can contribute to the Maersk Design System:

- small contributions, like bug fixes and minor updates
- medium enhancement to existing components
- large additions like creating new components

It’s never been easier to add new components - we have developed a CLI tool that will quickly get you started by scaffolding a simple component (please see details [below](#create-components-using-cli)).

We use Typescript, and all our components are [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) (based on [Lit](https://lit.dev/)), so before you start coding, please get familiar with our standards and best practices. Once you are ready to commit your code we expect that you follow the conventional commit messages format.

## Create components using CLI

In order to scaffold a new component, run the following script in the root of the project:

```bash
npm run add-new-component
```

You can also use Nx Console `Generate & Run Target->add-new-component`.

You will be asked to write a component name, i.e.:

`Component name:`->`dropdown`

Running the script will scaffold a very simple `Hello world` component with all required component files and folders. It will also create a very simple style file for your component.

### Best practices around naming a component:

- use simple and short name
- all letters should be lowercase
- separate words by `-`

### A new component file structure:

#### Implementation files:

- `src/lib/index.ts` - this is the file where you be adding all your component's code and logic.
- `src/lib/types.ts` - we use TypeScript, so here you will be defining types for props and public methods.
- `src/lib/styles/index.styles.ts` - this file imports all needed styles, like i.e. host reset styles for your component. You don't need to change this file, it has been set up for you.
- `src/lib/styles/mc-\*.scss` - here you will be adding all styling for your components. Here you can also import any mixin from MDS foundation package if needed.
- `src/lib/styles/mc-\*.mixins.scss` - if you want to create a mixin local to your component, here is the place where you do that.
- `packages/design-tokens/tokens/implementation/core/*.json` - this is a design tokens file, where you will be adding any implementation token that is required in your component.

#### Component preview files:

- `stories/index.stories.mdx` - this is a main documentation file for your component that will be rendered in the Storybook. The story includes also a code preview feature that will auto-generate code previews for your component based on the controls added in `argTypes.ts` file
- `stories/examples/\*\*` - this is a folder where you can write extra stories with different use case scenarios. In MDS SB examples are used to show i.e. how to add custom styles to your component or how to use named slots.
- `stories/argTypes` - here you will document all props and public methods available for your component. The documentation can be view in the Storybook, in the Controls tab.

#### Component test files:

- `tests/index.component-spec.ts` - here you will be adding interaction and unit tests (called component tests in Cypress) for your component.
- `tests/accessibility.cy.ts` - here where we test if your component is accessible
- `tests/index.ssr.js` - here you will be testing if your component can be rendered server-side
- `tests/index.test.ts` - here you can add vitest unit testing if you want to tests specific function, controllers, etc.
- `tests/stories/*` - here are auto-generated stories for VR and accessibility tests. All you need to do is to update `_states.ts` file with the props you want to test
- `lighthouse/*` - for performance testing

Read more about [running tests locally](#test).

### Create sub-components

If the logic is too complex or if it needs to have its own reactive state, props, or events, a sub-component should be created instead of using the sub-template approach. Sub-templating is helpful in situations where the template is very basic and simple, so it should be determined case by case. Depending on the requirement, it may even be necessary to create a mixin or controller.

Sub-components must be created in the `lib/src/components` folder within the specified component.

### Linting

We use husky per-commit and pre-push hooks, so before you push, you need to check that linting is passing all checks.
Simply run in the root:

```bash
npm run lint
```

This command will run lint on all packages. You can also use Nx Console to lint all packages `Common Nx Commands->run-many->lint` or only the package you are working on `Projects->Packages->the package you want to lint->lint`.

## Coding best practices

### Coding conventions

We adhere to [W3C JavaScript Coding Conventions](https://www.w3schools.com/js/js_conventions.asp).

### Developer checklist

Below guidelines should be taken into account:

#### Component class and types:

Should be camel cased, with capital first letter and start with the common prefix Mc, i.e. `McButton`. Each component has a types file, where you can define all types and interfaces for the component. For interfaces names we recommend prefixing it with IMc, i.e. `IMcButton`, for types names, prefix them with your component name, i.e.: `McButtonAppearance`

#### Lower-case prop names:

Due to compatibility issues across front-end frameworks, all the public api of a component including props and event names must be kept lower-case and camel-casing has to be avoided i.e. given the trailingicon prop on the mc-button, the naming must be `trailingicon` and not `trailingIcon`.

You can use camel-case on all private or protected variables inside of you component, like private state.

#### Boolean attributes:

Boolean attributes don’t exist on custom elements as such, and there’s a simple convention when referring to them: a boolean attribute is true, if it exists on an element (even if it’s set to false). When the boolean attribute is not present att all, it’s then considered as absent and it's value is false.

As an example, the disabled attribute in the mc-button component, puts the component in the disabled state if it exists, even though it might be set to false, so all the followings is translated to disabled by the browser:

```html
<!-- This will evaluate in the code to disabled = true -->
<mc-button disabled></mc-button>
```

```html
<!-- This will also evaluate in the code to disabled = true -->
<mc-button disabled="false"></mc-button>
```

```html
<!-- However, this will also evaluate in the code to disabled = false -->
<mc-button></mc-button>
```

#### JS Docs:

We utilize JS Docs to produce i.e. event types for React wrapper, so it's important that you add this into the component `index.ts` file. Below, you can find an example of the JS Docs in the component file:

```javascript
/**
 * @element `mc-button`
 *
 * @event {MouseEvent} `click` - Emitted when the button is clicked.
 * @event {FocusEvent} `focus` - Emitted when the button is focused.
 * @event {FocusEvent} `blur` - Emitted when the button is blurred.
 *
 * @slot The default slot for the `button`. Used to display custom text/icon in the middle of the button.
 * @slot `icon` - The icon HTML to use for the `button`.
 * @slot `trailingicon` - The trailing icon HTML to use for the `button`.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `icon` - for changing visuals of icon
 * @csspart `text-and-icon` - for changing visuals of text and icons container
 * @csspart `text-and-icon-labels` - for changing visuals of text
 * @csspart `text-and-icon-label` - for changing visuals of label text
 * @csspart `text-and-icon-sublabel` - for changing visuals of sublabel text
 */
```

#### Secrets:

Don’t commit any API secrets / keys / access tokens!!!!

#### REST API:

If you need to call a REST API in your component, make sure that you don't hard-code secrets or push them to the GIT.

#### Component preview:

All components must have at least one story that demonstrates all the abilities of a component and documents all public properties and methods that are available in the component.

#### Stories args:

Stories should declare controls and actions (log all raised events as actions in the story).

#### Example stories:

Create example stories for situations where a state in a component cannot be represented by switching storybook args (controls), such as showing how to use a slot or style using CSS parts.

#### Testing:

Add interaction & accessibility tests, the basic visual regression test will be created when using scaffolding CLI script.

#### Commit messages

We use Husky to check commit messages and they should be aligned with standard [conventional commit messages format](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional). Please also read our guide about how [commit messages affect version bump in the ci](#publish-and-deploy-your-component).

#### Stories

When you use the cli tool for scaffolding your component, it will create a simple `Hello world` component with some example properties and methods. Remember to always update relevant stories and tests when contributing, so they reflect your component.

## Styling of components and css class names

Rely on core [MDS SASS mixins](https://mds.maersk.com/?path=/story/css-sass-foundations-documentation--sass-mixinsd) and [design tokens](https://designsystem.maersk.com/design-language/themes/maersk/light/), don’t import external libraries.

Below is a simple example, how you can use MDS mixins in your component code:

```css
@import '@maersk-global/mds-foundations/scss/mixins/_typography.scss';

.mc-component {
  @include mds-apply-font('text', 'x-small', 'normal');
}
```

MDS components are created using web components, which means that all styles are encapsulated in the component and will not leak out to the application that uses components.
Because of that, we recommend using simple class names, separated by `-`, i.e.:

```html
<div class="mc-component medium primary-filled">My component</div>
```

# Test

We aspire to provide high-quality components. It is crucial therefore that all contributions are well tested and ready for production.

We use [Cypress](https://www.cypress.io/) & [Chromatic](https://www.chromatic.com/) and require that all components have few different types of tests:

- interaction tests for testing user interactions like a mouse click or keyboard navigation, etc.
- accessibility tests to check if components meet WCAG 2.2 - Level AA accessibility standard
- visual regression tests to make sure that our components look as intended and there are no bugs in visual appearance
- performance testing using Lighthouse CLI

We have set-up those types of testing:

- **Cypress component testing:** for testing component itself (testing rendering, passing props to component, clicking, all interactions, etc.)
- **VR testing:** for testing visuals of component itself
- **Accessibility testing:** for testing if component's passes accessibility WCAG 2.2 - Level AA accessibility standards
- **SSR testing:** for testing if component's code is compilable with ssr
- **Vitest unit-tests:** to test JS functions that you use in your component i.e. some helpers functions, api functions, services, utils, etc.
- **Cypres integration testing:** set up with VUE & React to check if published packages are working fine within kitchen-sink apps

It's not required to add all types of tests to your component, but it's recommended that you add at least Cypress component testing, VR and accessibility tests (those 2 are auto-generated/scaffolded for you when you create a new component using our CLI).

## Cypress components tests

### Cypress components tests - headless mode

You can execute Cypress component test only for the component you are currently working with, by using NX Console `Projects->packages->mc-component->test:headless`

You can also execute all tests in a headless mode by running:

```bash
npm run component-test:headless
```

This command will run Cypress components tests on all packages. You can also use Nx Console to run tests on all packages `Projects->component-test:headless`.

### Cypress components tests - interactive mode

You can run Cypress in an interactive mode by running:

```bash
npm run component-test:interactive
```

This command will open Cypress GUI where you can select component tests for specific package. You can also use Nx Console to run Cypress in an interactive mode `Projects->component-test:interactive`.

## VR tests

We use Chromatic and Storybook for comparing component's visual changes to the baseline image. If you want to preview Storybook with auto-generated VR stories, run:

```bash
npm run serve:vr
```

This command will open Storybook with VR stories only. You can also use Nx Console to run Storybook `Projects->serve:vr`.

## Accessibility tests

We use Cypress accessibility plugin and Storybook for checking if components are accessible. If you want to preview Storybook with auto-generated accessibility stories, run:

```bash
npm run serve:accessibility
```

This command will open Storybook with accessibility stories only. You can also use Nx Console to run Storybook `Projects->serve:accessibility`.

To test components, run:

```bash
npm run accessibility:interactive
#or
npm run accessibility:headless
```

This command will run/open Cypress and tests if components pass accessibility tests. You can also use Nx Console to run Cypress `Projects->accessibility:interactive` or `Projects->accessibility:headless`.

## SSR tests

You can execute SSR test only for the component you are currently working with, by using NX Console `Projects->packages->i.e. mc-button->test:ssr`

You can also execute all tests by running:

```bash
npm run test:ssr
```

This command will run SSR tests on all packages. You can also use Nx Console to run tests on all packages `Projects->test:ssr`.

## Vitest

You can run Vitest for unit-testing of different JS functions (if you have any controllers or extra JS logic outside of the component), using Nx Console `Projects->packages->mc-component->vitest`.

## Lighthouse

We have set-up lighthouse auto-generated tests for each component. You can execute tests for all components by running:

```bash
npm run lighthouse:run
```

## Integration tests

There are number of demo apps available under `kitchen-sinks` folder. In those apps, we can tests if the bundled version of packages is working. You can run some simple tests in that app by using Nx Console:

- `Projects->kitchen-sinks->spa-vue->build-app`
- `Projects->kitchen-sinks->spa-vue->preview`
- `Projects->kitchen-sinks->spa-vue->e2e:headless or e2e:interactive`

# Review

Now that you have implemented and tested your contribution it’s time for review.

To share your work with UXers or receive feedback before making a pull request, prefix your branch name with feat (e.g. `feat/branch-name`). This will deploy your changes to Azure CDN upon pushing. The deployed branch link can be obtained from the GitHub action output after building.

When your contribution is prepared, simply create and submit a pull request. You will be prompted to complete the GitHub pull request template with a brief description of your contribution, which assists us in evaluating code changes.

## Pull request

To create a pull request, navigate to [MDS repo](https://github.com/Maersk-Global/mds/pulls) and choose `New pull request`.

### PR checklist

The pull request then triggers the MDS GitHub CI workflow which runs all checks including the building, linting and testing.


## Publish and deploy your component

We have set up the ci to automatically deploy and publish changes. All you have to do is to create a PR, wait for all checks to pass, get 1 review of your PR, and merge it to main.
Once the PR is merged to main branch, the [publish and deploy](https://github.com/Maersk-Global/mds/actions/workflows/publish-and-deploy.yml) workflow will trigger, that will take care of publishing new version to NPM, creating changelog and deploying Storybook.

⚠️ IMPORTANT ⚠️

The published version number of packages, depends on the title of your PR and commit messages you're adding while pushing your code.
We use [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/) message style, meaning if you prefix your commit with:

- `feat`: package will get minor version update (i.e. from `v0.1.0` to `v0.2.0`)
- `fix`: package will get patch update (i.e. from `v0.0.1` to `v0.0.2`)
- `refactor`: package will get patch update (i.e. from `v0.0.1` to `v0.0.2`)
- `docs`: package will not get published, only Storybook docs will get deployed

If you want to publish your component under `alpha` or `beta` tag, you have to do the following:

- create `alpha` branch from latest `main`
- create your feature branch (i.e. `feat/mc-component`) from `alpha` branch and start pushing your code to `feat/mc-component`
- once you are ready with coding create new PR (⚠️ remember that the base ref branch should be `alpha`)
- when you PR is approved you can merge your PR to `alpha` branch
- the new version of components with `alpha` tag will be now published to NPM

If you want to publish your `alpha` components under `latest` tag:

- just create new PR from `alpha` to `main`
- once PR is approved, merge it to `main`
- the new version of components with `latest` tag will be now published to NPM

# Your contribution is live 🎉

It’s time to celebrate! Your contribution is now live and other teams can benefit from it. Grab a cup of coffee and enjoy kudos from your colleagues. You did a great job with contributing to the Maersk Design System and the Maersk Design System Community thank you for it.
