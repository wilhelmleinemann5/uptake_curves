'use client';
import { useState, useEffect } from 'react';
import { McTypeahead } from '@maersk-global/mds-react-wrapper/components-core/mc-typeahead';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const Typeahead = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McTypeahead>
      <McOption value="One">One</McOption>
      <McOption value="Two">Two</McOption>
      <McOption value="Three" disabled>
        Three
      </McOption>
      <McOption value="Four">Four</McOption>
      <McOption value="Five">Five</McOption>
    </McTypeahead>
  ) : null;
};
