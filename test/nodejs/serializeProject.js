#!/usr/bin/env node

//
// Dumps a JClic project in JSON format
//
// Usage:
// node serializeProject.js [filename]
//

/* global process */

var fs = require('fs');

// Use mock-browser as a browser simulator
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
global.window = mock.getWindow();
global.document = mock.getDocument();
global.Image = function () {};
global.Audio = function () {};

// Use `xmldom` as DOM parser
global.DOMParser = require('xmldom').DOMParser;

// amdefine allows to load AMD modules into node.js modules
require('amdefine/intercept');

// Load the main JClic module.
// Here this is done with a relative path. In other contexts just install
// the 'jclic' NPM package and require it, like in:
// `var jclic = require('jclic');`
var jclic = require('../../src/JClic.js');

// Get the file name from the command line arguments, using 'demo.jclic' if none provided.
var file = process.argv.length > 2 ? process.argv[2] : '../jclic-demo/demo.jclic';

// Read file and parse it into a DOM object
var contents = fs.readFileSync(file, 'utf8');
var doc = new DOMParser().parseFromString(contents);

// Create a JClicProject and initialize it with the file contents
var project = new jclic.JClicProject();
project.setProperties(jclic.$(doc).find('JClicProject'), file, null, {});

console.log(JSON.stringify(project.getData(), null, '  '));

