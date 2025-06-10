'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { useTranslations } from 'next-intl';

export default function Home() {
  // 获取翻译
  const t = useTranslations('home');
  return (
    <MainLayout>
      {/* 全屏视差滚动区域 */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/hero-image.jpg"
            alt="FORTARC 2024春季系列"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-30 text-white">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{t('heroTitle')}</h1>
            <p className="text-xl md:text-2xl mb-8">{t('heroSubtitle')}</p>
            <button className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors" onClick={() => window.location.href = '/products'}>
              {t('exploreButton')}
            </button>
          </div>
        </div>
      </section>

      {/* 新品预告区 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('newArrivals')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 新品卡片示例 */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={`/product-${item}.jpg`}
                    alt={`${t('newProduct')} ${item}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">{t('limitedSeries')} {item}</h3>
                    <p className="mb-4">{t('comingSoon')}</p>
                    <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                      {t('learnMore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌理念区 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('designPhilosophy')}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('philosophyDesc1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('philosophyDesc2')}
              </p>
              <Link 
                href="/brand"
                className="inline-block border-2 border-black px-6 py-2 text-lg font-semibold hover:bg-black hover:text-white transition-colors"
              >
                {t('exploreBrand')}
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/design-philosophy.jpg"
                alt={t('designPhilosophyAlt')}
                width={600}
                height={800}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}