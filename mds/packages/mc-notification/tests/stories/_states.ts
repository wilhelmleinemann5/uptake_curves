export const states = [
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: '',
    actions: [],
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'heart',
    actions: [
      { url: 'https://designsystem.maersk.com', label: 'Design System' },
      {
        url: 'https://designsystem.maersk.com/more/roadmap',
        label: 'OKRs & Roadmap',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    ],
    accessibility: true,
  },
  {
    heading: '',
    body: 'Body text',
    icon: 'heart',
    actions: [],
    accessibility: false,
  },
  {
    heading: 'Heading',
    body: 'Body text',
    icon: 'heart',
    verticalalign: 'middle',
    closable: true,
    accessibility: false,
  },
  {
    heading: '',
    body: '',
    icon: 'heart',
    actions: [
      { url: 'https://designsystem.maersk.com', label: 'Design System' },
      {
        url: 'https://designsystem.maersk.com/more/roadmap',
        label: 'OKRs & Roadmap',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    ],
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'heart',
    width: '50%',
    actions: [
      { url: 'https://designsystem.maersk.com', label: 'Design System' },
      {
        url: 'https://designsystem.maersk.com/more/roadmap',
        label: 'OKRs & Roadmap',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    ],
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'heart',
    closable: true,
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'heart',
    width: '50%',
    closable: true,
    accessibility: false,
  },
  {
    heading: 'With long heading text that should not go under the close icon but wrap to the next line',
    body: 'Body text',
    icon: 'heart',
    width: '50%',
    closable: true,
    accessibility: false,
  },
  {
    heading: 'Heading text',
    icon: 'heart',
    slots: [
      {
        content: `Body as HTML with custom <a href="https://designsystem.maersk.com/components/button/index.html">link</a>`,
      },
    ],
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'heart',
    slots: [
      {
        name: 'actions',
        content: `<span slot="actions" class="mc-notification__actions">
                    <a href="http://designsystem.maersk.com">Maersk Design System</a> 
                    <a href="http://www.google.com">Google</a>
                  </span>`,
      },
    ],
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    icon: 'info-circle',
    slots: [
      {
        name: 'actions',
        content: `<span slot="actions" class="mc-notification__actions">
                    <mc-button variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
                  </span>`,
      },
    ],
    closable: true,
    actionsposition: 'right',
    accessibility: false,
  },
  {
    body: 'Body text',
    icon: 'info-circle',
    slots: [
      {
        name: 'actions',
        content: `<span slot="actions" class="mc-notification__actions">
                    <mc-button variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
                  </span>`,
      },
    ],
    closable: true,
    verticalalign: 'middle',
    actionsposition: 'right',
    accessibility: false,
  },
  {
    heading: 'Heading text',
    body: 'Body text',
    slots: [
      {
        name: 'icon',
        content: `<div slot="icon"><mc-icon icon="star"></mc-icon></div>`,
      },
    ],
    accessibility: false,
  },
];
