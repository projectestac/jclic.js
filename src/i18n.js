/**
 *  File    : i18n.js
 *  Created : 26/05/2016
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
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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

/* global window */

import i18next from 'i18next';
import GlobalData from './GlobalData';
import { log, setGetMsgFunction } from './Utils';

/**
 * Checks if the language preferred by the user (based on browser and/or specific settings)
 * is in a list of available languages.
 * @param {string[]} availableLanguages - Array of available languages. It should contain at least one item.
 * @param {string} [defaultLanguage=en] -Language to be used by default when not found the selected one
 * @param {string} [setLang] - Request this specific language
 * @returns {string} - The most suitable language for this request
 */
export function checkPreferredLanguage(availableLanguages, defaultLanguage = 'en', setLang) {
  let result = -1;
  // Create an array to store possible values
  let tries = [];
  // If "setLang" is specified, check it
  if (setLang)
    tries.push(setLang);

  // Add user's preferred languages, if any
  if (window.navigator.languages)
    tries = tries.concat(window.navigator.languages);

  // Add the navigator main language, if defined
  if (window.navigator.language)
    tries.push(window.navigator.language);

  // Add English as final option
  tries.push(defaultLanguage);

  for (let i = 0; i < tries.length; i++) {
    let match = -1;
    for (let n in availableLanguages) {
      if (tries[i].indexOf(availableLanguages[n]) === 0) {
        match = n;
        if (tries[i] === availableLanguages[n]) {
          result = n;
          break;
        }
      }
    }
    if (result >= 0 || (result = match) >= 0)
      break;
  }
  return availableLanguages[result >= 0 ? result : 0];
};

/**
 * Initializes i18next, assigning the translation function to ps
 * @param {type} ps
 */
export function i18n(ps) {
  i18next.init({
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: 'en',
    lng: checkPreferredLanguage(GlobalData.languages, 'en', ps.options.lang),
    resources: {
      en: { translation: {} },
      ca: { translation: GlobalData.messages.ca },
      'ca_ES@valencia': { translation: GlobalData.messages['ca_ES@valencia'] },
      es: { translation: GlobalData.messages.es }
    }
  }, (err, t) => {
    if (err)
      log('error', `Error initializing "i18next": ${err.message}`);
    else {
      setGetMsgFunction(t);
      ps.JClicVersion = GlobalData.version;
    }
  });
};

export default i18n;
