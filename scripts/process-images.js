const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 递归获取目录下的所有图片文件
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// 处理单个图片
async function processImage(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // 降低饱和度到70%
    await image
      .modulate({
        saturation: 0.7 // 降低饱和度到70%
      })
      .toBuffer()
      .then(data => {
        fs.writeFileSync(imagePath, data);
        console.log(`✓ 已处理: ${imagePath}`);
      });
  } catch (error) {
    console.error(`处理图片失败 ${imagePath}:`, error);
  }
}

// 主函数
async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imageFiles = getImageFiles(publicDir);

  console.log(`找到 ${imageFiles.length} 个图片文件需要处理...`);

  for (const file of imageFiles) {
    await processImage(file);
  }

  console.log('所有图片处理完成！');
}

main().catch(console.error);