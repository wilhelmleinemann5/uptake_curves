'use client';
import { useState, useEffect } from 'react';
import { McProgressIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-progress-indicator';

export const ProgressIndicator = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McProgressIndicator label="progress indicator"></McProgressIndicator> : null;
};
