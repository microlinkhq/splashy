'use strict'

const test = require('ava')
const path = require('path')
const splashy = require('..')

test('from url', async t => {
  const colors = await splashy.url('https://i.imgur.com/ZJDyOhn.jpg')
  t.snapshot(colors)
})

test('from file', async t => {
  const colors = await splashy.file(path.resolve(__dirname, 'jerry.jpg'))
  t.snapshot(colors)
})
