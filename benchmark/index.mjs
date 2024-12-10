import { readFile, writeFile } from 'fs/promises'
import colorthief from 'colorthief'
import Vibrant from 'node-vibrant'
import tinycolor from 'tinycolor2'
import { chain } from 'lodash-es'
import { readdirSync } from 'fs'
import mql from '@microlink/mql'
import path from 'node:path'

import splashy from '../src/index.js'

const __dirname = import.meta.dirname

const images = readdirSync(path.resolve(__dirname, 'fixtures')).map(filename =>
  path.resolve(__dirname, 'fixtures', filename)
)

const paletteUrl = palette => `https://splashy-palette.vercel.app/${palette.join('-')}`

const screenshotUrl = async palette => {
  const url = paletteUrl(palette)

  const { data } = await mql(url, {
    screenshot: true,
    styles: '#back-button { display: none; }'
  })

  return data.screenshot.url
}

const download = async url => Buffer.from(await fetch(url).then(res => res.arrayBuffer()))

async function getPaletteWithNodeVibrant (filepath) {
  const vibrantPalette = await Vibrant.from(filepath).getPalette()
  return chain(vibrantPalette)
    .map()
    .sortBy('_population')
    .reverse()
    .map(value => {
      const [r, g, b] = value._rgb
      return tinycolor({ r, g, b }).toHex()
    })
    .value()
}

async function getPaletteWithSplashy (filepath) {
  const buffer = await readFile(filepath)
  const splashyPalette = await splashy(buffer)
  return chain(splashyPalette)
    .map(value => value.replace('#', ''))
    .value()
}

async function getPaletteWithColorthief (filepath) {
  const buffer = await readFile(filepath)
  const colorthiefPalette = await colorthief.getPalette(buffer)
  const result = chain(colorthiefPalette)
    .map(value => {
      const [r, g, b] = value
      return tinycolor({ r, g, b }).toHex()
    })
    .value()

  return result
}

const output = []

for (const [index, imagePath] of images.entries()) {
  const filepath = path.resolve(__dirname, imagePath)
  const basename = path.basename(filepath)
  const displayIndex = index + 1

  output.push(`## Test ${displayIndex}`)
  output.push('### Original image')
  output.push(`![original image](./fixtures/${basename})`)

  const nodeVibrantPalette = await getPaletteWithNodeVibrant(filepath)
  const vibrantScreenshotUrl = await screenshotUrl(nodeVibrantPalette)
  await writeFile(path.resolve(__dirname, 'output', `node-vibrant-${displayIndex}.png`), await download(vibrantScreenshotUrl))
  output.push('### Palette by `node-vibrant`')
  output.push(`[![node-vibrant](./output/node-vibrant-${displayIndex}.png)](${vibrantScreenshotUrl})`)

  const splashyPalette = await getPaletteWithSplashy(filepath)
  const splashyLinkScreenshotUrl = await screenshotUrl(splashyPalette)
  await writeFile(path.resolve(__dirname, 'output', `splashy-${displayIndex}.png`), await download(splashyLinkScreenshotUrl))
  output.push('### Palette by `splashy`')
  output.push(`[![splashy](./output/splashy-${displayIndex}.png)](${splashyLinkScreenshotUrl})`)

  const colorthiefPalette = await getPaletteWithColorthief(filepath)
  const colorthiefScreenshotUrl = await screenshotUrl(colorthiefPalette)
  await writeFile(path.resolve(__dirname, 'output', `colorthief-${displayIndex}.png`), await download(colorthiefScreenshotUrl))
  output.push('### Palette by `colorthief`')
  output.push(`[![colorthief](./output/colorthief-${displayIndex}.png)](${colorthiefScreenshotUrl})`)
}

const readmeContent = `
# Benchmark

This is a comparison of various palette-extracting libraries, on the same image.

${output.join('\n\n')}
`

const filepath = path.resolve(__dirname, 'README.md')
await writeFile(filepath, readmeContent)
console.log(`Benchmark results written to ${filepath} ✨`)
