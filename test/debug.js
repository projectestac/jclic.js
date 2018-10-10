// Test modules will normally use the script "/dist/jclic.min.js"
// This file is minified and uglyfied, so unusable for debugging purposes.
// This script can be used as a "data-main" parameter to the "require.js" script,
// thus allowing the real use of require.js against the source files

/* global requirejs */
requirejs.config({
  // baseURl is relative to the HTML file path
  baseUrl: '../../src/',
  paths: {
    jquery: '../node_modules/jquery/dist/jquery',
    screenfull: '../node_modules/screenfull/dist/screenfull',
    jszip: '../node_modules/jszip/dist/jszip',
    'jszip-utils': '../node_modules/jszip-utils/dist/jszip-utils',
    scriptjs: '../node_modules/scriptjs/dist/script',
    webfontloader: '../node_modules/webfontloader/webfontloader',
    'clipboard-js': '../node_modules/clipboard-js/clipboard',
    i18next: '../node_modules/i18next/i18next',
    'es6-promise': '../node_modules/es6-promise/dist/es6-promise',
    'midi-player-js': '../node_modules/midi-player-js/browser/midiplayer'
  }
});

require(['JClic']);
