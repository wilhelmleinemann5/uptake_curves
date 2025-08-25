'use client';
import { useState, useEffect } from 'react';
import { McAvatar } from '@maersk-global/mds-react-wrapper/components-core/mc-avatar';

export const Avatar = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McAvatar info="info" appearance="color-1"></McAvatar> : null;
};
