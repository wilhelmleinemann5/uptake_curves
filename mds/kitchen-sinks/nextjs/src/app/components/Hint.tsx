'use client';
import { useState, useEffect } from 'react';
import { McHint } from '@maersk-global/mds-react-wrapper/components-core/mc-hint';

export const Hint = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McHint hint="Test"></McHint> : null;
};
