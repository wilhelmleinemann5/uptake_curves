import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { Fit } from '@maersk-global/mds-shared-types';

const heading = 'Heading';
const componentsData = [
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  { fit: 'small', dimension: 'small', heading: '', body: 'Body text', headAsSlot: true, bodyAsSlot: true },
  { fit: 'small', dimension: 'medium', heading: heading, body: 'Body text', headAsSlot: false, bodyAsSlot: false },
  { fit: 'small', dimension: 'large', heading: heading, body: 'Body text', headAsSlot: false, bodyAsSlot: false },
  { fit: 'medium', dimension: 'small', heading: heading, body: 'Body text', headAsSlot: false, bodyAsSlot: false },
  { fit: 'medium', dimension: 'medium', heading: heading, body: 'Body text', headAsSlot: false, bodyAsSlot: false },
  { fit: 'medium', dimension: 'large', heading: heading, body: 'Body text', headAsSlot: false, bodyAsSlot: false },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    headAsSlot: false,
    bodyAsSlot: false,
    nonmodal: true,
    nopadding: true,
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    headAsSlot: false,
    bodyAsSlot: false,
    width: '300px',
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: '',
    body: 'Body text',
    headAsSlot: true,
    bodyAsSlot: true,
    width: '300px',
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: '',
    body: 'Body text',
    headAsSlot: true,
    bodyAsSlot: true,
    width: '75%',
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    headAsSlot: false,
    bodyAsSlot: false,
    bodyAsPureText: true,
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: '',
    body: 'Body text',
    headAsSlot: true,
    bodyAsSlot: true,
    width: 'auto',
    height: 'auto',
  },
];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    dimension: data.dimension,
    heading: data.heading === '' ? 'NoHeading' : data.heading,
    body: data.body === '' ? 'NoBody' : data.body,
    headAsSlot: data.headAsSlot ? 'HeadingAsSlot' : 'HeadingAsProp',
    bodyAsSlot: data.bodyAsSlot ? 'BodyAsSlot' : 'BodyAsProp',
    width: data.width ? data.width : 'auto',
    height: data.height ? data.height : 'auto',
    nonmodal: data.nonmodal,
    nopadding: data.nopadding,
    bodyAsPureText: data.bodyAsPureText,
    generatedStates: generateStates({
      componentName: 'mc-dialog',
      states: states(
        data.fit,
        data.dimension,
        data.heading,
        data.body,
        data.headAsSlot,
        data.bodyAsSlot,
        data.nonmodal || false,
        data.nopadding || false,
        data.bodyAsPureText || false,
        data.width,
        data.height,
      ),
      fits: [data.fit as Fit],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-dialog", title: "mc-dialog VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(
          component.generatedStates,
          `${component.fit}_${component.dimension}_${component.heading}_${component.headAsSlot}_${
            component.bodyAsSlot
          }${component.nonmodal ? '_nonmodal' : ''}${component.nopadding ? '_nopadding' : ''}${
            component.bodyAsPureText ? '_bodyAsPureText' : ''
          }_${component.width.replace('%', 'percentile')}_${component.height.replace('%', 'percentile')}`,
        ),
      };
    }, {}),
});
