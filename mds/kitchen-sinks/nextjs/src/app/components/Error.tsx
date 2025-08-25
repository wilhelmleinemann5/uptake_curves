'use client';
import { useState, useEffect } from 'react';
import { McError } from '@maersk-global/mds-react-wrapper/components-core/mc-error';

export const Error = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McError invalid errormessage="Test"></McError> : null;
};
