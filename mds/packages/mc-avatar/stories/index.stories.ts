import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import {
  generateCode,
  getDefaultValues,
  renderCodePreview,
  basePath,
  generateThemeSelector,
} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Avatar/Documentation',
  component: 'mc-avatar',
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
  const mdsDocsImage = urlParams.get('mdsdocsimage');
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');
  if (mdsDocsImage) {
    switch (mdsDocsImage) {
      case 'fallback':
        args.imagesrc = '';
        args.initials = '';
        break;
      case 'initials':
        args.imagesrc = '';
        break;
      default:
        args.imagesrc = `${basePath}${mdsDocsImage}.svg`;
        break;
    }
  }

  const slot =
    mdsDocsWithBadge == 'true'
      ? `
  <mc-badge display="pinned" slot="badge" label="2" distance="medium" position="bottom" variant="dot"></mc-badge>`
      : '';
  const code = generateCode('mc-avatar', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-avatar
      .fit="${args.fit}"
      .appearance="${args.appearance}"
      .imagesrc="${args.imagesrc}"
      .initials="${args.initials}"
      .info="${args.info}"
      ?hiddentooltip="${args.hiddentooltip}"
    >
      ${unsafeHTML(slot)}
    </mc-avatar>

    ${renderCodePreview(code, context)} `;
};
