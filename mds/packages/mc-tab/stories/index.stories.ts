import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Tabs/Tab/Documentation',
  component: 'mc-pagination',
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
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');

  const badge =
    mdsDocsWithBadge == 'true'
      ? `
  <mc-badge slot="badge" position="left" display="inline" label="8"></mc-badge>`
      : '';

  const prefix =
    args.prefix?.length > 0
      ? `
  <div slot="prefix">${args.prefix}</div>`
      : '';
  const suffix =
    args.suffix?.length > 0
      ? `
  <div slot="suffix">${args.suffix}</div>`
      : '';

  const slot = `${badge}${prefix}${suffix}`;
  const code = generateCode('mc-tab', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-tab
      slot="tab"
      ?disabled="${args.disabled}"
      .label="${args.label}"
      .icon="${args.icon}"
      .trailingicon="${args.trailingicon}"
      .fit="${args.fit}"
      .width="${args.width}"
      ?active="${args.active}"
      @disabledchange="${(event) => action('disabledchange')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-tab>
    ${renderCodePreview(code, context)}`;
};
