import { describe, it, expect } from 'vitest';
import { resolveTokenReference, processTokens } from '../extract-design-tokens';

describe('resolveTokenReference', () => {
  const mockTokens = {
    'foundations_body_background-color': '#FFFFFF',
    'foundations_body_text-color': '$brand_appearance_neutral_default_text-color',
    'brand_appearance_neutral_default_text-color': 'rgb(20,20,20)',
    'foundations_link_default_text-color': '$brand_appearance_primary_default_link-color',
    'brand_appearance_primary_default_link-color': 'rgb(0, 115, 171)',
  };

  it('should resolve direct token reference', () => {
    expect(resolveTokenReference(mockTokens, '$brand_appearance_neutral_default_text-color')).toBe('rgb(20,20,20)');
  });

  it('should return original reference if token not found', () => {
    expect(resolveTokenReference(mockTokens, '$non_existent_token')).toBe('$non_existent_token');
  });
});

describe('processTokens', () => {
  const mockTokens = {
    'brand_typography_headline_font-family': 'Maersk Headline',
    'brand_typography_headline_font-family-fallback': [
      '-apple-system',
      'BlinkMacSystemFont',
      'Microsoft JhengHei',
      'Microsoft Yahei',
      '微软雅黑',
      'STXihei',
      '华文细黑',
      'sans-serif',
    ],
    'brand_typography_headline_medium_font-weight': 300,
    'brand_typography_headline_medium_desktop_font-size': 40,
    'brand_appearance_primary_default_background-color': 'rgb(0,36,61)',
    'brand_appearance_primary_default_text-color': 'rgb(0,36,61)',
    'brand_appearance_error_default_background-color': 'rgb(184,0,18)',
    global_transition_fast_duration: '0.2s',
  };

  it('should process tokens and add mds prefix', () => {
    const result = processTokens(mockTokens);
    expect(result).toEqual([
      { name: '--mds_brand_typography_headline_font-family', value: 'Maersk Headline' },
      {
        name: '--mds_brand_typography_headline_font-family-fallback',
        value: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Microsoft JhengHei',
          'Microsoft Yahei',
          '微软雅黑',
          'STXihei',
          '华文细黑',
          'sans-serif',
        ],
      },
      { name: '--mds_brand_typography_headline_medium_font-weight', value: 300 },
      { name: '--mds_brand_typography_headline_medium_desktop_font-size', value: 40 },
      { name: '--mds_brand_appearance_primary_default_background-color', value: 'rgb(0,36,61)' },
      { name: '--mds_brand_appearance_primary_default_text-color', value: 'rgb(0,36,61)' },
      { name: '--mds_brand_appearance_error_default_background-color', value: 'rgb(184,0,18)' },
      { name: '--mds_global_transition_fast_duration', value: '0.2s' },
    ]);
  });

  it('should handle different value types', () => {
    const mixedTokens = {
      brand_border_medium_radius: 4,
      global_transition_medium_timing: 'ease-in-out',
      brand_appearance_opacity_default_50: 'rgba(255, 255, 255, 0.5)',
      'brand_appearance_shadow_low_first-layer_blur-radius': 5,
      brand_appearance_state_disabled_opacity: 0.5,
    };

    const result = processTokens(mixedTokens);
    expect(result).toEqual([
      { name: '--mds_brand_border_medium_radius', value: 4 },
      { name: '--mds_global_transition_medium_timing', value: 'ease-in-out' },
      { name: '--mds_brand_appearance_opacity_default_50', value: 'rgba(255, 255, 255, 0.5)' },
      { name: '--mds_brand_appearance_shadow_low_first-layer_blur-radius', value: 5 },
      { name: '--mds_brand_appearance_state_disabled_opacity', value: 0.5 },
    ]);
  });
});
