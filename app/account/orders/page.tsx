'use client';

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  _id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const OrdersPage: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 检查用户是否已登录
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      // 模拟获取订单数据
      // 实际项目中应该从API获取
      setTimeout(() => {
        setOrders([]);
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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link href="/account" className="text-gray-600 hover:text-black mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">我的订单</h1>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">暂无订单记录</h2>
            <p className="text-gray-500 mb-6">您还没有任何订单，去选购喜欢的商品吧</p>
            <Link
              href="/products"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
            >
              浏览商品
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">订单号: {order.orderNumber}</p>
                    <p className="text-sm text-gray-500">下单时间: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex py-4 border-b last:border-0">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">数量: {item.quantity}</p>
                        <p className="text-gray-800">¥{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">总计: </span>
                    <span className="font-semibold">¥{order.total}</span>
                  </div>
                  <div>
                    <button className="px-4 py-1 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors mr-2">
                      查看详情
                    </button>
                    <button className="px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      再次购买
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;