'use client';

import { FC, useEffect, useState } from 'react';
import { Product } from '@/lib/models/product';
import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 获取翻译
  const t = useTranslations('products');
  const commonT = useTranslations('common');

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
          throw new Error(t('fetchError'));
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('fetchError'));
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, sortOrder, t]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t('allCategories')}</option>
            <option value="tops">{t('tops')}</option>
            <option value="bottoms">{t('bottoms')}</option>
            <option value="outerwear">{t('outerwear')}</option>
            <option value="accessories">{t('accessories')}</option>
          </select>

          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
          >
            <option value="createdAt-desc">{t('newest')}</option>
            <option value="price-asc">{t('priceLowToHigh')}</option>
            <option value="price-desc">{t('priceHighToLow')}</option>
            <option value="name-asc">{t('nameAZ')}</option>
            <option value="name-desc">{t('nameZA')}</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              {t('tryAgain')}
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p>{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product._id}`} key={product._id} className="group">
                <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-700">{product.price.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}