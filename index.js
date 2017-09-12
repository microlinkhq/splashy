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

const getDominantImageColor = data => {
  const dominantColor = dominant(data)
  return dominantColor ? rgbToHex(...dominantColor) : null
}

const getPaletteImageColors = (data, opts) => {
  const paletteColors = palette(data, opts)
  return paletteColors ? paletteColors.map(rgb => rgbToHex(...rgb)) : null
}

const fromFile = (filepath, opts, cb) => {
  if (!filepath) return cb(new TypeError('Need to provide a valid file path.'))
  const { paletteColors = 3 } = opts

  return waterfall(
    [
      next => image(filepath, next),
      (img, next) =>
        next(null, {
          dominantColor: getDominantImageColor(img.data),
          paletteColors: getPaletteImageColors(img.data, paletteColors)
        })
    ],
    cb
  )
}

const fromUrl = (url, opts = {}, cb) => {
  if (!url) return cb(new TypeError('Need to provide a valid file URL.'))

  const tempFile = createTempFile(opts.tempFileOpts)
  return waterfall(
    [
      next => get(url, next),
      (res, next) => pump(res, tempFile, next),
      next => fromFile(tempFile.path, opts, next),
      (predominantColors, next) =>
        tempFile.cleanup(() => next(null, predominantColors))
    ],
    cb
  )
}

module.exports = universalify.fromCallback(fromFile)
module.exports.fromUrl = universalify.fromCallback(fromUrl)
