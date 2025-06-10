'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import MainLayout from '../../components/layout/MainLayout';

const AccountPage: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  // 获取翻译
  const t = useTranslations('account');

  // 检查用户是否已登录
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user) {
      // 获取用户详细信息
      setUserData(session.user);
    }
  }, [status, session, router]);

  // 加载中状态
  if (status === 'loading' || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
          
          {/* 个人信息卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-6">
              {userData?.image ? (
                <Image
                  src={userData.image}
                  alt={userData.name || ''}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-medium">
                  {userData?.name?.[0] || userData?.email?.[0]}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData?.name || t('user')}</h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
          </div>
          
          {/* 标签导航 */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              {t('profile')}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              {t('orders')}
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 font-medium ${activeTab === 'addresses' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              {t('addresses')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            >
              {t('settings')}
            </button>
          </div>
          
          {/* 内容区域 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('profile')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('username')}</label>
                    <input
                      type="text"
                      value={userData?.name || ''}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                    <input
                      type="email"
                      value={userData?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => toast.success(t('editProfileComingSoon'))}
                    >
                      {t('editProfile')}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('orders')}</h3>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">{t('noOrders')}</p>
                  <Link
                    href="/products"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {t('goShopping')}
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('addresses')}</h3>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">{t('noAddresses')}</p>
                  <button
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => toast.success(t('addAddressComingSoon'))}
                  >
                    {t('addAddress')}
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('settings')}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">{t('changePassword')}</h4>
                    <button
                      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => toast.success(t('changePasswordComingSoon'))}
                    >
                      {t('changePassword')}
                    </button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t('notifications')}</h4>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        className="mr-2"
                      />
                      <label htmlFor="emailNotifications">{t('emailNotifications')}</label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t('privacy')}</h4>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dataSharing"
                        className="mr-2"
                      />
                      <label htmlFor="dataSharing">{t('allowDataSharing')}</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage; 