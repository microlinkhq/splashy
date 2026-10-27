'use strict'

const { mkdtempSync, rmSync, writeFileSync } = require('node:fs')
const { spawnSync } = require('node:child_process')
const { tmpdir } = require('node:os')
const { join, resolve } = require('node:path')
const sharp = require('sharp')

const splashy = require('..')

const RUNS = 7
const SEED = 0x5eed
const NOISE_SHIFT = 27
const CHANNELS = 3
const KB_PER_MB = 1024
const HEX_COLOR = /^#[0-9a-f]{6}$/

const LARGE = { width: 4000, height: 3000, format: 'jpeg', calls: 1 }
const SMALL = { width: 800, height: 600, format: 'png', calls: 8 }

const PACKAGE_PATH = resolve(__dirname, '..')

const createRandom = seed => {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state
  }
}

const createImage = ({ width, height, format }) => {
  const random = createRandom(SEED)
  const pixels = Buffer.alloc(width * height * CHANNELS)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const noise = random() >>> NOISE_SHIFT
      const offset = (y * width + x) * CHANNELS
      pixels[offset] = ((x * 255) / width + noise) & 255
      pixels[offset + 1] = ((y * 255) / height + noise) & 255
      pixels[offset + 2] = (((x + y) * 255) / (width + height) + noise) & 255
    }
  }
  return sharp(pixels, { raw: { width, height, channels: CHANNELS } })
    .toFormat(format)
    .toBuffer()
}

const median = values => {
  const sorted = values.slice().sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const now = () => process.hrtime.bigint()

const elapsed = started => Number(now() - started) / 1e6

const assertPalette = (name, palette, expected) => {
  if (!Array.isArray(palette) || palette.length === 0) {
    throw new Error(`${name}: empty palette`)
  }
  if (!palette.every(color => HEX_COLOR.test(color))) {
    throw new Error(`${name}: invalid palette ${palette}`)
  }
  if (expected !== undefined && palette.join() !== expected) {
    throw new Error(`${name}: palette ${palette} != warmup ${expected}`)
  }
  return palette.join()
}

const splashyCase = (image, buffer) => {
  const name = `splashy ${image.width}x${image.height} ${image.format}`
  let expected
  return {
    name,
    unit: 'ms',
    work: `${image.calls} calls, ${buffer.length} bytes`,
    warmup: async () => {
      expected = assertPalette(name, await splashy(buffer))
    },
    timed: async () => {
      const started = now()
      for (let call = 0; call < image.calls; call++) {
        assertPalette(name, await splashy(buffer), expected)
      }
      return elapsed(started)
    }
  }
}

const peakRssScript = (largePath, smallPath) => `
const { readFileSync } = require('fs')
const splashy = require(${JSON.stringify(PACKAGE_PATH)})
const large = readFileSync(${JSON.stringify(largePath)})
const small = readFileSync(${JSON.stringify(smallPath)})
splashy(small).then(async () => {
  const before = process.resourceUsage().maxRSS
  const palette = await splashy(large)
  const after = process.resourceUsage().maxRSS
  process.stdout.write(JSON.stringify({ before, after, palette }))
})
`

const peakRssCase = (image, buffer, script) => {
  const name = `splashy ${image.width}x${image.height} ${image.format} peak RSS delta`
  let expected
  const measure = () => {
    const child = spawnSync(process.execPath, ['-e', script], { encoding: 'utf8' })
    if (child.status !== 0) throw new Error(`${name}: child exited ${child.status} ${child.stderr}`)
    const { before, after, palette } = JSON.parse(child.stdout)
    expected = assertPalette(name, palette, expected)
    return (after - before) / KB_PER_MB
  }
  return {
    name,
    unit: 'MB',
    work: `1 call per fresh process after a small-image warmup, ${buffer.length} bytes`,
    warmup: async () => {
      measure()
    },
    timed: async () => measure()
  }
}

const measure = async entry => {
  const samples = []
  let errors = 0
  try {
    await entry.warmup()
  } catch (error) {
    errors++
    console.error(error.message)
  }
  for (let run = 0; run < RUNS && errors === 0; run++) {
    try {
      samples.push(await entry.timed())
    } catch (error) {
      errors++
      console.error(error.message)
    }
  }
  return { samples, errors }
}

const report = (entry, { samples, errors }) => {
  const med = samples.length ? median(samples) : Number.NaN
  const min = samples.length ? Math.min(...samples).toFixed(1) : 'n/a'
  const max = samples.length ? Math.max(...samples).toFixed(1) : 'n/a'
  const extra = `work ${entry.work}, errors ${errors}, runs ${RUNS}`
  console.log(`${entry.name}  median ${med.toFixed(1)}${entry.unit}  range ${min}-${max}  ${extra}`)
  return {
    name: entry.name,
    unit: entry.unit,
    value: Number(med.toFixed(1)),
    range: `${min}-${max}`,
    extra
  }
}

const main = async () => {
  const dir = mkdtempSync(join(tmpdir(), 'splashy-bench-'))
  try {
    const large = await createImage(LARGE)
    const small = await createImage(SMALL)
    const largePath = join(dir, `large.${LARGE.format}`)
    const smallPath = join(dir, `small.${SMALL.format}`)
    writeFileSync(largePath, large)
    writeFileSync(smallPath, small)

    const cases = [
      splashyCase(LARGE, large),
      splashyCase(SMALL, small),
      peakRssCase(LARGE, large, peakRssScript(largePath, smallPath))
    ]
    const results = []
    let errors = 0
    for (const entry of cases) {
      const result = await measure(entry)
      errors += result.errors
      results.push(report(entry, result))
    }
    writeFileSync(
      join(__dirname, '..', 'benchmark-output.json'),
      JSON.stringify(results, null, 2) + '\n'
    )
    if (errors > 0 || results.some(result => !Number.isFinite(result.value))) {
      process.exitCode = 1
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
