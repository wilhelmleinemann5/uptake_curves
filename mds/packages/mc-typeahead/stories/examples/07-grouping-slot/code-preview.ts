export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-option';
import { data } from'./data.js';

const renderData = (searchTerm) => {
  const filteredData = data.filter(item => item.label.startsWith(searchTerm));
  let currentGroup = null;
  let group = null;
  return filteredData ? [...filteredData].map(item => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      group = document.createElement('small');
      group.innerText = item.group;
    } else {
      group = null;
    }
    const option = document.createElement('mc-option');
    option.value = item.value;
    option.label = item.label;
    return [group, option];
  }) : null;
}
const setData = async (e) => {
  const mcTypeahead = document.querySelector('#data-as-slot');
  mcTypeahead.innerHTML = '';
  mcTypeahead.loading = true;
  const results = renderData(e.detail);
  results.map(item => {
    item.map(i => {
      if (i) {
        mcTypeahead.appendChild(i);
      }
    })
  });
  mcTypeahead.loading = false;
}

// HTML
<mc-typeahead 
  name="typeahead"
  label="Fruits or vegetables"
  clearbutton
  placeholder="Start typing fruit or vegetable name"
  onsearch="setData(event)"
></mc-typeahead>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.js',
    template: `export const data = [
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
      { label: 'artichoke', value: 'artichoke', group: 'Vegetables'},
      { label: 'asparagus', value: 'asparagus', group: 'Vegetables'},
      { label: 'aubergine', value: 'aubergine', group: 'Vegetables'},
      { label: 'beetroot', value: 'beetroot', group: 'Vegetables'},
      { label: 'broccoli', value: 'broccoli', group: 'Vegetables'},
      { label: 'brussels sprout', value: 'brussels sprout', group: 'Vegetables'},
      { label: 'cabbage', value: 'cabbage', group: 'Vegetables'},
      { label: 'carrot', value: 'carrot', group: 'Vegetables'},
      { label: 'cauliflower', value: 'cauliflower', group: 'Vegetables'},
      { label: 'celery', value: 'celery', group: 'Vegetables'},
      { label: 'chili pepper', value: 'chili pepper', group: 'Vegetables'},
      { label: 'corn', value: 'corn', group: 'Vegetables'},
      { label: 'cucumber', value: 'cucumber', group: 'Vegetables'},
      { label: 'eggplant', value: 'eggplant', group: 'Vegetables'},
      { label: 'garlic', value: 'garlic', group: 'Vegetables'},
      { label: 'ginger', value: 'ginger', group: 'Vegetables'},
      { label: 'green bean', value: 'green bean', group: 'Vegetables'},
      { label: 'green pepper', value: 'green pepper', group: 'Vegetables'},
      { label: 'kale', value: 'kale', group: 'Vegetables'},
      { label: 'leek', value: 'leek', group: 'Vegetables'},
      { label: 'lettuce', value: 'lettuce', group: 'Vegetables'},
      { label: 'mushroom', value: 'mushroom', group: 'Vegetables'},
      { label: 'onion', value: 'onion', group: 'Vegetables'},
      { label: 'pea', value: 'pea', group: 'Vegetables'},
      { label: 'potato', value: 'potato', group: 'Vegetables'},
      { label: 'pumpkin', value: 'pumpkin', group: 'Vegetables'},
      { label: 'radish', value: 'radish', group: 'Vegetables'},
      { label: 'red pepper', value: 'red pepper', group: 'Vegetables'},
      { label: 'spinach', value: 'spinach', group: 'Vegetables'},
      { label: 'sweet potato', value: 'sweet potato', group: 'Vegetables'},
      { label: 'tomato', value: 'tomato', group: 'Vegetables'},
      { label: 'turnip', value: 'turnip', group: 'Vegetables'},
      { label: 'zucchini', value: 'zucchini', group: 'Vegetables'},
    ];`,
    language: 'js',
    copy: true,
  },
];
