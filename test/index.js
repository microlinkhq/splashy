'use strict'

const { isEmpty, clone, pull } = require('lodash')
const hexSorter = require('hexsorter')
const path = require('path')
const test = require('ava')
const fs = require('fs')

const splashy = require('..')

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

test('get predominant colors', async t => {
  const filepath = path.resolve(__dirname, 'jerry.jpg')
  const buffer = fs.readFileSync(filepath)
  const colors = await splashy(buffer)
  t.snapshot(sortColors(colors))
})
