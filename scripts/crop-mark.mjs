import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function cropMark() {
  const inputPath = path.resolve('public/brand/syndica-lockup.png');
  const outputPath = path.resolve('public/brand/syndica-mark.webp');

  const meta = await sharp(inputPath).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // In 1024x531:
  // Center is x=512. The glass layers and vertical beam span roughly x: 380 to 644 (width ~264).
  // The vertical beam starts at roughly y: 20 and the bottom glass plate ends around y: 390 (height ~370).
  // Above the "SYNDICA" letters which start around y: 405.
  const left = 380;
  const top = 15;
  const width = 264;
  const height = 375;

  await sharp(inputPath)
    .extract({ left, top, width, height })
    .webp({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved cropped mark to ${outputPath} (${width}x${height})`);
}

cropMark().catch(console.error);
