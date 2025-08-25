const slotsMenu = [
  {
    name: 'default',
    content: `
    <nav role="navigation" aria-label="top navigation">
      <ol class="mds-list--horizontal">
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Apple</a>
        </li>
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Orange</a>
        </li>
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Lemon</a>
        </li>
      </ol>
    </nav>`,
  },
];
const slotsActions = [
  {
    name: 'actions',
    content: `
      <span slot="actions">
        <mc-button slot="trigger" icon="cog" variant="plain" appearance="neutral" fit="small" hiddenlabel>Menu</mc-button>
        <mc-avatar info="info" initials="JD" hiddentooltip fit="small" appearance="color-3"> </mc-avatar>
      </span>`,
  },
];

const slotLink = [
  {
    name: 'link',
    content: `
      <a slot="link" href="https://designsystem.maersk.com">Home</a>`,
  },
];

export const states = [
  { accessibility: false },
  { product: 'Maersk Design System', accessibility: false },
  { product: 'Maersk Design System', href: 'https://designsystem.maersk.com', accessibility: false },
  { product: 'Maersk Design System', slots: slotsMenu, accessibility: false },
  { product: 'Maersk Design System', slots: slotLink, accessibility: false },
  { product: 'Maersk Design System', slots: slotsActions, accessibility: false },
  { product: 'Maersk Design System', slots: [...slotsActions, ...slotsMenu], accessibility: false },
  {
    product: 'Maersk Design System',
    productshort: 'MDS',
    slots: [...slotsActions, ...slotsMenu],
    accessibility: true,
  },
  { slots: [...slotsActions, ...slotsMenu], accessibility: false },
];
