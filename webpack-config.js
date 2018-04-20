/* global module:true */

// Build all modules

const devel = require('./webpack-devel');
const devel_es5 = require('./webpack-devel-es5');
const dist = require('./webpack-dist');
const buildLocales = require('./build-locales');

buildLocales();

module.exports = [devel, devel_es5, dist];
