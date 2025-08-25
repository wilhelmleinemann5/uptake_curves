'use client';
import { useState, useEffect } from 'react';
import { McComponent } from '@maersk-global/mds-react-wrapper/components-core/mc-component';

export const Component = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McComponent></McComponent> : null;
};
