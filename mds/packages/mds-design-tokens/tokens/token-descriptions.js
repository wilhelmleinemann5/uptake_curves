/*
 * Descriptions for design tokens to be displayed on the website
 * Currently used by the json array format.
 * It is here rather than at a token level so that we do not have to duplicate
 * the comment for a token with each theme
 */
const tokenDescriptions = {
  global_border_width: 'Global border width. Use it to define the width of borders across the UI.',
  global_border_style: 'Global border style. Use it to define the style of borders across the UI.',
  'global_breakpoint_xs_min-width':
    'Global breakpoint XS (mobile devices) minimum width. Use it to define the minimum width for XS screens.',
  'global_breakpoint_xs_max-width':
    'Global breakpoint XS (mobile devices) maximum width. Use it to define the maximum width for XS screens.',
  'global_breakpoint_sm_min-width':
    'Global breakpoint SM (tablet devices) minimum width. Use it to define the minimum width for SM screens.',
  'global_breakpoint_sm_max-width':
    'Global breakpoint SM (tablet devices) maximum width. Use it to define the maximum width for SM screens.',
  'global_breakpoint_md_min-width':
    'Global breakpoint MD (desktop devices - viewing not a full screen browser window on a laptop) minimum width. Use it to define the minimum width for MD screens.',
  'global_breakpoint_md_max-width':
    'Global breakpoint MD (desktop devices - viewing not a full screen browser window on a laptop) maximum width. Use it to define the maximum width for MD screens.',
  'global_breakpoint_lg_min-width':
    'Global breakpoint LG (large desktop devices - typical external screens in the office) minimum width. Use it to define the minimum width for LG screens.',
  'global_breakpoint_lg_max-width':
    'Global breakpoint LG (large desktop devices - typical external screens in the office) maximum width. Use it to define the maximum width for LG screens.',
  'global_breakpoint_xl_min-width':
    'Global breakpoint XL (extra large desktop devices - wide screens and high resolution screens.) minimum width. Use it to define the minimum width for XL screens.',
  'global_link_inline_text-decoration':
    'Global link inline text decoration. Use it to define the text decoration for inline links.',
  'global_link_inline_hover_text-decoration':
    'Global link inline hover text decoration. Use it to define the text decoration for inline links when hovered.',
  'global_link_stand-alone_text-decoration':
    'Global link stand-alone text decoration. Use it to define the text decoration for stand-alone links.',
  'global_link_stand-alone_hover_text-decoration':
    'Global link stand-alone hover text decoration. Use it to define the text decoration for stand-alone links when hovered.',
  global_transition_slow_duration:
    'Global slow transition duration. Use it to define the duration of slow transitions across the UI.',
  global_transition_slow_timing:
    'Global slow transition timing function. Use it to define the timing function for slow transitions across the UI.',
  global_transition_medium_duration:
    'Global medium transition duration. Use it to define the duration of medium transitions across the UI.',
  global_transition_medium_timing:
    'Global medium transition timing function. Use it to define the timing function for medium transitions across the UI.',
  global_transition_fast_duration:
    'Global fast transition duration. Use it to define the duration of fast transitions across the UI.',
  global_transition_fast_timing:
    'Global fast transition timing function. Use it to define the timing function for fast transitions across the UI.',
  'brand_appearance_error_default_background-color':
    'Error default background color. Use it to indicate errors or critical issues that require immediate attention.',
  'brand_appearance_error_default_border-color':
    'Error default border color. Use it to indicate errors or critical issues that require immediate attention.',
  'brand_appearance_error_default_on-background-color':
    'Error default text color to be used on default background. Use it to indicate errors or critical issues that require immediate attention.',
  'brand_appearance_error_default_text-color':
    'Error default text color. Use it to indicate errors or critical issues that require immediate attention.',
  'brand_appearance_error_weak_background-color':
    'Error weak background color. Use it to indicate errors or critical issues in a less prominent way.',
  'brand_appearance_error_weak_border-color':
    'Error weak border color. Use it to indicate errors or critical issues in a less prominent way.',
  'brand_appearance_error_weak_on-background-color':
    'Error weak text color to be used on weak background. Use it to indicate errors or critical issues in a less prominent way.',
  'brand_appearance_info_default_background-color':
    'Info default background color. Use it to indicate informational messages or non-critical updates.',
  'brand_appearance_info_default_border-color':
    'Info default border color. Use it to indicate informational messages or non-critical updates.',
  'brand_appearance_info_default_on-background-color':
    'Info default text color to be used on default background. Use it to indicate informational messages or non-critical updates.',
  'brand_appearance_info_default_text-color':
    'Info default text color. Use it to indicate informational messages or non-critical updates.',
  'brand_appearance_info_weak_background-color':
    'Info weak background color. Use it to indicate informational messages or non-critical updates in a less prominent way.',
  'brand_appearance_info_weak_border-color':
    'Info weak border color. Use it to indicate informational messages or non-critical updates in a less prominent way.',
  'brand_appearance_info_weak_on-background-color':
    'Info weak text color to be used on weak background. Use it to indicate informational messages or non-critical updates in a less prominent way.',
  'brand_appearance_neutral_default_background-color': 'Neutral default background color.',
  'brand_appearance_neutral_default_border-color': 'Neutral default border color.',
  'brand_appearance_neutral_default_on-background-color':
    'Neutral default text color to be used on default background.',
  'brand_appearance_neutral_default_opacity_border-color': 'Neutral default border color with opacity.',
  'brand_appearance_neutral_default_text-color': 'Neutral default text color.',
  'brand_appearance_neutral_inverse_background-color': 'Neutral inverse background color.',
  'brand_appearance_neutral_inverse_border-color': 'Neutral inverse border color.',
  'brand_appearance_neutral_inverse_on-background-color':
    'Neutral inverse text color to be used on inverse background.',
  'brand_appearance_neutral_inverse_text-color': 'Neutral inverse text color.',
  'brand_appearance_neutral_strong_background-color': 'Neutral strong background color.',
  'brand_appearance_neutral_strong_on-background-color': 'Neutral strong text color to be used on strong background.',
  'brand_appearance_neutral_strongest_background-color': 'Neutral strongest background color.',
  'brand_appearance_neutral_strongest_on-background-color':
    'Neutral strongest text color to be used on strongest background.',
  'brand_appearance_neutral_weak_background-color': 'Neutral weak background color.',
  'brand_appearance_neutral_weak_border-color': 'Neutral weak border color.',
  'brand_appearance_neutral_weak_on-background-color': 'Neutral weak text color to be used on weak background.',
  'brand_appearance_neutral_weak_opacity_background-color': 'Neutral weak background color with opacity.',
  'brand_appearance_neutral_weak_text-color': 'Neutral weak text color.',
  'brand_appearance_neutral_weakest_background-color': 'Neutral weakest background color.',
  'brand_appearance_neutral_weakest_on-background-color':
    'Neutral weakest text color to be used on weakest background.',
  'brand_appearance_neutral_weakest_text-color': 'Neutral weakest text color.',
  brand_appearance_opacity_default_10:
    'Default opacity 10% for white background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_default_30:
    'Default opacity 30% for white background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_default_50:
    'Default opacity 50% for white background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_default_70:
    'Default opacity 70% for white background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_default_90:
    'Default opacity 90% for white background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_inverse_10:
    'Inverse opacity 10% for dark background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_inverse_30:
    'Inverse opacity 30% for dark background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_inverse_50:
    'Inverse opacity 50% for dark background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_inverse_70:
    'Inverse opacity 70% for dark background. Use it to create a semi-transparent effect.',
  brand_appearance_opacity_inverse_90:
    'Inverse opacity 90% for dark background. Use it to create a semi-transparent effect.',
  'brand_appearance_primary_default_background-color': 'Primary default background color.',
  'brand_appearance_primary_default_border-color': 'Primary default border color.',
  'brand_appearance_primary_default_link-color': 'Primary default link color.',
  'brand_appearance_primary_default_on-background-color':
    'Primary default text color to be used on default background.',
  'brand_appearance_primary_default_text-color': 'Primary default text color.',
  'brand_appearance_primary_weak_background-color': 'Primary weak background color.',
  'brand_appearance_primary_weak_border-color': 'Primary weak border color.',
  'brand_appearance_primary_weak_on-background-color': 'Primary weak text color to be used on weak background.',
  'brand_appearance_secondary_default_background-color':
    "Secondary default background color. It's a brand color. Use it sparingly, only in cases where it is needed to highlight important information or actions.",
  'brand_appearance_secondary_default_border-color':
    "Secondary default border color. It's a brand color. Use it sparingly, only in cases where it is needed to highlight important information or actions.",
  'brand_appearance_secondary_default_on-background-color':
    "Secondary default text color to be used on default background. It's a brand color. Use it sparingly, only in cases where it is needed to highlight important information or actions.",
  'brand_appearance_secondary_default_text-color':
    "Secondary default text color. It's a brand color. Use it sparingly, only in cases where it is needed to highlight important information or actions.",
  'brand_appearance_secondary_weak_background-color': 'Secondary weak background color.',
  'brand_appearance_secondary_weak_border-color': 'Secondary weak border color.',
  'brand_appearance_secondary_weak_on-background-color': 'Secondary weak text color to be used on weak background.',
  'brand_appearance_shadow_high_first-layer_blur-radius':
    'High shadow first layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_high_first-layer_color':
    'High shadow first layer color. Use it to create a strong shadow effect.',
  'brand_appearance_shadow_high_first-layer_offset-x':
    'High shadow first layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_high_first-layer_offset-y':
    'High shadow first layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_high_first-layer_spread-radius':
    'High shadow first layer spread radius. Use it to slightly reduce the size of the shadow.',
  'brand_appearance_shadow_high_second-layer_blur-radius':
    'High shadow second layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_high_second-layer_color':
    'High shadow second layer color. Use it to create a strong shadow effect.',
  'brand_appearance_shadow_high_second-layer_offset-x':
    'High shadow second layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_high_second-layer_offset-y':
    'High shadow second layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_high_second-layer_spread-radius':
    'High shadow second layer spread radius. Use it to slightly increase the size of the shadow.',
  'brand_appearance_shadow_high_third-layer_blur-radius':
    'High shadow third layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_high_third-layer_color':
    'High shadow third layer color. Use it to create a strong shadow effect.',
  'brand_appearance_shadow_high_third-layer_offset-x':
    'High shadow third layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_high_third-layer_offset-y':
    'High shadow third layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_high_third-layer_spread-radius':
    'High shadow third layer spread radius. Use it to significantly increase the size of the shadow.',
  'brand_appearance_shadow_low_first-layer_blur-radius':
    'Low shadow first layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_low_first-layer_color':
    'Low shadow first layer color. Use it to create a subtle shadow effect.',
  'brand_appearance_shadow_low_first-layer_offset-x':
    'Low shadow first layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_low_first-layer_offset-y':
    'Low shadow first layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_low_first-layer_spread-radius':
    'Low shadow first layer spread radius. Use it to slightly reduce the size of the shadow.',
  'brand_appearance_shadow_low_second-layer_blur-radius':
    'Low shadow second layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_low_second-layer_color':
    'Low shadow second layer color. Use it to create a subtle shadow effect.',
  'brand_appearance_shadow_low_second-layer_offset-x':
    'Low shadow second layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_low_second-layer_offset-y':
    'Low shadow second layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_low_second-layer_spread-radius':
    'Low shadow second layer spread radius. Use it to keep the shadow size consistent.',
  'brand_appearance_shadow_low_third-layer_blur-radius':
    'Low shadow third layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_low_third-layer_color':
    'Low shadow third layer color. Use it to create a subtle shadow effect.',
  'brand_appearance_shadow_low_third-layer_offset-x':
    'Low shadow third layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_low_third-layer_offset-y':
    'Low shadow third layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_low_third-layer_spread-radius':
    'Low shadow third layer spread radius. Use it to keep the shadow size consistent.',
  'brand_appearance_shadow_medium_first-layer_blur-radius':
    'Medium shadow first layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_medium_first-layer_color':
    'Medium shadow first layer color. Use it to create a more pronounced shadow effect.',
  'brand_appearance_shadow_medium_first-layer_offset-x':
    'Medium shadow first layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_medium_first-layer_offset-y':
    'Medium shadow first layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_medium_first-layer_spread-radius':
    'Medium shadow first layer spread radius. Use it to slightly reduce the size of the shadow.',
  'brand_appearance_shadow_medium_second-layer_blur-radius':
    'Medium shadow second layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_medium_second-layer_color':
    'Medium shadow second layer color. Use it to create a more pronounced shadow effect.',
  'brand_appearance_shadow_medium_second-layer_offset-x':
    'Medium shadow second layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_medium_second-layer_offset-y':
    'Medium shadow second layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_medium_second-layer_spread-radius':
    'Medium shadow second layer spread radius. Use it to slightly increase the size of the shadow.',
  'brand_appearance_shadow_medium_third-layer_blur-radius':
    'Medium shadow third layer blur radius. Use it to create a soft shadow effect.',
  'brand_appearance_shadow_medium_third-layer_color':
    'Medium shadow third layer color. Use it to create a more pronounced shadow effect.',
  'brand_appearance_shadow_medium_third-layer_offset-x':
    'Medium shadow third layer horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_shadow_medium_third-layer_offset-y':
    'Medium shadow third layer vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_shadow_medium_third-layer_spread-radius':
    'Medium shadow third layer spread radius. Use it to slightly increase the size of the shadow.',
  brand_appearance_state_disabled_opacity:
    'Disabled opacity. Use it to indicate that an element is disabled and not interactive.',
  'brand_appearance_state_error_default_active_background-color':
    'Error default active background color. Use it for error elements that require an active state.',
  'brand_appearance_state_error_default_hover_background-color':
    'Error default hover background color. Use it for error elements that require a hover state.',
  'brand_appearance_state_error_weakest_opacity_active_background-color':
    'Error weakest active background color. Use it for error elements that require a subtle active effect.',
  'brand_appearance_state_error_weakest_opacity_hover_background-color':
    'Error weakest hover background color. Use it for error elements that require a subtle hover effect.',
  'brand_appearance_state_focus_border-color': 'Focus border color. Use it to indicate focus state on elements.',
  'brand_appearance_state_focus_default_shadow_blur-radius':
    'Focus shadow blur radius. Use it to create a soft shadow effect.',
  brand_appearance_state_focus_default_shadow_color: 'Focus shadow color. Use it to create a strong focus effect.',
  'brand_appearance_state_focus_default_shadow_offset-x':
    'Focus shadow horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_state_focus_default_shadow_offset-y':
    'Focus shadow vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_state_focus_default_shadow_spread-radius':
    'Focus shadow spread radius. Use it to slightly increase the size of the shadow.',
  'brand_appearance_state_focus_vanity_shadow_blur-radius':
    'Focus vanity shadow blur radius. Use it to create a soft shadow effect.',
  brand_appearance_state_focus_vanity_shadow_color:
    'Focus vanity shadow color. Use it to create a strong focus effect.',
  'brand_appearance_state_focus_vanity_shadow_offset-x':
    'Focus vanity shadow horizontal offset. Use it to position the shadow slightly to the right.',
  'brand_appearance_state_focus_vanity_shadow_offset-y':
    'Focus vanity shadow vertical offset. Use it to position the shadow slightly below the element.',
  'brand_appearance_state_focus_vanity_shadow_spread-radius':
    'Focus vanity shadow spread radius. Use it to slightly increase the size of the shadow.',
  'brand_appearance_state_info_default_active_background-color':
    'Info default active background color. Use it for info elements that require an active state.',
  'brand_appearance_state_info_default_hover_background-color':
    'Info default hover background color. Use it for info elements that require a hover state.',
  'brand_appearance_state_neutral_default_active_background-color':
    'Neutral default active background color. Use it for neutral elements that require an active state.',
  'brand_appearance_state_neutral_default_active_border-color':
    'Neutral default active border color. Use it for neutral elements that require an active state.',
  'brand_appearance_state_neutral_default_hover_background-color':
    'Neutral default hover background color. Use it for neutral elements that require a hover state.',
  'brand_appearance_state_neutral_default_hover_border-color':
    'Neutral default hover border color. Use it for neutral elements that require a hover state.',
  'brand_appearance_state_neutral_inverse_opacity_active_background-color':
    'Neutral inverse active background color. Use it for neutral elements that require a subtle active effect on dark backgrounds.',
  'brand_appearance_state_neutral_inverse_opacity_hover_background-color':
    'Neutral inverse hover background color. Use it for neutral elements that require a subtle hover effect on dark backgrounds.',
  'brand_appearance_state_neutral_strongest_active_background-color':
    'Neutral strongest active background color. Use it for neutral elements that require a strong active effect.',
  'brand_appearance_state_neutral_strongest_hover_background-color':
    'Neutral strongest hover background color. Use it for neutral elements that require a strong hover effect.',
  'brand_appearance_state_neutral_weak_opacity_active_background-color':
    'Neutral weak active background color. Use it for neutral elements that require a more pronounced active effect.',
  'brand_appearance_state_neutral_weak_opacity_hover_background-color':
    'Neutral weak hover background color. Use it for neutral elements that require a more pronounced hover effect.',
  'brand_appearance_state_neutral_weakest_opacity_active_background-color':
    'Neutral weakest active background color. Use it for neutral elements that require a subtle active effect.',
  'brand_appearance_state_neutral_weakest_opacity_hover_background-color':
    'Neutral weakest hover background color. Use it for neutral elements that require a subtle hover effect.',
  'brand_appearance_state_primary_default_active_background-color':
    'Primary default active background color. Use it for primary elements that require an active state.',
  'brand_appearance_state_primary_default_active_border-color':
    'Primary default active border color. Use it for primary elements that require an active state.',
  'brand_appearance_state_primary_default_hover_background-color':
    'Primary default hover background color. Use it for primary elements that require a hover state.',
  'brand_appearance_state_primary_default_hover_border-color':
    'Primary default hover border color. Use it for primary elements that require a hover state.',
  'brand_appearance_state_primary_weakest_opacity_active_background-color':
    'Primary weakest active background color. Use it for primary elements that require a subtle active effect.',
  'brand_appearance_state_primary_weakest_opacity_hover_background-color':
    'Primary weakest hover background color. Use it for primary elements that require a subtle hover effect.',
  'brand_appearance_state_secondary_default_active_background-color':
    'Secondary default active background color. Use it for secondary elements that require an active state.',
  'brand_appearance_state_secondary_default_hover_background-color':
    'Secondary default hover background color. Use it for secondary elements that require a hover state.',
  'brand_appearance_state_secondary_weakest_opacity_active_background-color':
    'Secondary weakest active background color. Use it for secondary elements that require a subtle active effect.',
  'brand_appearance_state_secondary_weakest_opacity_hover_background-color':
    'Secondary weakest hover background color. Use it for secondary elements that require a subtle hover effect.',
  'brand_appearance_state_success_default_active_background-color':
    'Success default active background color. Use it for success elements that require an active state.',
  'brand_appearance_state_success_default_hover_background-color':
    'Success default hover background color. Use it for success elements that require a hover state.',
  'brand_appearance_state_warning_default_active_background-color':
    'Warning default active background color. Use it for warning elements that require an active state.',
  'brand_appearance_state_warning_default_hover_background-color':
    'Warning default hover background color. Use it for warning elements that require a hover state.',
  brand_appearance_static_brand: 'Brand static color. Use it to represent the brand identity consistently across UI.',
  brand_appearance_static_dark: 'Dark static color.',
  brand_appearance_static_light: 'Light static color.',
  'brand_appearance_static_logo-short_url':
    'Short brand logo (without the brand name) in SVG format. Used in mc-top-bar component.',
  'brand_appearance_static_logo-short_width': 'Width of the short brand logo.',
  brand_appearance_static_logo_url: 'Full brand logo in SVG format. Used in mc-top-bar component.',
  brand_appearance_static_logo_width: 'Width of the full brand logo.',
  'brand_appearance_success_default_background-color':
    'Success default background color. Use it to indicate successful actions or states.',
  'brand_appearance_success_default_border-color':
    'Success default border color. Use it to indicate successful actions or states.',
  'brand_appearance_success_default_on-background-color':
    'Success default text color to be used on default background. Use it to indicate successful actions or states.',
  'brand_appearance_success_default_text-color':
    'Success default text color. Use it to indicate successful actions or states.',
  'brand_appearance_success_weak_background-color':
    'Success weak background color. Use it to indicate successful actions or states in a less prominent way.',
  'brand_appearance_success_weak_border-color':
    'Success weak border color. Use it to indicate successful actions or states in a less prominent way.',
  'brand_appearance_success_weak_on-background-color':
    'Success weak text color to be used on weak background. Use it to indicate successful actions or states in a less prominent way.',
  'brand_appearance_warning_default_background-color':
    'Warning default background color. Use it to indicate warnings or important information that requires attention.',
  'brand_appearance_warning_default_border-color':
    'Warning default border color. Use it to indicate warnings or important information that requires attention.',
  'brand_appearance_warning_default_on-background-color':
    'Warning default text color to be used on default background. Use it to indicate warnings or important information that requires attention.',
  'brand_appearance_warning_default_text-color':
    'Warning default text color. Use it to indicate warnings or important information that requires attention.',
  'brand_appearance_warning_weak_background-color':
    'Warning weak background color. Use it to indicate warnings or important information in a less prominent way.',
  'brand_appearance_warning_weak_border-color':
    'Warning weak border color. Use it to indicate warnings or important information in a less prominent way.',
  'brand_appearance_warning_weak_on-background-color':
    'Warning weak text color to be used on weak background. Use it to indicate warnings or important information in a less prominent way.',
  'brand_border_2x-large_radius':
    'Border radius for 2x-large elements, typically used for very large containers or sections.',
  brand_border_large_radius: 'Border radius for large elements, suitable for larger buttons or containers.',
  brand_border_medium_radius: 'Border radius for medium elements, commonly used for standard buttons or form fields.',
  brand_border_small_radius: 'Border radius for small elements, such as small cards or buttons.',
  'brand_border_x-large_radius': 'Border radius for x-large elements, often used for large cards or sections.',
  'brand_border_x-small_radius': 'Border radius for x-small elements, typically used for small buttons or inputs.',
  'brand_typography_headline_font-family': 'The font family used for headlines.',
  'brand_typography_headline_font-family-fallback': 'The fallback font family used for headlines.',
  'brand_typography_headline_large_desktop_font-size': 'The font size used for large headlines on desktop.',
  'brand_typography_headline_large_desktop_line-height': 'The line height used for large headlines on desktop.',
  'brand_typography_headline_large_font-style': 'The font style used for large headlines.',
  'brand_typography_headline_large_font-weight': 'The font weight used for large headlines.',
  'brand_typography_headline_large_mobile_font-size': 'The font size used for large headlines on mobile.',
  'brand_typography_headline_large_mobile_line-height': 'The line height used for large headlines on mobile.',
  'brand_typography_headline_large_text-transform': 'The text transformation applied to large headlines.',
  'brand_typography_headline_medium_desktop_font-size': 'The font size used for medium headlines on desktop.',
  'brand_typography_headline_medium_desktop_line-height': 'The line height used for medium headlines on desktop.',
  'brand_typography_headline_medium_font-style': 'The font style used for medium headlines.',
  'brand_typography_headline_medium_font-weight': 'The font weight used for medium headlines.',
  'brand_typography_headline_medium_mobile_font-size': 'The font size used for medium headlines on mobile.',
  'brand_typography_headline_medium_mobile_line-height': 'The line height used for medium headlines on mobile.',
  'brand_typography_headline_medium_text-transform': 'The text transformation applied to medium headlines.',
  'brand_typography_headline_small_desktop_font-size': 'The font size used for small headlines on desktop.',
  'brand_typography_headline_small_desktop_line-height': 'The line height used for small headlines on desktop.',
  'brand_typography_headline_small_font-style': 'The font style used for small headlines.',
  'brand_typography_headline_small_font-weight': 'The font weight used for small headlines.',
  'brand_typography_headline_small_mobile_font-size': 'The font size used for small headlines on mobile.',
  'brand_typography_headline_small_mobile_line-height': 'The line height used for small headlines on mobile.',
  'brand_typography_headline_small_text-transform': 'The text transformation applied to small headlines.',
  'brand_typography_headline_x-large_desktop_font-size': 'The font size used for x-large headlines on desktop.',
  'brand_typography_headline_x-large_desktop_line-height': 'The line height used for x-large headlines on desktop.',
  'brand_typography_headline_x-large_font-style': 'The font style used for x-large headlines.',
  'brand_typography_headline_x-large_font-weight': 'The font weight used for x-large headlines.',
  'brand_typography_headline_x-large_mobile_font-size': 'The font size used for x-large headlines on mobile.',
  'brand_typography_headline_x-large_mobile_line-height': 'The line height used for x-large headlines on mobile.',
  'brand_typography_headline_x-large_text-transform': 'The text transformation applied to x-large headlines.',
  'brand_typography_headline_x-small_desktop_font-size': 'The font size used for x-small headlines on desktop.',
  'brand_typography_headline_x-small_desktop_line-height': 'The line height used for x-small headlines on desktop.',
  'brand_typography_headline_x-small_font-style': 'The font style used for x-small headlines.',
  'brand_typography_headline_x-small_font-weight': 'The font weight used for x-small headlines.',
  'brand_typography_headline_x-small_mobile_font-size': 'The font size used for x-small headlines on mobile.',
  'brand_typography_headline_x-small_mobile_line-height': 'The line height used for x-small headlines on mobile.',
  'brand_typography_headline_x-small_text-transform': 'The text transformation applied to x-small headlines.',
  'brand_typography_text_font-family': 'The font family used for text.',
  'brand_typography_text_font-family-fallback': 'The fallback font family used for text.',
  'brand_typography_text_large_bold_font-style': 'The font style used for bold large text.',
  'brand_typography_text_large_bold_font-weight': 'The font weight used for bold large text.',
  'brand_typography_text_large_bolditalic_font-style': 'The font style used for bold italic large text.',
  'brand_typography_text_large_bolditalic_font-weight': 'The font weight used for bold italic large text.',
  'brand_typography_text_large_desktop_font-size': 'The font size used for large text on desktop.',
  'brand_typography_text_large_desktop_line-height': 'The line height used for large text on desktop.',
  'brand_typography_text_large_italic_font-style': 'The font style used for italic large text.',
  'brand_typography_text_large_italic_font-weight': 'The font weight used for italic large text.',
  'brand_typography_text_large_medium_font-style': 'The font style used for medium large text.',
  'brand_typography_text_large_medium_font-weight': 'The font weight used for medium large text.',
  'brand_typography_text_large_mediumitalic_font-style': 'The font style used for medium italic large text.',
  'brand_typography_text_large_mediumitalic_font-weight': 'The font weight used for medium italic large text.',
  'brand_typography_text_large_mobile_font-size': 'The font size used for large text on mobile.',
  'brand_typography_text_large_mobile_line-height': 'The line height used for large text on mobile.',
  'brand_typography_text_large_normal_font-style': 'The font style used for normal large text.',
  'brand_typography_text_large_normal_font-weight': 'The font weight used for normal large text.',
  'brand_typography_text_medium_bold_font-style': 'The font style used for bold medium text.',
  'brand_typography_text_medium_bold_font-weight': 'The font weight used for bold medium text.',
  'brand_typography_text_medium_bolditalic_font-style': 'The font style used for bold italic medium text.',
  'brand_typography_text_medium_bolditalic_font-weight': 'The font weight used for bold italic medium text.',
  'brand_typography_text_medium_desktop_font-size': 'The font size used for medium text on desktop.',
  'brand_typography_text_medium_desktop_line-height': 'The line height used for medium text on desktop.',
  'brand_typography_text_medium_italic_font-style': 'The font style used for italic medium text.',
  'brand_typography_text_medium_italic_font-weight': 'The font weight used for italic medium text.',
  'brand_typography_text_medium_medium_font-style': 'The font style used for medium medium text.',
  'brand_typography_text_medium_medium_font-weight': 'The font weight used for medium medium text.',
  'brand_typography_text_medium_mediumitalic_font-style': 'The font style used for medium italic medium text.',
  'brand_typography_text_medium_mediumitalic_font-weight': 'The font weight used for medium italic medium text.',
  'brand_typography_text_medium_mobile_font-size': 'The font size used for medium text on mobile.',
  'brand_typography_text_medium_mobile_line-height': 'The line height used for medium text on mobile.',
  'brand_typography_text_medium_normal_font-style': 'The font style used for normal medium text.',
  'brand_typography_text_medium_normal_font-weight': 'The font weight used for normal medium text.',
  'brand_typography_text_small_bold_font-style': 'The font style used for bold small text.',
  'brand_typography_text_small_bold_font-weight': 'The font weight used for bold small text.',
  'brand_typography_text_small_bolditalic_font-style': 'The font style used for bold italic small text.',
  'brand_typography_text_small_bolditalic_font-weight': 'The font weight used for bold italic small text.',
  'brand_typography_text_small_desktop_font-size': 'The font size used for small text on desktop.',
  'brand_typography_text_small_desktop_line-height': 'The line height used for small text on desktop.',
  'brand_typography_text_small_italic_font-style': 'The font style used for italic small text.',
  'brand_typography_text_small_italic_font-weight': 'The font weight used for italic small text.',
  'brand_typography_text_small_medium_font-style': 'The font style used for medium small text.',
  'brand_typography_text_small_medium_font-weight': 'The font weight used for medium small text.',
  'brand_typography_text_small_mediumitalic_font-style': 'The font style used for medium italic small text.',
  'brand_typography_text_small_mediumitalic_font-weight': 'The font weight used for medium italic small text.',
  'brand_typography_text_small_mobile_font-size': 'The font size used for small text on mobile.',
  'brand_typography_text_small_mobile_line-height': 'The line height used for small text on mobile.',
  'brand_typography_text_small_normal_font-style': 'The font style used for normal small text.',
  'brand_typography_text_small_normal_font-weight': 'The font weight used for normal small text.',
  'brand_typography_text_x-small_bold_font-style': 'The font style used for bold x-small text.',
  'brand_typography_text_x-small_bold_font-weight': 'The font weight used for bold x-small text.',
  'brand_typography_text_x-small_bolditalic_font-style': 'The font style used for bold italic x-small text.',
  'brand_typography_text_x-small_bolditalic_font-weight': 'The font weight used for bold italic x-small text.',
  'brand_typography_text_x-small_desktop_font-size': 'The font size used for x-small text on desktop.',
  'brand_typography_text_x-small_desktop_line-height': 'The line height used for x-small text on desktop.',
  'brand_typography_text_x-small_italic_font-style': 'The font style used for italic x-small text.',
  'brand_typography_text_x-small_italic_font-weight': 'The font weight used for italic x-small text.',
  'brand_typography_text_x-small_medium_font-style': 'The font style used for medium x-small text.',
  'brand_typography_text_x-small_medium_font-weight': 'The font weight used for medium x-small text.',
  'brand_typography_text_x-small_mediumitalic_font-style': 'The font style used for medium italic x-small text.',
  'brand_typography_text_x-small_mediumitalic_font-weight': 'The font weight used for medium italic x-small text.',
  'brand_typography_text_x-small_mobile_font-size': 'The font size used for x-small text on mobile.',
  'brand_typography_text_x-small_mobile_line-height': 'The line height used for x-small text on mobile.',
  'brand_typography_text_x-small_normal_font-style': 'The font style used for normal x-small text.',
  'brand_typography_text_x-small_normal_font-weight': 'The font weight used for normal x-small text.',
};

export default tokenDescriptions;
