import { vi } from 'vitest';
import { format, formatCurrency } from '../format';
import type { FormatDataType } from '../format';
import { getSelectedLocale } from '../utils';

vi.mock('../utils', () => {
  return {
    getSelectedLocale: vi.fn().mockReturnValue('en'),
  };
});

describe('formatCurrency', () => {
  const formatableDataset = [
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 100.198,
      expected: '100.19',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 654321.978,
      expected: '654,321.97',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      //This would throw "This number literal will lose precision at runtime" during lint, but we want to test it
      //eslint-disable-next-line
      number: 654321.990000000000001,
      expected: '654,321.99',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 654321.1,
      expected: '654,321.10',
    },
    { currency: 'INR', locale: 'en-GB', number: 1235.0, expected: '1,235.00' },
    { currency: 'INR', locale: 'en-GB', number: 1235.0, expected: '1,235.00' },
    { currency: 'INR', locale: 'en-GB', number: 123.01, expected: '123.01' },
    { currency: 'INR', locale: 'en-GB', number: 123.15, expected: '123.15' },
    { currency: 'INR', locale: 'en-GB', number: 123.45, expected: '123.45' },
    { currency: 'INR', locale: 'en-GB', number: 123.96, expected: '123.96' },
    { currency: 'INR', locale: 'en-GB', number: 123.996, expected: '123.99' },
    { currency: 'INR', locale: 'en-GB', number: 123, expected: '123.00' },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 349000.0,
      expected: '349,000.00',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 349000,
      expected: '349,000.00',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 234356.998,
      expected: '234,356.99',
    },
    {
      currency: 'INR',
      locale: 'en-GB',
      number: 234356.995,
      expected: '234,356.99',
    },
    {
      currency: 'USD',
      locale: 'en-GB',
      number: 654321.978,
      expected: '654,321.97',
    },
    {
      currency: 'USD',
      locale: 'en-GB',
      number: 349000.0,
      expected: '349,000.00',
    },
    {
      currency: 'USD',
      locale: 'en-GB',
      number: 234356.998,
      expected: '234,356.99',
    },
    {
      currency: 'USD',
      locale: 'en-GB',
      number: 234356.95,
      expected: '234,356.95',
    },
    {
      currency: 'USD',
      locale: 'en-GB',
      number: 349000.1,
      expected: '349,000.10',
    },
    {
      currency: 'DKK',
      locale: 'en-GB',
      number: 654321.978,
      expected: '654,321.97',
    },
    {
      currency: 'DKK',
      locale: 'en-GB',
      number: 349000.0,
      expected: '349,000.00',
    },
    {
      currency: 'DKK',
      locale: 'en-GB',
      number: 234356.998,
      expected: '234,356.99',
    },
    {
      currency: 'DKK',
      locale: 'en-GB',
      number: 9999999.995,
      expected: '9,999,999.99',
    },
    {
      currency: 'DKK',
      locale: 'en-GB',
      number: 9999999.1,
      expected: '9,999,999.10',
    },
    {
      currency: 'JPY',
      locale: 'en-GB',
      number: 654321.978,
      expected: '654,321',
    },
    { currency: 'JPY', locale: 'en-GB', number: 349000.0, expected: '349,000' },
    {
      currency: 'JPY',
      locale: 'en-GB',
      number: 234356.998,
      expected: '234,356',
    },
    { currency: 'JPY', locale: 'en-GB', number: 123.456, expected: '123' },
    {
      currency: 'JPY',
      locale: 'en-GB',
      number: 234356.994,
      expected: '234,356',
    },
    {
      currency: 'DJF',
      locale: 'en-GB',
      number: 11659.5,
      expected: '11,659',
    },
    { currency: 'JPY', locale: 'en-GB', number: 234356.1, expected: '234,356' },
    { currency: 'EUR', locale: 'fr-FR', number: 100.0, expected: '100,00' },
    { currency: 'EUR', locale: 'fr-FR', number: 100000.0, expected: '100 000,00' },
    { currency: 'EUR', locale: 'fr-FR', number: 123.456, expected: '123,45' },
    { currency: 'EUR', locale: 'fr-FR', number: 999999999.988, expected: '999 999 999,98' },
    { currency: 'INR', locale: 'en-IN', number: 999999999.988, expected: '99,99,99,999.98' },
  ];

  formatableDataset.forEach((data) => {
    it(`should return with ${data.currency} ${data.expected} when the locale is ${data.locale} for ${data.currency} ${data.number} and withSymbol is true`, async () => {
      await vi.mocked(getSelectedLocale).mockReturnValueOnce(data.locale);
      const number = data.number;
      const returnVal = formatCurrency(number, data.currency, true);
      // eslint-disable-next-line no-irregular-whitespace
      expect(returnVal).toEqual(`${data.currency} ${data.expected}`);
    });

    it(`should return with an ${data.expected} when the locale is ${data.locale} for ${data.currency} ${data.number} and withSymbol is false`, () => {
      vi.mocked(getSelectedLocale).mockReturnValueOnce(data.locale);
      const number = data.number;
      const returnVal = formatCurrency(number, data.currency);
      // eslint-disable-next-line no-irregular-whitespace
      expect(returnVal).toEqual(data.expected);
    });
  });
  describe(`should allow more formatting options to be passed`, () => {
    it('Resets to default if max fraction digits is zero', () => {
      const returnVal = formatCurrency(12345.67, 'USD', false, { maximumFractionDigits: 0 });
      expect(returnVal).toEqual('12,346');
    });
    it('Resets to given option if max fraction digits is zero and roundingMode is given', () => {
      // @ts-expect-error current ts version is missing the roundingMode option as a type, but it works.
      const returnVal = formatCurrency(12345.67, 'USD', false, { maximumFractionDigits: 0, roundingMode: 'floor' });
      expect(returnVal).toEqual('12,345');
    });
    it('Always uses floor if rounding to many digits', () => {
      const returnVal = formatCurrency(12345.678999, 'USD', false, { maximumFractionDigits: 5 });
      expect(returnVal).toEqual('12,345.67899');
    });
  });
});

describe('format', () => {
  it('should format a number value using the specified data type and locale', () => {
    const value = 1234.56;
    const dataType: FormatDataType = { type: 'number', options: { maximumFractionDigits: 2 } };
    const locale = 'en-US';
    const expected = '1,234.56';

    const result = format(value, dataType, locale);

    expect(result).toEqual(expected);
  });

  it('should format a number value with currency symbol if currency is specified in dataType options', () => {
    const value = 1234.56;
    const dataType: FormatDataType = { type: 'number', options: { style: 'currency', currency: 'USD' } };
    const locale = 'en-US';
    const expected = 'USD 1,234.56';

    const result = format(value, dataType, locale);

    expect(result).toEqual(expected);
  });

  it('should format a number value using the locale from the cookie if no locale is specified', () => {
    const value = 1234.56;
    const dataType: FormatDataType = { type: 'number', options: { maximumFractionDigits: 2 } };
    const cookieLocale = 'en-US';
    const expected = '1,234.56';

    vi.mocked(getSelectedLocale).mockReturnValueOnce(cookieLocale);

    const result = format(value, dataType);

    expect(result).toEqual(expected);
  });

  it('should format a number value with currency symbol in DKK', () => {
    const value = 1234.56;
    const dataType: FormatDataType = { type: 'number', options: { style: 'currency', currency: 'DKK' } };
    const locale = 'dk-DK';
    const expected = 'DKK 1,234.56';

    const result = format(value, dataType, locale);

    expect(result).toEqual(expected);
  });
});
