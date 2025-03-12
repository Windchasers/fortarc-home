import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en', 'ja', 'de', 'es'];
export const defaultLocale = 'zh';

export default getRequestConfig(async ({ locale }) => {
  // 确保请求的语言是支持的语言之一
  const resolvedLocale = locales.includes(locale) ? locale : defaultLocale;
  
  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});