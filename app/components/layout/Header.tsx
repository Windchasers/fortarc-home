'use client';

import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface CartItem {
  productId: string;
  quantity: number;
  specs: {
    [key: string]: string;
  };
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
}

const Header: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取购物车数据
  const fetchCartItems = async () => {
    if (!session?.user) return;
    
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '获取购物车失败');
      }
      
      setCartItems(data.items);
    } catch (error) {
      console.error('获取购物车失败:', error);
      setCartItems([]);
      toast.error(error instanceof Error ? error.message : '获取购物车数据失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 监听登录状态变化，获取购物车数据
  useEffect(() => {
    fetchCartItems();
  }, [session]);

  // 更新商品数量
  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '更新购物车失败');
      fetchCartItems();
      toast.success('更新购物车成功');
    } catch (error) {
      console.error('更新购物车失败:', error);
      toast.error(error instanceof Error ? error.message : '更新购物车失败，请稍后重试');
    }
  };

  // 删除商品
  const removeItem = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '删除商品失败');
      fetchCartItems();
      toast.success('删除商品成功');
    } catch (error) {
      console.error('删除商品失败:', error);
      toast.error(error instanceof Error ? error.message : '删除商品失败，请稍后重试');
    }
  };

  // 计算总金额
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加实际的搜索逻辑
    console.log('搜索关键词:', searchQuery);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSignOut = () => {
    setIsLogoutConfirmOpen(true);
    setIsProfileOpen(false);
  };

  const confirmSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
      router.refresh();
    });
    setIsLogoutConfirmOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">FORTARC</Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/brand" className="hover:text-gray-600 transition-colors">品牌故事</Link>
          <Link href="/products" className="hover:text-gray-600 transition-colors">产品系列</Link>
          <Link href="/lookbook" className="hover:text-gray-600 transition-colors">搭配灵感</Link>
          <Link href="/community" className="hover:text-gray-600 transition-colors">社区</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-gray-600 transition-colors relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hover:text-gray-600 transition-colors focus:outline-none"
            >
              {session?.user ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {session.user.name?.[0] || session.user.email?.[0]}
                    </span>
                  )}
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {session?.user ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{session.user.name || '用户'}</p>
                      <p className="text-sm text-gray-600">{session.user.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      个人中心
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      我的订单
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        signIn();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      登录
                    </button>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      注册
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 搜索弹窗 */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-4xl mx-4 rounded-lg shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">搜索商品</h2>
                <button
                  onClick={closeSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="输入关键词搜索"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  搜索
                </button>
              </form>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={closeSearch}
                    className="group block"
                  >
                    <div className="aspect-square relative mb-2 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-600">¥{product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 购物车下拉面板 */}
      {isCartOpen && (
        <div className="fixed inset-x-0 top-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsCartOpen(false)} />
          <div className="relative bg-white border-t shadow-xl transform transition-transform duration-300 ease-out">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">购物车</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">购物车是空的</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600 mb-2">¥{item.price}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-lg bg-white"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-lg bg-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">总计</span>
                    <span className="font-semibold">¥{total}</span>
                  </div>
                  <button
                    onClick={() => console.log('结算', cartItems)}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    结算
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* 登出确认弹窗 */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
          <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">确认退出登录</h3>
              <p className="text-gray-600 mb-6">您确定要退出登录吗？</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmSignOut}
                  className="px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
                >
                  确认退出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
