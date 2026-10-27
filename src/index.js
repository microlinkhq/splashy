'use strict'

const sharp = require('sharp')

const quantize = require('./quantize')

const toHex = ([r, g, b]) => '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)

module.exports = async function (buffer) {
  const { data, info } = await sharp(buffer)
    // resizing the image before processing leads to more consistent (and much shorter) processing times.
    // .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const palette = quantize(data, info.width * info.height, { step: 10, maxColors: 10 })
  return palette.slice(0, 6).map(toHex)
}

module.exports.toHex = toHex
