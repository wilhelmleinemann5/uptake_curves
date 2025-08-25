import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Icon/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <div>
        <mc-notification class="light" heading="Icons Dynamic Import Path" icon="">
          <span>
            <span
              >For optimization purposes, we've introduced a dynamic import of icons (we use
              <code>import()</code> function). Please read more about MDS
              <a
                href="https://designsystem.maersk.com/get-started/developers/components/configuration/index.html"
                target="_blank"
                >configuration class</a
              >, applying all these is required in order to get the dynamic import of icons working with i.e.
              <code>Vite</code> bundler. <br />
            </span>
            <span class="mds-font--small--italic">Check 'Code Preview' below to see an example configuration.</span>
          </span>
        </mc-notification>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const DynamicImportPath: StoryObj = {};
