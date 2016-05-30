//  File    : i18n.js  
//  Created : May 26, 2016  
//  By      : linkat  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  http://projectestac.github.io/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  'i18next',
  './GlobalData'
], function (i18next, GlobalData) {

  var i18n = {
    /**
     * Checks if the language preferred by the user (based on browser and/or specific settings)
     * is in a list of available languages.
     * @param {string[]} availableLanguages - Array of available languages. It should contain at least one item.
     * @param {string=} defaultLanguage -Language to be used by default when not found the selected one
     * @param {string} setLang - Request this specific language
     * @returns {string} - The most suitable language for this request
     */
    checkPreferredLanguage: function (availableLanguages, defaultLanguage, setLang) {
      var result = -1;
      // Create an array to store possible values
      var tries = [];
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
      tries.push(defaultLanguage ? defaultLanguage : 'en');

      for (var i in tries) {
        var match = -1;
        for (var n in availableLanguages) {
          if (tries[i].indexOf(availableLanguages[n]) === 0) {
            match = n;
            if (tries[i] === availableLanguages[n]) {
              result = n;
              break;
            }
          }
        }
        if (result >= 0 || (result=match)>=0)
          break;
      }
      return availableLanguages[result >= 0 ? result : 0];
    },
    /**
     * Initializes i18next, assigning the translation function to ps
     * @param {type} ps
     */
    init: function (ps) {
      i18next.init({
        nsSeparator: false,
        keySeparator: false,
        fallbackLng: 'en',
        lng: i18n.checkPreferredLanguage(GlobalData.languages, 'en', ps.options.lang),
        resources: {
          en: {translation: {}},
          ca: {translation: GlobalData.messages.ca},
          'ca_ES@valencia': {translation: GlobalData.messages['ca_ES@valencia']},
          es: {translation: GlobalData.messages.es}
        }
      }, function (err, t) {
        if (err)
          console.log('Error initializing "i18next": ' + err);
        else {
          ps.getMsg = t;
          ps.JClicVersion = GlobalData.version;
        }
      });
    }
  };

  return i18n;

});
