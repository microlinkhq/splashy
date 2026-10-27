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

const STEP = 10

const column = async colors => {
  const height = colors.length * STEP
  const pixels = Buffer.alloc(height * 4)
  colors.forEach((color, index) => {
    for (let y = index * STEP; y < (index + 1) * STEP; y++) pixels.set(color, y * 4)
  })
  return sharp(pixels, { raw: { width: 1, height, channels: 4 } })
    .png()
    .toBuffer()
}

const grid = async (width, height, fill) => {
  const pixels = Buffer.alloc(width * height * 4)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) pixels.set(fill(x, y), (y * width + x) * 4)
  }
  return sharp(pixels, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer()
}

const ramp = (channel, length) => {
  const colors = []
  for (let i = 0; i < length; i++) {
    const color = [40, 40, 40, 255]
    color[channel] = (31 - i) << 3
    colors.push(color)
  }
  return colors
}

const distinct = length => {
  const colors = []
  for (let i = 0; i < length; i++) colors.push([i * 25, 10, 20, 255])
  return colors
}

test('white and transparent pixels are ignored', async t => {
  const image = await column([
    [255, 255, 255, 255],
    [0, 255, 0, 0],
    [12, 34, 56, 255]
  ])
  t.deepEqual(await splashy(image), ['#0c2238'])
})

test('alpha of 125 is sampled and 124 is not', async t => {
  t.deepEqual(await splashy(await column([[1, 2, 3, 125]])), ['#010203'])
  await t.throwsAsync(splashy(await column([[1, 2, 3, 124]])), { instanceOf: TypeError })
  await t.throwsAsync(splashy(await column([[1, 2, 3, 0]])), { instanceOf: TypeError })
})

test('a pixel is white only when every channel is above 250', async t => {
  t.deepEqual(await splashy(await column([[250, 250, 250, 255]])), ['#fafafa'])
  t.deepEqual(await splashy(await column([[250, 251, 251, 255]])), ['#fafbfb'])
  t.deepEqual(await splashy(await column([[251, 250, 251, 255]])), ['#fbfafb'])
  t.deepEqual(await splashy(await column([[251, 251, 250, 255]])), ['#fbfbfa'])
  t.deepEqual(await splashy(await column([[251, 0, 0, 255]])), ['#fb0000'])
  await t.throwsAsync(splashy(await column([[251, 251, 251, 255]])), { instanceOf: TypeError })
  await t.throwsAsync(splashy(await column([[255, 255, 255, 255]])), { instanceOf: TypeError })
})

test('repeated sampled colors are returned once', async t => {
  const image = await column([
    [12, 34, 56, 255],
    [12, 34, 56, 255],
    [200, 10, 20, 255]
  ])
  t.deepEqual(await splashy(image), ['#0c2238', '#c80a14'])
})

test('ten sampled colors are returned in first-seen order', async t => {
  const colors = distinct(10)
  const expected = ['#000a14', '#190a14', '#320a14', '#4b0a14', '#640a14', '#7d0a14']
  t.deepEqual(await splashy(await column(colors)), expected)
  t.deepEqual(await splashy(await column(colors.concat([colors[0]]))), expected)
})

test('more than ten sampled colors run the median cut', async t => {
  t.deepEqual(await splashy(await column(distinct(11))), [
    '#400c14',
    '#1c0c14',
    '#940c14',
    '#640c14',
    '#ac0c14',
    '#e40c14'
  ])
})

test('colors inside one histogram bin keep the upstream palette', async t => {
  const colors = []
  for (let r = 0; r < 8 && colors.length < 11; r++) {
    for (let g = 0; g < 8 && colors.length < 11; g++) colors.push([r, g, 0, 255])
  }
  t.deepEqual(await splashy(await column(colors)), [
    '#000000',
    '#080404',
    '#080404',
    '#080404',
    '#080404',
    '#080404'
  ])
})

test('strictly decreasing samples keep the upstream per-channel bounds', async t => {
  t.deepEqual(await splashy(await column(ramp(0, 11))), ['#582c2c'])
  t.deepEqual(await splashy(await column(ramp(1, 11))), ['#2c582c'])
  t.deepEqual(await splashy(await column(ramp(2, 11))), ['#2c2c58'])
})

test('spread samples keep the upstream median-cut palette', async t => {
  const colors = []
  for (let i = 0; i < 11; i++) colors.push([(i * 15) & 255, (i * 7) & 255, (i * 13) & 255, 255])
  t.deepEqual(await splashy(await column(colors)), [
    '#6c345c',
    '#7c3c6c',
    '#5c2c4c',
    '#2c1424',
    '#8c407c',
    '#4c2444'
  ])
})

test('a full gradient keeps the upstream palette', async t => {
  const image = await grid(40, 40, (x, y) => [x * 6, y * 6, (x * 3 + y * 2) & 255, 255])
  t.deepEqual(await splashy(image), [
    '#791c45',
    '#047c29',
    '#79d684',
    '#94676c',
    '#79af77',
    '#3c7546'
  ])
})
