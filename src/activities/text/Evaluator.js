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

//
// This class and its derivatives BasicEvaluator and ComplexEvaluator are 
// used to evaluate answers in text activities
//
  var Evaluator = function (className) {
    this.className = className;
    if (window.Intl && window.Intl.Collator) {
      this.collator = new window.Intl.Collator();
    }
    else {
      this.collator = {
        compare: function (a, b) {
          var result = (this.checkCase ? (a === b) : (a.toUpperCase() === b.toUpperCase()));
          return result;
        }
      };
    }
  };

  var BasicEvaluator = function (className) {
    Evaluator.call(this, className);
  };

  var ComplexEvaluator = function (className) {
    BasicEvaluator.call(this, className);
  };

  Evaluator.prototype = {
    constructor: Evaluator,
    //
    // The type of Evaluator
    className: null,
    //
    // Initiliazation flag
    initiated: false,
    //
    // The Intl.Collator object used to compare strings, when available.
    // See: [https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Collator]
    collator: null,
    // 
    // Fields used by BasicEvaluator and ComplexEvaluator
    checkCase: false,
    checkAccents: true,
    checkPunctuation: true,
    checkDoubleSpaces: false,
    PUNCTUATION: '.,;:',
    //
    // Fields used by ComplexEvaluator
    detail: true,
    checkSteps: 3,
    checkScope: 6,
    //
    // Loads the object settings from a specific JQuery XML element 
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
    //
    // Inits this Evaluator
    init: function () {
      this.initiated = true;
    },
    //
    // Checks the given text against a set of valid matches
    // text (String)
    // match (String or Array of String)
    // Returns: Boolean
    checkText: function (text, match) {
      if (match instanceof Array) {
        for (var i = 0; i < match.length; i++)
          if (this._checkText(text, match[i]))
            return true;
      }
      else if (match)
        return this._checkText(text, match);

      return false;
    },
    //
    // Abstract method to be implemented in subclasses.
    // Performs the validation of a string against a single match
    // text (String)
    // match (String)
    _checkText: function (text, match) {
      return false;
    },
    //
    // Evaluates the given text against a set of valid matches, returning an array of flags
    // of flags useful to indicate where the mistakes are located.
    // text (String)
    // match (String or Array of String)
    // Returns: Array of number
    evalText: function (text, match) {
      if (!(match instanceof Array))
        match = [match];
      return this._evalText(text, match);
    },
    //
    // Abstract method to be implemented in subclasses.
    // Performs the evaluation of a string against an array of valid matches, returning an array
    // of flags useful to indicate where the mistakes are located.
    // text (String)
    // match (array of String)
    // Returns: Array of number
    _evalText: function (text, match) {
      return [];
    },
    // Checks if the given array of flags (usually retirned by `evalText`) can be considered a
    // valid answer.
    // flags (Array of number)
    isOk: function (flags) {
      for (var i = 0; i < flags.length; i++)
        if (flags[i] !== 0)
          return false;
      return true;
    },
    //
    // Dynamic constructor that returns a specific type of Evaluator
    // based on the `class` attribute declared in the $xml element  
    // Should be called only from Evaluator.constructor
    _getEvaluator: function ($xml) {
      var ev = null;
      if ($xml) {
        var className = $xml.attr('class');
        var cl = Evaluator.prototype._CLASSES[className];
        if (cl) {
          ev = new cl(className);
          ev.setProperties($xml);
        }
        else
          console.log('[JClic] Unknown evaluator class: ' + className);
      }
      return ev;
    },
    //
    // Evaluator classes
    _CLASSES: {
      '@BasicEvaluator': BasicEvaluator,
      '@ComplexEvaluator': ComplexEvaluator
    },
    //
    // References to the two Evaluator classes:
    BasicEvaluator: BasicEvaluator,
    ComplexEvaluator: ComplexEvaluator
  };

  //
  // BasicEvaluator just checks the validity of a given text agains a match
  BasicEvaluator.prototype = {
    constructor: BasicEvaluator,
    //
    // Initializes the `collator`
    init: function () {
      Evaluator.prototype.init.call(this);
      if (window.Intl && window.Intl.Collator) {
        this.collator = new window.Intl.Collator({
          sensitivity: this.checkAccents ? this.checkCase ? 'case' : 'accent' : 'base',
          ignorePunctuation: this.checkPunctuation
        });
      }
    },
    //
    // Performs comparision between text and match
    _checkText: function (text, match) {
      return this.collator.compare(this.getClearedText(text), this.getClearedText(match)) === 0;
    },
    //
    // Performs comparision between `text` and `match`, returning an array of flags indicating which 
    // characters in `text` are wrong. In BasicEvaluator, all characters are marked as 1 or 0. See
    // ComplexEvaluator for more specific analysis
    _evalText: function (text, match) {
      var flags = [];
      var result = this._checkText(text, match[0]);
      for (var i = 0; i < text.length; i++) {
        flags[i] = result ? 0 : 1;
      }
      return flags;
    },
    //
    // src (String)
    // skipped (null or array of Booleans)
    // Returns: String
    getClearedText: function (src, skipped) {
      if (!skipped) {
        skipped = [];
        for (var i = 0; i < src.length; i++)
          skipped[i] = false;
      }

      if (this.checkPunctuation && this.checkDoubleSpaces)
        return src;

      var sb = '';
      var wasSpace = false;
      for (var i = 0; i < src.length; i++) {
        var ch = src.charAt(i);
        if (this.PUNCTUATION.indexOf(ch) >= 0 && !this.checkPunctuation) {
          if (!wasSpace)
            sb += ' ';
          else
            skipped[i] = true;
          wasSpace = true;
        }
        else if (ch === ' ') {
          if (this.checkDoubleSpaces || !wasSpace)
            sb += ch;
          else
            skipped[i] = true;
          wasSpace = true;
        }
        else {
          wasSpace = false;
          sb += ch;
        }
      }
      return sb;
    }
  };

  // 
  // BasicEvaluator extends Evaluator
  BasicEvaluator.prototype = $.extend(Object.create(Evaluator.prototype), BasicEvaluator.prototype);


  //
  // ComplexEvaluator acts like BasicEvaluator, but providing feedback about what's the location
  // of the mistakes into the user's answer.
  ComplexEvaluator.prototype = {
    constructor: ComplexEvaluator,
    //
    // Performs comparision between `text` and `match`, returning an array of flags indicating which 
    // characters in `text` are wrong.
    // text (String)
    // match (array of String)
    // Returns: Array of number    
    _evalText: function (text, match) {
      if (!this.detail)
        return BasicEvaluator.prototype._evalText.call(this, text, match);
      var skipped = [];
      for (var i = 0; i < text.length; i++) {
        skipped[i] = false;
      }
      var sText = this.getClearedText(text, skipped);
      var maxCheck = -1, maxCheckIndex = -1;
      var numChecks = [];
      var flags = [];

      for (var i = 0; i < match.length; i++) {
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
        for (var i = 0; i < match.length; i++) {
          if (numChecks[i] > maxCheck) {
            maxCheck = numChecks[i];
            maxCheckIndex = i;
          }
        }
      }

      var returnFlags = [];
      for (var i = 0, k = 0; i < text.length; i++) {
        if (skipped[i])
          returnFlags[i] = 0;
        else
          returnFlags[i] = flags[maxCheckIndex][k++];
      }
      return returnFlags;
    },
    //
    // Count the number of 'flags' in an array that are zero
    // flags (Array of Number)
    countFlagsOk: function (flags) {
      var r = 0;
      for (var i = 0; i < flags.length; i++)
        if (flags[i] === 0)
          r++;
      return r;
    },
    //
    // Compare two segments of text
    // src (String)
    // ls (number)
    // ok (String)
    // lok (number)
    // attr (Array of number)
    // iterate (boolean)
    // Returns: boolean
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
              is2 = (i < 0 ? is - i : is);
              if (is2 >= ls)
                continue;
              ls2 = (ls2 = ls - is2) > this.checkScope ? this.checkScope : ls2;
              iok2 = (i < 0 ? 0 : i);
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
  ComplexEvaluator.prototype = $.extend(Object.create(BasicEvaluator.prototype), ComplexEvaluator.prototype);

  return Evaluator;

});
