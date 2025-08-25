'use client';
import { useState, useEffect } from 'react';
import { McTable } from '@maersk-global/mds-react-wrapper/components-core/mc-table';

export const Table = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
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
  return isClient ? <McTable data={data}></McTable> : null;
};
