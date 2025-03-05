import { FC } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';

const BrandPage: FC = () => {
  return (
    <MainLayout>
      {/* 品牌故事区域 */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand-hero.jpg"
            alt="FORTARC品牌故事"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">FORTARC</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            追求极致品质，传递优雅生活美学
          </p>
        </div>
      </section>

      {/* 品牌理念区域 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">设计哲学</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                FORTARC秉承&quot;Less is More&quot;的设计理念，将现代美学与传统工艺完美融合。
                我们相信，真正的奢华不在于表面的装饰，而在于对细节的极致追求。
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">可持续时尚</h3>
                  <p className="text-gray-600">环保材质，永续设计</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">匠心工艺</h3>
                  <p className="text-gray-600">精湛技艺，用心制作</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/design-philosophy.jpg"
                alt="设计哲学"
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
          <h2 className="text-3xl font-bold text-center mb-16">创意团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src={`/designer-${item}.jpg`}
                    alt={`设计师 ${item}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-2">设计师 {item}</h3>
                <p className="text-gray-600">
                  拥有多年时尚设计经验，致力于创造兼具美感与实用性的服装作品。
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 材质溯源区域 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">材质溯源</h2>
          <div className="relative aspect-[21/9] mb-12">
            <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">互动式材质溯源地图</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['有机棉', '天然羊毛', '环保皮革', '可降解面料'].map((material) => (
              <div key={material} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold mb-2">{material}</h3>
                <p className="text-gray-600 text-sm">
                  严选优质原材料，确保每一件作品都体现对环境的责任。
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