import data from '../../../data';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-icon';
import data from 'data.json';
import columns from 'columns.js';

const mcTable = document.querySelector('mc-table');
mcTable.data = data;
mcTable.columns = columns;

const mcPopover = document.querySelector('mc-popover');
mcPopover.addEventListener('click', e: => e.stopPropagation());

const applyFilter = (event) => {
  // This can be handled better by your framework of choice
  // This is just an example with vanilla JS
  if (event.detail.length > 0){
    event.target.parentNode.parentNode.firstElementChild.icon="funnel-solid";
    mcTable.data = data.filter(item => {
      let retval = false;
      if (event.detail.indexOf('small') > -1){
        retval = item.length < 200;
      }
      if (event.detail.indexOf('medium') > -1 && !retval){
        retval = item.length > 200 && item.length < 301;
      }
      if (event.detail.indexOf('large') > -1 && !retval){
        retval = item.length > 300;
      }
      return retval;
    })
  }
  else {
    event.target.parentNode.parentNode.firstElementChild.icon="funnel";
    mcTable.data = data;
  }
}

// HTML
<mc-table>
  <div slot="length_header" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
    <span>Filter With Checkbox Group</span>
    <mc-popover
      position="bottom-right"
      trigger="click"
    >
      <mc-button
        appearance="neutral"
        fit="small"
        hiddenlabel="true"
        icon="funnel"
        label="Show menu"
        padding="compact"
        slot="trigger"
        variant="plain"
      >
      </mc-button>
      <div style="padding: 16px 12px;">
        <mc-checkbox-group
          legend="Containers"
          orientation="vertical"
          hiddenlegend
          @change="applyFilter"
        >
          <mc-checkbox label="Large (> 300m)" value="large"></mc-checkbox>
          <mc-checkbox label="Medium (200m - 300m)" value="medium"></mc-checkbox>
          <mc-checkbox label="Small (< 200m)" value="small"></mc-checkbox>
        </mc-checkbox-group>
      </div>
    </mc-popover>
  </div>
</mc-table>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'length',
    dataType: { type: 'number' },
  }
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
