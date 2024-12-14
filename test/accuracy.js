'use strict'

const { readFile } = require('fs/promises')
const path = require('path')
const test = require('ava')
const fs = require('fs')

const { isHexcolor } = require('./util')
const splashy = require('..')
const FIXTURES_PATH = path.resolve(__dirname, '../benchmark/fixtures')

const images = fs.readdirSync(FIXTURES_PATH)

console.log(images)

images.forEach(image => {
  test(image, async t => {
    const filepath = path.resolve(path.resolve(FIXTURES_PATH, image))
    const buffer = await readFile(filepath)
    const colors = await splashy(buffer)
    t.true(colors.length > 0)
    t.true(colors.every(isHexcolor))
  })
})
