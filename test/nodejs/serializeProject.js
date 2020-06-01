#!/usr/bin/env node

//
// Dumps a JClic project in JSON format
//
// Usage:
// node serializeProject.js [filename]
//

/* global process, global, require, console */

var fs = require('fs');

// Use mock-browser as a browser simulator
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
global.window = mock.getWindow();
global.document = mock.getDocument();
global.Image = function () { };
global.Audio = function () { };

// Use `xmldom` as DOM parser
global.DOMParser = require('xmldom').DOMParser;

// amdefine allows to load AMD modules into node.js modules
require('amdefine/intercept');

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
