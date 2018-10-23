'use strict'

const waterfall = require('run-waterfall')
const vibrant = require('node-vibrant')
const { promisify } = require('util')
const get = require('simple-get')
const tempy = require('tempy')
const pump = require('pump')
const fs = require('fs')

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
    const tmpPath = tempy.file(opts)
    const writeStream = fs.createWriteStream(tmpPath)

    const tasks = [
      next => get(url, next),
      (res, next) => pump(res, writeStream, next),
      next => fromFile(tmpPath, next),
      (paletteColors, next) =>
        fs.unlink(tmpPath, err => next(err, paletteColors))
    ]

    return waterfall(tasks, cb)
  }

  return {
    fromFile: promisify(fromFile),
    fromUrl: promisify(fromUrl)
  }
}
