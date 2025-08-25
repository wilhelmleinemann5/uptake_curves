import React, { FC } from 'react';
import { McTable } from '@maersk-global/mds-react-wrapper/components-core/mc-table';
import { McTag } from '@maersk-global/mds-react-wrapper/components-core/mc-tag';
import { McTooltip } from '@maersk-global/mds-react-wrapper/components-core/mc-tooltip';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McIcon } from '@maersk-global/mds-react-wrapper/components-core/mc-icon';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';
import { TagAppearance } from '@maersk-global/mds-components-core-tag/types';

// Define the vessel data interface
interface Vessel {
  id: number;
  name: string;
  type: string;
  built: string;
  length: number;
  capacity: number;
  inService: boolean;
  status: string;
  speed: string;
  position: string;
  lastPort: string;
  lastCountry: string;
  lastUpdate: string;
}

// Helper function to get dates relative to today
const getDate = (delta: number): string =>
  new Date(new Date().setDate(new Date().getDate() + delta)).toLocaleDateString();

// Sample vessel data
const data: Vessel[] = [
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
    lastUpdate: getDate(0),
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
    lastUpdate: getDate(1),
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
    lastUpdate: getDate(2),
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
    lastUpdate: getDate(3),
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
    lastUpdate: getDate(4),
  },
];

// Custom cell renderers
const NameCell: FC<{ rowData: Vessel }> = ({ rowData }) => (
  <div>
    <div className="mds-text--medium-bold">{rowData.name}</div>
    <div className="mds-table__subtext">{rowData.type}</div>
  </div>
);

const StatusHeader: FC = () => (
  <McTooltip position="top-center">
    <div className="mds-flex mds-gap-100 mds-items-center" slot="trigger">
      Status
      <McIcon icon="info"></McIcon>
    </div>
    <div>Shows the current status of the vessel:</div>
    <ul className="mds-list mds-list--unordered mds-mt-100">
      <li>On schedule - Vessel is on time</li>
      <li>Delayed - Minor delay reported</li>
      <li>Stalled - Major delay reported</li>
    </ul>
  </McTooltip>
);

const StatusCell: FC<{ value: string }> = ({ value }) => {
  let appearance;
  switch (value) {
    case 'On schedule':
      appearance = 'success';
      break;
    case 'Delayed':
      appearance = 'warning';
      break;
    case 'Stalled':
      appearance = 'error';
      break;
    default:
      appearance = 'default';
      break;
  }
  return <McTag appearance={appearance as TagAppearance}>{value}</McTag>;
};

const LastPortCell: FC<{ value: string }> = ({ value }) => (
  <a
    href={`https://www.google.com/maps/place/${value}`}
    target="_blank"
    rel="noopener noreferrer"
    className="mds-link--external"
  >
    {value}
  </a>
);

const PositionCell: FC<{ rowData: Vessel }> = ({ rowData }) => (
  <McButton
    label="Click me!"
    icon="pin"
    appearance="neutral"
    variant="outlined"
    onClick={() => alert(`You clicked "Click me!" for ${rowData.name}!`)}
  ></McButton>
);

const CapacityCell: FC<{ value: number }> = ({ value }) => (
  <McTooltip position="top-center">
    <div slot="trigger">Hover to see more</div>
    <span>{value} TEU</span>
  </McTooltip>
);

// Define columns
const columns = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'status',
    label: 'Status',
    nowrap: true,
  },
  {
    id: 'lastPort',
    label: 'Last port',
    sortDisabled: true,
    nowrap: true,
  },
  {
    id: 'position',
    label: 'Position',
    sortDisabled: true,
    nowrap: true,
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
  },
];

const TableCustomRenderers: FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 className="mds-text--heading-medium" style={{ marginBottom: '1rem' }}>
        Table with Custom Cell and Header Renderers
      </h2>

      <McTable fit="medium" data={data} columns={columns}>
        {/* Custom header renderers */}
        <div slot="header_status">
          <StatusHeader />
        </div>

        {/* Custom cell renderers */}
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <div slot={`${row.id}_name`}>
              <NameCell rowData={row} />
            </div>
            <div slot={`${row.id}_status`}>
              <StatusCell value={row.status} />
            </div>
            <div slot={`${row.id}_lastPort`}>
              <LastPortCell value={row.lastPort} />
            </div>
            <div slot={`${row.id}_position`}>
              <PositionCell rowData={row} />
            </div>
            <div slot={`${row.id}_capacity`}>
              <CapacityCell value={row.capacity} />
            </div>
          </React.Fragment>
        ))}
      </McTable>
    </div>
  );
};

export default TableCustomRenderers;
