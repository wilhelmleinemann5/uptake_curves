import { IComponentState, IGenerateStateArgs, ValueType } from './types';

const getValue = (value?: ValueType): string => {
  return value && typeof value === 'object' ? JSON.stringify(value) : `${value}`;
};

const getProps = (state: IComponentState): string => {
  return Object.entries(state)
    .filter(([key]) => key !== 'slots' && key !== 'class' && key !== 'arialabel')
    .reduce((propsString, [key, value]) => {
      if (typeof value === 'boolean') {
        if (value) {
          return `${propsString} ${key}`;
        }
      }
      if (Array.isArray(value) || typeof value === 'object') {
        //if the value is an array or object it will be assigned in the script below the component template in the generateStates function.
        //Stringifying it here was causing issues with data not being passed to the component.
        return propsString;
      }
      return `${propsString} ${key}='${getValue(value)}'`;
    }, '');
};

const getStateTitle = (
  stateNumber: number,
  state: IComponentState,
  appearance: string,
  variant: string,
  fit: string,
  excludedPropsFromTitle?: string[],
): string => {
  const title = Object.entries(state)
    .filter(([key]) => key !== 'slots' && key !== 'class' && key !== 'arialabel')
    .reduce(
      (propsString, [key, value], currentIndex) =>
        `${propsString} ${
          excludedPropsFromTitle && excludedPropsFromTitle.includes(key)
            ? ''
            : `${currentIndex === 0 ? '' : ' | '}${key}: ${
                typeof value === 'string' ? `"${getValue(value)}"` : getValue(value)
              }`
        }`,
      `${stateNumber} --> ${variant === 'unknown' ? '' : `variant="${variant}"`} 
        ${appearance === 'unknown' ? '' : `appearance="${appearance}"`} 
        ${fit === 'unknown' ? '' : `fit="${fit}"`}`,
    );

  return `${title} ${
    state.slots && (!excludedPropsFromTitle || (excludedPropsFromTitle && !excludedPropsFromTitle.includes('slots')))
      ? ` | slotted content: ${state.slots.map((slot) => slot.name).join(', ')}`
      : ''
  }`;
};

const mapStyles = (styles: Record<string, string | number> = {}): string =>
  Object.entries(styles).reduce(
    (aggregatedStyles, [styleName, styleValue]) => `${aggregatedStyles} ${styleName}:${styleValue};`,
    '',
  );

export const generateStates = ({
  componentName,
  states,
  excludedPropsFromTitle,
  fits = ['small', 'medium', 'large'],
  variants = ['unknown'],
  appearances = ['unknown'],
  cardClassList = [],
  cardItemAccessibilityAttributes = '',
}: IGenerateStateArgs): string => {
  let stateNumber = 0;
  return states
    .map((state) =>
      fits
        .map((fit) =>
          variants
            .map((variant) =>
              appearances
                .map((appearance) => {
                  stateNumber++;
                  const componentTemplate = `
                  <div style="${mapStyles(state.containerStyles)}">
                  <${componentName}
                  id="state-${stateNumber}"
                  class="no-animation ${state['hover'] ? 'hover' : ''}  ${state['focus'] ? 'focus' : ''} ${
                    state['active'] ? 'active' : ''
                  } ${state['class']}"
            ${variant === 'unknown' ? '' : `variant="${variant}"`}
            ${appearance === 'unknown' ? '' : `appearance="${appearance}"`}
            ${fit === 'unknown' ? '' : `fit="${fit}"`}
            ${state['arialabel'] ? `arialabel="${fit}-${variant}-${appearance}-${state['arialabel']}"` : ''}
            ${getProps(state)}
            >${state.slots ? state.slots.map((slot) => slot.content).join('') : ''}</${componentName}>
            </div>`;
                  return `<div
                class="e2e-canvas-card ${cardClassList.join(' ')}"
                style="${
                  appearance === 'inverse'
                    ? 'background-color: var(--mds_brand_appearance_neutral_inverse_background-color); color: var(--mds_brand_appearance_neutral_inverse_on-background-color);'
                    : ''
                } ">
                <div class="e2e-canvas-card-title">
                  ${getStateTitle(stateNumber, state, appearance, variant, fit, excludedPropsFromTitle)}
                </div>
                <div class="e2e-canvas-card-item" ${cardItemAccessibilityAttributes}>
                  ${componentTemplate}
                </div>
            </div>
            ${generatePropsAssignmentScript(stateNumber, state)}
            `;
                })
                .join(''),
            )
            .join(''),
        )
        .join(''),
    )
    .join('')
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/'/g, '"');
};

const generatePropsAssignmentScript = (stateNumber: number, state: IComponentState) => {
  //if a state does not have any values that are an arrys, return an empty string
  if (
    !Object.entries(state).some(([, value]) => {
      return Array.isArray(value) || typeof value === 'object';
    })
  ) {
    return '';
  }

  //if there is an array in the state and the key is not slots, return the script that will assing the value to the key in component
  const script = Object.entries(state)
    .filter(([key]) => key !== 'slots')
    .reduce((propsString, [key, value]) => {
      if (Array.isArray(value) || typeof value === 'object') {
        return `
          ${propsString}\n
           document.querySelector("#state-${stateNumber}").${key} = ${JSON.stringify(value)};`;
      }
      return propsString;
    }, ``);

  return `
    <script>
      ${script}
    </script>`;
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
