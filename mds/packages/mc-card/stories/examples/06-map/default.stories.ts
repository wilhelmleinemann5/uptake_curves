import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Card/Examples',
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
        <div style="width: 370px;">
          <mc-card subheading="Contact us" heading="Find our local offices">
            <div style="padding-top: 12px;">
              <iframe
                width="320"
                height="280"
                frameborder="0"
                src="https://www.bing.com/maps/embed?h=280&w=325&cp=55.68864123462631~12.593421936035156&lvl=15&typ=d&sty=r&src=SHELL&FORM=MBEDV8"
                scrolling="no"
              >
              </iframe>
            </div>
            <div slot="actions">
              <mc-button label="See all our locations" appearance="neutral" variant="filled"></mc-button>
            </div>
          </mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const Map: StoryObj = {};
