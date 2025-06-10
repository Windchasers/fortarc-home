'use client';

import { FC } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const LookbookPage: FC = () => {
  // 获取翻译
  const t = useTranslations('lookbook');

  // 季节性搭配数据
  const seasonalOutfits = [
    {
      id: 1,
      title: t('spring.title'),
      description: t('spring.description'),
      image: '/lookbook/spring.jpg',
      items: [t('spring.items.0'), t('spring.items.1'), t('spring.items.2')]
    },
    {
      id: 2,
      title: t('summer.title'),
      description: t('summer.description'),
      image: '/lookbook/summer.jpg',
      items: [t('summer.items.0'), t('summer.items.1'), t('summer.items.2')]
    },
    {
      id: 3,
      title: t('autumn.title'),
      description: t('autumn.description'),
      image: '/lookbook/autumn.jpg',
      items: [t('autumn.items.0'), t('autumn.items.1'), t('autumn.items.2')]
    },
    {
      id: 4,
      title: t('winter.title'),
      description: t('winter.description'),
      image: '/lookbook/winter.jpg',
      items: [t('winter.items.0'), t('winter.items.1'), t('winter.items.2')]
    }
  ];

  // 场景搭配数据
  const occasionOutfits = [
    {
      id: 1,
      title: t('business.title'),
      description: t('business.description'),
      image: '/lookbook/business.jpg'
    },
    {
      id: 2,
      title: t('casual.title'),
      description: t('casual.description'),
      image: '/lookbook/casual.jpg'
    },
    {
      id: 3,
      title: t('party.title'),
      description: t('party.description'),
      image: '/lookbook/party.jpg'
    }
  ];

  // 风格灵感数据
  const styleInspirations = [
    {
      id: 1,
      title: t('minimal.title'),
      description: t('minimal.description'),
      image: '/lookbook/minimal.jpg'
    },
    {
      id: 2,
      title: t('street.title'),
      description: t('street.description'),
      image: '/lookbook/street.jpg'
    },
    {
      id: 3,
      title: t('vintage.title'),
      description: t('vintage.description'),
      image: '/lookbook/vintage.jpg'
    },
    {
      id: 4,
      title: t('modern.title'),
      description: t('modern.description'),
      image: '/lookbook/modern.jpg'
    }
  ];

  return (
    <MainLayout>
      {/* 页面标题 */}
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-16">{t('pageTitle')}</h1>

        {/* 季节性搭配 */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">{t('seasonalTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasonalOutfits.map((outfit) => (
              <div key={outfit.id} className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80">
                  <Image
                    src={outfit.image}
                    alt={outfit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                  <p className="text-gray-600 mb-4">{outfit.description}</p>
                  <div className="space-y-1">
                    {outfit.items.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 场景搭配 */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">{t('occasionTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {occasionOutfits.map((outfit) => (
              <div key={outfit.id} className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={outfit.image}
                    alt={outfit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                    <p className="text-gray-200">{outfit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 风格灵感 */}
        <section>
          <h2 className="text-3xl font-bold mb-8">{t('styleTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {styleInspirations.map((style) => (
              <div key={style.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{style.title}</h3>
                  <p className="text-gray-600 text-sm">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default LookbookPage;