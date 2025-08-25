'use client';
import { useState, useEffect } from 'react';
import { McSelectNative } from '@maersk-global/mds-react-wrapper/components-core/mc-select-native';

export const SelectNative = () => {
  const [isClient, setIsClient] = useState(false);
  const options = [
    { value: 0, label: 'Zero' },
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
    { value: 4, label: 'Four' },
    { value: 5, label: 'Five' },
  ];
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McSelectNative options={options} selectedindex={[0]}></McSelectNative> : null;
};
