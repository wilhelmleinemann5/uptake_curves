type SupportedLanguage = 'en' | 'es' | 'pt' | 'fr' | 'tr' | 'de' | 'zh_hans' | 'zh_hant' | 'jp' | 'ru' | 'ko' | 'it';

const languageMap = {
  en: 'en',
  es: 'es-MX',
  pt: 'pt-BR',
  fr: 'fr-FR',
  tr: 'tr-TR',
  de: 'de-DE',
  zh_hans: 'zh-CN',
  zh_hant: 'zh-TW',
  jp: 'ja-JP',
  ru: 'ru-RU',
  ko: 'ko-KR',
  it: 'it-IT',
} as LanguageMap;

type LanguageMap = {
  [key in SupportedLanguage]: string;
};

/**
 * @public
 * @name getSelectedLocale
 * @description Checks for a saved selected language code
 * @param {string} defaultLocale
 * @returns {string} Returns the selected or default locale
 */
export function getSelectedLocale(defaultLocale: string): string {
  const selectedLang = getCookies()['selectedLang'] as SupportedLanguage;
  return languageMap[selectedLang] || defaultLocale;
}

/**
 * @public
 * @name getCookies
 * @description Returns cookies as object
 */
function getCookies(): Record<string, string> {
  if (!globalThis.document || (globalThis.document && !globalThis.document.cookie)) {
    return {};
  }
  const c = document.cookie.split('; ');
  const cookies = {} as Record<string, string>;

  for (let i = c.length - 1; i >= 0; i--) {
    const C = c[i].split('=');
    cookies[C[0]] = C[1];
  }
  return cookies;
}
