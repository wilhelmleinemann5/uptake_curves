import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Tabs/Tab Bar/Documentation',
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
  const mdsDocsIconPlacement = urlParams.get('mdsdocsiconplacement');

  const getIcon = (iconName: string) => {
    switch (mdsDocsIconPlacement) {
      case 'none':
        return '';
      case 'trailing':
        return ` trailingicon="${iconName}"`;
      default:
        return ` icon="${iconName}"`;
    }
  };

  const badge =
    mdsDocsWithBadge == 'true'
      ? `<mc-tab slot="tab" label="Work"${getIcon('briefcase')}">
    <mc-badge slot="badge" position="left" display="inline" label="8"></mc-badge>
  </mc-tab>`
      : `<mc-tab slot="tab" label="Work"${getIcon('briefcase')}></mc-tab>`;

  const slot = `
  <mc-tab slot="tab" label="Info"${getIcon('info-circle')}"></mc-tab>
  <div slot="panel">Info page with lots of information about us.</div>
  <!-- tab 1: -->
  ${badge}
  <div slot="panel">Work page that showcases our work.</div>
  <!-- tab 2: -->
  <mc-tab slot="tab" label="Hobby"${getIcon('game-controller')}></mc-tab>
  <div slot="panel">Hobby page that shows our interests.</div>
  <!-- tab 3: -->
  <mc-tab slot="tab" label="Contact"${getIcon('envelope')}></mc-tab>
  <div slot="panel">Contact page that shows our contacts.</div>`;
  const code = generateCode('mc-tab-bar', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-tab-bar
      .currentindex="${args.currentindex}"
      .variant="${args.variant}"
      .fit="${args.fit}"
      @tabchange="${(event) => action('tabchange')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-tab-bar>
    ${renderCodePreview(code, context)}`;
};
