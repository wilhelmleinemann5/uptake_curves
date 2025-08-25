'use client';
import { useState, useEffect } from 'react';
import { McCheckbox } from '@maersk-global/mds-react-wrapper/components-core/mc-checkbox';

export const Checkbox = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McCheckbox label="Test"></McCheckbox> : null;
};
