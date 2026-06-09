/*!
 *  File    : jclic-node.js
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

// Initialize fake DOM global variables like 'window' or 'document'.
import './init-jsdom.js';

export * from 'jquery';
export * from './JClic';
export * from './Activity';
export * from './JClicPlayer';
export * from './PlayerHistory';
export * from './Utils';
export * from './AWT';
export * from './GlobalData';
export * from './activities';
export * from './media';
export * from './automation';
export * from './bags';
export * from './bags';
export * from './boxes';
export * from './media';
export * from './project';
export * from './report';
export * from './shapers';
export * from './skins';
