'use client';
import { useState, useEffect } from 'react';
import { McTopBar } from '@maersk-global/mds-react-wrapper/components-core/mc-top-bar';

export const TopBar = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McTopBar product="Next.js" productshort="Next.js" href="/"></McTopBar> : null;
};
