#!/usr/bin/env node

/*
 * Process a set of '.po' language files, extracting its keys and messages
 */

/* global require, console, module:true */
import fs from 'fs';
import path from 'path';
import po2json from 'po2json';
import { fileURLToPath } from 'url';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const _LOCALES = path.resolve('locales');
const _GLOBALDATA = path.resolve('src', 'GlobalData.js');

// Check if GlobalData.js doesn't exist or is older than any of the `po` files in `locales`
function newerData(locales = _LOCALES, fileName = _GLOBALDATA) {
  if (!fs.existsSync(fileName))
    return true;
  const gTime = fs.statSync(fileName).ctimeMs;
  return fs.statSync(path.resolve('./package.json')).ctimeMs > gTime
    || fs.readdirSync(locales).find(fn => fn.endsWith('.po') && fs.statSync(path.resolve(locales, fn)).ctimeMs > gTime) !== undefined;
};

// Compiles all 'po' language files in ./locales, returning the resulting options object
export function getData(locales = _LOCALES, verbose = true) {
  // Initialize the options object
  const opt = {
    version: `${pkg.version} (${(new Date()).toISOString().substring(0, 10)})`,
    languages: ['en'],
    messages: {},
  };

  // Process all .po files found in `localesDir`
  fs.readdirSync(locales).forEach(fn => {
    if (fn.endsWith('.po')) {
      // Gent language code from file name, skipping extension
      const lang = fn.substring(0, fn.lastIndexOf('.'));
      const file = path.resolve(locales, fn);
      if (verbose)
        console.log(`Processing language ${lang}`);
      try {
        // Parse file with po2json and store result in `opt.messages`
        opt.messages[lang] = po2json.parseFileSync(file, { format: 'mf' });
        // Add lang to the list of known languages
        opt.languages.push(lang);
      } catch (e) {
        console.error(`Error processing ${file}: ${e}`);
      }
    }
  });
  return opt;
};

// Generates the AMD module `GlobalData.js`, containing a single call to `define` with the content of `opt`
export function writeDataToJSFile(opt, file = _GLOBALDATA, verbose = true) {
  if (verbose)
    console.log(`Generating file ${file}`);

  try {
    fs.writeFileSync(file, `
// WARNING: Auto-generated file, based on "language.po" files stored in "/locales". Do not edit!
// Launch "npm run build-locales" to update this file

export default ${JSON.stringify(opt)};`);
  } catch (e) {
    console.error(`Error generating file ${file}: ${e}`);
  }
};

export default function buildLocales(locales = _LOCALES, file = _GLOBALDATA, verbose = true) {
  // Run only if newer data
  if (newerData(locales, file))
    writeDataToJSFile(getData(locales, verbose), file, verbose);
  else
    console.log('All language files are up to date');
};

// Allow direct call from nodejs CLI
if (process.argv.length >= 2 && process.argv[1] === fileURLToPath(import.meta.url))
  buildLocales();
