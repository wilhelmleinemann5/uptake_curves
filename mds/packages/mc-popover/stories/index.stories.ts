import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Popover/Documentation',
  component: 'mc-popover',
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
  const mdsHideCode = urlParams.get('mdshidecode') || '{}';

  const margin = args.position.includes('top') ? '160px' : '0px';

  const popoverWrapperStyle = isMDSDocs
    ? `display: flex; justify-content: center; adjust-items: center; ${mdsHideCode !== 'true' ? `margin-top: ${margin};` : `margin-top: ${margin}; margin-bottom: ${margin};`}}`
    : `display: flex; justify-content: center; adjust-items: center; margin-top: ${margin};`;

  const triggerEventLabel =
    args.trigger == 'contextmenu' ? 'Right click' : args.trigger.charAt(0).toUpperCase() + args.trigger.slice(1);
  const slot = `
  <mc-button slot="trigger" appearance="neutral" variant="plain" trailingicon="mouse">${triggerEventLabel} to show popover</mc-button>
  <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
    <h3 style="margin: 0">Available capacity</h3>
    <span>This vessel has 50% capacity left.</span>
    <mc-button label="Book" fit="${args.fit}"></mc-button>
  </div>`;
  const code = generateCode('mc-popover', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${popoverWrapperStyle}">
      <mc-popover
        .fit="${args.fit}"
        .arrow="${args.arrow}"
        .actionkeys="${args.actionkeys}"
        .position="${args.position}"
        .width="${args.width}"
        .maxwidth="${args.maxwidth}"
        .maxheight="${args.maxheight}"
        .modalmode="${args.modalmode}"
        .open="${args.open}"
        .trigger="${args.trigger}"
        .opendelay="${args.opendelay}"
        .zindex="${args.zindex}"
        ?dontadjustheight="${args.dontadjustheight}"
        ?preventcloseonblur="${args.preventcloseonblur}"
        ?contextmenuonside="${args.contextmenuonside}"
        @show="${(event) => action('show')()}"
        @hide="${(event) => action('hide')()}"
      >
        ${unsafeHTML(slot)}
      </mc-popover>
    </div>
    ${renderCodePreview(code, context)} `;
};
