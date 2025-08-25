import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
const data = [
  { label: 'apple', value: 'apple', emoji: '🍏' },
  { label: 'banana', value: 'banana', emoji: '🍌' },
  { label: 'blueberry', value: 'blueberry', emoji: '🫐' },
  { label: 'cherry', value: 'cherry', emoji: '🍒' },
  { label: 'coconut', value: 'coconut', emoji: '🥥' },
  { label: 'grape', value: 'grape', emoji: '🍇' },
  { label: 'kiwi', value: 'kiwi', emoji: '🥝' },
  { label: 'lemon', value: 'lemon', emoji: '🍋' },
  { label: 'lime', value: 'lime', emoji: '🍋' },
  { label: 'mandarin', value: 'mandarin', emoji: '🍊' },
  { label: 'mango', value: 'mango', emoji: '🥭' },
  { label: 'nectarine', value: 'nectarine', emoji: '🍑' },
  { label: 'orange', value: 'orange', emoji: '🍊' },
  { label: 'peach', value: 'peach', emoji: '🍑' },
  { label: 'pear', value: 'pear', emoji: '🍐' },
  { label: 'pineapple', value: 'pineapple', emoji: '🍍' },
  { label: 'raspberry', value: 'raspberry', emoji: '🍓' },
  { label: 'strawberry', value: 'strawberry', emoji: '🍓' },
  { label: 'watermelon', value: 'watermelon', emoji: '🍉' },
];

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-typeahead name="typeahead" label="Fruits" clearbutton placeholder="Start typing fruit name"
        >${data.map((fruit) => {
          return html`<mc-option value="${fruit.value}">
            <span slot="icon">${fruit.emoji}</span> ${fruit.label}
          </mc-option>`;
        })}</mc-typeahead
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithCustomIcons: StoryObj = {};
