import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import argTypes from './argTypes';
import { generateThemeSelector, getDefaultValues } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Link',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};

export const documentation = (args: Args, context: StoryContext) => {
  const urlParams = new URLSearchParams(window.location.search);
  const isMDSDocs = urlParams.has('mdsdocs');
  const mdsDocsAppearance = urlParams.get('mdsdocsappearance') || 'light';
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'Link',
    html` <p>Links are automatically styled if an outer container applies the <code>mds</code> class.</p>
      <p style="margin-top: 8px;">
        We also provide a <code>mds-link--stand-alone</code> class for styling "stand-alone" links i.e. those links that
        do not sit inline within a paragraph of text etc.
      </p>
      <p style="margin-top: 8px;">
        You can read more about
        <a href="https://designsystem.maersk.com/components/link/" target="_blank"
          >links on the MDS website &nbsp;<mc-icon icon="square-arrow-up-right" aria-label="Opens in a new window" /></a
        >.
      </p>`,
  )}
  ${unsafeHTML(preview(false, false, args.appearance)[0].template)}
  ${renderCodePreview(preview(true, false, args.appearance), context)}`;
};
