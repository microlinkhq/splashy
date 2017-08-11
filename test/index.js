'use strict'

const should = require('should')
const path = require('path')

const splashy = require('..')

const imagePath = path.resolve(__dirname, 'jerry.jpg')
const imageUrl = 'https://i.imgur.com/ZJDyOhn.jpg'

describe('get predominant colors', function () {
  describe('callback', function () {
    it('from a file', function (done) {
      splashy(imagePath, { paletteColors: 3 }, function (
        err,
        predominantColors
      ) {
        should(predominantColors).be.eql({
          dominantColor: '#951E1A',
          paletteColors: ['#921D1C', '#CBB9AC', '#E04844']
        })
        done(err)
      })
    })

    it('from an url', function (done) {
      splashy.fromUrl(imageUrl, 3, function (err, predominantColors) {
        should(predominantColors).be.eql({
          dominantColor: '#951E1A',
          paletteColors: ['#921D1C', '#CBB9AC', '#E04844']
        })
        done(err)
      })
    })
  })

  describe('promise', function () {
    it('from a file', function () {
      return splashy(imagePath, { paletteColors: 3 }).then(function (
        predominantColors
      ) {
        should(predominantColors).be.eql({
          dominantColor: '#951E1A',
          paletteColors: ['#921D1C', '#CBB9AC', '#E04844']
        })
      })
    })

    it('from an url', function () {
      return splashy
        .fromUrl(imageUrl, { paletteColors: 3 })
        .then(function (predominantColors) {
          should(predominantColors).be.eql({
            dominantColor: '#951E1A',
            paletteColors: ['#921D1C', '#CBB9AC', '#E04844']
          })
        })
    })
  })
})
