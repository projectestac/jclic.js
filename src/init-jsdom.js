/*!
 *  File    : init-jsdom.js
 *  Created : 12/11/2024
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2024 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/* global global, globalThis */

/**
 * Initializes some global variables needed for JClic in order to be used in nodeJS
 */

import jsdom from 'jsdom';
import { DOMParser } from '@xmldom/xmldom';

// Create a new DOM object
const dom = new jsdom.JSDOM('<!DOCTYPE html><head></head><body></body>', { url: 'https://example.com' });

// `global` is a legacy object in NodeJS 22 and will be replaced soon by `globalThis`
// Also, provide a fallback empty object in case of no `global` object at all (should not occur!)
const globalObject = globalThis || global || {};

// Assign global variables, only if not already assigned
if (!globalObject.window)
  globalObject.window = dom.window;
if (!globalObject.document)
  globalObject.document = dom.window.document;
if (!globalObject.navigator)
  globalObject.navigator = dom.window.navigator;
if (!globalObject.Image)
  globalObject.Image = dom.window.Image;
if (!globalObject.Audio)
  globalObject.Audio = dom.window.Audio;
if (!globalObject.XMLHttpRequest)
  globalObject.XMLHttpRequest = dom.window.XMLHttpRequest;
if (!globalObject.DOMParser)
  globalObject.DOMParser = DOMParser;

// This is just a side-effect module
export default {};
