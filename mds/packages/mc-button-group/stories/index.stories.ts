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
  title: 'Components/Button Group/Group/Documentation',
  component: 'mc-button-group',
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
  const mdsDocsButtonConfig = urlParams.get('mdsdocsbuttonconfig');
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');
  const badge =
    mdsDocsWithBadge == 'true'
      ? `
      <mc-badge slot="badge" position="left" display="inline" label="4"></mc-badge>
    `
      : '';
  let slot;
  switch (mdsDocsButtonConfig) {
    case 'text-only':
      slot = `
    <mc-button-group-item value="new">New</mc-button-group-item>
    <mc-button-group-item value="edit">Edit</mc-button-group-item>
    <mc-button-group-item value="delete">Delete</mc-button-group-item>
    <mc-button-group-item value="archive">Archive${badge}</mc-button-group-item>`;
      break;
    case 'icon-only':
      slot = `
    <mc-button-group-item icon="plus" value="new" hiddenlabel>New</mc-button-group-item>
    <mc-button-group-item icon="pencil" value="edit" hiddenlabel>Edit</mc-button-group-item>
    <mc-button-group-item icon="trash" value="delete" hiddenlabel>Delete</mc-button-group-item>
    <mc-button-group-item icon="box" value="archive" hiddenlabel>Archive${badge}</mc-button-group-item>`;
      break;
    default:
      slot = `
    <mc-button-group-item icon="plus" value="new">New</mc-button-group-item>
    <mc-button-group-item icon="pencil" value="edit">Edit</mc-button-group-item>
    <mc-button-group-item icon="trash" value="delete">Delete</mc-button-group-item>
    <mc-button-group-item icon="box" value="archive">Archive${badge}</mc-button-group-item>`;
  }
  const code = generateCode('mc-button-group', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width:${args.width == 'full-width' ? '100%' : 'auto'}">
      <mc-button-group
        fit="${args.fit}"
        .orientation="${args.orientation}"
        .selectiontype="${args.selectiontype}"
        .value="${args.value}"
        .width="${args.width}"
        @listchange="${(event) => action('listchange')(event.detail)}"
        @listitemsloaded="${(event) => action('listitemsloaded')(event.detail)}"
        @focuschange="${(event) => action('focuschange')(event.detail)}"
      >
        ${unsafeHTML(slot)}
      </mc-button-group>
    </div>
    ${renderCodePreview(code, context)} `;
};
