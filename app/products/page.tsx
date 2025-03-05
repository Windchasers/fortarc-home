import { FC } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';

const ProductsPage: FC = () => {
  return (
    <MainLayout>
      {/* 智能推荐区域 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">为您推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative aspect-w-3 aspect-h-4">
                  <Image
                    src={`/product-${item}.jpg`}
                    alt={`推荐商品 ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">精选商品 {item}</h3>
                  <p className="text-gray-600 text-sm mb-2">基于您的浏览历史推荐</p>
                  <button className="w-full bg-black text-white py-2 hover:bg-gray-800 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 360度展示区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">360°全方位展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-gray-100 rounded-lg">
              {/* 这里将集成360度展示组件 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500">360° 展示区域</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">细节纵览</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                通过360度全方位展示，让您能够从任意角度欣赏每件商品的精致细节。
                无论是面料质地、剪裁工艺，还是配饰搭配，都能得到最直观的体验。
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <button
                    key={item}
                    className="aspect-square bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    视角 {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 搭配建议区域 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">AI搭配建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-w-4 aspect-h-5">
                  <Image
                    src={`/outfit-${item}.jpg`}
                    alt={`搭配方案 ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-3">搭配方案 {item}</h3>
                  <p className="text-gray-600 mb-4">
                    基于AI分析，为您推荐完美契合的穿搭组合，打造专属个人风格。
                  </p>
                  <button className="w-full border-2 border-black py-2 hover:bg-black hover:text-white transition-colors">
                    查看搭配详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductsPage;