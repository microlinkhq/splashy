# splashy

![Last version](https://img.shields.io/github/tag/Kikobeats/splashy.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/splashy/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/splashy)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/splashy.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/splashy)
[![Dependency status](https://img.shields.io/david/Kikobeats/splashy.svg?style=flat-square)](https://david-dm.org/Kikobeats/splashy)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/splashy.svg?style=flat-square)](https://david-dm.org/Kikobeats/splashy#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/splashy.svg?style=flat-square)](https://www.npmjs.org/package/splashy)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Given an image, extract predominant & palette colors.

## Install

```bash
$ npm install splashy --save
```

## Usage

```js
const splashy = require('splashy')

splashy('https://i.imgur.com/ZJDyOhn.jpg')
  .then(predominantColors => console.log(predominantColors))
  
  // => {
  //  dominantColor: '#951E1A',
  //  paletteColors: [ '#921D1C', '#CBB9AC', '#E04844' ]
  // }
```

## API

### splashy(filepath, [options])

#### filepath

*Required*<br>
Type: `String`

The file path of the image to extract the color information.

#### options

##### paletteColors

Type: `Number`<br>
Default: `3`

Number of colors for create the palette based on the image.

### splashy.fromUrl(url, [options])

#### url

*Required*<br>
Type: `String`

The url of the image to extract the color information.

#### options

##### paletteColors

Type: `Number`<br>
Default: `3`

Number of colors for create the palette based on the image.

##### tempFileOpts

create-tempfile-file2 configuration related with temporal file location.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
