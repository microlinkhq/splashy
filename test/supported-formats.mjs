import { readFile, readdir, writeFile } from 'fs/promises'
import { extname, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_PATH = resolve(__dirname, 'fixtures')
const BASELINE_PATH = resolve(__dirname, 'supported-formats.json')

async function isSharpSupported (buffer) {
  try {
    await sharp(buffer).ensureAlpha().raw().toBuffer()
    return true
  } catch {
    return false
  }
}

async function detectSupported () {
  const images = await readdir(FIXTURES_PATH)
  const supported = []
  for (const image of images) {
    const buffer = await readFile(resolve(FIXTURES_PATH, image))
    if (await isSharpSupported(buffer)) supported.push(extname(image))
  }
  return [...new Set(supported)].sort()
}

const supported = await detectSupported()

// `--update` rewrites the committed baseline; do it only when a format change is
// intentional, so the diff is reviewed in the PR.
if (process.argv.includes('--update')) {
  await writeFile(BASELINE_PATH, JSON.stringify(supported, null, 2) + '\n')
  console.log('Updated supported-formats.json:', supported.join(', '))
  process.exit(0)
}

// Otherwise verify against the committed baseline. A dependency bump (sharp or
// its bundled libvips) that silently drops a decoder must fail here instead of
// turning those fixtures into skipped tests.
const baseline = JSON.parse(await readFile(BASELINE_PATH, 'utf8'))
const regressed = baseline.filter(ext => !supported.includes(ext))
const added = supported.filter(ext => !baseline.includes(ext))

if (added.length) {
  console.log(`sharp ${sharp.versions.sharp} now decodes new formats: ${added.join(', ')}`)
  console.log('Run `npm run formats:update` to adopt them into the baseline.')
}

if (regressed.length) {
  console.error(
    `\nsharp ${sharp.versions.sharp} (libvips ${sharp.versions.vips}) regressed: ` +
      `${regressed.join(', ')} can no longer be decoded.`
  )
  console.error(
    'If this loss is intentional, run `npm run formats:update` to update the baseline.'
  )
  // The baseline reflects the platform splashy ships from (the CI runner). sharp
  // bundles a different libvips build per platform, so a local machine may decode
  // fewer formats — only hard-fail in CI to avoid false negatives on dev machines.
  if (process.env.CI) process.exit(1)
  console.error('(not failing locally: set CI=1 to enforce the baseline)')
} else {
  console.log(
    `sharp ${sharp.versions.sharp} (libvips ${sharp.versions.vips}) decodes all ${baseline.length} baseline formats.`
  )
}
