'use client';
import { useState, useEffect } from 'react';
import { McInputDate } from '@maersk-global/mds-react-wrapper/components-core/mc-input-date';

export const InputDate = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McInputDate></McInputDate> : null;
};
