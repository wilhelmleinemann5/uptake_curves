'use client';
import { useState, useEffect } from 'react';
import { McSwitch } from '@maersk-global/mds-react-wrapper/components-core/mc-switch';

export const Switch = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McSwitch label="Test"></McSwitch> : null;
};
