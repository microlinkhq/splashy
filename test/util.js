'use strict'

const hexColorRegex = require('hex-color-regex')

const isHexcolor = hex => hexColorRegex({ strict: true }).test(hex)

module.exports = {
  isHexcolor
}
