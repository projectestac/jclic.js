#!/usr/bin/env node

//
// Dumps a JClic project in JSON format (CommonJS version)
//
// Usage:
// node serializeProject.js [filename]
//

/* global process, global, require, console */

var fs = require('fs');

// Load the main JClic module.
// Here this is done with a relative path. In other contexts just install
// the 'jclic' NPM package and require it, like in:
// `var jclic = require('jclic');`
var jclic = require('../../dist/jclic-node.js');

if (process.argv.length < 3) {
  console.log('Usage: serializeProject.js {path/to/project.jclic[.json]}');
  console.log('Please provide a path to a \'.jclic\' (XML) or \'jclic.json\' file');
  process.exit(-1);
}

// Get the file name from the command line arguments
var file = process.argv[2];

const isXML = file.endsWith('.jclic');

const project = new jclic.JClicProject();
const contents = fs.readFileSync(file, 'utf8');

if (isXML) {
  // Read file and parse it into a DOM object
  var doc = new global.DOMParser().parseFromString(contents, 'text/xml');

  // Create a JClicProject and initialize it with the file contents
  project.setProperties(jclic.$(doc).find('JClicProject'), file, null, {});
}
else {
  var doc = JSON.parse(contents);
  project.setAttributes(doc, file, null, {});
}

console.log(project.getJSON(2));
