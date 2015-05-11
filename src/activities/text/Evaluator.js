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
  };

  Evaluator.prototype = {
    constructor: Evaluator,
    //
    // The type of Evaluator
    className: null,
    //
    // Fields used by BasicEvaluator and ComplexEvaluator
    checkCase: false, checkAccents: true,
    checkPunctuation: true, checkDoubleSpaces: false,
    //
    // Fields used by ComplexEvaluator
    detail: true, checkSteps: 3, checkScope: 6,
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
    }
  };

  return Evaluator;

});
