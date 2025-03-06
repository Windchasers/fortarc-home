'use client';

import { FC, useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ProductDetailPage: FC = () => {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSpecs, setSelectedSpecs] = useState<{[key: string]: string}>({});
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [rotating, setRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('商品获取失败');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '商品获取失败');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category: string) => {
      try {
        const response = await fetch(`/api/products?category=${category}`);
        if (!response.ok) throw new Error('获取相关商品失败');
        const data = await response.json();
        setRelatedProducts(data.products.filter((p: any) => p._id !== params.id).slice(0, 4));
      } catch (err) {
        console.error('获取相关商品失败:', err);
      }
    };

    if (params.id) {
      fetchProduct().then(() => {
        if (product?.category) {
          fetchRelatedProducts(product.category);
        }
      });
    }
  }, [params.id, product?.category]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">出错了</h1>
          <p className="text-gray-600">{error || '商品不存在'}</p>
          <Link href="/products" className="mt-8 inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            返回商品列表
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 商品图片展示 */}
          <div className="relative">
            <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-black' : ''}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - 图片 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 商品信息 */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">¥{product.price}</p>
            <div className="mb-8">
              <h2 className="font-semibold mb-4">商品规格</h2>
              <div className="space-y-6">
                {Object.entries(product.specs || {}).map(([key, values]: [string, any]) => (
                  <div key={key}>
                    <p className="text-gray-600 mb-3">{key}</p>
                    <div className="flex flex-wrap gap-3">
                      {Array.isArray(values) ? values.map((value: string) => (
                        <button
                          key={value}
                          onClick={() => setSelectedSpecs(prev => ({ ...prev, [key]: value }))}
                          className={`px-6 py-2.5 border rounded-full transition-all ${selectedSpecs[key] === value ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'}`}
                        >
                          {value}
                        </button>
                      )) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mb-4">
              加入购物车
            </button>
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-4">商品详情</h2>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>
          </div>
        </div>

        {/* 相关商品推荐 */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">相关商品推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="group"
                >
                  <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600">¥{relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;