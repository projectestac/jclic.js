//    File    : Arith.js  
//    Created : 28/05/2015  
//    By      : fbusquet  
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
  "../AutoContentProvider",
  "../../Utils"
], function ($, AutoContentProvider, Utils) {

  //
  // Arith is the first implementation of [AutoContentProvider](AutoContentProvider.html)
  // It's based on the code of ARITH2.DLL, that was initially created for Clic 3.0. It provides
  // randomly generated menthal arithmetics operations that can be used by JClic activities.
  // The operations can be additions, substractions, multiplications or divides. The unknown can be
  // the result of the operation or any of the two operators (in the form A # B = ?, A # ? = C or ? # B = C),
  // or also the operator itself (like A ? B = C).


  // Operator is an Utility class used by Arith to encapsulate the properties and methods related
  // to the members of the operations
  var Operator = function () {
    this.limInf = this.LIM0;
    this.limSup = this.LIM10;
    this.lst = [];
  };

  Operator.prototype = {
    constructor: Operator,
    // Miscellaneous constants used by Operator:
    MAX_VALUE: 100000000,
    WZERO: 1, WONE: 2, WMINUSONE: 4,
    NLIMITS: 26,
    LIMITS: [0, -9999, -1000, -999, -100, -99, -50, -25, -20, -10, -9, -5, -1, 0, 1, 5, 9, 10, 20,
      25, 50, 99, 100, 999, 1000, 9999],
    DEFAULT_LIMIT: 13,
    LIM0: 13,
    LIM10: 17,
    LIMI25: 7,
    LIMS25: 19,
    NOLIM: 25,
    LIM_CH: ["x", "-9999", "-1000", "-999", "-100", "-99", "-50", "-25", "-20", "-10", "-9", "-5",
      "-1", "0", "1", "5", "9", "10", "20", "25", "50", "99", "100", "999", "1000", "9999"],
    NUMLST: 20,
    // 
    // Operator members
    limInf: 0,
    limSup: 10,
    numDec: 0,
    wZero: false,
    wOne: false,
    wMinusOne: false,
    fromList: 0,
    lst: [],
    fromBlank: false,
    //
    // Loads the object settings from a specific JQuery XML element
    setProperties: function ($xml) {
      var op = this;
      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          case 'decimals':
            op.numDec = Number(val);
            break;

          case 'values':
            var values = val.split(' ');
            for (var i = 0; i < values.length; i++)
              op.lst[i] = Number(values[i]);
            break;

          case 'from':
            op.limInf = Number(val);
            break;

          case 'to':
            op.limSup = Number(val);
            break;
        }

        $xml.children().each(function () {
          var $node = $(this);
          switch (this.nodeName) {
            case 'include':
              op.wZero = Utils.getBoolean($node.attr('zero'));
              op.wOne = Utils.getBoolean($node.attr('one'));
              op.wMinusOne = Utils.getBoolean($node.attr('minusOne'));
              break;
          }
        });
      });
      return this;
    }
  };

  var Num = function () {
    this.vf = 0.0; // float
    this.c = 0;
  };

  var Operacio = function () {
    this.numA = new Num();
    this.numB = new Num();
    this.numR = new Num();
    this.op = 0;
  };

  // This is the main class
  var Arith = function (nRows, nCols, content, useIds) {
    AutoContentProvider.call(this, nRows, nCols, content, useIds);
    this.opA = new Operator();
    this.opB = new Operator();
  };

  Arith.prototype = {
    constructor: Arith,
    //      
    // Miscellaneous constants used by Arith:
    NMAXLOOPS: 60,
    NOSORT: 0, SORTASC: 1, SORTDESC: 2,
    SUM: 1, REST: 2, MULT: 4, DIV: 8, NOPERACIONS: 4,
    OPSTR: ['+', '-', String.fromCharCode(215), ':'],
    ABX: 1, AXC: 2, XBC: 4, AXBC: 8, CAXB: 16, NTIPUSEX: 5,
    INDIF: 0, AGB: 1, BGA: 2,
    RES: -12345,
    MAX_STR_LEN: 100,
    // Special blank space
    S: String.fromCharCode(160),
    //
    // Operations use two operators:
    opA: null,
    opB: null,
    // 
    // Boolean flags for operands:
    use_add: true,
    use_subst: false,
    use_mult: false,
    use_div: false,
    // 
    // Allowed types of expressions:
    exp_abx: true, // A op B = X
    exp_axc: false, // A op X = C    
    exp_xbc: false, // X op B = C
    exp_axbc: false, // A x B = C
    exp_caxb: false, // C = A x B
    //
    // Limits and boolean flags related to the result
    resultLimInf: 0,
    resultLimSup: 9999,
    resultCarry: false,
    resultNoDup: false,
    resultOrder: 'NOSORT',
    opCond: 'INDIF',
    //
    // Loads the object settings from a specific JQuery XML element
    setProperties: function ($xml) {
      var arith = this;
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'operand':
            switch ($node.attr('id')) {
              case 'A':
                arith.opA.setProperties($node);
                break;
              case 'B':
                arith.opB.setProperties($node);
                break;
            }
            break;
          case 'operations':
            arith.use_add = Utils.getBoolean($node.attr('plus'));
            arith.use_subst = Utils.getBoolean($node.attr('minus'));
            arith.use_mult = Utils.getBoolean($node.attr('multiply'));
            arith.use_div = Utils.getBoolean($node.attr('divide'));
            break;
          case 'unknown':
            arith.exp_abx = Utils.getBoolean($node.attr('result'));
            arith.exp_xbc = Utils.getBoolean($node.attr('first'));
            arith.exp_axc = Utils.getBoolean($node.attr('last'));
            arith.exp_axbc = Utils.getBoolean($node.attr('operand'));
            arith.exp_caxb = Utils.getBoolean($node.attr('inverse'));
            break;
          case 'result':
            arith.resultLimInf = Utils.getNumber($node.attr('from'), arith.resultLimInf);
            arith.resultLimSup = Utils.getNumber($node.attr('to'), arith.resultLimSup);
            arith.resultCarry = Utils.getBoolean($node.attr('notCarry'), arith.resultCarry);
            arith.resultNoDup = !Utils.getBoolean($node.attr('duplicates'), !arith.resultNoDup);
            var s = $node.attr('order');
            arith.resultOrder = s === 'ascending' ? 'SORTASC' : s === 'descending' ? 'SORTDESC' : 'NOSORT';
            s = $node.attr('condition');
            arith.opCond = s === 'firstBig' ? 'AGB' : s === 'lastBig' ? 'BGA' : 'INDIF';
            break;
        }
      });
      return this;
    },
    // Export a reference to Operator
    Operator: Operator
  };

  // Arith extends AutoContentPtrovider
  Arith.prototype = $.extend(Object.create(AutoContentProvider.prototype), Arith.prototype);

  return Arith;

});
