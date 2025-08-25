import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';

export default {
  title: 'Themes & tokens/Colours',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const OnBackground = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    ${renderComponentBanner(
      'On-background colour classes',
      html`<p>
        These helper classes allow you to quickly apply a theme's <strong>on-background</strong> colours to an element
        and align with a
        <a href="https://designsystem.maersk.com/themes/maersk-light/" target="_blank"
          >theme's colour design tokens&nbsp;<mc-icon icon="square-arrow-up-right" size="16" /></a
        >.
      </p>`,
    )}
    <div style="width: 100%">${unsafeHTML(preview()[0].template)}</div>
    ${renderCodePreview(preview(true), context)}`;
};
