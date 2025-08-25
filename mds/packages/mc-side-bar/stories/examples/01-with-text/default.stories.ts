import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Layout & navigation/Side Bar/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const slot = `
    <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
      <ul>
        <li>
          <details open>
              <summary>Item 1</summary>
              <ul>
                <li>
                  <details>
                    <summary>Sub Item 1</summary>
                    <ul>
                      <li>
                        <a href="#">Item 1.1.1</a>
                      </li>
                      <li>
                        <a href="#">Item 1.1.2</a>
                      </li>
                      <li>
                        <a href="#">Item 1.1.3</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <a href="#" class="mds-tree-nav__active" aria-current="page">Sub Item 2</a>
                </li>
                <li>
                  <a href="#">Sub Item 3</a>
                </li>
              </ul>
            </details>
        </li>
        <li>
          <a href="#">Item 2</a>
        </li>
        <li class="mds-tree-nav--separator"></li>
        <li>
          <a href="#" class="mds-tree-nav__external">External link</a>
        </li>
      </ul>
    </nav>
    <mc-card 
      heading="Supply Chain and Logistics"
      subheading="Integrated logistics"
      variant="borderless">
      We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you.
    </mc-card>`;
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .sb-show-main.sb-main-padded {
          overflow-y: hidden;
        }
        nav {
          flex-grow: 1;
        }
      </style>
      <div class="mds-layout">
        <mc-side-bar>${unsafeHTML(slot)}</mc-side-bar>
        <main class="mds-page mds-container">
          <div class="mds-grid mds-grid-cols-1">${renderCodePreview(preview, context)}</div>
        </main>
      </div> `;
  },
};

export default meta;
export const WithCard: StoryObj = {};
