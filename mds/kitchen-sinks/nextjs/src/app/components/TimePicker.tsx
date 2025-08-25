'use client';
import { useState, useEffect } from 'react';
import { McTimePicker } from '@maersk-global/mds-react-wrapper/components-core/mc-time-picker';

export const TimePicker = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McTimePicker data-cy="mc-time-picker"></McTimePicker> : null;
};
