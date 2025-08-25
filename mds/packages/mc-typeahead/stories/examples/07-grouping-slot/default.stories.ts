import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcListItem } from '@maersk-global/mds-components-core-list-item/src/lib/types';
import { IMcTypeahead } from '../../../src/lib/types';

const data = [
  { label: 'apple', value: 'apple', group: 'Fruits' },
  { label: 'apricot', value: 'apricot', group: 'Fruits' },
  { label: 'banana', value: 'banana', group: 'Fruits' },
  { label: 'blackberry', value: 'blackberry', group: 'Fruits' },
  { label: 'blueberry', value: 'blueberry', group: 'Fruits' },
  { label: 'cherry', value: 'cherry', group: 'Fruits' },
  { label: 'coconut', value: 'coconut', group: 'Fruits' },
  { label: 'cranberry', value: 'cranberry', group: 'Fruits' },
  { label: 'grape', value: 'grape', group: 'Fruits' },
  { label: 'grapefruit', value: 'grapefruit', group: 'Fruits' },
  { label: 'kiwi', value: 'kiwi', group: 'Fruits' },
  { label: 'lemon', value: 'lemon', group: 'Fruits' },
  { label: 'lime', value: 'lime', group: 'Fruits' },
  { label: 'lychee', value: 'lychee', group: 'Fruits' },
  { label: 'mandarin', value: 'mandarin', group: 'Fruits' },
  { label: 'mango', value: 'mango', group: 'Fruits' },
  { label: 'nectarine', value: 'nectarine', group: 'Fruits' },
  { label: 'orange', value: 'orange', group: 'Fruits' },
  { label: 'papaya', value: 'papaya', group: 'Fruits' },
  { label: 'passionfruit', value: 'passionfruit', group: 'Fruits' },
  { label: 'peach', value: 'peach', group: 'Fruits' },
  { label: 'pear', value: 'pear', group: 'Fruits' },
  { label: 'pineapple', value: 'pineapple', group: 'Fruits' },
  { label: 'plum', value: 'plum', group: 'Fruits' },
  { label: 'pomegranate', value: 'pomegranate', group: 'Fruits' },
  { label: 'raspberry', value: 'raspberry', group: 'Fruits' },
  { label: 'strawberry', value: 'strawberry', group: 'Fruits' },
  { label: 'watermelon', value: 'watermelon', group: 'Fruits' },
  { label: 'artichoke', value: 'artichoke', group: 'Vegetables' },
  { label: 'asparagus', value: 'asparagus', group: 'Vegetables' },
  { label: 'aubergine', value: 'aubergine', group: 'Vegetables' },
  { label: 'beetroot', value: 'beetroot', group: 'Vegetables' },
  { label: 'broccoli', value: 'broccoli', group: 'Vegetables' },
  { label: 'brussels sprout', value: 'brussels sprout', group: 'Vegetables' },
  { label: 'cabbage', value: 'cabbage', group: 'Vegetables' },
  { label: 'carrot', value: 'carrot', group: 'Vegetables' },
  { label: 'cauliflower', value: 'cauliflower', group: 'Vegetables' },
  { label: 'celery', value: 'celery', group: 'Vegetables' },
  { label: 'chili pepper', value: 'chili pepper', group: 'Vegetables' },
  { label: 'corn', value: 'corn', group: 'Vegetables' },
  { label: 'cucumber', value: 'cucumber', group: 'Vegetables' },
  { label: 'eggplant', value: 'eggplant', group: 'Vegetables' },
  { label: 'garlic', value: 'garlic', group: 'Vegetables' },
  { label: 'ginger', value: 'ginger', group: 'Vegetables' },
  { label: 'green bean', value: 'green bean', group: 'Vegetables' },
  { label: 'green pepper', value: 'green pepper', group: 'Vegetables' },
  { label: 'kale', value: 'kale', group: 'Vegetables' },
  { label: 'leek', value: 'leek', group: 'Vegetables' },
  { label: 'lettuce', value: 'lettuce', group: 'Vegetables' },
  { label: 'mushroom', value: 'mushroom', group: 'Vegetables' },
  { label: 'onion', value: 'onion', group: 'Vegetables' },
  { label: 'pea', value: 'pea', group: 'Vegetables' },
  { label: 'potato', value: 'potato', group: 'Vegetables' },
  { label: 'pumpkin', value: 'pumpkin', group: 'Vegetables' },
  { label: 'radish', value: 'radish', group: 'Vegetables' },
  { label: 'red pepper', value: 'red pepper', group: 'Vegetables' },
  { label: 'spinach', value: 'spinach', group: 'Vegetables' },
  { label: 'sweet potato', value: 'sweet potato', group: 'Vegetables' },
  { label: 'tomato', value: 'tomato', group: 'Vegetables' },
  { label: 'turnip', value: 'turnip', group: 'Vegetables' },
  { label: 'zucchini', value: 'zucchini', group: 'Vegetables' },
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
  render: (args: Args, context: StoryContext) => {
    const renderData = (searchTerm) => {
      const filteredData = data.filter((item) => item.label.startsWith(searchTerm));
      let currentGroup: string | null = null;
      let group: HTMLElement | null = null;
      return filteredData
        ? [...filteredData].map((item) => {
            if (item.group !== currentGroup) {
              currentGroup = item.group;
              group = document.createElement('small');
              group.innerText = item.group;
            } else {
              group = null;
            }
            const option: IMcListItem = document.createElement('mc-option');
            option.value = item.value;
            option.label = item.label;
            return [group, option];
          })
        : null;
    };
    const setData = async (event) => {
      const mcTypeahead: IMcTypeahead = document.querySelector('#data-as-slot') as unknown as IMcTypeahead;
      (mcTypeahead as unknown as Element).innerHTML = '';
      mcTypeahead.loading = true;
      const results = renderData(event.detail);
      if (results) {
        results.map((item) => {
          item.map((i) => {
            if (i) {
              (mcTypeahead as unknown as Element).appendChild(i as Node);
            }
          });
        });
      }
      mcTypeahead.loading = false;
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-typeahead
        name="typeahead"
        id="data-as-slot"
        hint="Data passed via. slot"
        label="Fruits or vegetables"
        clearbutton
        disablefilter
        @search="${(event) => {
          setData(event);
        }}"
        placeholder="Start typing fruit or vegetable name"
      ></mc-typeahead
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithGroupsAsSlot: StoryObj = {};
