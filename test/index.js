'use strict'

const should = require('should')
const path = require('path')

const splashy = require('..')()

const filepath = path.resolve(__dirname, 'jerry.jpg')
const fileUrl = 'https://i.imgur.com/ZJDyOhn.jpg'

describe('get predominant colors', () => {
  describe('callback', () => {
    it('from a file', done => {
      splashy.fromFile(filepath, (err, paletteColors) => {
        should(paletteColors).be.eql([
          '#941c1c',
          '#841c16',
          '#ad685e',
          '#d48c74',
          '#6c5444',
          '#cca4a4'
        ])
        done(err)
      })
    })

    it('from an url', done => {
      splashy.fromUrl(fileUrl, (err, paletteColors) => {
        should(paletteColors).be.eql([
          '#941c1c',
          '#841c16',
          '#ad685e',
          '#d48c74',
          '#6c5444',
          '#cca4a4'
        ])
        done(err)
      })
    })
  })

  describe('promise', () => {
    it('from a file', async () => {
      const paletteColors = await splashy.fromFile(filepath)
      should(paletteColors).be.eql([
        '#941c1c',
        '#841c16',
        '#ad685e',
        '#d48c74',
        '#6c5444',
        '#cca4a4'
      ])
    })

    it('from an url', async () => {
      const paletteColors = await splashy.fromUrl(fileUrl)

      should(paletteColors).be.eql([
        '#941c1c',
        '#841c16',
        '#ad685e',
        '#d48c74',
        '#6c5444',
        '#cca4a4'
      ])
    })
  })
})
