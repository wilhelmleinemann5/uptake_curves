import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Layout & navigation/Side Bar/Documentation',
  component: 'mc-side-bar',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
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
  </nav>`;
  const code = generateCode('mc-side-bar', argTypes, args, slot);

  return html`${unsafeHTML(generateThemeSelector())}
    <style>
      .sb-show-main.sb-main-padded {
        overflow-y: hidden;
      }
    </style>
    <div class="mds-layout">
      <mc-side-bar>${unsafeHTML(slot)}</mc-side-bar>
      <main class="mds-page mds-container">
        <div class="mds-grid mds-grid-cols-1">${renderCodePreview(code, context)}</div>
      </main>
    </div> `;
};
