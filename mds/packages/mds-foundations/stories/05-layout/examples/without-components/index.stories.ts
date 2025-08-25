import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { storybookStylesOverrides, layoutPageCustomStyles } from '../../story-utils';
import { preview } from './code-preview';

export default {
  title: 'Layout & navigation/Layout/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const WithBannerInContent = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(storybookStylesOverrides)}${unsafeHTML(layoutPageCustomStyles)}
    <div class="mds-layout">
      <a href="#main-content" class="mds-skip-to">Skip to content</a>
      <a href="#footer" class="mds-skip-to">Skip to footer</a>
      <mc-top-bar product="Maersk Design System" productshort="MDS"></mc-top-bar>
      <mc-side-bar>
        <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
          <ul>
            <li>
              <a href="#">Item 1</a>
            </li>
            <li>
              <a href="#">Item 2</a>
            </li>
          </ul>
        </nav>
      </mc-side-bar>
      <main id="main-content" class="mds-page mds-container">
        <div class="mds-neutral--weakest__background-color">
          <div class="mds-page-centered mds-grid mds-grid-cols-1">
            <div class="cell">Banner text</div>
          </div>
        </div>
        <div class="mds-grid">
          <div class="cell">1</div>
          <div class="cell">2</div>
          <div class="cell">3</div>
          <div class="cell">4</div>
          <div class="cell">5</div>
          <div class="cell">6</div>
          <div class="cell">7</div>
          <div class="cell">8</div>
          <div class="cell">9</div>
          <div class="cell">10</div>
          <div class="cell">11</div>
          <div class="cell">12</div>
        </div>
        <div class="mds-grid mds-grid-cols-1">
          <div>${renderCodePreview(preview, context)}</div>
        </div>
        <footer id="footer">Footer</footer>
      </main>
    </div>`;
};
