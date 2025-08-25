import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Step Indicator/Group/Documentation',
  component: 'mc-step-indicator',
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
  const wrapperStyle = args.orientation == 'horizontal' ? 'width: 80%;' : 'width: auto; min-height: 300px;';
  const componentStyle = args.orientation == 'horizontal' ? '' : 'display: block; height: 300px;';
  const urlParams = new URLSearchParams(window.location.search);
  const mdsDocsStateDemo = urlParams.get('mdsdocsstatedemo');
  let slot;

  switch (mdsDocsStateDemo) {
    case 'warning':
      args.labels = '';
      slot = `<mc-step-indicator-item state="completed" label="ETD"> </mc-step-indicator-item>
  <mc-step-indicator-item state="completed" label="Release Sent"> </mc-step-indicator-item>
  <mc-step-indicator-item state="current" appearance="warning" label="Carrier Released"> </mc-step-indicator-item>
  <mc-step-indicator-item label="ETA" state="pending"> </mc-step-indicator-item>`;
      break;
    case 'error':
      args.labels = '';
      slot = `<mc-step-indicator-item state="completed" label="ETD"> </mc-step-indicator-item>
  <mc-step-indicator-item state="completed" label="Release Sent"> </mc-step-indicator-item>
  <mc-step-indicator-item state="current" appearance="error" label="Carrier Released"> </mc-step-indicator-item>
  <mc-step-indicator-item label="ETA" state="pending"> </mc-step-indicator-item>`;
      break;
  }

  const code = generateCode('mc-step-indicator', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${wrapperStyle}">
      <mc-step-indicator
        style="${componentStyle}"
        class="my-indicator"
        id="step-indicator"
        ?autolayoutdisabled="${args.autolayoutdisabled}"
        ?alignitemsdisabled="${args.alignitemsdisabled}"
        .labels="${args.labels}"
        .currentindex="${args.currentindex}"
        .orientation="${args.orientation}"
        .fit="${args.fit}"
        >${slot ? unsafeHTML(slot) : null}</mc-step-indicator
      >
    </div>
    ${renderCodePreview(code, context)}`;
};
