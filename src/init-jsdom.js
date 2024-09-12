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

/* global global */

/**
 * Initializes some global variables needed for JClic in order to be used in nodeJS
 */

import jsdom from 'jsdom';
import { DOMParser } from '@xmldom/xmldom';

const dom = new jsdom.JSDOM('<!DOCTYPE html><head></head><body></body>', { url: 'https://example.com' });
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.Image = dom.window.Image;
global.Audio = dom.window.Audio;
global.XMLHttpRequest = dom.window.XMLHttpRequest;
global.DOMParser = DOMParser;

// This is just a side-effect module
export default {};
