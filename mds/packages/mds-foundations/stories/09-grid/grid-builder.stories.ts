import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { gridBuilderHtml, gridBuilderStyle, gridBuilderForm, initGridBuilder } from './grid-builder/index';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Layout & navigation/Grid',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const GridBuilder = (args: Args, context: StoryContext) => {
  window.addEventListener('DOMContentLoaded', () => {
    initGridBuilder();
  });

  const preview = [
    {
      label: 'HTML',
      template: ``,
      language: 'html',
    },
  ];

  return html`${gridBuilderStyle} ${gridBuilderForm} ${gridBuilderHtml}
    <hr />
    ${renderCodePreview(preview, context, html`<div slot="heading">Grid HTML</div>`, 'none', 'generated-code')} `;
};
