import { describe, it, expect } from 'vitest';
import { extractIconNames, generateFileContent } from '../extract-icons';

describe('Extract Icons Script', () => {
  describe('extractIconNames', () => {
    it('should extract icon names from metadata', () => {
      const mockMetadata = [
        { name: 'heart', keywords: ['love', 'like'] },
        { name: 'star', keywords: ['favorite', 'bookmark'] },
        { name: 'check', keywords: ['done', 'complete'] },
      ];

      const result = extractIconNames(mockMetadata);

      expect(result).toEqual(['heart', 'star', 'check']);
    });

    it('should handle empty metadata array', () => {
      const result = extractIconNames([]);
      expect(result).toEqual([]);
    });

    it('should handle metadata with only names', () => {
      const mockMetadata = [{ name: 'heart' }, { name: 'star' }, { name: 'check' }];

      const result = extractIconNames(mockMetadata);

      expect(result).toEqual(['heart', 'star', 'check']);
    });
  });

  describe('generateFileContent', () => {
    it('should generate correct file content with icons', () => {
      const iconNames = ['heart', 'star', 'check'];
      const result = generateFileContent(iconNames);
      const expected = `// This file is auto-generated. Do not edit manually.
export const iconNames: string[] = [
  "heart",
  "star",
  "check"
];
`;
      expect(result).toBe(expected);
    });

    it('should generate correct file content with empty array', () => {
      const result = generateFileContent([]);
      const expected = `// This file is auto-generated. Do not edit manually.
export const iconNames: string[] = [];
`;
      expect(result).toBe(expected);
    });
  });
});
