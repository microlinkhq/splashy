<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink cdn">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/splashy.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/splashy.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/splashy)
[![NPM Status](https://img.shields.io/npm/dm/splashy.svg?style=flat-square)](https://www.npmjs.org/package/splashy)

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

The raw content for detecting the color information.

## Related

- [color-microservice](https://github.com/Kikobeats/color-microservice) – Get color information from any URL image microservice.
- [colorable-dominant](https://github.com/Kikobeats/colorable-dominant) – Create ARIA-compliant color themes based on a predominant color palette.

## License

**microlink-function** © [Microlink](https://microlink.io), released under the [MIT](https://github.com/microlink/microlink-function/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlink/microlink-function/contributors).

> [microlink.io](https://microlink.io) · GitHub [@MicrolinkHQ](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)

