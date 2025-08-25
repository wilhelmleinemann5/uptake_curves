'use client';
import { useState, useEffect } from 'react';
import { McCalendar } from '@maersk-global/mds-react-wrapper/components-core/mc-calendar';

export const Calendar = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McCalendar></McCalendar> : null;
};
