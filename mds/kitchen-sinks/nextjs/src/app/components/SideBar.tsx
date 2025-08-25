'use client';
import { useState, useEffect } from 'react';
import { McSideBar } from '@maersk-global/mds-react-wrapper/components-core/mc-side-bar';

export const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McSideBar>{children}</McSideBar> : null;
};
