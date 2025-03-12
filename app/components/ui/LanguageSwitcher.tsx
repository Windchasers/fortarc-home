'use client';

import { FC, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 获取当前语言
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // 切换语言
  const switchLanguage = (languageCode: string) => {
    if (languageCode === locale) return;
    
    // 关闭下拉菜单
    setIsOpen(false);
    
    // 计算新路径
    let newPathname = pathname;
    
    // 检查路径中是否包含当前语言代码
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      // 如果包含，则替换
      newPathname = pathname.replace(`/${locale}`, `/${languageCode}`);
    } else {
      // 如果不包含（可能是默认语言），则添加新语言前缀
      newPathname = `/${languageCode}${pathname}`;
    }
    
    // 使用过渡效果切换路由
    startTransition(() => {
      router.push(newPathname);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${language.code === locale ? 'bg-gray-50 font-medium' : ''}`}
              disabled={isPending}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;