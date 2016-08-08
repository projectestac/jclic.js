//    File    : Evaluator.js  
//    Created : 14/04/2015  
//    By      : Francesc Busquets  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "../../Utils"
], function ($, Utils) {

  /**
   * This class and its derivatives {@link Evaluator.BasicEvaluator} and
   * {@link Evaluator.ComplexEvaluator} are used to evaluate the answers written by the final users
   * in text activities.
   * @exports Evaluator
   * @class
   * @param {string} className - The class name of this evaluator.
   */
  var Evaluator = function (className) {
    this.className = className;
    if (window.Intl && window.Intl.Collator) {
      this.collator = new window.Intl.Collator();
    } else {
      this.collator = {
        compare: function (a, b) {
          var result = this.checkCase ? a === b : a.toUpperCase() === b.toUpperCase();
          return result;
        }
      };
    }
  };

  /**
   * Factory constructor that returns a specific type of {@link Evaluator} based on the `class`
   * attribute declared in the $xml element.
   * @param {external:jQuery} $xml - The XML element to be parsed.
   * @returns {Evaluator}
   */
  Evaluator.getEvaluator = function ($xml) {
    var ev = null;
    if ($xml) {
      var className = $xml.attr('class');
      var cl = Evaluator.CLASSES[className];
      if (cl) {
        ev = new cl(className);
        ev.setProperties($xml);
      } else
        Utils.log('error', 'Unknown evaluator class: "%s"', className);
    }
    return ev;
  };

  Evaluator.prototype = {
    constructor: Evaluator,
    /**
     * The type of evaluator.
     * @type {string} */
    className: null,
    /**
     * Whether this evaluator has been initialized or not.
     * @type {boolean} */
    initiated: false,
    /**
     * The Intl.Collator object used to compare strings, when available.
     * @type {external:Collator} */
    collator: null,
    /**
     * Whether uppercase and lowercase expressions must be considered equivalent or not.
     * @type {boolean} */
    checkCase: false,
    /**
     * 
     * Loads the object settings from a specific JQuery XML element 
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    setProperties: function ($xml) {
      var evaluator = this;
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var value = this.value;
        switch (name) {
          case 'class':
            evaluator.className = value;
            break;
          case 'checkCase':
          case 'checkAccents':
          case 'checkPunctuation':
          case 'checkDoubleSpaces':
          case 'detail':
            evaluator[name] = Utils.getBoolean(value);
            break;
          case 'checkSteps':
          case 'checkScope':
            evaluator[name] = Number(value);
            break;
        }
      });
      return this;
    },
    /**
     * 
     * Initializes this evaluator
     */
    init: function () {
      this.initiated = true;
    },
    /**
     * 
     * Checks the given text against a set of valid matches
     * @param {string} text - The text to be checked
     * @param {(string|string[])} match - The valid expression or expressions with which to compare.
     * @returns {boolean} - `true` if the checked expression is valid, `false` otherwise.
     */
    checkText: function (text, match) {
      if (match instanceof Array) {
        for (var i = 0; i < match.length; i++)
          if (this._checkText(text, match[i]))
            return true;
      } else if (match)
        return this._checkText(text, match);

      return false;
    },
    /**
     * 
     * Abstract method to be implemented in subclasses.
     * Performs the validation of a string against a single match.
     * @param {string} text - The text to be checked
     * @param {string} match - A valid expression with which to compare.
     * @returns {boolean} - `true` when the two expressions can be considered equivalent.
     */
    _checkText: function (text, match) {
      return false;
    },
    /**
     * 
     * Evaluates the given text against a set of valid matches, returning an array of flags useful
     * to indicate where the mistakes are located.
     * @param {string} text - The text to be checked
     * @param {(string|string[])} match - The valid expression or expressions with which to compare.
     * @returns {number[]} - An array of flags (one number for character) indicating whether each
     * position is erroneous or ok.
     */
    evalText: function (text, match) {
      if (!(match instanceof Array))
        match = [match];
      return this._evalText(text, match);
    },
    /**
     * 
     * Abstract method to be implemented in subclasses.<br>
     * Performs the evaluation of a string against an array of valid matches, returning an array of
     * flags useful to indicate where the mistakes are located.
     * @param {string} text - The text to be checked
     * @param {string} match - A valid expression with which to compare.
     * @returns {number[]} - An array of flags (one number for character) indicating whether each
     * position is erroneous or ok.
     */
    _evalText: function (text, match) {
      return [];
    },
    /**
     * 
     * Checks if the given array of flags (usually returned by `evalText`) can be considered as a
     * valid or erroneous answer.
     * @param {number[]} flags
     * @returns {boolean} - `true` when all flags are 0 (meaning no error).
     */
    isOk: function (flags) {
      for (var i = 0; i < flags.length; i++)
        if (flags[i] !== 0)
          return false;
      return true;
    }
  };

  /**
   * A basic evaluator that just compares texts, without looking for possible coincidences of text
   * fragments once erroneous characters removed.
   * @class
   * @extends Evaluator
   * @param {string} className - The class name of this evaluator.
   */
  Evaluator.BasicEvaluator = function (className) {
    Evaluator.call(this, className);
  };

  Evaluator.BasicEvaluator.prototype = {
    constructor: Evaluator.BasicEvaluator,
    /**
     * Whether accented letters must be considered equivalent or not.
     * @type {boolean} */
    checkAccents: true,
    /**
     * Whether to check or not dots, commas and other punctuation marks when comparing texts.
     * @type {boolean} */
    checkPunctuation: true,
    /**
     * Whether to check or not the extra spaces added between words.
     * @type {boolean} */
    checkDoubleSpaces: false,
    /**
     * String containing all the characters considered as punctuation marks (currently ".,;:")
     * @type {string} */
    PUNCTUATION: '.,;:',
    /**
     * 
     * Initializes the {@link Evaluator#collator}.
     */
    init: function () {
      Evaluator.prototype.init.call(this);
      if (window.Intl && window.Intl.Collator) {
        this.collator = new window.Intl.Collator({
          sensitivity: this.checkAccents ? this.checkCase ? 'case' : 'accent' : 'base',
          ignorePunctuation: this.checkPunctuation
        });
      }
    },
    /**
     * 
     * Performs the validation of a string against a single match.
     * @param {string} text - The text to be checked
     * @param {string} match - A valid expression with which to compare.
     * @returns {boolean} - `true` when the two expressions can be considered equivalent.
     */
    _checkText: function (text, match) {
      return this.collator.compare(this.getClearedText(text), this.getClearedText(match)) === 0;
    },
    /**
     * 
     * Performs the evaluation of a string against an array of valid matches, returning an array of
     * flags useful to indicate where the mistakes are located.<br>
     * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (ok). See
     * {@link Evaluator.ComplexEvaluator} for more detailed analysis of answers.
     * @param {string} text - The text to be checked
     * @param {string} match - A valid expression with which to compare.
     * @returns {number[]} - An array of flags (one number for character) indicating whether each
     * position is erroneous or ok.
     */
    _evalText: function (text, match) {
      var flags = [];
      var result = this._checkText(text, match[0]);
      for (var i = 0; i < text.length; i++) {
        flags[i] = result ? 0 : 1;
      }
      return flags;
    },
    /**
     * 
     * Removes double spaces and erroneous characters from a given text expression.
     * @param {string} src - The text to be processed.
     * @param {boolean[]} skipped - An array of boolean indicating which characters should be removed
     * from the string.
     * @returns {string}
     */
    getClearedText: function (src, skipped) {

      var i;

      if (!skipped) {
        skipped = [];
        for (i = 0; i < src.length; i++)
          skipped[i] = false;
      }

      if (this.checkPunctuation && this.checkDoubleSpaces)
        return src;

      var sb = '';
      var wasSpace = false;
      for (i = 0; i < src.length; i++) {
        var ch = src.charAt(i);
        if (this.PUNCTUATION.indexOf(ch) >= 0 && !this.checkPunctuation) {
          if (!wasSpace)
            sb += ' ';
          else
            skipped[i] = true;
          wasSpace = true;
        } else if (ch === ' ') {
          if (this.checkDoubleSpaces || !wasSpace)
            sb += ch;
          else
            skipped[i] = true;
          wasSpace = true;
        } else {
          wasSpace = false;
          sb += ch;
        }
      }
      return sb;
    }
  };

  // BasicEvaluator extends Evaluator
  Evaluator.BasicEvaluator.prototype = $.extend(Object.create(Evaluator.prototype), Evaluator.BasicEvaluator.prototype);

  /**
   * ComplexEvaluator acts like {@link Evaluator.BasicEvaluator}, but providing feedback about
   * the location of mistakes on the user's answer.
   * @class
   * @extends Evaluator.BasicEvaluator
   * @param {string} className - The class name of this evaluator.
   */
  Evaluator.ComplexEvaluator = function (className) {
    Evaluator.BasicEvaluator.call(this, className);
  };

  Evaluator.ComplexEvaluator.prototype = {
    constructor: Evaluator.ComplexEvaluator,
    /**
     * Whether to detail or not the location of errors found on the analyzed text.
     * @type {boolean} */
    detail: true,
    /**
     * Number of times to repeat the evaluation process if an error is found, eliminating in each
     * cycle the extra characters that caused the error.
     * @type {number} */
    checkSteps: 3,
    /**
     * When an eror is detected in the analyzed expression, this variable indicates the number of
     * characters the checking pointer will be moved forward and back looking for a coincident
     * expression.<br>
     * For example, comparing the answer "_one lardzy dog_" with the correct answer "_one lazy dog_"
     * will detect an error at position 6 (an "r" instead of "z"). If `checkSteps` is set to 2 or
     * greater, the "_zy dog_" expression at position 8 will be found and evaluated as valid, while
     * a value of 1 or less will not found any coincident expression beyond the error position, thus
     * evaluating all the remaining sentence as erroneous.
     * @type {number} */
    checkScope: 6,
    /**
     * 
     * Performs the evaluation of a string against an array of valid matches, returning an array of
     * flags useful to indicate where the mistakes are located.<br>
     * In BasicEvaluator, all characters are just marked as 1 (error) or 0 (ok). See
     * {@link Evaluator.ComplexEvaluator} for more detailed analysis of answers.
     * @param {string} text - The text to be checked
     * @param {string} match - A valid expression with which to compare.
     * @returns {number[]} - An array of flags (one number for character) indicating whether each
     * position is erroneous or ok.
     */
    _evalText: function (text, match) {

      var i;

      if (!this.detail)
        return Evaluator.BasicEvaluator.prototype._evalText.call(this, text, match);
      var skipped = [];
      for (i = 0; i < text.length; i++) {
        skipped[i] = false;
      }
      var sText = this.getClearedText(text, skipped);
      var maxCheck = -1, maxCheckIndex = -1;
      var numChecks = [];
      var flags = [];

      for (i = 0; i < match.length; i++) {
        flags[i] = [];
        for (var j = 0; j < text.length; j++) {
          flags[i][j] = 0;
        }
        var ok = this.compareSegment(sText, sText.length, match[i], match[i].length, flags[i], false);
        numChecks[i] = this.countFlagsOk(flags[i]);
        if (ok) {
          maxCheckIndex = i;
          maxCheck = numChecks[i];
        }
      }

      if (maxCheckIndex === -1) {
        for (i = 0; i < match.length; i++) {
          if (numChecks[i] > maxCheck) {
            maxCheck = numChecks[i];
            maxCheckIndex = i;
          }
        }
      }

      var returnFlags = [];
      for (i = 0, k = 0; i < text.length; i++) {
        if (skipped[i])
          returnFlags[i] = 0;
        else
          returnFlags[i] = flags[maxCheckIndex][k++];
      }
      return returnFlags;
    },
    /**
     * 
     * Counts the number of flags on the provided array that are zero.
     * @param {number[]} flags
     * @returns {number}
     */
    countFlagsOk: function (flags) {
      var r = 0;
      for (var i = 0; i < flags.length; i++)
        if (flags[i] === 0)
          r++;
      return r;
    },
    /**
     * 
     * Compares two segments of text.<br>
     * This function should make recursive calls.
     * @param {string} src - Text to be compared
     * @param {number} ls - Offset in `src` where to start the comparision
     * @param {string} ok - Text to match against.
     * @param {number} lok - Offset in `ok` where to start the comparision.
     * @param {number[]} attr - Array of integers that will be filled with information about the
     * validity or error of each character in `src`.
     * @param {boolean} iterate - When `true`, the segment will be iterated looking for other
     * coincident fragments.
     * @returns {boolean} - `true` if the comparision was valid.
     */
    compareSegment: function (src, ls, ok, lok, attr, iterate) {
      var is = 0, iok = 0, lastIs = 0;
      var lastiok = true;
      var coinci = 0;
      var result = true;
      var chs = '', chok = '';

      if (ls === 0 || lok === 0 || src === null || ok === null)
        return false;

      for (; is < ls; is++, iok++) {
        chs = src.charAt(is);
        lastIs = is;
        if (iok >= 0 && iok < lok)
          chok = ok.charAt(iok);
        else
          chok = 0;
        if (this.collator.compare(chs, chok) === 0) {
          coinci++;
          attr[is] = 0;
          lastiok = true;
        } else {
          result = false;
          attr[is] = 1;
          if (!iterate && lastiok && chok !== 0 && this.checkSteps > 0 && this.checkScope > 0) {
            var lbloc = 2 * this.checkSteps + 1;
            var itcoinc = [];
            var i = 0, j, is2, iok2, ls2, lok2, jmax;
            for (j = 0; j < lbloc; j++) {
              itcoinc[j] = 0;
              i = iok + Math.floor((j + 1) / 2) * ((j & 1) !== 0 ? 1 : -1);
              if (i >= lok)
                continue;
              is2 = i < 0 ? is - i : is;
              if (is2 >= ls)
                continue;
              ls2 = (ls2 = ls - is2) > this.checkScope ? this.checkScope : ls2;
              iok2 = i < 0 ? 0 : i;
              lok2 = (lok2 = lok - iok2) > this.checkScope ? this.checkScope : lok2;
              var flags2 = [];
              for (var w = 0; w < src.length - is2; w++)
                flags2[w] = 0;
              var result2 = this.compareSegment(src.substring(is2), ls2, ok.substring(iok2), lok2, flags2, true);
              itcoinc[j] = this.countFlagsOk(flags2);
              if (result2)
                break;
            }
            if (j === lbloc) {
              jmax = this.checkSteps;
              for (j = 0; j < lbloc; j++)
                if (itcoinc[j] > itcoinc[jmax])
                  jmax = j;
              i = iok + Math.floor((jmax + 1) / 2) * ((jmax & 1) !== 0 ? 1 : -1);
            } else if (itcoinc[j] > 0)
              coinci++;
            iok = i;
            lastiok = false;
          }
        }
      }
      if (iok !== lok) {
        result = false;
        attr[lastIs] = 1;
      }
      return result;
    }
  };

  // 
  // ComplexEvaluator extends BasicEvaluator
  Evaluator.ComplexEvaluator.prototype = $.extend(
      Object.create(Evaluator.BasicEvaluator.prototype),
      Evaluator.ComplexEvaluator.prototype);

  // List of known Evaluator classes
  Evaluator.CLASSES = {
    '@BasicEvaluator': Evaluator.BasicEvaluator,
    '@ComplexEvaluator': Evaluator.ComplexEvaluator
  };

  return Evaluator;
});
