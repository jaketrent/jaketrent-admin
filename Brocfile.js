'use strict'

var filterBrowserify = require('broccoli-browserify')
var filterReact = require('broccoli-react')
var filterSass = require('broccoli-sass')
var freeze = Object.freeze
var mergeTrees = require('broccoli-merge-trees')
var pickFiles = require('broccoli-static-compiler')

var defaultSrcAndDest = freeze({
  srcDir: '/',
  destDir: '/'
})

var assets = pickFiles('app/static', defaultSrcAndDest)

var js = pickFiles(assets, {
  srcDir: '/js',
  destDir: '/js'
})
js = filterReact(js, { extensions: [ 'js' ] })
js = filterBrowserify(js, {
  entries: [ './js/client.js' ],
  outputFile: 'js/client.js',
  bundle: {
    debug: !(process.env.NODE_ENV === 'production')
  }
})

var css = pickFiles(assets, {
  srcDir: '/css',
  destDir: '/css'
})
css = filterSass([ css ], 'css/client.scss', 'css/client.css')

module.exports = mergeTrees([ js, css ])
