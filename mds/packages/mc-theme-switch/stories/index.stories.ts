import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import {} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-notification';
// components
import '../src/index.ts';

export default {
  title: 'Components/Theme Switch/Documentation',
  component: 'mc-theme-switch',
  parameters: {},
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
  play: async () => {
    setTimeout(() => {
      // This code removes the injected design tokens in the preview window so that the linked design tokens can work
      for (const styleTag of document.documentElement.getElementsByTagName('style')) {
        if (styleTag.type === 'text/css' && !styleTag.getAttribute('data-vite-dev-id')) {
          styleTag.remove();
        }
      }
    }, 100);
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const urlParams = new URLSearchParams(window.location.search);
  const isMDSDocs = urlParams.has('mdsdocs');
  const code = generateCode(
    'mc-theme-switch',
    argTypes,
    args,
    null,
    `<link rel="stylesheet" media="(prefers-color-scheme: light)" 
  href="https://assets.maerskline.com/mds/latest/design-tokens/maersk/light/css/design-tokens-px.min.css"
/>
<link rel="stylesheet" media="(prefers-color-scheme: dark)"
  href="https://assets.maerskline.com/mds/latest/design-tokens/maersk/dark/css/design-tokens-px.min.css"
/>`,
  );
  return html`${unsafeHTML(generateThemeSelector(false))}
    <link
      rel="stylesheet"
      href="https://assets.maerskline.com/mds/latest/design-tokens/maersk/light/css/design-tokens-px.min.css"
      media="(prefers-color-scheme: light)"
    />
    <link
      rel="stylesheet"
      href="https://assets.maerskline.com/mds/latest/design-tokens/maersk/dark/css/design-tokens-px.min.css"
      media="(prefers-color-scheme: dark)"
    />
    <mc-notification type="info" title="Note" class="story-notification">
      <p>
        The theme switch component allows users to switch between light and dark themes. The component uses the
        <code>prefers-color-scheme</code> media query to determine the user's system color scheme. The component will
        respect the user's system color scheme if the theme is set to <code>auto</code>.
      </p>
      <p>
        To function correctly, it needs to have two <code><link /></code> elements with a reference to the design
        tokens, with a <code>media="(prefers-color-scheme: light)"</code> or
        <code>media="(prefers-color-scheme: dark)"</code> property
      </p>
      <p>See the code sample for an example</p>
    </mc-notification>
    <mc-theme-switch
      .fit=${args.fit}
      @change="${(event) => {
        action('change')(event.detail);
      }}"
    ></mc-theme-switch>
    <mc-button
      style="${isMDSDocs ? 'margin: 32px 0;' : ''}"
      @click=${() => window.localStorage.removeItem('[mds-theme-switch]theme')}
      >Reset localstorage</mc-button
    >

    ${renderCodePreview(code, context)} `;
};
