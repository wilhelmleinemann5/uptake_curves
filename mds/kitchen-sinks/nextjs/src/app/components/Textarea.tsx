'use client';
import { useState, useEffect } from 'react';
import { McTextarea } from '@maersk-global/mds-react-wrapper/components-core/mc-textarea';

export const Textarea = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McTextarea label="Test"></McTextarea> : null;
};
