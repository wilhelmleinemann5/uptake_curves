'use client';
import { useState, useEffect } from 'react';
import { McCard } from '@maersk-global/mds-react-wrapper/components-core/mc-card';

export const Card = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McCard heading="Test"></McCard> : null;
};
