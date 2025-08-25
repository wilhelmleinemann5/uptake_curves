import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExample } from '../generate-basic-examples.mjs';

// Mock args data for tests
const mockArgs = {
  label: {
    name: 'label',
    type: { required: true },
    defaultValue: 'Test',
    description: 'Label text',
    control: { type: 'text' },
  },
  active: {
    name: 'active',
    type: { required: true },
    defaultValue: true,
    description: 'Is active',
    control: { type: 'boolean' },
  },
  disabled: {
    name: 'disabled',
    type: { required: false },
    defaultValue: false,
    description: 'Is disabled',
    control: { type: 'boolean' },
  },
  count: {
    name: 'count',
    type: { required: true },
    defaultValue: 5,
    description: 'Count value',
    control: { type: 'number' },
  },
  empty: {
    name: 'empty',
    type: { required: true },
    defaultValue: '',
    description: 'Empty string',
    control: { type: 'text' },
  },
};

// Use vi.mock to mock fs.readFileSync globally
let mockFsData = {};
vi.mock('fs', () => ({
  readFileSync: vi.fn((file) => {
    return JSON.stringify(mockFsData);
  }),
}));

describe('createExample', () => {
  it('generates example with string and boolean props', () => {
    const example = createExample('mc-test', {
      label: mockArgs.label,
      active: mockArgs.active,
      count: mockArgs.count,
    });
    expect(example).toBe('<mc-test label="Test" active count="5"></mc-test>');
  });

  it('omits boolean props with defaultValue false', () => {
    const example = createExample('mc-test', {
      disabled: mockArgs.disabled,
    });
    expect(example).toBe('<mc-test></mc-test>');
  });

  it('handles empty string defaultValue', () => {
    const example = createExample('mc-test', {
      empty: mockArgs.empty,
    });
    expect(example).toBe('<mc-test empty=""></mc-test>');
  });

  it('returns tag with no props if args is empty', () => {
    const example = createExample('mc-test', {});
    expect(example).toBe('<mc-test></mc-test>');
  });
});

// Async tests for generateMinimalExamples and generateBasicExamples
import * as basicExamples from '../generate-basic-examples.mjs';

describe('generateMinimalExamples', () => {
  beforeEach(() => {
    mockFsData = {};
  });

  it('returns example with only required props', async () => {
    mockFsData = mockArgs;
    const result = await basicExamples.generateMinimalExamples('mc-test', 'mock.json');
    expect(result).toBe('<mc-test label="Test" active count="5" empty=""></mc-test>');
  });

  it('returns tag with no props if no required', async () => {
    mockFsData = {
      foo: { name: 'foo', type: { required: false }, defaultValue: 'bar' },
    };
    const result = await basicExamples.generateMinimalExamples('mc-test', 'mock.json');
    expect(result).toBe('<mc-test></mc-test>');
  });
});

describe('generateBasicExamples', () => {
  beforeEach(() => {
    mockFsData = {};
  });

  it('returns example with all props', async () => {
    mockFsData = mockArgs;
    const result = await basicExamples.generateBasicExamples('mc-test', 'mock.json');
    expect(result).toBe('<mc-test label="Test" active count="5" empty=""></mc-test>');
  });

  it('returns tag with no props if args is empty', async () => {
    mockFsData = {};
    const result = await basicExamples.generateBasicExamples('mc-test', 'mock.json');
    expect(result).toBe('<mc-test></mc-test>');
  });
});
