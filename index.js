'use strict'

const vibrant = require('node-vibrant')

const toPalette = swatch =>
  Object.keys(swatch)
    .reduce((acc, key) => {
      const value = swatch[key]
      acc.push({ popularity: value.getPopulation(), hex: value.getHex() })
      return acc
    }, [])
    .sort((a, b) => a.popularity <= b.popularity)
    .map(color => color.hex)

module.exports = async input => {
  let swatch

  try {
    swatch = await vibrant.from(input).getPalette()
  } catch (err) {
    swatch = {}
  }

  return toPalette(swatch)
}
