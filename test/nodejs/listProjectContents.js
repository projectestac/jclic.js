//
// Lists the contents of a JClic project file
//
// Usage:
// node listProjectContents.js [filename]
//

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

// Log project properties to stdout
console.log('Project "%s" loaded', file);
console.log('Name: %s', project.name);
console.log('Version: %s', project.version);
console.log('Title: %s', project.settings.title);
console.log('Description: %s', project.settings.description);
console.log('Languages: %s', project.settings.languages);
console.log('Skin: %s', project.settings.skinFileName);

console.log('\nACTIVITIES:');
var activities = Object.keys(project._activities);
var nActivities = activities.length;
for (var p = 0; p < nActivities; p++)
  console.log('- %s', activities[p]);

console.log('\nSEQUENCES:');
var sequences = project.activitySequence.elements;
var nSequences = sequences.length;
for (var p = 0; p < nSequences; p++) {
  var el = sequences[p];
  console.log('- %s %s %s | buttons: %s | delay: %d', el.tag ? '[' + el.tag + ']' : '', el.activityName, el.description ? el.description : '', el.navButtons, el.delay);
}

console.log('\nMEDIA:');
var media = Object.keys(project.mediaBag.elements);
var nMedia = media.length;
for (var p = 0; p < nMedia; p++)
  console.log('- %s', media[p]);

console.log('\nTOTAL: %d activities, %d sequences, %d media files', nActivities, nSequences, nMedia);




