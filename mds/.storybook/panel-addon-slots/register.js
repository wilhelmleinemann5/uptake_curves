import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { SlotsPanel } from './DocsPanel';

const ADDON_ID = 'slots';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Slots',
    paramKey: 'slots',
    render: ({ active }) => {
      return (
        <AddonPanel active={active}>
          <SlotsPanel />
        </AddonPanel>
      );
    },
  });
});
