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

### From URL

```js
(async () => {
  const splashy = require('splashy')
  const got = require('got')

  const url = 'https://kikobeats.com/images/avatar.jpg'
  const { body } = await got(url, { encoding: null })
  const palette = await splashy(body)

  console.log(palette)
  // => [ '#941c1c', '#841c16', '#aa695e', '#ca866c', '#6c5444', '#cca4a4' ]
})()
```

### From Buffer

```js
(async () => {
  const splashy = require('splashy')
  const path = require('path')
  const fs = require('fs')

  const filepath = path.resolve(__dirname, 'avatar.jpg')
  const buffer = await fs.readFile(filepath)
  const palette = await splashy(buffer)

  console.log(palette)
  // => [ '#941c1c', '#841c16', '#aa695e', '#ca866c', '#6c5444', '#cca4a4' ]
})()
```

## API

### splashy(input)

#### input

*Required*<br>
Type: [ImageSource](https://github.com/akfish/node-vibrant#imagesource)

The raw contnet for detecting the color information.

## Related

- [color-microservice](https://github.com/Kikobeats/color-microservice) – Get color information from any URL image microservice.
- [colorable-dominant](https://github.com/Kikobeats/colorable-dominant) – Create ARIA-compliant color themes based on a predominant color palette.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
