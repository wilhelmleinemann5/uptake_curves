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
  title: 'Components/Notification/Documentation',
  component: 'mc-notification',
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
  const mdsDocsActions = urlParams.get('mdsdocsactions');
  if (mdsDocsActions == 'none') {
    args.actions = '';
  } else if (mdsDocsActions == 'inline') {
    args.actions = '';
    args.actionsposition = 'right';
  }
  const slot =
    mdsDocsActions == 'inline'
      ? `
  <span slot="actions">
    <mc-button
      padding="none"
      variant="plain"
      appearance="neutral"
      icon="arrow-clockwise"
      :fit.prop="options.fit.value"
      label="Refresh"
    ></mc-button>
  </span>`
      : '';
  const code = generateCode('mc-notification', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-notification
      .heading="${args.heading}"
      .body="${args.body}"
      .actions="${args.actions}"
      .actionsposition="${args.actionsposition}"
      ?closable="${args.closable}"
      .appearance="${args.appearance}"
      .fit="${args.fit}"
      .icon="${args.icon}"
      .verticalalign="${args.verticalalign}"
      .width="${args.width}"
      @close="${(event) => action('close')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-notification>
    ${renderCodePreview(code, context)}`;
};
