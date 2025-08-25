'use client';
import { useState, useEffect } from 'react';
import { McCheckboxGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-checkbox-group';
import { McCheckbox } from '@maersk-global/mds-react-wrapper/components-core/mc-checkbox';

export const CheckboxGroup = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McCheckboxGroup legend="Please select options">
      <McCheckbox name="fruit" value="Apple" label="Apple" checked></McCheckbox>
      <McCheckbox name="fruit" value="Orange" label="Orange"></McCheckbox>
      <McCheckbox name="fruit" value="Banana" label="Banana"></McCheckbox>
      <McCheckbox name="fruit" value="Lemon" label="Lemon"></McCheckbox>
    </McCheckboxGroup>
  ) : null;
};
