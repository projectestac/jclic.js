#!/usr/bin/env node

//
// Lists the contents of a JClic project file (module version)
//
// Usage:
// node listProjectContents.mjs [filename]
//

/* global process, global, console */

import fs from 'node:fs';
import JClicObject from '../../dist/jclic-node.js';
const { JClicProject, $ } = JClicObject;

// Get the file name from the command line arguments, using 'demo.jclic' if none provided.
const file = process.argv.length > 2 ? process.argv[2] : '../jclic-demo/demo.jclic';

// Create an empty JClicProject
const project = new JClicProject();

if (file.endsWith('.jclic')) {
  // Read file and parse it into a DOM object
  const contents = fs.readFileSync(file, 'utf8');
  const doc = new global.DOMParser().parseFromString(contents, 'application/xml');
  // Initialize project with the file contents
  project.setProperties($(doc).find('JClicProject'), file, null, {});
}
else {
  // Is a JSON file
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  // Initialize project with the file contents
  project.setAttributes(data, file, null, {});
}

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
  console.log('- %s %s %s | buttons: %s | delay: %d', el.tag ? '[' + el.tag + ']' : '', el.activity, el.description ? el.description : '', el.navButtons, el.delay);
}

console.log('\nMEDIA:');
var media = Object.keys(project.mediaBag.elements);
var nMedia = media.length;
for (var p = 0; p < nMedia; p++)
  console.log('- %s', media[p]);

console.log('\nTOTAL: %d activities, %d sequences, %d media files', nActivities, nSequences, nMedia);

