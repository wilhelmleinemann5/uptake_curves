'use client';
import { useState, useEffect } from 'react';
import { McLabel } from '@maersk-global/mds-react-wrapper/components-core/mc-label';

export const Label = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McLabel>Test</McLabel> : null;
};
