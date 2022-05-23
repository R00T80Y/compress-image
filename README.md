## Install
~~~shell
git clone https://github.com/R00T80Y/compress-image

cd compress-image && npm install
~~~

## Thumbnail ./src/thumbnail
Add your images to `<./src/thumbnail>` folder and run `npm run thumbnail`
Config in package.json
~~~
"thumbnail": {
  "width": 360,
  "height": 360
}
~~~

## Zoom ./src/zoom
Add your images to `<./src/zoom>` folder and run `npm run zoom`
Filenames
`1X`: `image@1x.jpg / image.jpg`
`2X`: `image@2x.jpg`
`3X`: `image@3x.jpg`

## Compress + webp ./src/compress
Add your images to `<./src/compress>` folder and run `npm run compress`
