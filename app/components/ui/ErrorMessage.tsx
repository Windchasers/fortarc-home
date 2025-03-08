'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorMessageProps {
  error: Error | null;
  reset?: () => void;
}

export default function ErrorMessage({ error, reset }: ErrorMessageProps) {
  const router = useRouter();

  useEffect(() => {
    // 监听网络状态变化
    const handleOnline = () => {
      if (reset) reset();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [reset]);

  if (!error) return null;

  let message = '发生了一些错误，请稍后重试';
  let action = reset ? '重试' : '返回';

  // 根据错误类型显示不同的提示信息
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    message = '网络连接失败，请检查网络设置';
  } else if (error.message.includes('ERR_INTERNET_DISCONNECTED')) {
    message = '网络已断开，请检查网络连接';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4 text-center">
      <p className="text-red-500 mb-4">{message}</p>
      <button
        onClick={() => (reset ? reset() : router.back())}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {action}
      </button>
    </div>
  );
}