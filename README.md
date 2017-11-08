# splashy

![Last version](https://img.shields.io/github/tag/microlinkhq/splashy.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/microlinkhq/splashy/master.svg?style=flat-square)](https://travis-ci.org/microlinkhq/splashy)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/splashy.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/splashy)
[![Dependency status](https://img.shields.io/david/microlinkhq/splashy.svg?style=flat-square)](https://david-dm.org/microlinkhq/splashy)
[![Dev Dependencies Status](https://img.shields.io/david/dev/microlinkhq/splashy.svg?style=flat-square)](https://david-dm.org/microlinkhq/splashy#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/splashy.svg?style=flat-square)](https://www.npmjs.org/package/splashy)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Given an image, extract predominant & palette colors.

## Install

```bash
$ npm install splashy --save
```

## Usage

```js
const splashy = require('splashy')()

;(async () => {
  const colors = await splashy.fromUrl('https://i.imgur.com/ZJDyOhn.jpg')
  console.log(colors)
  // => [ '#941c1c', '#841c16', '#aa695e', '#ca866c', '#6c5444', '#cca4a4' ]
})()
```

## API

### splashy([options])

#### options

##### tempFileOpts

[create-tempfile-file2](https://github.com/Kikobeats/create-temp-file2) configuration related with temporal file location.

### splashy.fromUrl(url)

#### url

*Required*<br>
Type: `String`

The url of the image to extract the color information.

### splashy.fromFile(filepath)

#### filepath

*Required*<br>
Type: `String`

The filepath of the image to extract the color information.

## Related

- [color-microservice](https://github.com/Kikobeats/color-microservice) – Get color information from any URL image microservice.
- [colorable-dominant](https://github.com/Kikobeats/colorable-dominant) – Create ARIA-compliant color themes based on a predominant color palette.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
