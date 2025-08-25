import { cssPart, ICssPart } from '@maersk-global/mds-dev-utils';

export const cssParts: ICssPart[] = [
  cssPart('container', 'mc-card', 'main container', '', '', 'border-color: #222222;'),
  cssPart('image-container', 'mc-card', 'image container', '', '', 'opacity: 0.5;'),
  cssPart(
    'image-inner',
    'mc-card',
    'inner image container',
    '',
    '',
    'border-radius: var(--mds_brand_border_x-large_radius);',
  ),
  cssPart(
    'content-container',
    'mc-card',
    'content container',
    '',
    '',
    `margin: 0;
  padding: 16px;
  background-color: #F7F7F7;`,
  ),
  cssPart('content-inner', 'mc-card', 'inner content container', '', '', 'margin-bottom: 0;'),
  cssPart('header-container', 'mc-card', 'header container', '', '#0073AB'),
  cssPart('body-container', 'mc-card', 'body container', '', '#00243D'),
  cssPart('footer-container', 'mc-card', 'footer container', '', '#141414'),
  cssPart('actions-container', 'mc-card', 'action buttons container', '', '', 'margin-bottom: 0;'),
];
