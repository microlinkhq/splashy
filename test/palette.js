'use strict'

const { readFile } = require('fs/promises')
const sharp = require('sharp')
const path = require('path')
const test = require('ava')

const splashy = require('..')

const fixture = (...segments) => readFile(path.resolve(__dirname, '..', ...segments))

const solidRows = async rows => {
  const width = 4
  const pixels = Buffer.alloc(width * rows.length * 4)
  rows.forEach((color, row) => {
    for (let x = 0; x < width; x++) pixels.set(color, (row * width + x) * 4)
  })
  return sharp(pixels, { raw: { width, height: rows.length, channels: 4 } })
    .png()
    .toBuffer()
}

const EXPECTED = {
  'benchmark/fixtures/image-1.jpg': [
    '#336ce2',
    '#d1c3f1',
    '#f58916',
    '#8295ef',
    '#1a4c9d',
    '#87c1f8'
  ],
  'benchmark/fixtures/image-2.jpg': [
    '#b12cda',
    '#181444',
    '#71c2e7',
    '#4a2485',
    '#652598',
    '#7125c3'
  ],
  'benchmark/fixtures/image-3.png': [
    '#cd6d52',
    '#251e23',
    '#7f3a3b',
    '#f8e1a1',
    '#572d32',
    '#948478'
  ],
  'benchmark/fixtures/image-4.png': [
    '#e0659e',
    '#583e68',
    '#6c6ddf',
    '#9c517b',
    '#7dc6e5',
    '#5653a9'
  ],
  'test/fixtures/w3c_home.png': ['#0c449c', '#d2d8e7', '#070707', '#8c95a8', '#6a8fc4', '#94acd4']
}

Object.entries(EXPECTED).forEach(([file, palette]) => {
  test(`palette of ${file}`, async t => {
    t.deepEqual(await splashy(await fixture(file)), palette)
  })
})

test('images with few colors return the sampled colors in order', async t => {
  const image = await solidRows([
    [255, 0, 0, 255],
    [0, 255, 0, 255],
    [0, 0, 255, 255],
    [10, 20, 30, 255]
  ])
  t.deepEqual(await splashy(image), ['#ff0000', '#0000ff'])
})

test('white and transparent pixels are ignored', async t => {
  const image = await solidRows([
    [255, 255, 255, 255],
    [0, 255, 0, 0],
    [12, 34, 56, 255],
    [12, 34, 56, 255]
  ])
  t.deepEqual(await splashy(image), ['#0c2238'])
})
