export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `

// CSS
.content {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: center;
  width: 100%;
}

// HTML
<mc-popover trigger="focus" modalmode="x-small-screen">
  <h3 slot="heading">Vessel capacity</h3>
  <mc-input slot="trigger" trigger="click" label="Vessel capacity"></mc-input>
  <div class="content">
    <span>This vessel has 50% capacity left.</span>
    <mc-button label="Book"></mc-button>
  </div>
  <mc-button slot="footer">Ok</mc-button>
</mc-popover>`,
    language: 'javascript',
    copy: true,
  },
];
