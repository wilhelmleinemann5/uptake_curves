import React from 'react';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';
import styles from './index.module.css';

// Components with issues
// import { McCalendar, McInputTime, McTimePicker, McTable } from '@maersk-global/mds-react-wrapper';

// Components
import {
  McButton,
  McCheckbox,
  McCheckboxGroup,
  McRadio,
  McRadioGroup,
  McAvatar,
  McList,
  McListItem,
  McLinkButton,
  McLoadingIndicator,
  McMenu,
  McModal,
  McPicker,
  McPickerItem,
  McError,
  McHint,
  McLabel,
  McPopover,
  McTextAndIcon,
  McTooltip,
  McNotification,
  McIcon,
  McPagination,
  McCard,
  McInputDate,
  McInput,
  McMultiSelect,
  McNumberStepper,
  McMonthYearPicker,
  McOption,
  McTag,
  McTextarea,
  McTabBar,
  McTab,
  McSwitchGroup,
  McSwitch,
  McStepIndicator,
  McSelectNative,
  McSelect,
  McTypeahead,
  McToast,
  McDateRange,
  McDialog,
  McDrawer,
} from '@maersk-global/mds-react-wrapper';
import { TableColumn } from '@maersk-global/mds-components-core-table/src/lib/types';
import { McMultiChoiceFieldsetChangeDetail } from '@maersk-global/mds-components-core-multi-choice-fieldset/src/lib/types';

export default function Home() {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const labels = ['First', 'Second', 'Third', 'Forth', 'Fifth'];
  const typeaheadData = [
    {
      label: 'apple',
      value: 'apple',
    },
    {
      label: 'apricot',
      value: 'apricot',
    },
    {
      label: 'banana',
      value: 'banana',
    },
    {
      label: 'blackberry',
      value: 'blackberry',
    },
    {
      label: 'blueberry',
      value: 'blueberry',
    },
    {
      label: 'cherry',
      value: 'cherry',
    },
    {
      label: 'coconut',
      value: 'coconut',
    },
    {
      label: 'cranberry',
      value: 'cranberry',
    },
    {
      label: 'grape',
      value: 'grape',
    },
    {
      label: 'grapefruit',
      value: 'grapefruit',
    },
    {
      label: 'kiwi',
      value: 'kiwi',
    },
    {
      label: 'lemon',
      value: 'lemon',
    },
    {
      label: 'lime',
      value: 'lime',
    },
    {
      label: 'lychee',
      value: 'lychee',
    },
    {
      label: 'mandarin',
      value: 'mandarin',
    },
    {
      label: 'mango',
      value: 'mango',
    },
    {
      label: 'nectarine',
      value: 'nectarine',
    },
    {
      label: 'orange',
      value: 'orange',
    },
    {
      label: 'papaya',
      value: 'papaya',
    },
    {
      label: 'passionfruit',
      value: 'passionfruit',
    },
    {
      label: 'peach',
      value: 'peach',
    },
    {
      label: 'pear',
      value: 'pear',
    },
    {
      label: 'pineapple',
      value: 'pineapple',
    },
    {
      label: 'plum',
      value: 'plum',
    },
    {
      label: 'pomegranate',
      value: 'pomegranate',
    },
    {
      label: 'raspberry',
      value: 'raspberry',
    },
    {
      label: 'strawberry',
      value: 'strawberry',
    },
    {
      label: 'watermelon',
      value: 'watermelon',
    },
  ];
  const tableColumns: TableColumn[] = [
    {
      id: 'name',
      label: 'Name',
      noWrap: true,
      sticky: true,
    },
    {
      id: 'lastPort',
      label: 'Last port',
    },
    {
      id: 'built',
      label: 'Built (year)',
      width: '200px',
      tabularFigures: true,
      align: 'right',
    },
    {
      id: 'length',
      label: 'Length (m)',
      dataType: {
        type: 'number',
      },
    },
    {
      id: 'capacity',
      label: 'Capacity (TEU)',
      dataType: {
        type: 'number',
      },
    },
  ];
  const tableData = [
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
      lastUpdate: '05/10/2023',
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
      lastUpdate: '06/10/2023',
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
      lastUpdate: '07/10/2023',
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
      lastUpdate: '08/10/2023',
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
      lastUpdate: '09/10/2023',
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
      lastUpdate: '10/10/2023',
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
      lastUpdate: '11/10/2023',
    },
  ];
  const options = [
    {
      value: 0,
      label: 'Zero',
    },
    {
      value: 1,
      label: 'One',
    },
    {
      value: 2,
      label: 'Two',
    },
    {
      value: 3,
      label: 'Three',
    },
    {
      value: 4,
      label: 'Four',
    },
    {
      value: 5,
      label: 'Five',
    },
  ];

  return (
    <div className="mds main">
      <h3 className={styles.title}>MDS components</h3>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McButton icon="heart" click={() => console.log('test button clicked!')}>
            Test button
          </McButton>
        </div>

        <div className={styles.card}>
          <McLinkButton href="http://maersk.com">Test</McLinkButton>
        </div>

        <div className={styles.card}>
          <McIcon icon="heart"></McIcon>
        </div>

        <div className={styles.card}>
          <McAvatar info="info" appearance="color-1"></McAvatar>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <McCheckboxGroup
            legend="Please select options"
            change={(e: CustomEvent<McMultiChoiceFieldsetChangeDetail>) => console.log('favourite fruits', e.detail)}
          >
            <McCheckbox name="fruit" value="Apple" label="Apple" checked></McCheckbox>
            <McCheckbox name="fruit" value="Orange" label="Orange"></McCheckbox>
            <McCheckbox name="fruit" value="Banana" label="Banana"></McCheckbox>
            <McCheckbox name="fruit" value="Lemon" label="Lemon"></McCheckbox>
          </McCheckboxGroup>
        </div>

        <div className={styles.card}>
          <McCard
            heading="Supply Chain and Logistics"
            subheading="Integrated logistics"
            body="We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you."
            footer="12 September 2022"
            variant="bordered"
            orientation="vertical"
            fit="medium"
          >
            <div slot="actions" className={styles.mcCard}>
              <McButton
                label="Action button"
                appearance="neutral"
                variant="filled"
                fit="medium"
                width="auto"
              ></McButton>
              <McButton
                icon="heart"
                appearance="neutral"
                variant="filled"
                hiddenlabel
                fit="medium"
                width="auto"
              ></McButton>
            </div>
          </McCard>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <McInput
            label="Username (Optional)"
            placeholder="Insert your username"
            width="auto"
            name="username"
            id="my-input"
          ></McInput>
        </div>
        <div className={styles.card}>
          {/* <McInputTime name="departureTime" label="Input Time" width="auto"></McInputTime> */}
        </div>
        <div className={styles.card}>
          <McInputDate
            name="username"
            label="Input Date"
            startofweek={1}
            format="YYYY-MM-DD"
            nextlabel="Next month"
            previouslabel="Previous month"
            placeholder="YYYY-MM-DD"
            type={undefined}
            width="auto"
          ></McInputDate>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <McList aria-label="Label" role="list">
            <McListItem label="One" aria-disabled="false" fit="medium"></McListItem>
            <McListItem label="Two" aria-disabled="false" fit="medium"></McListItem>
            <McListItem label="Three" aria-disabled="false" fit="medium"></McListItem>
            <McListItem label="Four" aria-disabled="false" fit="medium"></McListItem>
            <McListItem label="Five" aria-disabled="false" fit="medium"></McListItem>
          </McList>
        </div>
        <div className={styles.card}>
          <McLoadingIndicator label="Loading"></McLoadingIndicator>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <McMenu position="bottom-left">
            <McButton
              slot="trigger"
              icon="bars-horizontal"
              label="menu"
              variant="outlined"
              appearance="neutral"
            ></McButton>
            <McList>
              <McListItem label="One"></McListItem>
              <McListItem label="Two"></McListItem>
              <McListItem label="Three"></McListItem>
              <McListItem label="Four"></McListItem>
              <McListItem label="Five"></McListItem>
            </McList>
          </McMenu>
        </div>
        <div className={styles.card}>
          <McButton slot="primaryAction" dialogaction="ok" click={() => setModalOpen(true)} variant="filled">
            Open modal
          </McButton>
          <McModal
            heading="Heading"
            fit="medium"
            closed={() => setModalOpen(false)}
            {...(modalOpen ? { open: true } : {})}
          >
            <span className="mds-text--medium-normal">
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
              a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.{' '}
              <p>
                Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
                leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              </p>
            </span>
            <McButton
              slot="primaryAction"
              appearance="primary"
              dialogaction="ok"
              variant="filled"
              width="auto"
              fit="medium"
            >
              OK
            </McButton>
            <McButton
              slot="secondaryAction"
              appearance="neutral"
              variant="outlined"
              dialogaction="cancel"
              width="auto"
              fit="medium"
            >
              Cancel
            </McButton>
          </McModal>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McMonthYearPicker></McMonthYearPicker>
        </div>
        <div className={styles.card}>
          <McMultiSelect
            label="Containers"
            placeholder="Number of containers"
            selectalllabel="Select all"
            clearalllabel="Clear all"
            summarylabel="# out of # selected"
            optionswidth="trigger"
            name="username"
          >
            <McOption value="1">One</McOption>
            <McOption value="2">Two</McOption>
            <McOption value="3">Three</McOption>
            <McOption value="4">Four</McOption>
            <McOption value="5">Five</McOption>
          </McMultiSelect>
        </div>
        <div className={styles.card}>
          <McNotification heading="Heading" body="Body text" appearance="neutral"></McNotification>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McNumberStepper
            name="username"
            label="Containers"
            placeholder="Number of containers"
            min="0"
            max="10"
            step="1"
            width="auto"
          ></McNumberStepper>
        </div>
        <div className={styles.card}>
          <McPagination totalpages={5}></McPagination>
        </div>
        <div className={styles.card}>
          <McPicker aria-label="Label" role="listbox" noborder>
            <McPickerItem value="1" label="Apple" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="2" label="Orange" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="3" label="Banana" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="4" label="Apricot" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="5" label="Kiwi" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="6" label="Passion fruit" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="7" label="Dragon fruit" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="8" label="Plum" aria-disabled="false" fit="medium"></McPickerItem>
            <McPickerItem value="9" label="Avocado" aria-disabled="false" fit="medium"></McPickerItem>
          </McPicker>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McPopover>
            <McButton
              slot="trigger"
              label="popover"
              hiddenlabel
              icon="info-circle"
              appearance="primary"
              variant="filled"
              width="auto"
              fit="medium"
            ></McButton>
            <div>
              <h1>Available capacity</h1>
              <span>This vessel has 50% capacity left.</span>
              <McButton label="Book" appearance="primary" variant="filled" width="auto" fit="medium"></McButton>
            </div>
          </McPopover>
        </div>
        <div className={styles.card}>
          <McRadioGroup legend="Please select options">
            <McRadio name="fruit" value="Apple" label="Apple" checked></McRadio>
            <McRadio name="fruit" value="Orange" label="Orange"></McRadio>
            <McRadio name="fruit" value="Banana" label="Banana"></McRadio>
            <McRadio name="fruit" value="Lemon" label="Lemon"></McRadio>
          </McRadioGroup>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McSelect label="Containers" placeholder="Number of containers" optionswidth="trigger" name="username">
            <McOption value="1">One</McOption>
            <McOption value="2">Two</McOption>
            <McOption value="3">Three</McOption>
            <McOption value="4">Four</McOption>
            <McOption value="5">Five</McOption>
          </McSelect>
        </div>
        <div className={styles.card}>
          <McSelectNative
            options={options}
            name="digits"
            label="Pick a number"
            placeholder="Pick a number from a list"
            width="auto"
          ></McSelectNative>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McTypeahead label="Fruit" data={typeaheadData} placeholder="Type a fruit name" clearbutton></McTypeahead>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McDateRange
            name="checkin-date"
            startofweek={1}
            format="YYYY-MM-DD"
            nextlabel="Next month"
            previouslabel="Previous month"
            placeholder="YYYY-MM-DD"
            width="auto"
          ></McDateRange>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McToast>
            <McButton label="Toast" slot="trigger"></McButton>
            <McNotification body="Body text"></McNotification>
          </McToast>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McStepIndicator labels={labels} currentindex={2}></McStepIndicator>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McSwitchGroup legend="Please select options">
            <McSwitch name="fruit" value="Apple" label="Apple" checked></McSwitch>
            <McSwitch name="fruit" value="Orange" label="Orange"></McSwitch>
            <McSwitch name="fruit" value="Banana" label="Banana"></McSwitch>
            <McSwitch name="fruit" value="Lemon" label="Lemon"></McSwitch>
          </McSwitchGroup>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McTabBar>
            <McTab slot="tab" label="Info" icon="info-circle"></McTab>
            <div slot="panel">Info page with lots of information about us.</div>
            <McTab slot="tab" label="Work" icon="globe"></McTab>
            <div slot="panel">Work page that showcases our work.</div>
            <McTab slot="tab" label="Hobby" icon="heart"></McTab>
            <div slot="panel">Hobby page that shows our interests.</div>
            <McTab slot="tab" label="Contact" icon="envelope"></McTab>
            <div slot="panel">Contact page that shows our contacts.</div>
            <McTab slot="tab" label="Address" icon="warehouse"></McTab>
            <div slot="panel">Address page that shows our addresses.</div>
          </McTabBar>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>{/* <McTable data={tableData} columns={tableColumns}></McTable> */}</div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McTag label="Label" appearance="neutral"></McTag>
        </div>
        <div className={styles.card}>
          <McTextarea
            name="explanation"
            label="Explanation"
            placeholder="Write short explanation"
            rows={5}
          ></McTextarea>
        </div>
        <div className={styles.card}>{/* <McTimePicker></McTimePicker> */}</div>
        <div className={styles.card}>
          <McTooltip>
            <McButton
              slot="trigger"
              label="Tooltip"
              appearance="primary"
              variant="filled"
              width="auto"
              fit="medium"
            ></McButton>
            <span>The HTML content of the tooltip</span>
          </McTooltip>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <McError invalid errormessage="Error message"></McError>
        </div>
        <div className={styles.card}>
          <McHint hint="Hint text"></McHint>
        </div>
        <div className={styles.card}>
          <McLabel label="Label"></McLabel>
        </div>
        <div className={styles.card}>
          <McTextAndIcon label="Text and icon" fit="medium"></McTextAndIcon>
        </div>
      </div>
      <div className={styles.card}>
        <McButton click={() => setDialogOpen(true)} variant="filled">
          Open dialog
        </McButton>
        <McDialog
          heading="Heading"
          fit="medium"
          closed={() => setDialogOpen(false)}
          {...(dialogOpen ? { open: true } : {})}
        >
          <span className="mds-text--medium-normal">
            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
            venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.{' '}
            <p>
              Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
              leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
            </p>
          </span>
          <McButton
            slot="primaryAction"
            appearance="primary"
            dialogaction="ok"
            variant="filled"
            width="auto"
            fit="medium"
          >
            OK
          </McButton>
          <McButton
            slot="secondaryAction"
            appearance="neutral"
            variant="outlined"
            dialogaction="cancel"
            width="auto"
            fit="medium"
          >
            Cancel
          </McButton>
        </McDialog>
        <div className={styles.card}>
          <McButton click={() => setDrawerOpen(true)} variant="filled">
            Open drawer
          </McButton>
          <McDrawer
            heading="Heading"
            fit="medium"
            closed={() => setDrawerOpen(false)}
            {...(drawerOpen ? { open: true } : {})}
          >
            <span className="mds-text--medium-normal">
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
              a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.{' '}
              <p>
                Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
                leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              </p>
            </span>
            <McButton slot="footer" appearance="primary" dialogaction="ok" variant="filled" fit="medium">
              OK
            </McButton>
            <McButton slot="footer" appearance="neutral" variant="outlined" dialogaction="cancel" fit="medium">
              Cancel
            </McButton>
          </McDrawer>
        </div>
      </div>
    </div>
  );
}
