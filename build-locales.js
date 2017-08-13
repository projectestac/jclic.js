/*
 * Process a set of '.po' language files, extracting its keys and messages, and building
 * an object suitable for [i18next](https://www.npmjs.com/package/i18next)
 */

const fs = require('fs')
const po2json = require('po2json')
const pkg = require('./package.json')

// Compiles all 'po' language files in ./locales, returning the resulting i18next options object
const getData = function (localesDir = 'locales', verbose = true) {

  // Initialize the i18next options object
  const opt = {
    version: `${pkg.version} (${(new Date()).toISOString().substr(0, 10)})`,
    languages: ['en'],
    messages: {}
  }

  // Process all .po files found in `localesDir`
  fs.readdirSync(localesDir).forEach(fn => {
    if (fn.endsWith('.po')) {
      // Gent language code from file name, skipping extension
      const lang = fn.substr(0, fn.lastIndexOf('.'))
      const file = `${localesDir}/${fn}`
      if (verbose)
        console.log(`Processing language ${lang}`)
      try {
        // Parse file with po2json and store result in `opt.messages`
        opt.messages[lang] = po2json.parseFileSync(file, { format: 'mf' })
        // Add lang to the list of known languages
        opt.languages.push(lang)
      } catch (e) {
        console.error(`Error processing ${file}: ${e}`)
      }
    }
  })

  return opt
}

// Generates the AMD module `GlobalData.js`, containing a single call to `define` with the content of `opt`
const writeDataToJSFile = function (opt, fileName = 'src/GlobalData.js', verbose = true) {

  if (verbose)
    console.log(`Generating file ${fileName}`)

  try {

    fs.writeFileSync(fileName, `
// WARNING: Auto-generated file, based on "language.po" files stored in "/locales". Do not edit!
// Launch "npm run build-locales" to update this file

/* global define */
define(${JSON.stringify(opt)})`)

  } catch (e) {
    console.error(`Error generating file ${fileName}: ${e}`)
  }
}

module.exports = function (localesDir = 'locales', fileName = 'src/GlobalData.js', verbose = true) {
  writeDataToJSFile(getData(localesDir, verbose), fileName, verbose)
}

module.exports.getData = getData
module.exports.writeDataToJSFile = writeDataToJSFile

// Allow direct call from nodejs CLI
if (require.main == module)
  module.exports()

