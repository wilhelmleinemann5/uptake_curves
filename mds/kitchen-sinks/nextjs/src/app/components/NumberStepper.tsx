'use client';
import { useState, useEffect } from 'react';
import { McNumberStepper } from '@maersk-global/mds-react-wrapper/components-core/mc-number-stepper';

export const NumberStepper = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McNumberStepper label="Test"></McNumberStepper> : null;
};
