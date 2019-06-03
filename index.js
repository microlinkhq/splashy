'use strict'

const assert = require('assert')

const vibrant = require('node-vibrant')

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

module.exports = async input => {
  assert(input, 'input is required')
  const swatch = await vibrant.from(input).getPalette()
  return toPalette(swatch)
}
