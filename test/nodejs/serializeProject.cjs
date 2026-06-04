#!/usr/bin/env node

//
// Dumps a JClic project in JSON format (CommonJS version)
//
// Usage:
// node serializeProject.js [filename]
//

const fs = require('fs');

// Load the main JClic module.
// Here this is done with a relative path. In other contexts just install
// the 'jclic' NPM package and require it, like in:
// `const { $, JClicProject } = require('jclic');`
const { $, JClicProject } = require('../../dist-node/jclic-node.js');

if (process.argv.length < 3) {
  console.log('Usage: serializeProject.js {path/to/project.jclic[.json]}');
  console.log('Please provide a path to a \'.jclic\' (XML) or \'jclic.json\' file');
  process.exit(-1);
}

// Get the file name from the command line arguments
const file = process.argv[2];

const isXML = file.endsWith('.jclic');

const project = new JClicProject();
const contents = fs.readFileSync(file, 'utf8');

if (isXML) {
  // Read file and parse it into a DOM object
  const doc = new global.DOMParser().parseFromString(contents, 'application/xml');

  // Create a JClicProject and initialize it with the file contents
  project.setProperties($(doc).find('JClicProject'), file, null, {});
}
else {
  const doc = JSON.parse(contents);
  project.setAttributes(doc, file, null, {});
}

console.log(project.getJSON(2));
