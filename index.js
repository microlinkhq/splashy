'use strict'

const createTempFile = require('create-temp-file2')
const universalify = require('universalify')
const waterfall = require('run-waterfall')
const vibrant = require('node-vibrant')
const get = require('simple-get')
const pump = require('pump')

const toPalette = swatch =>
  Object.keys(swatch)
    .reduce((acc, key) => {
      const value = swatch[key]
      if (!value) return acc
      acc.push({ popularity: value.getPopulation(), hex: value.getHex() })
      return acc
    }, [])
    .sort((a, b) => a.popularity <= b.popularity)
    .map(color => color.hex)

const getPalette = (filepath, cb) =>
  vibrant
    .from(filepath)
    .getPalette((err, swatch) => (err ? cb(err) : cb(null, toPalette(swatch))))

const createTypeError = prop =>
  new TypeError(`Need to provide a valid ${prop}.`)

module.exports = (opts = {}) => {
  const fromFile = (filepath, cb) => {
    if (!filepath) return cb(createTypeError('file path'))
    return getPalette(filepath, cb)
  }

  const fromUrl = (url, cb) => {
    if (!url) return cb(createTypeError('image url'))
    const tempFile = createTempFile(opts)

    const tasks = [
      next => get(url, next),
      (res, next) => pump(res, tempFile, next),
      next => fromFile(tempFile.path, next),
      (paletteColors, next) => tempFile.cleanup(err => next(err, paletteColors))
    ]

    return waterfall(tasks, cb)
  }

  return {
    fromFile: universalify.fromCallback(fromFile),
    fromUrl: universalify.fromCallback(fromUrl)
  }
}
