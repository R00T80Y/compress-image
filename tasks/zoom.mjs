import path from 'path';
import {
  findFilesByExt,
  cleanFilename,
  zoomImage
} from './utils.mjs';

const imageDir = path.resolve() + '/src/zoom';
const imageOutput = path.resolve() + '/build/zoom';

const imagesPNG = findFilesByExt(imageDir, 'png');
const imagesJPG = findFilesByExt(imageDir, 'jpg');
const images = imagesPNG.concat(imagesJPG);

images.forEach((image) => {
  let imageName = String(image.filename);

  if (imageName.match(/@1x/g) || (imageName.match(/@2x/g) === null && imageName.match(/@3x/g) === null)) {
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@2x.' + image.ext,
    }, 2);
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@3x.' + image.ext,
    }, 3);
  } else if (imageName.match(/@2x/g)) {
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@1x.' + image.ext,
    }, 0.5);
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@3x.' + image.ext,
    }, 1.5);
  } else if (imageName.match(/@3x/g)) {
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@1x.' + image.ext,
    }, (1/3));
    zoomImage({
      'input': String(image.fullpath),
      'output': imageOutput + '/' + cleanFilename(image.filename) + '@2x.' + image.ext,
    }, (2/3));
  }
});
