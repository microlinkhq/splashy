'use strict'

const createTempFile = require('create-temp-file2')
const universalify = require('universalify')
const waterfall = require('run-waterfall')
const get = require('simple-get')
const { palette } = require('lqip')
const pump = require('pump')

const toPalette = universalify.fromPromise(palette)
const createTypeError = prop =>
  new TypeError(`Need to provide a valid ${prop}.`)

module.exports = (opts = {}) => {
  const fromFile = (filepath, cb) => {
    if (!filepath) return cb(createTypeError('file path'))
    return toPalette(filepath, cb)
  }

  const fromUrl = (url, cb) => {
    if (!url) return cb(createTypeError('image url'))
    const tempFile = createTempFile(opts)

    const tasks = [
      next => get(url, next),
      (res, next) => pump(res, tempFile, next),
      next => fromFile(tempFile.path, next),
      (paletteColors, next) => tempFile.cleanup(() => next(null, paletteColors))
    ]

    return waterfall(tasks, cb)
  }

  return {
    fromFile: universalify.fromCallback(fromFile),
    fromUrl: universalify.fromCallback(fromUrl)
  }
}
