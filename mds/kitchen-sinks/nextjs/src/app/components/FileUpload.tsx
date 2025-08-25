'use client';
import { useState, useEffect } from 'react';
import { McFileUpload } from '@maersk-global/mds-react-wrapper/components-core/mc-file-upload';

export const FileUpload = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McFileUpload></McFileUpload> : null;
};
