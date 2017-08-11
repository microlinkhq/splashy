'use strict'

const createTempFile = require('create-temp-file2')
const universalify = require('universalify')
const waterfall = require('run-waterfall')
const dominant = require('huey/dominant')
const image = require('get-image-data')
const palette = require('huey/palette')
const get = require('simple-get')
const rgbHex = require('rgb-hex')
const pump = require('pump')

const rgbToHex = (...rgb) => `#${rgbHex(...rgb)}`.toUpperCase()

const dominantColors = (filepath, opts, cb) => {
  if (!filepath) return cb(new TypeError('Need to provide a valid file path.'))

  const { paletteColors = 3 } = opts

  return waterfall(
    [
      next => image(filepath, next),
      (img, next) =>
        next(null, {
          dominantColor: rgbToHex(...dominant(img.data)),
          paletteColors: palette(img.data, paletteColors).map(rgb =>
            rgbToHex(...rgb)
          )
        })
    ],
    cb
  )
}

const dominantColorFromUrl = (url, opts, cb) => {
  if (!url) return cb(new TypeError('Need to provide a valid file URL.'))

  const tempFile = createTempFile(opts.tempFileOpts)
  return waterfall(
    [
      next => get(url, next),
      (res, next) => pump(res, tempFile, next),
      next => dominantColors(tempFile.path, opts, next),
      (predominantColors, next) =>
        tempFile.cleanup(() => next(null, predominantColors))
    ],
    cb
  )
}

module.exports = universalify.fromCallback(dominantColors)
module.exports.fromUrl = universalify.fromCallback(dominantColorFromUrl)
