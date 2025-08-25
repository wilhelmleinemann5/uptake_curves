import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { states } from './_states';
import { Fit } from '@maersk-global/mds-shared-types';

const heading = 'Heading';
const componentsData = [
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: '',
    body: 'Body text',
    position: 'left',
    headAsSlot: true,
    bodyAsSlot: true,
  },
  {
    fit: 'small',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'small',
    dimension: 'large',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'medium',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'medium',
    dimension: 'large',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    position: 'left',
    headAsSlot: false,
    bodyAsSlot: false,
    width: '300px',
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    position: 'bottom',
    headAsSlot: false,
    bodyAsSlot: false,
    width: '300px',
    height: '300px',
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: '',
    body: 'Body text',
    position: 'left',
    headAsSlot: true,
    bodyAsSlot: true,
    width: '75%',
  },
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    body: 'Body text',
    position: 'bottom',
    headAsSlot: false,
    bodyAsSlot: false,
    width: '75%',
    height: '75%',
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    position: 'right',
    headAsSlot: true,
    bodyAsSlot: true,
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    position: 'top',
    headAsSlot: true,
    bodyAsSlot: true,
  },
  {
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Body text',
    position: 'bottom',
    headAsSlot: true,
    bodyAsSlot: true,
  },
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
    fit: 'medium',
    dimension: 'medium',
    heading: heading,
    body: 'Testing for long text '.repeat(200),
    headAsSlot: false,
    bodyAsSlot: false,
    nonmodal: true,
    nopadding: true,
    disablestickyfooter: true,
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
    position: data.position,
    nonmodal: data.nonmodal,
    nopadding: data.nopadding,
    disablestickyfooter: data.disablestickyfooter,
    generatedStates: generateStates({
      componentName: 'mc-drawer',
      states: states(
        data.fit,
        data.dimension,
        data.heading,
        data.body,
        data.position || 'right',
        data.headAsSlot,
        data.bodyAsSlot,
        data.width,
        data.height,
        data.nonmodal || false,
        data.nopadding || false,
        data.disablestickyfooter || false,
      ),
      fits: [data.fit as Fit],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-drawer", title: "mc-drawer VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(
          component.generatedStates,
          `${component.fit}_${component.dimension}_${component.heading}_${component.headAsSlot}_${
            component.bodyAsSlot
          }_${component.position || 'right'}${component.nonmodal ? '_nonmodal' : ''}${component.nopadding ? '_nopadding' : ''}_${component.nopadding}_${component.width.replace('%', 'percentile')}_${component.height.replace('%', 'percentile')}`,
        ),
      };
    }, {}),
});
