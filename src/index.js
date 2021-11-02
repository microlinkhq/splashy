'use strict'

const debug = require('debug-logfmt')('splashy')
const createVibrant = require('./vibrant')

const toPalette = swatch =>
  Object.keys(swatch)
    .reduce((acc, key) => {
      const value = swatch[key]
      if (value) {
        acc.push({
          popularity: value.getPopulation(),
          hex: value.getHex()
        })
      }
      return acc
    }, [])
    .sort((a, b) => a.popularity <= b.popularity)
    .map(color => color.hex)

module.exports = async input => {
  let swatch

  try {
    const vibrant = createVibrant(input)
    swatch = await vibrant.getPalette()
  } catch (err) {
    debug.error('whoops', err)
    swatch = {}
  }

  return toPalette(swatch)
}
