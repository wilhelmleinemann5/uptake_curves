'use client';
import { useState, useEffect } from 'react';
import { McLoadingIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-loading-indicator';

export const LoadingIndicator = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McLoadingIndicator></McLoadingIndicator> : null;
};
