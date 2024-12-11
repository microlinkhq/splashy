'use strict'

const quantize = require('@lokesh.dhakar/quantize')
const ndarray = require('ndarray')
const sharp = require('sharp')

async function getPixels (buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

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

    if ((a === undefined || a >= 125) && !(r > 250 && g > 250 && b > 250)) {
      pixelArray.push([r, g, b])
    }
  }

  return pixelArray
}

const toHex = ([r, g, b]) => '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)

module.exports = async function (buffer) {
  const imgData = await getPixels(await sharp(buffer).toBuffer())
  const pixelCount = imgData.shape[0] * imgData.shape[1]
  const pixelArray = createPixelArray(imgData.data, pixelCount)
  const cmap = quantize(pixelArray, 10) // internal tuning
  return cmap.palette().slice(0, 6).map(toHex)
}
