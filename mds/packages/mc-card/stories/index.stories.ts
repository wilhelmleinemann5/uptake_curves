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
  title: 'Components/Card/Documentation',
  component: 'mc-button',
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
  if (urlParams.has('mdsdocsashyperlink')) {
    args.clickable = true;
  }
  if (args.clickable) {
    args.href = 'https://www.maersk.com';
    args.target = '_blank';
  }
  const slot = args.clickable
    ? ''
    : `
  <div slot="actions" style="display:flex; justify-content: space-between;">
    <mc-button label="Action button" appearance="neutral" variant="filled" .fit="${args.fit}"></mc-button>
    <mc-button icon="heart" appearance="neutral" variant="filled" hiddenlabel .fit="${args.fit}"></mc-button>
  </div>`;
  const code = generateCode('mc-card', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${args.orientation === 'vertical' ? 'width: 360px;' : 'width: 600px;'}">
      <mc-card
        .variant="${args.variant}"
        .orientation="${args.orientation}"
        .fit="${args.fit}"
        .heading="${args.heading}"
        .subheading="${args.subheading}"
        .footer="${args.footer}"
        .contentalignment="${args.contentalignment}"
        .padding="${args.padding}"
        .image="${args.image}"
        .imagepercent="${args.imagepercent}"
        .imagescalestrength="${args.imagescalestrength}"
        .imagebackgroundcolor="${args.imagebackgroundcolor}"
        .href="${args.href}"
        .target="${args.target}"
        .rel="${args.rel}"
        ?clickable="${args.clickable}"
      >
        <span>${args.body}</span>
        ${unsafeHTML(slot)}
      </mc-card>
    </div>
    ${renderCodePreview(code, context)}`;
};
