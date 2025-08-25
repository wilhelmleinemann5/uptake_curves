import { McTable } from '@maersk-global/mds-react-wrapper/components-core/mc-table';

export const Table = () => {
  const data = [
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
  return <McTable data={data}></McTable>;
};
