import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { DocsPanel } from './DocsPanel';

const ADDON_ID = 'cssparts';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS parts',
    paramKey: 'cssParts',
    render: ({ active }) => {
      return (
        <AddonPanel active={active}>
          <DocsPanel />
        </AddonPanel>
      );
    },
  });
});
