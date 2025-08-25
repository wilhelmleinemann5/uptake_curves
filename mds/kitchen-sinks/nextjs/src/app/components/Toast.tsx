'use client';
import { useState, useEffect } from 'react';
import { McToast } from '@maersk-global/mds-react-wrapper/components-core/mc-toast';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';

export const Toast = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McToast>
      <McButton label="Toast" slot="trigger"></McButton>
      <McNotification body="Body text"></McNotification>
    </McToast>
  ) : null;
};
