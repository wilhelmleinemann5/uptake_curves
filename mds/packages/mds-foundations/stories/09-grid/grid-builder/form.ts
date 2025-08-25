import { html } from 'lit';
import { onColumnsChange, onRowsChange, resetGrid, rows, MAX_ROWS, saveCellText } from './builder';
import { renderHostStyles } from '@maersk-global/mds-dev-utils';

export const gridBuilderForm = html` ${renderHostStyles('mc-dialog')}<mc-dialog id="edit-dialog">
    <mc-input id="edit-dialog-input" autofocus label="Change text"></mc-input>
    <mc-button slot="secondaryAction" appearance="neutral" dialogaction="cancel">Close</mc-button>
    <mc-button slot="primaryAction" dialogaction="ok" @click=${() => saveCellText()}>Confirm</mc-button>
  </mc-dialog>
  <div class="form mds-grid">
    <div class="mds-col-1 mds-row-1 mds-col-span-10">
      <h3>Grid generator tool</h3>
      <p>
        Use the tool in a
        <a href="iframe.html?id=layout-navigation-grid--grid-builder" target="_blank">new browser window</a> for the
        best experience.
      </p>
    </div>
    <mc-button
      class="mds-col-11 mds-row-1 mds-col-span-2"
      style="display:flex; justify-content: flex-end;"
      appearance="neutral"
      variant="filled"
      id="generate-grid"
      fit="small"
      @click=${() => resetGrid()}
      >Clear all grids</mc-button
    >

    <mc-tab-bar id="columns" fit="small" class="mds-col-1 mds-row-2 mds-col-span-12" @tabchange=${onColumnsChange}>
      <mc-tab slot="tab" label="12 columns"></mc-tab>
      <div slot="panel">
        <p>For 1025px + viewport and MDS breakpoints: md and above.</p>
        <mc-number-stepper
          style="display:flex; justify-content: flex-start;"
          label="Number of rows"
          id="rows-md"
          type="number"
          value="${rows.md}"
          min="1"
          max="${MAX_ROWS}"
          fit="small"
          @input=${onRowsChange}
        ></mc-number-stepper>
      </div>
      <mc-tab slot="tab" label="6 columns"></mc-tab>
      <div slot="panel">
        <p>For viewport between 641px - 1024px, and MDS breakpoints: sm.</p>
        <mc-number-stepper
          style="display:flex; justify-content: flex-start;"
          label="Number of rows"
          id="rows-sm"
          type="number"
          value="${rows.sm}"
          min="1"
          max="${MAX_ROWS}"
          fit="small"
          @input=${onRowsChange}
        ></mc-number-stepper>
      </div>
      <mc-tab slot="tab" label="2 columns"></mc-tab>
      <div slot="panel">
        <p>For viewport below 640px, and MDS breakpoints: xs.</p>
        <mc-number-stepper
          style="display:flex; justify-content: flex-start;"
          label="Number of rows"
          id="rows-xs"
          type="number"
          value="${rows.xs}"
          min="1"
          max="${MAX_ROWS}"
          fit="small"
          @input=${onRowsChange}
        ></mc-number-stepper>
      </div>
    </mc-tab-bar>
  </div>`;
