import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../src/index';

export default {
  title: 'Components/Segmented Control/Item/Documentation',
  component: 'mc-segmented-control-item',
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
  const code = generateCode('mc-segmented-control-item', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-segmented-control aria-label="fruits" selectiontype="multiple">
      <mc-segmented-control-item
        ?selected="${args.selected}"
        ?disabled="${args.disabled}"
        icon="${args.icon}"
        trailingicon="${args.trailingicon}"
        fit="${args.fit}"
        ?hiddenlabel="${args.hiddenlabel}"
        href="${args.href}"
        label="${args.label}"
      ></mc-segmented-control-item>
    </mc-segmented-control>
    ${renderCodePreview(code, context)}`;
};
