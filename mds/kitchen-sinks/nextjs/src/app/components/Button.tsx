'use client';
import { useState, useEffect } from 'react';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Button = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McButton icon="star" label="Test"></McButton> : null;
};
