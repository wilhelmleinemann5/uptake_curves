'use client';
import { useState, useEffect } from 'react';
import { McIcon } from '@maersk-global/mds-react-wrapper/components-core/mc-icon';

export const Icon = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McIcon icon="star"></McIcon> : null;
};
