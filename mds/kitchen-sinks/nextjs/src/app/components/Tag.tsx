'use client';
import { useState, useEffect } from 'react';
import { McTag } from '@maersk-global/mds-react-wrapper/components-core/mc-tag';

export const Tag = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McTag>Test</McTag> : null;
};
