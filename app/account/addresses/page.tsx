'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Address {
  _id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  address: string;
  isDefault: boolean;
}

const AddressesPage: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // 检查用户是否已登录
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      // 模拟获取地址数据
      // 实际项目中应该从API获取
      setTimeout(() => {
        setAddresses([]);
        setIsLoading(false);
      }, 1000);
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

  // 添加新地址
  const handleAddAddress = () => {
    setIsAddingAddress(true);
    toast.success('添加地址功能正在开发中');
  };

  // 编辑地址
  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsEditingAddress(true);
    toast.success('编辑地址功能正在开发中');
  };

  // 删除地址
  const handleDeleteAddress = (addressId: string) => {
    toast.success('删除地址功能正在开发中');
  };

  // 设为默认地址
  const handleSetDefault = (addressId: string) => {
    toast.success('设置默认地址功能正在开发中');
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
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/account" className="text-gray-600 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">收货地址</h1>
          </div>
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            添加新地址
          </button>
        </div>
        
        {addresses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">暂无收货地址</h2>
            <p className="text-gray-500 mb-6">添加收货地址，让您的购物体验更便捷</p>
            <button
              onClick={handleAddAddress}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
            >
              添加新地址
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address._id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-2">{address.name}</h3>
                      <p className="text-gray-600">{address.phone}</p>
                      {address.isDefault && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                          默认地址
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700">
                      {address.province} {address.city} {address.district} {address.address}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="text-gray-600 hover:text-black"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="text-gray-600 hover:text-black"
                    >
                      删除
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address._id)}
                        className="text-gray-600 hover:text-black"
                      >
                        设为默认
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AddressesPage;