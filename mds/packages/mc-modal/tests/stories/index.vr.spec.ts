import { states } from './_states';
import { defineStories, generateStates, generateThemeStories } from '@maersk-global/mds-dev-utils/lib/storybook';
import { Fit } from '@maersk-global/mds-shared-types';

const heading = 'Heading';
const longHeading = 'Lorem ipsum Quisque blandit dolor vel ullamcorper fringilla etiam ut ultricies nibh.';
const componentsData = [
  { fit: 'small', dimension: 'small', heading: heading, headAsSlot: false, closable: true },
  { fit: 'small', dimension: 'small', heading: longHeading, headAsSlot: false, closable: true },
  { fit: 'small', dimension: 'small', heading: longHeading, headAsSlot: false, closable: false },
  { fit: 'small', dimension: 'small', heading: '', headAsSlot: true, closable: true },
  { fit: 'small', dimension: 'medium', heading: heading, headAsSlot: false, closable: true },
  { fit: 'small', dimension: 'large', heading: heading, headAsSlot: false, closable: true },
  { fit: 'medium', dimension: 'small', heading: heading, headAsSlot: false, closable: true },
  { fit: 'medium', dimension: 'medium', heading: heading, headAsSlot: false, closable: true },
  { fit: 'medium', dimension: 'large', heading: heading, headAsSlot: false, closable: true },
  {
    fit: 'small',
    dimension: 'small',
    heading: heading,
    headAsSlot: false,
    width: '300px',
    height: '400px',
    closable: true,
  },
  { fit: 'small', dimension: 'small', heading: '', headAsSlot: true, width: '300px', height: '400px', closable: true },
  { fit: 'medium', dimension: 'medium', heading: '', headAsSlot: true, width: '75%', height: '30%', closable: true },
];

const components = componentsData.map((data) => {
  return {
    fit: data.fit,
    dimension: data.dimension,
    isLongHeading: data.heading.length > 15,
    heading: data.heading === '' ? 'NoHeading' : data.heading,
    headAsSlot: data.headAsSlot ? 'HeadingAsSlot' : 'HeadingAsProp',
    width: data.width ? data.width : 'auto',
    height: data.height ? data.height : 'auto',
    closable: data.closable,
    generatedStates: generateStates({
      componentName: 'mc-modal',
      states: states(data.fit, data.dimension, data.heading, data.headAsSlot, data.closable),
      fits: [data.fit as Fit],
    }),
  };
});

export default defineStories({
  baseCsf: `
      export default { component: "mc-modal", title: "mc-modal VR"};
    `,
  stories: () =>
    components.reduce((stories, component) => {
      return {
        ...stories,
        ...generateThemeStories(
          component.generatedStates,
          `${component.fit}_${component.dimension}_${component.isLongHeading ? 'longheading' : component.heading}${component.closable ? '' : '_noclosebutton'}_${
            component.headAsSlot
          }_${component.width.replace(/%/g, 'percentile')}_${component.height.replace(/%/g, 'percentile')}`,
        ),
      };
    }, {}),
});
