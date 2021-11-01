'use strict'

const { isEmpty, clone, pull } = require('lodash')

const hexSorter = require('hexsorter')
const path = require('path')
const test = require('ava')
const fs = require('fs')

const splashy = require('..')
const FIXTURES_PATH = path.resolve(__dirname, 'fixtures')
const images = fs.readdirSync(FIXTURES_PATH)

const sortColors = colors => {
  const input = clone(colors)
  const output = []

  while (!isEmpty(input)) {
    const color = hexSorter.mostBrightColor(input)
    pull(input, color)
    output.push(color)
  }

  return output
}

images.forEach(image => {
  const extension = path.extname(image)
  test(extension, async t => {
    const filepath = path.resolve(path.resolve(FIXTURES_PATH, image))
    const buffer = fs.readFileSync(filepath)
    const colors = await splashy(buffer)
    t.true(colors.length > 0)
    t.snapshot(sortColors(colors))
  })
})
