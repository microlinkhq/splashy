'use strict'

const quantize = require('@lokesh.dhakar/quantize')
const tinycolor = require('tinycolor2')
const ndarray = require('ndarray')
const sharp = require('sharp')

async function getPixels (buffer) {
  // Warn for Data URIs, URLs, and file paths. Support removed in v3.
  if (!(buffer instanceof Uint8Array)) {
    throw new Error('[ndarray-pixels] Input must be Uint8Array or Buffer.')
  }

  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  return ndarray(
    new Uint8Array(data),
    [info.width, info.height, 4],
    [4, (4 * info.width) | 0, 1],
    0
  )
}

function createPixelArray (pixels, pixelCount, quality) {
  const pixelArray = []

  // Loop through pixels, sampling at intervals of 'quality'
  for (let i = 0, offset, r, g, b, a; i < pixelCount; i += quality) {
    // Each pixel consists of 4 values: R,G,B,A in sequence
    offset = i * 4
    r = pixels[offset] // Red value
    g = pixels[offset + 1] // Green value
    b = pixels[offset + 2] // Blue value
    a = pixels[offset + 3] // Alpha (transparency) value

    // Only include pixels that are:
    // 1. Mostly opaque (alpha >= 125 or undefined)
    // 2. Not white (not all RGB values > 250)
    if ((typeof a === 'undefined' || a >= 125) && !(r > 250 && g > 250 && b > 250)) {
      pixelArray.push([r, g, b])
    }
  }

  return pixelArray
}

/**
 * Validates and normalizes options for color extraction
 * @param {Object} options - Configuration options
 * @returns {Object} Normalized options
 */
function validateOptions (options) {
  let { colorCount, quality } = options

  // Validate colorCount (must be between 2 and 20)
  if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
    colorCount = 10
  } else if (colorCount === 1) {
    throw new Error(
      '`colorCount` should be between 2 and 20. To get one color, call `getColor()` instead of `getPalette()`'
    )
  } else {
    colorCount = Math.max(colorCount, 2)
    colorCount = Math.min(colorCount, 20)
  }

  // Validate quality (must be at least 1)
  if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) quality = 10

  return { colorCount, quality }
}

module.exports = async function (buffer, ...args) {
  const { quality, colorCount } = validateOptions(args)

  // Create custom CanvasImage object
  const imgData = await sharp(buffer).toBuffer().then(getPixels)
  const pixelCount = imgData.shape[0] * imgData.shape[1]
  const pixelArray = createPixelArray(imgData.data, pixelCount, quality)

  // Send array to quantize function which clusters values
  // using median cut algorithm
  const cmap = quantize(pixelArray, colorCount)

  return cmap.palette().map(value => {
    const [r, g, b] = value
    return `#${tinycolor({ r, g, b }).toHex()}`
  })
}
