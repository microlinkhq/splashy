'use strict'

const { ImageBase } = require('@vibrant/image')
const Vibrant = require('node-vibrant')
const sharp = require('sharp')

class SharpImage extends ImageBase {
  constructor () {
    super(...arguments)
    this._image = undefined
  }

  async load (image) {
    if (typeof image === 'string' || image instanceof Buffer) {
      const { data, info } = await sharp(image)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

      this._image = {
        width: info.width,
        height: info.height,
        data: data
      }
      return this
    } else {
      return Promise.reject(
        new Error('Cannot load image from HTMLImageElement in node environment')
      )
    }
  }

  clear () {}

  update () {}

  getWidth () {
    return this._image.width
  }

  getHeight () {
    return this._image.height
  }

  resize (targetWidth, targetHeight, ratio) {
    // done in the load step, ignoring any maxDimension or quality options
  }

  getPixelCount () {
    const { width, height } = this._image
    return width * height
  }

  getImageData () {
    return this._image
  }

  remove () {}
}

module.exports = input => new Vibrant(input, { ImageClass: SharpImage })
