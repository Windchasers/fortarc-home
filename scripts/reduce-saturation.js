const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 公共目录的路径
const PUBLIC_DIR = path.join(__dirname, '../public');

// 支持的图片格式
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// 饱和度降低到40%
const SATURATION = 0.4;

// 统计信息
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0
};

/**
 * 递归处理目录中的所有图片
 * @param {string} dir 目录路径
 */
async function processDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        await processDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(itemPath).toLowerCase();
        
        // 只处理支持的图片格式
        if (IMAGE_EXTENSIONS.includes(ext)) {
          await processImage(itemPath);
        } else {
          stats.skipped++;
        }
      }
    }
  } catch (error) {
    console.error(`处理目录出错: ${dir}`, error);
    stats.errors++;
  }
}

/**
 * 处理单个图片，降低饱和度
 * @param {string} imagePath 图片路径
 */
async function processImage(imagePath) {
  try {
    console.log(`处理图片: ${path.relative(PUBLIC_DIR, imagePath)}`);
    
    // 使用sharp处理图片
    await sharp(imagePath)
      .modulate({
        saturation: SATURATION // 降低饱和度到40%
      })
      .toBuffer()
      .then(data => {
        // 将处理后的图片保存回原位置
        fs.writeFileSync(imagePath, data);
        stats.processed++;
      });
  } catch (error) {
    console.error(`处理图片出错: ${imagePath}`, error);
    stats.errors++;
  }
}

// 主函数
async function main() {
  console.log('开始处理图片，降低饱和度到40%...');
  console.time('处理完成');
  
  await processDirectory(PUBLIC_DIR);
  
  console.timeEnd('处理完成');
  console.log(`\n处理结果统计:`);
  console.log(`- 成功处理: ${stats.processed} 张图片`);
  console.log(`- 跳过文件: ${stats.skipped} 个`);
  console.log(`- 处理错误: ${stats.errors} 个`);
}

// 执行主函数
main().catch(err => {
  console.error('程序执行出错:', err);
  process.exit(1);
});