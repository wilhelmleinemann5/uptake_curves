'use client';
import { useState, useEffect } from 'react';
import { McRadio } from '@maersk-global/mds-react-wrapper/components-core/mc-radio';

export const Radio = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McRadio label="Test"></McRadio> : null;
};
