'use client';

import { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  
  // 获取翻译
  const t = useTranslations('products');
  const commonT = useTranslations('common');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error(t('fetchProductError'));
        }
        
        const data = await response.json();
        setProduct(data.product);
        
        // 如果产品有尺码，默认选择第一个
        if (data.product?.sizes?.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t('fetchProductError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, t]);

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error(t('selectSize'));
      return;
    }
    
    toast.success(t('addedToCart'));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center min-h-[60vh]">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center min-h-[60vh]">
          <p className="mb-4">{t('productNotFound')}</p>
          <Link
            href="/products"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            {t('backToProducts')}
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* 产品图片区 */}
          <div className="md:w-1/2">
            <div className="aspect-w-3 aspect-h-4 mb-4 bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={800}
                height={1000}
                className="object-cover object-center"
              />
            </div>
            
            {/* 缩略图选择器 */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-black' : 'opacity-70'}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* 产品信息区 */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-medium mb-4">
              {product.price.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })}
            </p>
            
            {/* 产品描述 */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('description')}</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* 尺码选择 */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">{t('selectSize')}</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* 数量选择 */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('quantity')}</h2>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* 添加到购物车按钮 */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors mb-4"
            >
              {t('addToCart')}
            </button>
            
            {/* 产品详情 */}
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">{t('details')}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {product.details && product.details.map((detail: string, index: number) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}