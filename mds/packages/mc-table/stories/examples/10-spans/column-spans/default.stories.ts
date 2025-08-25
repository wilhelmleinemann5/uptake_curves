import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-notification';
import '../../../../src/index';
import { TableColumn } from '../../../../src/lib/types';

const containerData = [
  {
    id: 1,
    leg: 1,
    eventType: 'Vessel arrival',
    location: 'Shanghai, China',
    eventModifiedOn: '17 Jan 2025 16:45 CN',
    eventDetails: 'Added Location to CNSGN',
    modifiedBy: 'Maersk user',
  },
  {
    id: 2,
    leg: 1,
    eventType: 'Vessel departure',
    location: 'NINGBO, China',
    eventModifiedOn: '18 Jan 2025 10:30 CN',
    eventDetails: 'Added Location to CNNGB',
    modifiedBy: 'Maersk user',
  },
  {
    id: 3,
    leg: 2,
    eventType: 'Vessel arrival',
    location: 'Rotterdam, Netherlands',
    eventModifiedOn: '18 Jan 2025 14:30 CN',
    eventDetails: 'Added Location to NLROT',
    modifiedBy: 'Maersk user',
  },
  {
    id: 4,
    leg: 2,
    eventType: 'Vessel departure',
    location: 'Shanghai, China',
    eventModifiedOn: '18 Jan 2025 18:30 CN',
    eventDetails: 'Added Location to CNSGN',
    modifiedBy: 'Maersk user',
  },
];

const meta: Meta = {
  title: 'Components/Table/Examples/10-Spans',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const legColumn = {
      id: 'leg',
      label: 'Leg',
      width: '5%',
      align: 'center',
      rowspan: 2,
    };
    const eventTypeColumn = {
      id: 'eventType',
      label: 'Event type',
    };
    const locationColumn = {
      id: 'location',
      label: 'Location',
    };
    const eventModifiedOnColumn = {
      id: 'eventModifiedOn',
      label: 'Event modified on',
    };
    const eventDetailsColumn = {
      id: 'eventDetails',
      label: 'Event details',
    };
    const modifiedByColumn = {
      id: 'modifiedBy',
      label: 'Modified by',
    };

    const defaultColumns: TableColumn[] = [
      legColumn,
      eventTypeColumn,
      locationColumn,
      eventModifiedOnColumn,
      eventDetailsColumn,
      modifiedByColumn,
    ];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-notification
        class="story-notification"
        heading="How to apply the spans"
        variant="info"
        style="margin-bottom: 1rem"
      >
        You can add colspan or rowspan on the column level, which will apply to all cells in the column. In the example
        below, the Leg column has a rowspan of 2, which means that every second cell will be skipped in the column. If
        you are looking for header spans, please check the
        <a
          href="https://mds.maersk.com/?path=/story/components-table-examples-03-header--header-groups&globals=cssVariables:!undefined"
          >header groups</a
        >
        example.
      </mc-notification>
      <mc-table sortdisabled .data=${containerData} .columns=${defaultColumns} verticallinestyle="solid"></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const ColumnRowAndColSpan: StoryObj = {};
