import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';
import { getDefaultValues, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { argTypes } from './argTypes';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Components/Breadcrumb',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: false },
    actions: { disable: true },
    controls: { disable: false },
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
  return html`${unsafeHTML(generateThemeSelector())}${unsafeHTML(template(args))}
  ${renderCodePreview(preview(args), context)} `;
};
