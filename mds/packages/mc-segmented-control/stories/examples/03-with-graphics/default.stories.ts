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
      <div class="story">
        <mc-segmented-control type="single">
          <mc-segmented-control-item selected value="RedHeart" label="Red Heart"
            ><span slot="icon">❤️</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="Sparkles" label="Sparkles"
            ><span slot="icon">✨</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="PartyPopper" label="Party Popper"
            ><span slot="icon">🎉</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="SmilingFaceWithHearts" label="Smiling Face with Hearts"
            ><span slot="icon">🥰</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="Fire" label="Fire"><span slot="icon">🔥</span></mc-segmented-control-item>
          <mc-segmented-control-item value="SmillingFaceWithSmilingEyes" label="Smiling Face with Smiling Eyes"
            ><span slot="icon">😊</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="PleadingFace" label="Pleading Face"
            ><span slot="icon">🥺</span></mc-segmented-control-item
          >
          <mc-segmented-control-item value="FaceWithTears" label="Face with Tears of Joy"
            ><span slot="icon">😂</span></mc-segmented-control-item
          >
        </mc-segmented-control>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithGraphics: StoryObj = {};
