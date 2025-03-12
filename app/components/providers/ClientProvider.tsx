'use client';

import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params?.locale || 'zh';
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 动态导入当前语言的消息
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const msgs = (await import(`../../../messages/${locale}.json`)).default;
        setMessages(msgs);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // 如果加载失败，回退到默认语言
        const defaultMsgs = (await import(`../../../messages/zh.json`)).default;
        setMessages(defaultMsgs);
      } finally {
        setLoading(false);
      }
    };
    
    loadMessages();
  }, [locale]);

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <SessionProvider>
      {messages && (
        <NextIntlClientProvider locale={locale as string} messages={messages}>
          {children}
        </NextIntlClientProvider>
      )}
    </SessionProvider>
  );
}