'use strict'

const hexColorRegex = require('hex-color-regex')
const { readFile } = require('fs/promises')
const test = require('ava')
const path = require('path')

const splashy = require('..')

const isHexcolor = hex => hexColorRegex({ strict: true }).test(hex)

test('bmp', async t => {
  const filepath = path.join(__dirname, '../benchmark/fixtures/image-1.bmp')
  const buffer = await readFile(filepath)
  const palette = await splashy(buffer)

  t.true(palette.length > 0)
  t.true(palette.every(isHexcolor))

  // t.deepEqual(palette, [
  //   '#346ce1',
  //   '#d1c4f1',
  //   '#f2891b',
  //   '#8195ed',
  //   '#1e4f98',
  //   '#89c0f4'
  //   // '#2d4260',
  //   // '#ee488a',
  //   // '#5e97e4',
  //   // '#10308a'
  // ])
})

test('png', async t => {
  const filepath = path.join(__dirname, '../benchmark/fixtures/image-3.png')
  const buffer = await readFile(filepath)
  const palette = await splashy(buffer)

  t.true(palette.length > 0)
  t.true(palette.every(isHexcolor))

  // t.deepEqual(palette, ['#cd6d52', '#251e23', '#7f3a3b', '#f8e1a1', '#572d32', '#948478'])
})
