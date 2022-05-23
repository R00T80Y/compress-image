import fs from 'fs';
import sharp from 'sharp';

function findFilesByExt(dir, ext) {
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => (file.endsWith(`.${ext}`)))
    .map((file) => {
      const filename = file.split(`.${ext}`)[0];
      return {
        'filename': filename,
        'ext': ext,
        'path': dir,
        'fullpath': `${dir}/${filename}.${ext}`
      };
    });

  return files;
}

const cleanFilename = (name) => {
  return String(name).replace(/@[0-9]+x/g, '');
}

const zoomImage = async (imagePath, imageZoom) => {
  const image = sharp(imagePath.input);
  const imageMeta = await image.metadata();

  await image
    .sharpen(1)
    .resize({ width: Math.round(imageMeta.width * imageZoom) })
    .toFile(imagePath.output)
}

const resizeImage = async (imagePath, imageWidth, imageHeight) => {
  const image = sharp(imagePath.input);
  const size = {}

  if (imageWidth !== null) {
    size.width = Math.round(imageWidth);
  }

  if (imageHeight !== null) {
    size.height = Math.round(imageHeight);
  }

  await image
    .sharpen(1)
    .resize(size)
    .toFile(imagePath.output)
}

export {
  findFilesByExt,
  cleanFilename,
  zoomImage,
  resizeImage
};
