import fs from 'fs';
import path from 'path';
import {
  findFilesByExt,
  resizeImage
} from './utils.mjs';

const pkgConfigFileData = fs.readFileSync('package.json', 'utf8');
const pkgConfig = JSON.parse(pkgConfigFileData).config;

const imageWidth = (pkgConfig?.thumbnail?.width) || null;
const imageHeight = (pkgConfig?.thumbnail?.height) || null;

const imageDir = path.resolve() + '/src/thumbnail';
const imageOutput = path.resolve() + '/build/thumbnail';

const imagesPNG = findFilesByExt(imageDir, 'png');
const imagesJPG = findFilesByExt(imageDir, 'jpg');
const images = imagesPNG.concat(imagesJPG);

if (images.length) {
  images.forEach((image) => {
    console.log(imageWidth + 'x' + imageHeight, '-', image.filename);
    const imagePath = {
      'input': String(image.fullpath),
    };

    if (imageWidth !== null && imageHeight !== null) {
      imagePath.output = imageOutput + '/' + image.filename + '-' + imageWidth + 'x' + imageHeight + '.' + image.ext;
    } else if (imageWidth) {
      imagePath.output = imageOutput + '/' + image.filename + '-w' + imageWidth + '.' + image.ext;
    } else if (imageHeight) {
      imagePath.output = imageOutput + '/' + image.filename + '-h' + imageHeight + '.' + image.ext;
    }

    resizeImage(
      imagePath,
      imageWidth,
      imageHeight
    );
  });
}
