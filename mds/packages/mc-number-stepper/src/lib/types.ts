import { Min, Max, Step } from '@maersk-global/mds-components-core-input/types';

export type StepperDirection = 'min' | 'max';

export interface IMcNumberStepper {
  min?: Min;
  max?: Max;
  step?: Step;
  /** Label for the minus button.*/
  minuslabel?: string;
  /** Label for the plus button.*/
  pluslabel?: string;
}
