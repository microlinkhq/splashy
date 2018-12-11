'use strict'

const { isEmpty, clone, pull } = require('lodash')
const hexSorter = require('hexsorter')
const test = require('ava')
const path = require('path')

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

test('from url', async t => {
  const colors = await splashy.url('https://i.imgur.com/ZJDyOhn.jpg')
  t.snapshot(sortColors(colors))
})

test('from file', async t => {
  const colors = await splashy.file(path.resolve(__dirname, 'jerry.jpg'))
  t.snapshot(sortColors(colors))
})
