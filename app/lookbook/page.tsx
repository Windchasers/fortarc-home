'use client';

import { FC } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

const LookbookPage: FC = () => {
  // 季节性搭配数据
  const seasonalOutfits = [
    {
      id: 1,
      title: '春季清新',
      description: '轻盈柔和的春季搭配，展现自然清新的魅力',
      image: '/lookbook/spring.jpg',
      items: ['亚麻衬衫', '休闲长裤', '帆布鞋']
    },
    {
      id: 2,
      title: '夏日海风',
      description: '清爽舒适的夏季穿搭，演绎度假休闲风情',
      image: '/lookbook/summer.jpg',
      items: ['棉质T恤', '亚麻短裤', '凉鞋']
    },
    {
      id: 3,
      title: '秋日暖阳',
      description: '层次丰富的秋季搭配，营造温暖文艺氛围',
      image: '/lookbook/autumn.jpg',
      items: ['针织衫', '牛仔裤', '皮靴']
    },
    {
      id: 4,
      title: '冬日优雅',
      description: '保暖时尚的冬季穿搭，突显优雅气质',
      image: '/lookbook/winter.jpg',
      items: ['羊毛大衣', '高领毛衣', '长靴']
    }
  ];

  // 场景搭配数据
  const occasionOutfits = [
    {
      id: 1,
      title: '商务精英',
      description: '正装搭配，展现职场专业形象',
      image: '/lookbook/business.jpg'
    },
    {
      id: 2,
      title: '休闲周末',
      description: '舒适随性的休闲搭配',
      image: '/lookbook/casual.jpg'
    },
    {
      id: 3,
      title: '派对约会',
      description: '时尚吸睛的派对装扮',
      image: '/lookbook/party.jpg'
    }
  ];

  // 风格灵感数据
  const styleInspirations = [
    {
      id: 1,
      title: '极简主义',
      description: '简约纯粹的搭配美学',
      image: '/lookbook/minimal.jpg'
    },
    {
      id: 2,
      title: '街头时尚',
      description: '个性张扬的潮流穿搭',
      image: '/lookbook/street.jpg'
    },
    {
      id: 3,
      title: '复古文艺',
      description: '怀旧优雅的复古风格',
      image: '/lookbook/vintage.jpg'
    },
    {
      id: 4,
      title: '摩登都市',
      description: '现代感十足的都市风尚',
      image: '/lookbook/modern.jpg'
    }
  ];

  return (
    <MainLayout>
      {/* 页面标题 */}
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-16">搭配灵感</h1>

        {/* 季节性搭配 */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">季节搭配</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasonalOutfits.map((outfit) => (
              <div key={outfit.id} className="group cursor-pointer">
                <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={outfit.image}
                    alt={outfit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                <p className="text-gray-600 mb-3">{outfit.description}</p>
                <div className="flex flex-wrap gap-2">
                  {outfit.items.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 场景搭配 */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8">场景搭配</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {occasionOutfits.map((outfit) => (
              <div key={outfit.id} className="group cursor-pointer">
                <div className="aspect-[4/5] relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={outfit.image}
                    alt={outfit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      查看搭配详情
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                <p className="text-gray-600">{outfit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 风格灵感 */}
        <section>
          <h2 className="text-3xl font-bold mb-8">风格灵感</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {styleInspirations.map((style) => (
              <div key={style.id} className="group cursor-pointer relative overflow-hidden rounded-lg">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-semibold mb-2">{style.title}</h3>
                      <p className="text-gray-200">{style.description}</p>
                    </div>
                  </div>
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