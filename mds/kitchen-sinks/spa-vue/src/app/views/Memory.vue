<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <button @click="showButton = !showButton">Toggle button</button>
    <br />
    <mc-button v-if="showButton" label="Button" appearance="primary"> </mc-button>
    <hr />

    <button @click="showButtonGroup = !showButtonGroup">Toggle button group</button>
    <br />
    <mc-button-group v-if="showButtonGroup">
      <mc-button-group-item v-if="showButtonGroup" value="Apple"> Apple </mc-button-group-item>
      <mc-button-group-item v-if="showButtonGroup" value="Apricot"> Apricot </mc-button-group-item>
      <mc-button-group-item v-if="showButtonGroup" value="Artichoke"> Artichoke </mc-button-group-item>
    </mc-button-group>
    <hr />

    <button @click="showCard = !showCard">Toggle card</button>
    <br />
    <mc-card
      v-if="showCard"
      heading="Supply Chain and Logistics"
      subheading="Integrated logistics"
      body="We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you."
      footer="12 September 2022"
      image="https://mds.maersk.com/assets/supply-chain-logistics_illustration-DAnQPwIH.svg"
    >
    </mc-card>
    <hr />

    <button @click="showCheckboxGroup = !showCheckboxGroup">Toggle checkbox group</button>
    <br />
    <mc-checkbox-group v-if="showCheckboxGroup" legend="Please select options" name="fruit">
      <mc-checkbox v-if="showCheckboxGroup" name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
      <mc-checkbox v-if="showCheckboxGroup" name="fruit" value="Orange" label="Orange"></mc-checkbox>
      <mc-checkbox v-if="showCheckboxGroup" name="fruit" value="Banana" label="Banana"></mc-checkbox>
      <mc-checkbox v-if="showCheckboxGroup" name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
    </mc-checkbox-group>
    <hr />

    <button @click="showDateRange = !showDateRange">Toggle date range</button>
    <br />
    <mc-date-range
      v-if="showDateRange"
      label="Check-in date"
      :yearcap="20"
      placeholder="YYYY-MM-DD"
      name="checkin-date"
    >
    </mc-date-range>
    <hr />

    <button @click="showDialog = !showDialog">Toggle dialog</button>
    <br />

    <button v-if="showDialog" @click="() => (isOpen = true)">Dialog</button>
    <mc-dialog v-if="showDialog" heading="Heading" :open="isOpen">
      <span v-if="showDialog" class="mds-text--medium-normal" id="dialog-content">
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        <p>
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
          ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        </p>
      </span>
      <mc-button v-if="showDialog" slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
      <mc-button
        v-if="showDialog"
        id="cancel-dialog"
        slot="secondaryAction"
        appearance="neutral"
        variant="outlined"
        dialogaction="cancel"
        >Cancel</mc-button
      >
    </mc-dialog>
    <hr />

    <button @click="showFileUpload = !showFileUpload">Toggle file upload</button>
    <br />
    <mc-file-upload v-if="showFileUpload" name="files"> </mc-file-upload>
    <hr />

    <button @click="showIcon = !showIcon">Toggle icon</button>
    <br />
    <mc-icon v-if="showIcon" icon="heart"> </mc-icon>
    <hr />

    <button @click="showInput = !showInput">Toggle input</button>
    <br />
    <mc-input v-if="showInput" label="Input"></mc-input>
    <hr />

    <button @click="showInputDate = !showInputDate">Toggle input date</button>
    <br />
    <mc-input-date v-if="showInputDate" label="Date"></mc-input-date>
    <hr />

    <button @click="showInputTime = !showInputTime">Toggle input time</button>
    <br />
    <mc-input-time v-if="showInputTime" label="Time"></mc-input-time>
    <hr />

    <button @click="showMultiSelect = !showMultiSelect">Toggle multi select</button>
    <br />
    <mc-multi-select v-if="showMultiSelect" label="Multi Select">
      <mc-option v-if="showMultiSelect" value="1">One</mc-option>
      <mc-option v-if="showMultiSelect" value="2">Two</mc-option>
      <mc-option v-if="showMultiSelect" value="3">Three</mc-option>
      <mc-option v-if="showMultiSelect" value="4">Four</mc-option>
      <mc-option v-if="showMultiSelect" value="5">Five</mc-option>
    </mc-multi-select>
    <hr />

    <button @click="showPagination = !showPagination">Toggle pagination</button>
    <br />
    <mc-pagination v-if="showPagination" :totalpages="20" :currentpage="1" :visiblepages="10"> </mc-pagination>
    <hr />

    <button @click="showPopover = !showPopover">Toggle popover</button>
    <br />
    <mc-popover v-if="showPopover" trigger="click">
      <mc-button v-if="showPopover" slot="trigger">Popover</mc-button>
      <div v-if="showPopover">
        <h1>Available capacity</h1>
        <span>This vessel has 50% capacity left.</span>
        <mc-button label="Book"></mc-button>
      </div>
    </mc-popover>
    <hr />

    <button @click="showSelect = !showSelect">Toggle select</button>
    <br />
    <mc-select v-if="showSelect" label="Select">
      <mc-option v-if="showSelect" value="1">One</mc-option>
      <mc-option v-if="showSelect" value="2">Two</mc-option>
      <mc-option v-if="showSelect" value="3">Three</mc-option>
      <mc-option v-if="showSelect" value="4">Four</mc-option>
      <mc-option v-if="showSelect" value="5">Five</mc-option>
    </mc-select>
    <hr />

    <button @click="showStepIndicator = !showStepIndicator">Toggle step indicator</button>
    <br />
    <mc-step-indicator
      v-if="showStepIndicator"
      :labels="['First', 'Second', 'Third', 'Forth', 'Fifth']"
      :currentindex="2"
    >
    </mc-step-indicator>
    <hr />

    <button @click="showTable = !showTable">Toggle table</button>
    <br />
    <mc-table
      v-if="showTable"
      :data="[
        {
          id: 1,
          name: 'Madrid Maersk',
          type: 'Container ship',
          built: '2017',
          length: 399,
          capacity: 19630,
          inService: true,
          status: 'On schedule',
          speed: '16.2',
          position: 'Track on map',
          lastPort: 'Shanghai',
          lastCountry: 'China',
          lastUpdate: '10/12/2024',
        },
        {
          id: 2,
          name: 'Mary Maersk',
          type: 'Container ship',
          built: '2013',
          length: 399,
          capacity: 18270,
          inService: true,
          status: 'Delayed',
          speed: '2.1',
          position: 'Track on map',
          lastPort: 'Busan',
          lastCountry: 'South Korea',
          lastUpdate: '11/12/2024',
        },
        {
          id: 3,
          name: 'Gerner Maersk',
          type: 'Container ship',
          built: '2008',
          length: 367,
          capacity: 9038,
          inService: true,
          status: 'On schedule',
          speed: '10.7',
          position: 'Track on map',
          lastPort: 'Rotterdam',
          lastCountry: 'Netherlands',
          lastUpdate: '12/12/2024',
        },
        {
          id: 4,
          name: 'Emma Maersk',
          type: 'Container ship',
          built: '2006',
          length: 398,
          capacity: 15550,
          inService: true,
          status: 'On schedule',
          speed: '13.0',
          position: 'Track on map',
          lastPort: 'Los Angeles',
          lastCountry: 'United States',
          lastUpdate: '13/12/2024',
        },
        {
          id: 5,
          name: 'Johannes Maersk',
          type: 'Container ship',
          built: '2001',
          length: 216,
          capacity: 283,
          inService: true,
          status: 'Stalled',
          speed: '0.0',
          position: 'Track on map',
          lastPort: 'Yokohama',
          lastCountry: 'Japan',
          lastUpdate: '14/12/2024',
        },
        {
          id: 6,
          name: 'Svendborg Maersk',
          type: 'Container ship',
          built: '1998',
          length: 347,
          capacity: 8160,
          inService: true,
          status: 'On schedule',
          speed: '5.6',
          position: 'Track on map',
          lastPort: 'Manila',
          lastCountry: 'Philippines',
          lastUpdate: '15/12/2024',
        },
        {
          id: 7,
          name: 'Tove Maersk',
          type: 'Container ship',
          built: '1992',
          length: 162,
          capacity: 1446,
          inService: false,
          status: 'Unknown',
          speed: '0.0',
          position: 'Track on map',
          lastPort: 'Santos',
          lastCountry: 'Brazil',
          lastUpdate: '16/12/2024',
        },
      ]"
      :columns="[
        { id: 'name', label: 'Name', noWrap: true, sticky: true },
        { id: 'lastPort', label: 'Last port' },
        { id: 'built', label: 'Built (year)', width: '200px', tabularFigures: true, align: 'right' },
        { id: 'length', label: 'Length (m)', dataType: { type: 'number' } },
        { id: 'capacity', label: 'Capacity (TEU)', dataType: { type: 'number' } },
      ]"
      datakey="id"
      caption="A caption to describe the table below"
      height="auto"
      :hidecolumns="[]"
      sortdefaultcolumnid="capacity"
      sortdefaultdirection="ascending"
      :recordsperpage="20"
      selectalllabel="Select all rows"
      selectlabel="Select row"
      :selected="[]"
      :expandopened="[]"
      expandtriggerlabel="Expand row"
    >
    </mc-table>
    <hr />

    <button @click="showTabBar = !showTabBar">Toggle tab bar</button>
    <br />
    <mc-tab-bar v-if="showTabBar">
      <mc-tab v-if="showTabBar" slot="tab" label="Info" icon="info-circle"></mc-tab>
      <div v-if="showTabBar" slot="panel">Info page with lots of information about us.</div>
      <!-- tab 1: -->
      <mc-tab v-if="showTabBar" slot="tab" label="Work" icon="globe"></mc-tab>
      <div v-if="showTabBar" slot="panel">Work page that showcases our work.</div>
      <!-- tab 2: -->
      <mc-tab v-if="showTabBar" slot="tab" label="Hobby" icon="heart"></mc-tab>
      <div v-if="showTabBar" slot="panel">Hobby page that shows our interests.</div>
      <!-- tab 3: -->
      <mc-tab v-if="showTabBar" slot="tab" label="Contact" icon="envelope"></mc-tab>
      <div slot="panel">Contact page that shows our contacts.</div>
      <!-- tab 4: -->
      <mc-tab v-if="showTabBar" slot="tab" label="Address" icon="warehouse"></mc-tab>
      <div v-if="showTabBar" slot="panel">Address page that shows our addresses.</div>
    </mc-tab-bar>
    <hr />

    <button @click="showToast = !showToast">Toggle toast</button>
    <br />
    <mc-toast v-if="showToast" appearance="neutral-default">
      <button v-if="showToast" slot="trigger">Toast</button>
      <mc-notification v-if="showToast" body="Body text"></mc-notification>
    </mc-toast>
    <hr />

    <button @click="showTypeahead = !showTypeahead">Toggle typeahead</button>
    <br />
    <mc-typeahead
      v-if="showTypeahead"
      :data="[
        { label: 'apple', value: 'apple_value' },
        { label: 'apricot', value: 'apricot_value' },
        { label: 'banana', value: 'banana_value' },
        { label: 'blackberry', value: 'blackberry_value' },
        { label: 'blueberry', value: 'blueberry_value' },
        { label: 'cherry', value: 'cherry_value' },
        { label: 'coconut', value: 'coconut_value' },
        { label: 'cranberry', value: 'cranberry_value' },
        { label: 'grape', value: 'grape_value' },
        { label: 'grapefruit', value: 'grapefruit_value' },
        { label: 'kiwi', value: 'kiwi_value' },
        { label: 'lemon', value: 'lemon_value' },
        { label: 'lime', value: 'lime_value' },
        { label: 'lychee', value: 'lychee_value' },
        { label: 'mandarin', value: 'mandarin_value' },
        { label: 'mango', value: 'mango_value' },
        { label: 'nectarine', value: 'nectarine_value' },
        { label: 'orange', value: 'orange_value' },
        { label: 'papaya', value: 'papaya_value' },
        { label: 'passionfruit', value: 'passionfruit_value' },
        { label: 'peach', value: 'peach_value' },
        { label: 'pear', value: 'pear_value' },
        { label: 'pineapple', value: 'pineapple_value' },
        { label: 'plum', value: 'plum_value' },
        { label: 'pomegranate', value: 'pomegranate_value' },
        { label: 'raspberry', value: 'raspberry_value' },
        { label: 'strawberry', value: 'strawberry_value' },
        { label: 'watermelon', value: 'watermelon_value' },
      ]"
      listlabel="Previously used"
      label="Fruit"
      placeholder="Type a fruit name"
      name="username"
    >
    </mc-typeahead>
    <hr />
  </section>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  data() {
    return {
      isOpen: ref(false),
      showButton: false,
      showButtonGroup: false,
      showCard: false,
      showCheckboxGroup: false,
      showDateRange: false,
      showDialog: false,
      showFileUpload: false,
      showIcon: false,
      showInput: false,
      showInputDate: false,
      showInputTime: false,
      showMultiSelect: false,
      showPagination: false,
      showPopover: false,
      showSelect: false,
      showStepIndicator: false,
      showTable: false,
      showTabBar: false,
      showToast: false,
      showTypeahead: false,
    };
  },
};
</script>
