'use client';
import { useState, useEffect } from 'react';
import { McTextAndIcon } from '@maersk-global/mds-react-wrapper/components-core/mc-text-and-icon';

export const TextAndIcon = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McTextAndIcon icon="star">Test</McTextAndIcon> : null;
};
