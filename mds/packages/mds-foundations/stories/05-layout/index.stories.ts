import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { storybookStylesOverrides, layoutPageCustomStyles } from './story-utils';
import { initLayout } from './layout-builder';

export default {
  title: 'Layout & navigation/Layout',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const Documentation = () => {
  window.addEventListener('DOMContentLoaded', () => {
    initLayout();
  });

  return html` ${unsafeHTML(storybookStylesOverrides)}${unsafeHTML(layoutPageCustomStyles)}
    <a href="#main-content" class="mds-skip-to">Skip to content</a>
    <a href="#footer" class="mds-skip-to">Skip to footer</a>
    <div id="layout"></div>`;
};
