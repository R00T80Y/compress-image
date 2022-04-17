import fs from 'fs';
import imagemin from "imagemin";
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';

const fileData = fs.readFileSync('package.json', 'utf8');
const pkgConfig = JSON.parse(fileData);

if (pkgConfig.config.png) {
  await imagemin(['src/**/*.png'], {
    destination: 'build',
    plugins: [
      imageminJpegtran(),
      imageminPngquant(pkgConfig.config.png),
    ]
  });
}

if (pkgConfig.config.jpeg) {
  await imagemin(['src/**/*.jp(eg|g)'], {
    destination: 'build',
    plugins: [
      imageminJpegtran(),
      imageminMozjpeg(pkgConfig.config.jpg)
    ]
  });
}

if (pkgConfig.config.webp) {
  await imagemin(['build/**/*.{jpg,jpeg,png}'], {
    destination: 'build',
    plugins: [
      imageminWebp(pkgConfig.config.webp)
    ]
  });
}
