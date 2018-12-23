'use strict'

const { isEmpty, clone, pull } = require('lodash')
const hexSorter = require('hexsorter')
const test = require('ava')
const path = require('path')
const got = require('got')
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

test('required input', async t => {
  const error = await t.throwsAsync(splashy())
  t.is(error.name, 'TypeError')
  t.is(error.message, 'Need to provide a valid input.')
})

test('from url', async t => {
  const url = 'https://i.imgur.com/ZJDyOhn.jpg'
  const { body } = await got(url, { encoding: null })
  const colors = await splashy(body)
  t.snapshot(sortColors(colors))
})

test('from file', async t => {
  const filepath = path.resolve(__dirname, 'jerry.jpg')
  const buffer = fs.readFileSync(filepath)
  const colors = await splashy(buffer)
  t.snapshot(sortColors(colors))
})
