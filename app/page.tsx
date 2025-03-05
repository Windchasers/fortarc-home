'use client';

import Image from 'next/image';
import MainLayout from './components/layout/MainLayout';

export default function Home() {
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4">探索无界时尚</h1>
            <p className="text-xl md:text-2xl mb-8">2024春季系列现已上市</p>
            <button className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors" onClick={() => window.location.href = '/products'}>
              立即探索
            </button>
          </div>
        </div>
      </section>

      {/* 新品预告区 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">新品预告</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 新品卡片示例 */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={`/product-${item}.jpg`}
                    alt={`新品 ${item}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">限量系列 {item}</h3>
                    <p className="mb-4">即将发售</p>
                    <button className="bg-white text-black px-6 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors">
                      加入提醒
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
              <h2 className="text-3xl font-bold mb-6">匠心原创，永续时尚</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                FORTARC致力于将传统工艺与现代设计完美融合，每一件作品都凝聚着我们对时尚的理解与追求。我们坚持环保可持续的生产理念，为您带来既时尚又对环境负责的服装系列。
              </p>
              <button className="border-2 border-black px-8 py-3 text-lg font-semibold hover:bg-black hover:text-white transition-colors">
                了解更多
              </button>
            </div>
            <div className="relative h-[600px]">
              <Image
                src="/brand-story.jpg"
                alt="FORTARC品牌故事"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
