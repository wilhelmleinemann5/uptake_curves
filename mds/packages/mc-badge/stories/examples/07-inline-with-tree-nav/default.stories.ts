import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Components/Badge/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="width: 300px">
        <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
          <ul>
            <li>
              <details open>
                <summary>
                  Item 1 (level 1) <mc-badge slot="badge" position="left" variant="dot" display="inline"></mc-badge>
                </summary>
                <ul>
                  <li>
                    <a href="#">Sub Item 3</a>
                  </li>
                  <li>
                    <a href="#" class="mds-tree-nav__active" aria-current="page"
                      >Sub Item 2 <mc-badge slot="badge" position="right" display="inline" label="3"></mc-badge
                    ></a>
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
              <a href="#" class="mds-tree-nav__external"
                >External link
                <mc-badge slot="badge" appearance="info" position="left" display="inline" label="New"></mc-badge
              ></a>
            </li>
          </ul>
        </nav>
      </div>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const InlineWithTreeNavigation: StoryObj = {};
