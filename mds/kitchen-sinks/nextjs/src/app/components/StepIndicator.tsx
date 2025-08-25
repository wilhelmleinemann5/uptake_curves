'use client';
import { useState, useEffect } from 'react';
import { McStepIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-step-indicator';
import { McStepIndicatorItem } from '@maersk-global/mds-react-wrapper/components-core/mc-step-indicator-item';

export const StepIndicator = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McStepIndicator style={{ display: 'block', width: '80%', margin: '0 auto' }}>
      <McStepIndicatorItem state="completed" label="ETD"></McStepIndicatorItem>
      <McStepIndicatorItem state="completed" label="Release Sent"></McStepIndicatorItem>
      <McStepIndicatorItem state="current" label="Carrier Released"></McStepIndicatorItem>
      <McStepIndicatorItem label="ETA" state="pending"></McStepIndicatorItem>
    </McStepIndicator>
  ) : null;
};
