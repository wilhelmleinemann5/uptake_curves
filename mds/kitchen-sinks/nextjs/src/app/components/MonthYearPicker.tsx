'use client';
import { useState, useEffect } from 'react';
import { McMonthYearPicker } from '@maersk-global/mds-react-wrapper/components-core/mc-month-year-picker';

export const MonthYearPicker = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McMonthYearPicker></McMonthYearPicker> : null;
};
