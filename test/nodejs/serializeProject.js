#!/usr/bin/env node

//
// Dumps a JClic project in JSON format
//
// Usage:
// node serializeProject.js [filename]
//

/* global process, global, require, console */

var fs = require('fs');

// Use jsdom as a browser simulator
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM('<!DOCTYPE html><head></head><body></body>', { url: 'https://example.com' });
global.window = dom.window;
global.document = dom.window.document;
global.Image = dom.window.Image;
global.Audio = dom.window.Audio;

// Use `xmldom` as DOM parser
global.DOMParser = require('@xmldom/xmldom').DOMParser;

// Load the main JClic module.
// Here this is done with a relative path. In other contexts just install
// the 'jclic' NPM package and require it, like in:
// `var jclic = require('jclic');`
var jclic = require('../../dist/jclic-node.js');

// Get the file name from the command line arguments
var file = process.argv[2];

if (!file)
  throw 'Please indicate a file name!';

const isXML = file.endsWith('.jclic');

const project = new jclic.JClicProject();
const contents = fs.readFileSync(file, 'utf8');

if (isXML) {
  // Read file and parse it into a DOM object
  var doc = new global.DOMParser().parseFromString(contents);

  // Create a JClicProject and initialize it with the file contents
  project.setProperties(jclic.$(doc).find('JClicProject'), file, null, {});
}
else {
  var doc = JSON.parse(contents);
  project.setAttributes(doc, file, null, {});
}

console.log(project.getJSON(2));
