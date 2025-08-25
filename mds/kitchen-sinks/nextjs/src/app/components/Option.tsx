'use client';
import { useState, useEffect } from 'react';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const Option = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McOption icon="star" label="Test"></McOption> : null;
};
