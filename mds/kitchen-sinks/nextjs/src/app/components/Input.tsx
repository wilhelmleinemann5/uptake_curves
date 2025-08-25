'use client';
import { useState, useEffect } from 'react';
import { McInput } from '@maersk-global/mds-react-wrapper/components-core/mc-input';

export const Input = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McInput label="Test"></McInput> : null;
};
