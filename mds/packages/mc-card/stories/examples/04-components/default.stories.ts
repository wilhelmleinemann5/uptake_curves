import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../../src/index';
import checkboxImage from '../../images/checkbox.svg';
import inputImage from '../../images/input.svg';
import loadingIndicatorImage from '../../images/loading-indicator.svg';
import coloursImage from '../../images/colours.svg';
import typographyImage from '../../images/typography.svg';
import iconsImage from '../../images/icons.svg';

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
        <style>
          mc-card::part(image-container) {
            border: var(--mds_global_border_width) var(--mds_global_border_style)
              var(--mds_brand_appearance_neutral_default_border-color);
            border-radius: var(--mds_brand_border_x-large_radius);
          }
          mc-card::part(image-inner) {
            border-radius: var(--mds_brand_border_x-large_radius);
          }
        </style>
        <div
          style="background-color: var(--mds_brand_appearance_neutral_default_background-color); padding: 24px; display: grid; grid-template-columns: repeat(3, minmax(0px, 1fr)); row-gap: 32px; column-gap: 24px; margin: 24px 0; max-width: 788px;"
        >
          <mc-card
            image="${checkboxImage}"
            heading="Checkbox"
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          >
          </mc-card>
          <mc-card
            image="${inputImage}"
            heading="Input"
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          ></mc-card>
          <mc-card
            image="${loadingIndicatorImage}"
            heading="Loading indicator"
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          ></mc-card>
          <mc-card
            image="${coloursImage}"
            heading="Colours"
            body="A flexible range of colours & shades for your user interface."
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          ></mc-card>
          <mc-card
            image="${typographyImage}"
            heading="Typography"
            body="Plays an integral role in brand recognition and tone of voice."
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          ></mc-card>
          <mc-card
            image="${iconsImage}"
            heading="Icons"
            body="Icons that are recommended and supported by the design system."
            variant="borderless"
            fit="small"
            imagescalestrength="prominent"
            href="https://designsystem.maersk.com"
          ></mc-card>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const Components: StoryObj = {};
