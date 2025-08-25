'use client';
import { useState, useEffect } from 'react';
import { McLinkButton } from '@maersk-global/mds-react-wrapper/components-core/mc-link-button';

export const LinkButton = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McLinkButton href="http://maersk.com">Test</McLinkButton> : null;
};
