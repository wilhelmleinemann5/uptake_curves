export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript/Lit
import { html } from 'lit';
import "@maersk-global/mds-components-core/mc-list";
import '@maersk-global/mds-components-core/mc-list-item';

// Custom fuzzy filter function
const fuzzyFilter = (text, searchValue) => {
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
const exactWordFilter = (text, searchValue) => {
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

// HTML
<div style="display: flex; gap: 20px;">
  <div style="width: 300px;">
    <h4>Built-in "contains" filter</h4>
    <mc-list listsearch filtertype="contains" aria-label="Built-in contains filter">
      <mc-list-item label="JavaScript" sublabel="Frontend scripting" value="javascript"></mc-list-item>
      <mc-list-item label="TypeScript" sublabel="Frontend type-safe" value="typescript"></mc-list-item>
      <mc-list-item label="Python" sublabel="Backend server" value="python"></mc-list-item>
      <mc-list-item label="Java" sublabel="Backend enterprise" value="java"></mc-list-item>
      <mc-list-item label="Swift" sublabel="Mobile iOS" value="swift"></mc-list-item>
      <mc-list-item label="Kotlin" sublabel="Mobile Android" value="kotlin"></mc-list-item>
    </mc-list>
  </div>
  
  <div style="width: 300px;">
    <h4>Custom fuzzy filter</h4>
    <mc-list listsearch .customfilter=\${fuzzyFilter} aria-label="Custom fuzzy filter">
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
    <mc-list listsearch .customfilter=\${exactWordFilter} aria-label="Custom exact word filter">
      <mc-list-item label="Red Apple" value="red-apple"></mc-list-item>
      <mc-list-item label="Sweet Banana" value="sweet-banana"></mc-list-item>
      <mc-list-item label="Large Cherry" value="large-cherry"></mc-list-item>
      <mc-list-item label="Fresh Date" value="fresh-date"></mc-list-item>
      <mc-list-item label="Sweet Elderberry" value="sweet-elderberry"></mc-list-item>
      <mc-list-item label="Purple Grape" value="purple-grape"></mc-list-item>
    </mc-list>
  </div>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
