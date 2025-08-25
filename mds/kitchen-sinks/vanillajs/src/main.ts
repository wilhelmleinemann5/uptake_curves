import './style.css';
import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';

import '@maersk-global/mds-components-core-avatar';
import '@maersk-global/mds-components-core-button-group-item';
import '@maersk-global/mds-components-core-button-group';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-calendar';
import '@maersk-global/mds-components-core-card';
import '@maersk-global/mds-components-core-checkbox-group';
import '@maersk-global/mds-components-core-checkbox';
import '@maersk-global/mds-components-core-date-range';
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-file-upload';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-input-date';
import '@maersk-global/mds-components-core-input-time';
import '@maersk-global/mds-components-core-input';
import '@maersk-global/mds-components-core-label';
import '@maersk-global/mds-components-core-list-item';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-loading-indicator';
import '@maersk-global/mds-components-core-menu';
import '@maersk-global/mds-components-core-modal';
import '@maersk-global/mds-components-core-month-year-picker';
import '@maersk-global/mds-components-core-multi-select';
import '@maersk-global/mds-components-core-notification';
import '@maersk-global/mds-components-core-number-stepper';
import '@maersk-global/mds-components-core-option';
import '@maersk-global/mds-components-core-pagination';
import '@maersk-global/mds-components-core-picker-item';
import '@maersk-global/mds-components-core-picker';
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-radio-group';
import '@maersk-global/mds-components-core-radio';
import '@maersk-global/mds-components-core-segmented-control-item';
import '@maersk-global/mds-components-core-segmented-control';
import '@maersk-global/mds-components-core-select-native';
import '@maersk-global/mds-components-core-select';
import '@maersk-global/mds-components-core-switch-group';
import '@maersk-global/mds-components-core-switch';
import '@maersk-global/mds-components-core-tab-bar';
import '@maersk-global/mds-components-core-tab';
import '@maersk-global/mds-components-core-table';
import '@maersk-global/mds-components-core-tag';
import '@maersk-global/mds-components-core-text-and-icon';
import '@maersk-global/mds-components-core-textarea';
import '@maersk-global/mds-components-core-time-picker';
import '@maersk-global/mds-components-core-toast';
import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core-typeahead';
import '@maersk-global/mds-components-core-step-indicator-item';
import '@maersk-global/mds-components-core-step-indicator';
import '@maersk-global/mds-components-core-dialog';
import '@maersk-global/mds-components-core-link-button';
import '@maersk-global/mds-components-core-drawer';
import '@maersk-global/mds-components-core-top-bar';
import '@maersk-global/mds-components-core-side-bar';
import '@maersk-global/mds-components-core-theme-switch';
import '@maersk-global/mds-components-core-progress-indicator';
import '@maersk-global/mds-components-core-badge';
import '@maersk-global/mds-components-core-typeahead-multi-select';
import '@maersk-global/mds-components-core-input-group';
//%%COMPONENT_IMPORT%%

import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = import.meta.env.MODE === 'development' ? '/node_modules/' : '/assets/node_modules/';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <h6>Icon:</h6>
  <mc-icon icon="star"></mc-icon>
</div>
<div>
  <h6>LoadingIndicator:</h6>
  <mc-loading-indicator></mc-loading-indicator>
</div>
<div>
  <h6>TextAndIcon:</h6>
  <mc-text-and-icon icon="star">Test</mc-text-and-icon>
</div>
<div>
  <h6>Button:</h6>
  <mc-button icon="star" label="Test"></mc-button>
</div>
<div>
  <h6>Label:</h6>
  <mc-label>Test</mc-label>
</div>
<div>
  <h6>Hint:</h6>
  <mc-hint hint="Test">Test</mc-hint>
</div>
<div>
  <h6>Error:</h6>
  <mc-error invalid errormessage="Test">Test</mc-error>
</div>
<div>
  <h6>Card:</h6>
  <mc-card heading="Test"></mc-card>
</div>
<div>
  <h6>Tag:</h6>
  <mc-tag>Test</mc-tag>
</div>
<div>
  <h6>Checkbox:</h6>
  <mc-checkbox label="Test"></mc-checkbox>
</div>
<div>
  <h6>Radio:</h6>
  <mc-radio label="Test"></mc-radio>
</div>
<div>
  <h6>Switch:</h6>
  <mc-switch label="Test"></mc-switch>
</div>
<div>
  <h6>CheckboxGroup:</h6>
  <mc-checkbox-group
    legend="Please select options"
  >
    <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
    <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
    <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
    <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
  </mc-checkbox-group>
</div>
<div>
  <h6>RadioGroup:</h6>
  <mc-radio-group
    legend="Please select options"
  >
    <mc-radio name="fruit" value="Apple" label="Apple" checked></mc-radio>
    <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
    <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
    <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
  </mc-radio-group>
</div>
<div>
  <h6>SwitchGroup:</h6>
  <mc-switch-group
    legend="Please select options"
  >
    <mc-switch name="fruit" value="Apple" label="Apple" checked></mc-switch>
    <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
    <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
    <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
  </mc-switch-group>
</div>
<div>
  <h6>ListItem:</h6>
  <mc-list-item icon="star" label="Test"></mc-list-item>
</div>
<div>
  <h6>Option:</h6>
  <mc-option icon="star" label="Test"></mc-option>
</div>
<div>
  <h6>List:</h6>
  <mc-list>
    <mc-list-item label="One"></mc-list-item>
    <mc-list-item label="Two"></mc-list-item>
    <mc-list-item label="Three"></mc-list-item>
    <mc-list-item label="Four"></mc-list-item>
    <mc-list-item label="Five"></mc-list-item>
  </mc-list>
</div>
<div>
  <h6>ButtonGroup:</h6>
  <mc-button-group selectiontype="single">
    <mc-button-group-item value="Apple" label="Apple"></mc-button-group-item>
    <mc-button-group-item value="Apricot" label="Apricot"></mc-button-group-item>
    <mc-button-group-item value="Artichoke" label="Artichoke"></mc-button-group-item>
  </mc-button-group>
</div>
<div>
  <h6>SegmentedControl:</h6>
  <mc-segmented-control>
    <mc-segmented-control-item value="Apple" label="Apple"></mc-segmented-control-item>
    <mc-segmented-control-item value="Apricot" label="Apricot"></mc-segmented-control-item>
    <mc-segmented-control-item value="Artichoke" label="Artichoke"></mc-segmented-control-item>
  </mc-segmented-control>
</div>
<div>
  <h6>Notification:</h6>
  <mc-notification heading="Heading" body="Body text"></mc-notification>
</div>
<div>
  <h6>Toast:</h6>
  <mc-toast>
    <mc-button label="Toast" slot="trigger"></mc-button>
    <mc-notification body="Body text"></mc-notification>
  </mc-toast>
</div>
<div>
  <h6>Pagination:</h6>
  <mc-pagination totalpages="20"></mc-pagination>
</div>
<div>
  <h6>TabBar & Tab:</h6>
  <mc-tab-bar>
    <!-- tab 0: -->
    <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
    <div slot="panel">Info page with lots of information about us.</div>
    <!-- tab 1: -->
    <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
    <div slot="panel">Work page that showcases our work.</div>
    <!-- tab 2: -->
    <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
    <div slot="panel">Hobby page that shows our interests.</div>
    <!-- tab 3: -->
    <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
    <div slot="panel">Contact page that shows our contacts.</div>
    <!-- tab 4: -->
    <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
    <div slot="panel">Address page that shows our addresses.</div>
  </mc-tab-bar>
</div>
<div>
  <h6>Modal:</h6>
  <mc-button id="open-modal" appearance="primary">Modal</mc-button>
  <mc-modal
    heading="Heading"
  >
    <span class="mds-text--medium-normal">
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
    </span>
    <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
    <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
  </mc-modal>
</div>
<div>
  <h6>Popover:</h6>
  <mc-popover>
    <mc-button slot="trigger">Popover</mc-button>
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 0.5em">
      <h1 style="margin: 0">Available capacity</h1>
      <span>This vessel has 50% capacity left.</span>
      <mc-button label="Book"></mc-button>
    </div>
  </mc-popover>
</div>
<div>
  <h6>PickerItem:</h6>
  <mc-picker-item label="Test" data-cy="mc-picker-item"></mc-picker-item>
</div>
<div>
  <h6>Picker:</h6>
  <mc-picker data-cy="mc-picker">
    <mc-picker-item value="1" label="Apple"></mc-picker-item>
    <mc-picker-item value="2" label="Orange"></mc-picker-item>
    <mc-picker-item value="3" label="Banana"></mc-picker-item>
    <mc-picker-item value="4" label="Apricot"></mc-picker-item>
    <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
    <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
    <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
    <mc-picker-item value="8" label="Plum"></mc-picker-item>
    <mc-picker-item value="9" label="Avocado"></mc-picker-item>
  </mc-picker>
</div>
<div>
  <h6>TimePicker:</h6>
  <mc-time-picker data-cy="mc-time-picker"></mc-time-picker>
</div>
<div>
  <h6>MonthYearPicker:</h6>
  <mc-month-year-picker></mc-month-year-picker>
</div>
<div>
  <h6>Calendar:</h6>
  <mc-calendar></mc-calendar>
</div>
<div>
  <h6>Menu:</h6>
  <mc-menu>
    <mc-button 
      slot="trigger" 
      icon="bars-horizontal" 
      variant="outlined" 
      appearance="neutral" 
      >Menu
    </mc-button>
    <mc-list>
      <mc-list-item label="One"></mc-list-item>
      <mc-list-item label="Two"></mc-list-item>
      <mc-list-item label="Three"></mc-list-item>
      <mc-list-item label="Four"></mc-list-item>
      <mc-list-item label="Five"></mc-list-item>
    </mc-list>
  </mc-menu>
</div>
<div>
  <h6>Tooltip:</h6>
  <mc-tooltip>
    <mc-button slot="trigger">Trigger</mc-button>
    <span>The HTML content of the tooltip</span>
  </mc-tooltip>
</div>
<div>
  <h6>Avatar:</h6>
  <mc-avatar
    info="info"
    appearance="color-1"
  >
  </mc-avatar>
</div>
<div>
  <h6>Input:</h6>
  <mc-input label="Test"></mc-input>
</div>
<div>
  <h6>NumberStepper:</h6>
  <mc-number-stepper label="Test"></mc-number-stepper>
</div>
<div>
  <h6>Textarea:</h6>
  <mc-textarea label="Test"></mc-textarea>
</div>
<div>
  <h6>SelectNative:</h6>
  <mc-select-native selectedindex="[0]"></mc-select-native>
</div>
<div>
  <h6>InputDate:</h6>
  <mc-input-date></mc-input-date>
</div>
<div>
  <h6>InputTime:</h6>
  <mc-input-time label="Test"></mc-input-time>
</div>
<div>
  <h6>DateRange:</h6>
  <mc-date-range></mc-date-range>
</div>
<div>
  <h6>FileUpload:</h6>
  <mc-file-upload></mc-file-upload>
</div>
<div>
  <h6>Select:</h6>
  <mc-select></mc-select>
</div>
<div>
  <h6>MultiSelect:</h6>
  <mc-multi-select>
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-multi-select>
</div>
<div>
  <h6>Typeahead:</h6>
  <mc-typeahead>
    <mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three" disabled>Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option>
  </mc-typeahead>
</div>
<div>
  <h6>Table:</h6>
  <mc-table></mc-table>
</div>
<div>
  <h6>Select:</h6>
  <mc-select>
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-select>
</div>
<div>
  <h6>StepIndicator:</h6>
  <mc-step-indicator>
    <mc-step-indicator-item state="completed" label="ETD"></mc-step-indicator-item>
    <mc-step-indicator-item state="completed" label="Release Sent"></mc-step-indicator-item>
    <mc-step-indicator-item state="current" label="Carrier Released"></mc-step-indicator-item>
    <mc-step-indicator-item label="ETA" state="pending"></mc-step-indicator-item>
  </mc-step-indicator>
</div>
<div>
  <h6>LinkButton:</h6>
  <mc-link-button href="http://maersk.com">Test</mc-link-button>
</div>
<div>
  <h6>Dialog:</h6>
    <mc-button id="open-dialog" appearance="primary">Dialog</mc-button>
    <mc-dialog
      heading="Heading"
    >
      <span class="mds-text--medium-normal" id="dialog-content">
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
      </span>
      <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
      <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
    </mc-dialog>
</div>
<div>
  <h6>Drawer:</h6>
  <mc-button id="open-drawer" appearance="primary">Drawer</mc-button>
  <mc-drawer
    heading="Heading"
  >
    <span class="mds-text--medium-normal">
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
    </span>
    <mc-button slot="footer" appearance="primary" dialogaction="ok">OK</mc-button>
    <mc-button slot="footer" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
  </mc-drawer>
</div>
<div>
  <h6>ThemeSwitch:</h6>
  <mc-theme-switch></mc-theme-switch>
</div>
<div>
  <h6>ProgressIndicator:</h6>
  <mc-progress-indicator label="progress indicator"></mc-progress-indicator>
</div>
<div>
  <h6>Badge:</h6>
  <mc-button label="Button"><mc-badge label="Test" slot="badge"></mc-badge></mc-button>
</div>
<div>
  <h6>TypeaheadMultiSelect:</h6>
  <mc-typeahead-multi-select>
    <mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three" disabled>Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option>
  </mc-typeahead-multi-select>
</div>
<div>
  <h6>InputGroup:</h6>
   <mc-input-group>
  <mc-select hiddenlabel label="country code" placeholder="+40">
      <mc-option value="+40">+40</mc-option>
      <mc-option value="+44">+44</mc-option>
      <mc-option value="+45">+45</mc-option>
    </mc-select>
    <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>
    </mc-input-group>
    </div>`;

const selectNativeOptions = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
const selectNative = document.querySelector('mc-select-native')!;
selectNative.options = selectNativeOptions;
document.getElementById('open-modal')!.addEventListener('click', () => {
  document.querySelector('mc-modal')!.open = true;
});

document.getElementById('open-dialog')!.addEventListener('click', () => {
  document.querySelector('mc-dialog')!.open = true;
});

document.getElementById('open-drawer')!.addEventListener('click', () => {
  document.querySelector('mc-drawer')!.open = true;
});

const tableData = [
  {
    id: 1,
    name: 'Madrid Maersk',
    built: 2017,
  },
  {
    id: 2,
    name: 'Mary Maersk',
    built: 2013,
  },
];
const table = document.querySelector('mc-table')!;
table.data = tableData;
