import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Segmented Control/Group/Examples',
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
      <style>
        mc-segmented-control::part(list) {
          box-shadow:
            var(--mds_brand_appearance_shadow_high_first-layer_offset-x)
              var(--mds_brand_appearance_shadow_high_first-layer_offset-y)
              var(--mds_brand_appearance_shadow_high_first-layer_blur-radius)
              var(--mds_brand_appearance_shadow_high_first-layer_spread-radius)
              var(--mds_brand_appearance_shadow_high_first-layer_color),
            var(--mds_brand_appearance_shadow_high_second-layer_offset-x)
              var(--mds_brand_appearance_shadow_high_second-layer_offset-y)
              var(--mds_brand_appearance_shadow_high_second-layer_blur-radius)
              var(--mds_brand_appearance_shadow_high_second-layer_spread-radius)
              var(--mds_brand_appearance_shadow_high_second-layer_color),
            var(--mds_brand_appearance_shadow_high_third-layer_offset-x)
              var(--mds_brand_appearance_shadow_high_third-layer_offset-y)
              var(--mds_brand_appearance_shadow_high_third-layer_blur-radius)
              var(--mds_brand_appearance_shadow_high_third-layer_spread-radius)
              var(--mds_brand_appearance_shadow_high_third-layer_color);
          width: auto;
        }
      </style>
      <div class="story">
        <mc-segmented-control type="single">
          <mc-segmented-control-item
            selected
            hiddenlabel
            value="Bicycle"
            label="Bicycle"
            icon="bicycle"
          ></mc-segmented-control-item>
          <mc-segmented-control-item hiddenlabel value="Car" label="Car" icon="car-side"></mc-segmented-control-item>
          <mc-segmented-control-item
            hiddenlabel
            value="Vessel"
            label="Vessel"
            icon="vessel-side"
          ></mc-segmented-control-item>
          <mc-segmented-control-item
            hiddenlabel
            value="Airplane"
            label="Airplane"
            icon="airplane"
          ></mc-segmented-control-item>
        </mc-segmented-control>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
