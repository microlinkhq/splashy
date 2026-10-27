'use strict'

const SIGBITS = 5
const RSHIFT = 8 - SIGBITS
const HISTO_SIZE = 1 << (3 * SIGBITS)
const MAX_ITERATIONS = 1000
const FRACT_BY_POPULATIONS = 0.75
const MIN_ALPHA = 125
const WHITE_THRESHOLD = 250

const getColorIndex = (r, g, b) => (r << (2 * SIGBITS)) + (g << SIGBITS) + b

class PQueue {
  constructor (comparator) {
    this.comparator = comparator
    this.contents = []
    this.sorted = false
  }

  push (item) {
    this.contents.push(item)
    this.sorted = false
  }

  pop () {
    if (!this.sorted) {
      this.contents.sort(this.comparator)
      this.sorted = true
    }
    return this.contents.pop()
  }

  size () {
    return this.contents.length
  }
}

class VBox {
  constructor (r1, r2, g1, g2, b1, b2, histo) {
    this.r1 = r1
    this.r2 = r2
    this.g1 = g1
    this.g2 = g2
    this.b1 = b1
    this.b2 = b2
    this.histo = histo
  }

  volume () {
    if (!this._volume) {
      this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1)
    }
    return this._volume
  }

  count () {
    if (!this._countSet) {
      let npix = 0
      for (let i = this.r1; i <= this.r2; i++) {
        for (let j = this.g1; j <= this.g2; j++) {
          for (let k = this.b1; k <= this.b2; k++) {
            npix += this.histo[getColorIndex(i, j, k)]
          }
        }
      }
      this._count = npix
      this._countSet = true
    }
    return this._count
  }

  copy () {
    return new VBox(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo)
  }

  avg () {
    if (!this._avg) {
      const mult = 1 << RSHIFT
      if (this.r1 === this.r2 && this.g1 === this.g2 && this.b1 === this.b2) {
        this._avg = [this.r1 << RSHIFT, this.g1 << RSHIFT, this.b1 << RSHIFT]
      } else {
        let ntot = 0
        let rsum = 0
        let gsum = 0
        let bsum = 0
        for (let i = this.r1; i <= this.r2; i++) {
          for (let j = this.g1; j <= this.g2; j++) {
            for (let k = this.b1; k <= this.b2; k++) {
              const hval = this.histo[getColorIndex(i, j, k)]
              ntot += hval
              rsum += hval * (i + 0.5) * mult
              gsum += hval * (j + 0.5) * mult
              bsum += hval * (k + 0.5) * mult
            }
          }
        }
        this._avg = ntot
          ? [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)]
          : [
              ~~((mult * (this.r1 + this.r2 + 1)) / 2),
              ~~((mult * (this.g1 + this.g2 + 1)) / 2),
              ~~((mult * (this.b1 + this.b2 + 1)) / 2)
            ]
      }
    }
    return this._avg
  }
}

const STRIDE = { r: getColorIndex(1, 0, 0), g: getColorIndex(0, 1, 0), b: getColorIndex(0, 0, 1) }
const SWEEP_ORDER = { r: ['r', 'g', 'b'], g: ['g', 'r', 'b'], b: ['b', 'r', 'g'] }

const partialSums = (histo, vbox, axis) => {
  const [outer, middle, inner] = SWEEP_ORDER[axis]
  const partialsum = []
  let total = 0
  for (let i = vbox[outer + '1']; i <= vbox[outer + '2']; i++) {
    let sum = 0
    for (let j = vbox[middle + '1']; j <= vbox[middle + '2']; j++) {
      for (let k = vbox[inner + '1']; k <= vbox[inner + '2']; k++) {
        sum += histo[i * STRIDE[outer] + j * STRIDE[middle] + k * STRIDE[inner]]
      }
    }
    total += sum
    partialsum[i] = total
  }
  return { partialsum, total }
}

const medianCutApply = (histo, vbox) => {
  if (!vbox.count()) return
  const rw = vbox.r2 - vbox.r1 + 1
  const gw = vbox.g2 - vbox.g1 + 1
  const bw = vbox.b2 - vbox.b1 + 1
  const maxw = Math.max(rw, gw, bw)
  if (vbox.count() === 1) return [vbox.copy()]

  const axis = maxw === rw ? 'r' : maxw === gw ? 'g' : 'b'
  const { partialsum, total } = partialSums(histo, vbox, axis)
  const lookaheadsum = []
  partialsum.forEach((d, i) => {
    lookaheadsum[i] = total - d
  })

  const dim1 = axis + '1'
  const dim2 = axis + '2'
  for (let i = vbox[dim1]; i <= vbox[dim2]; i++) {
    if (partialsum[i] > total / 2) {
      const vbox1 = vbox.copy()
      const vbox2 = vbox.copy()
      const left = i - vbox[dim1]
      const right = vbox[dim2] - i
      let d2 =
        left <= right
          ? Math.min(vbox[dim2] - 1, ~~(i + right / 2))
          : Math.max(vbox[dim1], ~~(i - 1 - left / 2))
      while (!partialsum[d2]) d2++
      let count2 = lookaheadsum[d2]
      while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2]
      vbox1[dim2] = d2
      vbox2[dim1] = vbox1[dim2] + 1
      return [vbox1, vbox2]
    }
  }
}

const iterate = (histo, queue, target) => {
  let ncolors = queue.size()
  let niters = 0
  while (niters < MAX_ITERATIONS) {
    if (ncolors >= target) return
    if (niters++ > MAX_ITERATIONS) return
    const vbox = queue.pop()
    if (!vbox.count()) {
      queue.push(vbox)
      niters++
      continue
    }
    const [vbox1, vbox2] = medianCutApply(histo, vbox)
    if (!vbox1) return
    queue.push(vbox1)
    if (vbox2) {
      queue.push(vbox2)
      ncolors++
    }
  }
}

const isSampled = (r, g, b, a) =>
  a >= MIN_ALPHA && !(r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD)

const sample = (rgba, pixelCount, step, maxColors) => {
  const histo = new Uint32Array(HISTO_SIZE)
  const uniqueKeys = []
  const uniqueColors = []
  let count = 0
  let rmin = 1000000
  let rmax = 0
  let gmin = 1000000
  let gmax = 0
  let bmin = 1000000
  let bmax = 0
  for (let i = 0; i < pixelCount; i += step) {
    const offset = i * 4
    const r = rgba[offset]
    const g = rgba[offset + 1]
    const b = rgba[offset + 2]
    if (!isSampled(r, g, b, rgba[offset + 3])) continue
    count++
    if (uniqueKeys.length <= maxColors) {
      const key = (r << 16) | (g << 8) | b
      if (!uniqueKeys.includes(key)) {
        uniqueKeys.push(key)
        uniqueColors.push([r, g, b])
      }
    }
    const rval = r >> RSHIFT
    const gval = g >> RSHIFT
    const bval = b >> RSHIFT
    histo[getColorIndex(rval, gval, bval)]++
    if (rval < rmin) rmin = rval
    else if (rval > rmax) rmax = rval
    if (gval < gmin) gmin = gval
    else if (gval > gmax) gmax = gval
    if (bval < bmin) bmin = bval
    else if (bval > bmax) bmax = bval
  }
  return { count, uniqueColors, histo, vbox: new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo) }
}

module.exports = (rgba, pixelCount, { step, maxColors }) => {
  const { count, uniqueColors, histo, vbox } = sample(rgba, pixelCount, step, maxColors)
  if (!count) return false
  if (uniqueColors.length <= maxColors) return uniqueColors

  const byCount = new PQueue((a, b) => a.count() - b.count())
  byCount.push(vbox)
  iterate(histo, byCount, FRACT_BY_POPULATIONS * maxColors)

  const byVolume = new PQueue((a, b) => a.count() * a.volume() - b.count() * b.volume())
  while (byCount.size()) byVolume.push(byCount.pop())
  iterate(histo, byVolume, maxColors)

  const palette = []
  while (byVolume.size()) palette.push(byVolume.pop().avg())
  return palette
}
