'use client';
import { useState, useEffect } from 'react';
import { McInputTime } from '@maersk-global/mds-react-wrapper/components-core/mc-input-time';

export const InputTime = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McInputTime label="Test"></McInputTime> : null;
};
