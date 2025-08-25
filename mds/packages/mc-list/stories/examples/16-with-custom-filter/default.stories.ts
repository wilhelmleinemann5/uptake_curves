import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

// Custom fuzzy filter function
const fuzzyFilter = (text: string, searchValue: string): string[] => {
  const textLower = text.toLowerCase();
  const searchLower = searchValue.toLowerCase();

  if (!searchLower) return [];

  let searchIndex = 0;

  // Check if all characters from search exist in order in the text
  for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
    if (textLower[i] === searchLower[searchIndex]) {
      searchIndex++;
    }
  }

  // If we found all characters in order, return the search value as a match
  return searchIndex === searchLower.length ? [searchValue] : [];
};

// Exact word matching filter
const exactWordFilter = (text: string, searchValue: string): string[] => {
  const words = text.toLowerCase().split(' ');
  const searchWords = searchValue.toLowerCase().split(' ');

  const matches = [];
  for (const searchWord of searchWords) {
    for (const word of words) {
      if (word === searchWord) {
        matches.push(searchWord);
      }
    }
  }

  return matches;
};

const meta: Meta = {
  title: 'Components/List/List/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="width: 300px;">
          <h4>Built-in "contains" filter</h4>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            Search for "javascript", "backend", or "mobile"
          </p>
          <mc-list listsearch filtertype="contains" aria-label="Built-in contains filter">
            <mc-list-item label="JavaScript" sublabel="Frontend" value="javascript"></mc-list-item>
            <mc-list-item label="TypeScript" sublabel="Frontend" value="typescript"></mc-list-item>
            <mc-list-item label="Python" sublabel="Backend" value="python"></mc-list-item>
            <mc-list-item label="Java" sublabel="Backend" value="java"></mc-list-item>
            <mc-list-item label="Swift" sublabel="Mobile" value="swift"></mc-list-item>
            <mc-list-item label="Kotlin" sublabel="Mobile" value="kotlin"></mc-list-item>
          </mc-list>
        </div>

        <div style="width: 300px;">
          <h4>Custom fuzzy filter</h4>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            Try "js" (matches JavaScript), "ts" (matches TypeScript)
          </p>
          <mc-list listsearch aria-label="Custom fuzzy filter" .customfilter=${fuzzyFilter}>
            <mc-list-item label="JavaScript" value="javascript"></mc-list-item>
            <mc-list-item label="TypeScript" value="typescript"></mc-list-item>
            <mc-list-item label="Python" value="python"></mc-list-item>
            <mc-list-item label="Java" value="java"></mc-list-item>
            <mc-list-item label="C++" value="cpp"></mc-list-item>
            <mc-list-item label="Go" value="go"></mc-list-item>
          </mc-list>
        </div>

        <div style="width: 300px;">
          <h4>Custom exact word filter</h4>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Search for exact words like "red", "sweet"</p>
          <mc-list listsearch aria-label="Custom exact word filter" .customfilter=${exactWordFilter}>
            <mc-list-item label="Red Apple" value="red-apple"></mc-list-item>
            <mc-list-item label="Sweet Banana" value="sweet-banana"></mc-list-item>
            <mc-list-item label="Large Cherry" value="large-cherry"></mc-list-item>
            <mc-list-item label="Fresh Date" value="fresh-date"></mc-list-item>
            <mc-list-item label="Sweet Elderberry" value="sweet-elderberry"></mc-list-item>
            <mc-list-item label="Purple Grape" value="purple-grape"></mc-list-item>
          </mc-list>
        </div>
      </div>

      <mc-c-code-preview fit="small" .code=${preview}></mc-c-code-preview> `;
  },
};

export default meta;
export const WithCustomFilter: StoryObj = {};
