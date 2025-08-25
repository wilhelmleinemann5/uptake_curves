export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-segmented-control";

// CSS
mc-segmented-control::part(list) {
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
}

// HTML
<mc-segmented-control type="single">
    <mc-segmented-control-item selected hiddenlabel value="Bicycle" label="Bicycle" icon="bicycle"></mc-segmented-control-item>
    <mc-segmented-control-item hiddenlabel value="Car" label="Car" icon="car-side"></mc-segmented-control-item>
    <mc-segmented-control-item hiddenlabel value="Vessel" label="Vessel" icon="vessel-side"></mc-segmented-control-item>
    <mc-segmented-control-item hiddenlabel value="Airplane" label="Airplane" icon="airplane"></mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'javascript',
    copy: true,
  },
];
