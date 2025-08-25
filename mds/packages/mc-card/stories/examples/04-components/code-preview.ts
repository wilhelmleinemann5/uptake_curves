export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-card";

// CSS
mc-card::part(image-container) {
  border: var(--mds_global_border_width) var(--mds_global_border_style) var(--mds_brand_appearance_neutral_default_border-color);
  border-radius: var(--mds_brand_border_small_radius);
}
mc-card::part(image-inner) {
  border-radius: var(--mds_brand_border_x-large_radius);
}

// HTML
<div style="display: grid; grid-template-columns: repeat(3, minmax(0px, 1fr)); row-gap: 32px; column-gap: 24px; margin: 24px 0; max-width: 788px;">
  <mc-card
    image="https://designsystem.maersk.com/components/checkbox/_images/thumbnail.svg"
    heading="Checkbox"
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
  <mc-card
    image="https://designsystem.maersk.com/components/input/_images/thumbnail.svg"
    heading="Input"
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
  <mc-card
    image="https://designsystem.maersk.com/components/loading-indicator/_images/thumbnail.svg"
    heading="Loading indicator"
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
  <mc-card
    image="https://designsystem.maersk.com/foundations/colours/_images/thumbnail.svg"
    heading="Colours"
    body="A flexible range of colours & shades for your user interface."
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
  <mc-card
    image="https://designsystem.maersk.com/foundations/typography/_images/thumbnail.svg"
    heading="Typography"
    body="Plays an integral role in brand recognition and tone of voice."
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
  <mc-card
    image="https://designsystem.maersk.com/foundations/icons/_images/thumbnail.svg"
    heading="Icons"
    body="Icons that are recommended and supported by the design system."
    variant="borderless"
    fit="small"
    imagescalestrength="prominent"
    href="https://designsystem.maersk.com"
  ></mc-card>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
