'use client';

import { FC, useEffect, useState } from 'react';
import { Product } from '@/lib/models/product';
import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError('');
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) {
          throw new Error('获取商品列表失败');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取商品列表失败');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, sortOrder]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-12">产品系列</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="px-4 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">全部分类</option>
            <option value="外套">外套</option>
            <option value="衬衫">衬衫</option>
            <option value="裤装">裤装</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">价格排序</option>
            <option value="asc">从低到高</option>
            <option value="desc">从高到低</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无商品</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id.toString()}
                className="group"
              >
                <div className="bg-gray-50 aspect-square relative mb-4 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">¥{product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}