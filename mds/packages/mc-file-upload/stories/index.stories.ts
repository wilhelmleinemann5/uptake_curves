import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/File Upload/Documentation',
  component: 'mc-file-upload',
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
  const code = generateCode('mc-file-upload', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${args.variant == 'drag-drop' ? 'width: 100%' : 'auto'}">
      <mc-file-upload
        ?disabled="${args.disabled}"
        ?hiddenlegend="${args.hiddenlegend}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?hiddenfilelist="${args.hiddenfilelist}"
        ?invalid="${args.invalid}"
        ?loading="${args.loading}"
        ?multiple="${args.multiple}"
        .accept="${args.accept}"
        .errormessage="${args.errormessage}"
        .fit="${args.fit}"
        .hint="${args.hint}"
        .icon="${args.icon}"
        .trailingicon="${args.trailingicon}"
        .label="${args.label}"
        .legend="${args.legend}"
        .variant="${args.variant}"
        @input="${(event) => action('input')(event.detail)}"
        @change="${(event) => action('change')(event.detail)}"
        .name="${args.name}"
      ></mc-file-upload>
    </div>
    ${renderCodePreview(code, context)}`;
};
