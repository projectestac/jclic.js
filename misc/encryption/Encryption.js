/**
 *  File    : Encryption.js
 *  Created : 18/06/2016
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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

define([], function() {

  /**
   *
   * Utilities to encrypt and decrypt strings using simple methods, just to avoid write
   * passwords in plain text in data and configuration files. Do not use it as a
   * secure cryptographic system!
   *
   * Based on {@link https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java|Encryption}
   * utilities, created by Albert Llastarri for {@link https://github.com/projectestac/jclic|JClic}.
   *
   * This is the full version, with methods for encrypt and decrypt. JClic.js needs only decrypt
   * methods, defined in EncryptMin.js
   *
       * @abstract
   */
  var Encryption = {
    /**
     * Default bank password
     * @type {string}
     */
    BLANK: '___blank___##',
    /**
     * Encrypts the given text
     * @param {string} txt - The text to be encrypted
     * @returns {string}
     */
    Encrypt: function (txt) {
      if (txt === null || txt.length === 0)
        txt = Encryption.BLANK;
      var result = null;
      try {
        result = Encryption.codify(txt);
      } catch (ex) {
        console.log("Error encripting text: " + ex);
      }
      return result;
    },
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
          n = (n * 16) + j;
      }
      return String.fromCharCode(n);
    },
    /**
     * @param {string} c (was char)
     * @returns {string} (was char[])
     */
    charToHexCharArray: function (c) {
      var hex = '',
          j = c.charCodeAt(0);
      for (var i = 3; i >= 0; i--) {
        hex = (j % 16).toString(16) + hex;
        j /= 16;
      }
      return hex;
    },
    /**
     * @param {number} c
     * @returns {string} (was char[])
     */
    intToHexCharArray: function (c) {
      var hex = '',
          j = Math.round(c);
      for (var i = 1; i >= 0; i--) {
        hex = (j % 16).toString(16) + hex;
        j /= 16;
      }
      return hex;
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
          n = (n * 16) + j;
      }
      return n;
    },
    /**
     * @param {string} cA - (was char[])
     * @returns {string} - (was StringBuilder)
     */
    compressZeros: function (cA) {
      var total = 0,
          sb = '',
          zeros = [];

      var l = (cA.length + 7) / 8;
      for (var k = 0; k < l; k++)
        zeros[k] = 0;

      for (var j = 0; total < cA.length; j++) {
        var b = 0;
        for (var i = 0; i <= 7; i++) {
          b <<= 1;
          if (total < cA.length) {
            if (cA[total] === '0')
              b += 1;
            else
              sb = sb + cA[total];
          }
          total++;
        }
        zeros[j] = b;
      }
      return Encryption.codifyZerosField(zeros, j) + sb;
    },
    /**
     * @param {number[]} zeros
     * @param {number} length
     * @returns {string} (was StringBuilder)
     */
    codifyZerosField: function (zeros, length) {
      var hexZeros = Encryption.codifyToHex(zeros, length); //hexZeros size is always odd
      var codified = '';
      if (hexZeros.length > 1) {
        var c1 = hexZeros[0],
            c2 = hexZeros[1],
            num = 1,
            currentChar = 2;
        while (currentChar < hexZeros.length) {
          if (c1 === hexZeros[currentChar] && c2 === hexZeros[currentChar + 1] && num < 32)
            num++;
          else { //New sequence
            codified = codified + num.toString(32) + c1 + c2;
            num = 1;
            c1 = hexZeros[currentChar];
            c2 = hexZeros[currentChar + 1];
          }
          currentChar += 2;
        }
        codified = codified + num.toString(32) + c1 + c2 + '0';
      }
      return codified;
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
          sb = sb + cA[(i * 3) + 1] + cA[(i * 3) + 2];
          num--;
          k++;
        }
        if (cA.length > ((i * 3) + 3))
          num = Number.parseInt(cA[(i * 3) + 3], 32);
        else
          num = 0;
      }
      for (var j = (i * 3) + 1; j < cA.length; j++)
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
          iniNoZeros = (numBytesZeros * 2) + 1,
          bFi = false,
          sb = '';
      for (var i = 0; i < numBytesZeros && !bFi; i++) {
        var zeros = Encryption.hexCharArrayToInt(cA, 1 + (i * 2)),
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
     * @param {number[]} bA
     * @param {number} length
     * @returns {string}
     */
    codifyToHex: function (bA, length) {
      var j = 0,
          cA = [];
      for (var p = 0; p < length * 2; p++)
        cA[p] = '';
      for (var i = 0; i < length; i++) {
        var hex = Encryption.intToHexCharArray(bA[i]);
        for (var k = 0; k < 2; k++)
          cA[j++] = hex[k];
      }
      return cA.join('');
    },
    /**
     * @param {string} s
     * @returns {string} (was char[])
     */
    codifyToHexWord: function (s) {
      var j = 0,
          cA = [];
      for (var p = 0; p < s.length * 4; p++)
        cA[p] = '';
      for (var i = 0; i < s.length; i++) {
        var hex = Encryption.charToHexCharArray(s[i]);
        for (var k = 0; k < 4; k++)
          cA[j++] = hex[k];
      }
      return cA.join('');
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
     * @param {string} s - (was StringBuilder)
     * @returns {string} (was char[])
     */
    changeOrder: function (s) {
      var m = 0,
          n = s.length - 1,
          cA = [];
      for (var p = 0; p < s.length; p++)
        cA[p] = '';
      for (var i = 0; i < s.length; i++)
        if ((i % 2) === 0)
          cA[m++] = s[i];
        else
          cA[n--] = s[i];
      return cA.join('');
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
        if ((i % 2) === 0)
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
