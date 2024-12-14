'use strict'

const quantize = require('@lokesh.dhakar/quantize')
const ndarray = require('ndarray')
const sharp = require('sharp')

async function getPixels ({ data, info }) {
  return ndarray(
    new Uint8Array(data.buffer, data.byteOffset, data.length),
    [info.width, info.height, 4],
    [4, (4 * info.width) | 0, 1],
    0
  )
}

function createPixelArray (pixels, pixelCount, quality = 10) {
  const pixelArray = []
  for (let i = 0, offset; i < pixelCount; i += quality) {
    offset = i * 4
    const r = pixels[offset]
    const g = pixels[offset + 1]
    const b = pixels[offset + 2]
    const a = pixels[offset + 3]
    const isOpaqueEnough = a >= 125
    const isWhite = r > 250 && g > 250 && b > 250
    if (isOpaqueEnough && !isWhite) pixelArray.push([r, g, b])
  }

  return pixelArray
}

const toHex = ([r, g, b]) => '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)

module.exports = async function (buffer) {
  const raw = await sharp(buffer)
    // resizing the image before processing leads to more consistent (and much shorter) processing times.
    // .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const imgData = await getPixels(raw)
  const pixelCount = imgData.shape[0] * imgData.shape[1]
  const pixelArray = createPixelArray(imgData.data, pixelCount)
  const cmap = quantize(pixelArray, 10) // internal tuning
  return cmap.palette().slice(0, 6).map(toHex)
}

module.exports.toHex = toHex
