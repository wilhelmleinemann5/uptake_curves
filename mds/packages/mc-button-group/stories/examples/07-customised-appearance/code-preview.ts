export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-button-group";

// CSS
mc-button-group::part(list) {
  box-shadow: var(--mds_brand_appearance_shadow_high_first-layer_offset-x) 
    var(--mds_brand_appearance_shadow_high_first-layer_offset-y) 
    var(--mds_brand_appearance_shadow_high_first-layer_blur-radius) 
    var(--mds_brand_appearance_shadow_high_first-layer_spread-radius) 
    var(--mds_brand_appearance_shadow_high_first-layer_color), 
    var(--mds_brand_appearance_shadow_high_second-layer_offset-x) 
    var(--mds_brand_appearance_shadow_high_second-layer_offset-y) 
    var(--mds_brand_appearance_shadow_high_second-layer_blur-radius) 
    var(--mds_brand_appearance_shadow_high_second-layer_spread-radius) 
    var(--mds_brand_appearance_shadow_high_second-layer_color), 
    var(--mds_brand_appearance_shadow_high_third-layer_offset-x) 
    var(--mds_brand_appearance_shadow_high_third-layer_offset-y) 
    var(--mds_brand_appearance_shadow_high_third-layer_blur-radius) 
    var(--mds_brand_appearance_shadow_high_third-layer_spread-radius) 
    var(--mds_brand_appearance_shadow_high_third-layer_color);
  width: auto;
}

// HTML
<mc-button-group selectiontype="single">
  <mc-button-group-item hiddenlabel value="Apples" label="Apples" icon="apple"></mc-button-group-item>
  <mc-button-group-item hiddenlabel value="Bananas" label="Bananas" icon="banana"></mc-button-group-item>
  <mc-button-group-item hiddenlabel value="Carrots" label="Carrots" icon="carrot"></mc-button-group-item>
  <mc-button-group-item hiddenlabel value="Lemons" label="Lemons" icon="lemon"></mc-button-group-item>
</mc-button-group>`,
    language: 'javascript',
    copy: true,
  },
];
