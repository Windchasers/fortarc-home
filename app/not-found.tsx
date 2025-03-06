'use client';

import { FC } from 'react';
import Link from 'next/link';

const NotFound: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">页面未找到</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在。您可以返回首页继续浏览，或查看我们的最新产品系列。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/products"
            className="border-2 border-black px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            浏览商品
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;