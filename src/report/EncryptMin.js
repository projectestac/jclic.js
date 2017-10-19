/**
 *  File    : report/Encryption.js
 *  Created : 18/06/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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
 */

/* global define */

define([], function () {

  /**
   *
   * Utilities to encrypt and decrypt strings using simple methods, just to avoid write
   * passwords in plain text in data and configuration files. Do not use it as a
   * secure cryptographic system!
   *
   * Based on {@link https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java Encryption}
   * utilities, created by Albert Llastarri for {@link https://github.com/projectestac/jclic JClic}.
   *
   * IMPORTANT: This is a shortened version of Encryption with only the methods needed to decrypt
   * stored passwords. Full version is on file `src/misc/encryption/Encryption.js`
   *
   * @exports Encryption
   * @class
   * @abstract
   */
  var Encryption = {
    /**
     * Default bank password
     * @type {string}
     */
    BLANK: '___blank___##',
    /**
     * Decrypts the given code
     * @param {string} txt - Code to be decrypted
     * @returns {string}
     */
    Decrypt: function (txt) {
      if (txt === null || txt.length === 0)
        return null;
      var s = Encryption.decodify(txt);
      return s === Encryption.BLANK ? '' : s;
    },
    /**
     * @param {string} cA (was char[])
     * @param {integer} fromIndex
     * @returns {string} (was char)
     */
    hexCharArrayToChar: function (cA, fromIndex) {
      var n = 0;
      for (var i = 0; i <= 3; i++) {
        var j = Number.parseInt(cA[fromIndex + i], 16);
        if (isNaN(j))
          throw 'Invalid expression!';
        else
          n = n * 16 + j;
      }
      return String.fromCharCode(n);
    },
    /**
     * @param {string} cA - (was char[])
     * @param {number} fromIndex
     * @returns {number}
     */
    hexCharArrayToInt: function (cA, fromIndex) {
      var n = 0;
      for (var i = 0; i <= 1; i++) {
        var j = Number.parseInt(cA[fromIndex + i], 16);
        if (isNaN(j))
          throw 'Invalid expression!';
        else
          n = n * 16 + j;
      }
      return n;
    },
    /**
     * @param {string} cA - (was char[])
     * @returns {string}
     */
    decodifyZerosField: function (cA) {
      var sb = '',
          num = Number.parseInt(cA[0], 32),
          k = 0;
      for (var i = 0; num !== 0; i++) {
        while (num > 0) {
          sb = sb + cA[i * 3 + 1] + cA[i * 3 + 2];
          num--;
          k++;
        }
        if (cA.length > i * 3 + 3)
          num = Number.parseInt(cA[i * 3 + 3], 32);
        else
          num = 0;
      }
      for (var j = i * 3 + 1; j < cA.length; j++)
        sb = sb + cA[j];
      var c = Number.parseInt(k, 32);
      return c + sb;
    },
    /**
     * @param {string} cA - (was char[])
     * @returns {string} (was StringBuilder)
     */
    decompressZeros: function (cA) {
      cA = Encryption.decodifyZerosField(cA);
      var numBytesZeros = Number.parseInt(cA[0], 32),
          iniNoZeros = numBytesZeros * 2 + 1,
          bFi = false,
          sb = '';
      for (var i = 0; i < numBytesZeros && !bFi; i++) {
        var zeros = Encryption.hexCharArrayToInt(cA, 1 + i * 2),
            s = zeros.toString(2);
        while (s.length < 8)
          s = '0' + s;
        for (var j = 0; j <= 7 && !bFi; j++) {
          if (s[j] === '1')
            sb = sb + '0';
          else if (iniNoZeros < cA.length)
            sb = sb + cA[iniNoZeros++];
          else
            bFi = true;
        }
      }
      return sb;
    },
    /**
     * @param {string} sb1 - (was StringBuilder)
     * @returns {string}
     */
    decodifyFromHex: function (sb1) {
      var sb = '',
          j = 0;
      for (var i = 0; j < sb1.length; i++) {
        var c = Encryption.hexCharArrayToChar(sb1, j);
        sb = sb + c;
        j += 4;
      }
      return sb;
    },
    /**
     * @param {string} s
     * @returns {string} (was char[])
     */
    unchangeOrder: function (s) {
      var m = 0;
      var n = s.length - 1;
      var cA = [];
      for (var p = 0; p < s.length; p++)
        cA[p] = '';
      for (var i = 0; i < s.length; i++)
        if (i % 2 === 0)
          cA[i] = s[m++];
        else
          cA[i] = s[n--];

      return cA.join('');
    },
    /**
     * @param {string} word
     * @returns {string}
     */
    codify: function (word) {
      if (word.length > 24)
        throw 'Password is too large!';
      return Encryption.changeOrder(Encryption.compressZeros(Encryption.codifyToHexWord(word)));
    },
    /**
     * @param {string} word
     * @returns {string}
     */
    decodify: function (word) {
      try {
        return Encryption.decodifyFromHex(Encryption.decompressZeros(Encryption.unchangeOrder(word)));
      } catch (e) { //The supplied word was not codified using this system
        return '';
      }
    }
  };

  return Encryption;
});
