'use client';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInPage: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!navigator.onLine) {
        throw new Error('网络连接已断开，请检查网络连接后重试');
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      }).catch(err => {
        // 处理SSL/TLS等网络层错误
        if (err.message?.includes('SSL') || err.message?.includes('TLS')) {
          throw new Error('网络连接不安全，请稍后重试');
        }
        throw err;
      });

      if (!result) {
        throw new Error('登录请求失败，请稍后重试');
      }

      if (result.error) {
        // 处理业务层面的错误
        switch (result.error) {
          case 'CredentialsSignin':
            setError('邮箱或密码错误，请重新输入');
            break;
          case 'AccessDenied':
            setError('账户已被禁用，请联系管理员');
            break;
          default:
            setError(result.error);
        }
        return;
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      // 统一处理系统错误
      const errorMessage = error instanceof Error ? error.message : '登录过程中发生错误，请稍后重试';
      setError(errorMessage);
      console.error('登录错误:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black hover:text-gray-800">
            FORTARC
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            返回首页
          </Link>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              登录账户
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              还没有账户？{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-black hover:text-gray-800"
              >
                立即注册
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  邮箱地址
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="邮箱地址"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="密码"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;