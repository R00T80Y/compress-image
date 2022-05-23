import fs from 'fs';
import imagemin from "imagemin";
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminOptipng from 'imagemin-optipng';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';

const fileData = fs.readFileSync('package.json', 'utf8');
const pkgConfig = JSON.parse(fileData);

if (pkgConfig.config.png) {
  await imagemin(['src/compress/**/*.png'], {
    destination: 'build/compress',
    plugins: [
      imageminJpegtran(),
      imageminPngquant(pkgConfig.config.png),
      // imageminOptipng({
      // 	optimizationLevel: 7,
      // 	interlaced: true
      // })
    ]
  });
}

if (pkgConfig.config.jpeg) {
  await imagemin(['src/compress/**/*.jp(eg|g)'], {
    destination: 'build/compress',
    plugins: [
      imageminJpegtran(),
      imageminMozjpeg(pkgConfig.config.jpg)
    ]
  });
}

if (pkgConfig.config.webp) {
  await imagemin(['build/compress/**/*.{jpg,jpeg,png}'], {
    destination: 'build/compress',
    plugins: [
      imageminWebp(pkgConfig.config.webp)
    ]
  });
}
