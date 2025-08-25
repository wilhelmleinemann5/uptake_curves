export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-option';
import { data } from'./data.js';

const renderData = () => {
  return data ? [...data].map(fruit => {
      const option = document.createElement('mc-option');
      option.value = fruit.value;
      option.innerHTML = \`<span slot="icon">\${fruit.emoji}</span> \${fruit.label}\`;
      return option;
  }) : null;
}

const mcTypeahead = document.querySelector('mc-typeahead');
const results = renderData();
results.map(item => mcTypeahead.appendChild(item));

<mc-typeahead 
  name="typeahead"
  label="Fruits"
  clearbutton
  placeholder="Start typing fruit name"
></mc-typeahead>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.js',
    template: `export const data = [
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
    ];`,
    language: 'js',
    copy: true,
  },
];
