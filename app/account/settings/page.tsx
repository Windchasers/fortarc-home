'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const SettingsPage: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  
  // 获取翻译
  const t = useTranslations();
  const commonT = useTranslations('common');
  const settingsT = useTranslations('settings');
  const authT = useTranslations('auth');

  // 检查用户是否已登录
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // 加载中状态
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // 修改密码
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(authT('fillAllFields'));
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error(authT('newPasswordMismatch'));
      return;
    }
    
    setIsLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      setIsLoading(false);
      toast.success(authT('passwordChanged'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  // 保存通知设置
  const handleSaveNotificationSettings = () => {
    setIsLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      setIsLoading(false);
      toast.success(settingsT('settingsSaved'));
    }, 1000);
  };

  // 保存隐私设置
  const handleSavePrivacySettings = () => {
    setIsLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      setIsLoading(false);
      toast.success(settingsT('privacySaved'));
    }, 1000);
  };

  return (
    <div>
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black hover:text-gray-800">
            FORTARC
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            {commonT('backToHome')}
          </Link>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/account" className="text-gray-600 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">{settingsT('title')}</h1>
          </div>
        
        <div className="space-y-8">
          {/* 修改密码 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">{settingsT('changePassword')}</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {authT('currentPassword')}
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {authT('newPassword')}
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {authT('confirmNewPassword')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {settingsT('changePassword')}
              </button>
            </form>
          </div>
          
          {/* 通知设置 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">{settingsT('notifications')}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="emailNotifications" className="text-gray-700">
                  {settingsT('emailNotifications')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderUpdates"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="orderUpdates" className="text-gray-700">
                  {settingsT('orderUpdates')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="promotions"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="promotions" className="text-gray-700">
                  {settingsT('promotions')}
                </label>
              </div>
              <button
                onClick={handleSaveNotificationSettings}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {settingsT('saveSettings')}
              </button>
            </div>
          </div>
          
          {/* 隐私设置 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">隐私设置</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dataSharing"
                  checked={dataSharing}
                  onChange={(e) => setDataSharing(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="dataSharing" className="text-gray-700">
                  允许数据分析以改善服务
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="thirdPartySharing"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="thirdPartySharing" className="text-gray-700">
                  允许与第三方共享信息
                </label>
              </div>
              <button
                onClick={handleSavePrivacySettings}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {settingsT('saveSettings')}
              </button>
            </div>
          </div>
          
          {/* 账户安全 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">账户安全</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">双因素认证</h3>
                  <p className="text-sm text-gray-500">增强账户安全性</p>
                </div>
                <button
                  onClick={() => toast.success('此功能正在开发中')}
                  className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                >
                  设置
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">登录设备管理</h3>
                  <p className="text-sm text-gray-500">查看和管理已登录设备</p>
                </div>
                <button
                  onClick={() => toast.success('此功能正在开发中')}
                  className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                >
                  查看
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;