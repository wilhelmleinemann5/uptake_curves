import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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

export const WithDrawerInContent = () => {
  function openDrawer(nonmodal) {
    const drawer = document.querySelector('#drawer');
    if (drawer) {
      drawer.nonmodal = nonmodal;
      drawer.open = true;
    }
  }
  return html`${unsafeHTML(storybookStylesOverrides)}${unsafeHTML(layoutPageCustomStyles)}
    <div class="mds-layout">
      <a href="#main-content" class="mds-skip-to">Skip to content</a>
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
      <mc-drawer id="drawer">Drawer example</mc-drawer>
      <main id="main-content" class="mds-page mds-container">
        <div class="mds-grid mds-grid-cols-2">
          <mc-button @click=${() => openDrawer(false)} width="full-width">Open drawer</mc-button>
          <mc-button @click=${() => openDrawer(true)} width="full-width">Open non-modal drawer</mc-button>
        </div>
        <div class="mds-grid mds-grid-cols-1">
          <mc-notification
            appearance="warning"
            icon="exclamation-triangle"
            body="The mc-drawer (nonmodal version) should be placed outside of the main content tag of the layout. Recommended: as a direct child of body or before/after the main layout container."
          ></mc-notification>
        </div>
        <div class="mds-grid mds-grid-cols-1">
          <div>
            <mc-c-code-preview fit="small" .code=${preview}></mc-c-code-preview>
          </div>
        </div>
      </main>
    </div>`;
};
