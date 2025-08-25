'use client';
import { useState, useEffect } from 'react';
import { McBadge } from '@maersk-global/mds-react-wrapper/components-core/mc-badge';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Badge = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McButton label="Test">
      <McBadge position="top" slot="badge" label="Test"></McBadge>
    </McButton>
  ) : null;
};
