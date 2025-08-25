'use client';
import { useState, useEffect } from 'react';
import { McSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-select';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const Select = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McSelect>
      <McOption value="1">One</McOption>
      <McOption value="2">Two</McOption>
      <McOption value="3">Three</McOption>
      <McOption value="4">Four</McOption>
      <McOption value="5">Five</McOption>
    </McSelect>
  ) : null;
};
