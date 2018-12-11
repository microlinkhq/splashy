'use strict'

const temperment = require('temperment')
const vibrant = require('node-vibrant')
const { promisify } = require('util')
const got = require('got')
const fs = require('fs')

const pump = promisify(require('pump'))

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

const getPalette = async filepath => {
  const swatch = await vibrant.from(filepath).getPalette()
  return toPalette(swatch)
}

const createTypeError = prop =>
  new TypeError(`Need to provide a valid ${prop}.`)

const fromUrl = async (url, opts) => {
  if (!url) throw createTypeError('image url')
  const temp = temperment.standalone()
  const tmpPath = temp.file(opts)
  await pump(got.stream(url, opts), fs.createWriteStream(tmpPath))
  const paletteColors = await fromFile(tmpPath)
  await temp.cleanup()
  return paletteColors
}

const fromFile = async filepath => {
  if (!filepath) throw createTypeError('file path')
  return getPalette(filepath)
}

module.exports = { file: fromFile, url: fromUrl }
