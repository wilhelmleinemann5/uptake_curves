'use client';
import { useState, useEffect } from 'react';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';

export const Notification = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McNotification heading="Heading" body="Body text"></McNotification> : null;
};
