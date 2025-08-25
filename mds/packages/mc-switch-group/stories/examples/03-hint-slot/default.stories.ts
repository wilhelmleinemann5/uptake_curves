import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Switch Group/Examples',
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
      <mc-switch-group legend="Legend">
        <span slot="hint"
          >Hint as HTML with custom
          <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/button/index.html"
            >link</a
          ></span
        >
        <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
        <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
        <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
        <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch> </mc-switch-group
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const HintAsSlot: StoryObj = {};
