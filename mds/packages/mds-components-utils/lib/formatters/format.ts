import { getSelectedLocale } from './utils';

export interface FormatDataType {
  type: 'number' | 'string';
  options?: Intl.NumberFormatOptions;
}

/**
 * Formats a value using the specified data type and locale.
 * If no locale is specified, the locale from the cookie is used.
 * Uses `formatCurrency` from `@maersk-global/shared-js` if currency is specified in dataType options.
 *
 * @param {string | number} value - The value to format.
 * @param {FormatDataType} dataType - The data type to use for formatting.
 * @param {string} [locale] - The locale to use for formatting.
 * @returns {string} The formatted value.
 */
export const format = (value: string | number, dataType: FormatDataType, locale?: string): string => {
  const cookieLocale = getSelectedLocale(new Intl.NumberFormat().resolvedOptions().locale || 'en-GB');
  const { type, options } = dataType || {};

  if (type === 'number') {
    const currency = (options as Intl.NumberFormatOptions)?.currency;
    if (currency) {
      return `${formatCurrency(+value, currency || 'USD', true)}`;
    }
    return new Intl.NumberFormat(locale || cookieLocale, options).format(+value);
  }

  return value.toString();
};

/**
 * Formats a currency amount to the right string based on Intl formatting
 * It does not round any value or decimal places unless specified by the currency
 * It will always return latin numbers
 * @param {number} amount A number to be formatted
 * @param {string} currency ISO 4217 currency code e.g. USD
 * @param {boolean} withSymbol Whether to include the currency symbol or not
 * @param {Intl.NumberFormatOptions} options Options to pass to the Intl.NumberFormat constructor
 * @returns {string} the number provided, formatted based on the current language cookie
 * @public
 */
export function formatCurrency(
  amount: number,
  currency: string,
  withSymbol = false,
  options: Intl.NumberFormatOptions = {},
): string {
  const locale = getSelectedLocale('en');
  return formatCurrencyWithLocale(amount, currency, locale, withSymbol, options);
}

/**
 * Formats a currency amount to the right string based on Intl formatting
 * It does not round any value or decimal places unless specified by the currency
 * It will always return latin numbers
 * @param {number} amount A number to be formatted
 * @param {string} currency ISO 4217 currency code e.g. USD
 * @param {string} locale The locale to use for formatting e.g. en-GB
 * @param {boolean} withSymbol Whether to include the currency symbol or not
 * @param {Intl.NumberFormatOptions} options Options to pass to the Intl.NumberFormat constructor
 * @returns {string} the number provided, formatted based on the current language cookie
 */

export function formatCurrencyWithLocale(
  amount: number,
  currency: string,
  locale: string,
  withSymbol = false,
  options: Intl.NumberFormatOptions = {},
): string {
  // @ts-expect-error current ts version is missing the roundingMode option as a type, but it works.
  let roundingMode: Intl.NumberFormatOptions['roundingMode'] = 'floor';
  // If someone sets maximum fraction digits to zero then we should set rounding to be the incoming option or default
  if (options?.maximumFractionDigits === 0) {
    // @ts-expect-error current ts version is missing the roundingMode option as a type, but it works.
    roundingMode = options.roundingMode || 'halfExpand'; // the default
  }

  const func = new Intl.NumberFormat(
    `${locale}-u-nu-latn`, // Use the language set in the cookie but in latin character set
    {
      ...options,
      style: 'currency',
      currency: currency,
      currencyDisplay: 'code',
      // @ts-expect-error current ts version is missing the roundingMode option as a type, but it works.
      roundingMode,
    },
  );
  // We always want the currency symbol to the left of the number, so we do this
  const parts = func.formatToParts(amount);
  let currencySymbol = '';
  let currencyValue = '';

  parts.forEach((p, idx) => {
    if (p.type === 'currency' && idx === 0) {
      currencySymbol = p.value;
    } else if (!withSymbol && idx === 1 && currencySymbol !== '') {
      // Do nothing with this symbol if there is no currencySymbol required. It is the separator between the currency symbol and the value
    } else if (p.type === 'currency' && idx === parts.length - 1) {
      // This is for locales that use the currency at the end. We need to find the last literal, remove it from the end and add it next to the currency symbol
      currencySymbol = p.value + parts[idx - 1].value;
      currencyValue = currencyValue.slice(0, currencyValue.length - 1);
    } else {
      currencyValue += p.value;
    }
  });
  return `${withSymbol ? currencySymbol : ''}${currencyValue}`;
}
