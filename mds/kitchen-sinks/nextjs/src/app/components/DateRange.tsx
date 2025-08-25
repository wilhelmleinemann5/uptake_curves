'use client';
import { useState, useEffect } from 'react';
import { McDateRange } from '@maersk-global/mds-react-wrapper/components-core/mc-date-range';

export const DateRange = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McDateRange></McDateRange> : null;
};
