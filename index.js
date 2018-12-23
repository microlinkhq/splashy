'use strict'

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

const splashy = async input => {
  if (!input) throw createTypeError('input')
  const swatch = await vibrant.from(input).getPalette()
  return toPalette(swatch)
}

const createTypeError = prop =>
  new TypeError(`Need to provide a valid ${prop}.`)

module.exports = splashy
