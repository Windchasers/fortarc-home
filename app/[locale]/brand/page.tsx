'use client';

import { FC } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const BrandPage: FC = () => {
  // 获取翻译
  const t = useTranslations('brand');

  return (
    <MainLayout>
      {/* 品牌故事区域 */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand/brand-hero.jpg"
            alt="FORTARC品牌故事"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">FORTARC</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* 品牌理念区域 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('designPhilosophy')}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('philosophyDesc')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">{t('sustainableFashion')}</h3>
                  <p className="text-gray-600">{t('sustainableDesc')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('craftsmanship')}</h3>
                  <p className="text-gray-600">{t('craftsmanshipDesc')}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/design-philosophy.jpg"
                alt={t('designPhilosophyAlt')}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 设计团队区域 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('creativeTeam')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src={`/designer-${item}.jpg`}
                    alt={t('designerAlt') + ` ${item}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t('designer')} {item}</h3>
                <p className="text-gray-600">
                  {t('designerDesc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 材质溯源区域 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('materialSource')}</h2>
          <div className="relative aspect-[21/9] mb-12">
            <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">{t('materialMap')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[t('organicCotton'), t('naturalWool'), t('ecoLeather'), t('biodegradableFabric')].map((material) => (
              <div key={material} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold mb-2">{material}</h3>
                <p className="text-gray-600 text-sm">
                  {t('materialDesc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BrandPage;