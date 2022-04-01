'use strict'

const hexColorRegex = require('hex-color-regex')
const path = require('path')
const test = require('ava')
const fs = require('fs')

const splashy = require('..')
const FIXTURES_PATH = path.resolve(__dirname, 'fixtures')

const images = fs.readdirSync(FIXTURES_PATH)

const isHexcolor = hex => hexColorRegex({ strict: true }).test(hex)

images.forEach(image => {
  const extension = path.extname(image)
  test(extension, async t => {
    const filepath = path.resolve(path.resolve(FIXTURES_PATH, image))
    const buffer = fs.readFileSync(filepath)
    const colors = await splashy(buffer)
    t.true(colors.length > 0)
    t.true(colors.every(isHexcolor))
  })
})
