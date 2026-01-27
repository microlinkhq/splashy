import { readFile, readdir, writeFile } from 'fs/promises'
import { extname, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_PATH = resolve(__dirname, 'fixtures')

async function isSharpSupported (buffer) {
  try {
    await sharp(buffer).ensureAlpha().raw().toBuffer()
    return true
  } catch {
    return false
  }
}

const images = await readdir(FIXTURES_PATH)
const supported = []

for (const image of images) {
  const filepath = resolve(FIXTURES_PATH, image)
  const buffer = await readFile(filepath)
  if (await isSharpSupported(buffer)) {
    supported.push(extname(image))
  }
}

await writeFile(
  resolve(__dirname, 'supported-formats.json'),
  JSON.stringify(supported, null, 2) + '\n'
)

console.log('Generated supported-formats.json:', supported.join(', '))
