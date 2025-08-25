'use client';
import { useState, useEffect } from 'react';
import { McThemeSwitch } from '@maersk-global/mds-react-wrapper/components-core/mc-theme-switch';

export const ThemeSwitch = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McThemeSwitch></McThemeSwitch> : null;
};
