export interface Vessel {
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

const getDate = (detla: number): string =>
  new Date(new Date().setDate(new Date().getDate() + detla)).toLocaleDateString();

const data = [
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
    lastUpdate: getDate(5),
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
    lastUpdate: getDate(6),
  },
];

export const dataWithSelectDisabled = data.map((vessel) => {
  if (vessel.id === 7) {
    return { ...vessel, selectDisabled: true };
  }
  return vessel;
});

export default data;
