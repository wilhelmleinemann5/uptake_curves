import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Switch/Documentation',
  component: 'mc-switch',
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
  const urlParams = new URLSearchParams(window.location.search);
  const isMDSDocs = urlParams.has('mdsdocs');
  const mdsDocsAppearance = urlParams.get('mdsdocsappearance') || 'light';
  const code = generateCode('mc-switch', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-switch
      name="${args.name}"
      value="yes"
      .fit="${args.fit}"
      .label="${args.label}"
      ?hiddenlabel="${args.hiddenlabel}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      @click="${(event) => action('click')(event.target)}"
      @change="${(event) => action('change')(event.target.checked ? 'true' : 'false')}"
      @focus="${(event) => action('focus')(event.target)}"
      @blur="${(event) => action('blur')(event.target)}"
    ></mc-switch>
    ${renderCodePreview(code, context)}`;
};
