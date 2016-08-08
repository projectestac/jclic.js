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

  /**
   * Arith provides randomly generated menthal arithmetics operations, ready to be used in JClic activities.<br>
   * The operations can be additions, substractions, multiplications or divides. The unknown of these
   * operations can be the result of the operation (`A op B = ?`), any of the two operators
   * (`A op ? = C` or `? op B = C`) or also the operator itself (`A ? B = C`).
   * @exports Arith
   * @class
   * @extends AutoContentProvider
   * @param {JClicProject} project - The JClic project to which this provider is related
   */
  var Arith = function (project) {
    AutoContentProvider.call(this, project);
    this.opA = new Arith.Operator();
    this.opB = new Arith.Operator();
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
    /**
     * First operator
     * @type {Arith.Operator} */
    opA: null,
    /**
     * Second operator
     * @type {Arith.Operator} */
    opB: null,
    /**
     * Allow additions
     * @type {boolean} */
    use_add: true,
    /**
     * Allow substractions
     * @type {boolean} */
    use_subst: false,
    /**
     * Allow multiplications
     * @type {boolean} */
    use_mult: false,
    /**
     * Allow divides
     * @type {boolean} */
    use_div: false,
    /**
     * Allow expressions of type `A op B = X`
     * @type {boolean} */
    exp_abx: true,
    /**
     * Allow expressions of type `A op X = C`
     * @type {boolean} */
    exp_axc: false,
    /**
     * Allow expressions of type `X op B = C`
     * @type {boolean} */
    exp_xbc: false,
    /**
     * Allow expressions of type `A x B = C`
     * @type {boolean} */
    exp_axbc: false,
    /**
     * Allow inverse expressions, like `C = A op B`
     * @type {boolean} */
    exp_caxb: false,
    /**
     * Lower limit of the result
     * @type {number} */
    resultLimInf: 0,
    /**
     * Upper limit of the result
     * @type {number} */
    resultLimSup: 9999,
    /**
     * Allow carry operations
     * @see {@link https://en.wikipedia.org/wiki/Carry_(arithmetic)}
     * @type {boolean} */
    resultCarry: false,
    /**
     * Avoid operations with the same result
     * @type {boolean} */
    resultNoDup: false,
    /**
     * Type of sorting of results. Possible values are: 'NOSORT', 'SORTASC' and 'SORTDESC'
     * @type {string} */
    resultOrder: 'NOSORT',
    /**
     * Sorting of the operands in commutative operations. Possible values are: 'AGB' (_A greather than B_),
     * 'BGA' (_B greather tan A_) and 'INDIF' (default)
     */
    opCond: 'INDIF',
    /**
     * 
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
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
    /**
     * 
     * Fills the `n` parameter (an {@link Arith.Num}) with a value in accordance with the
     * specifications of `op` (an {@link Arith.Operand}), between two limits.
     * @param {Arith.Num} n - The number
     * @param {Arith.Operator} op - The operator
     * @param {number} limInf2 - Lower limit
     * @param {number} limSup2 - Upper limit
     * @returns {boolean} - `true` if all was OK
     */
    genNum: function (n, op, limInf2, limSup2) {
      var r, exp, rang, ls, li, k, v,
          solved = false;

      n.c = op.numDec;
      exp = n.c === 0 ? 1 : n.c === 1 ? 10 : 100;
      ls = op.limSup;
      if (limSup2 !== Arith.prototype.RES && limSup2 < ls)
        ls = limSup2;
      li = op.limInf;
      if (limInf2 !== Arith.prototype.RES && limInf2 > li)
        li = limInf2;

      solved = false;
      if (op.fromList > 0) {
        n.vf = op.lst[Math.floor(Math.random() * op.fromList)];
        solved = true;
      }
      if (!solved) {
        r = Math.floor(Math.random() * 100);
        if (op.wZero && r <= 10) {
          n.vf = 0;
          solved = true;
        } else if (op.wOne && r > 10 && r <= 20) {
          n.vf = 1;
          solved = true;
        } else if (op.wMinusOne && r > 20 && r <= 30) {
          n.vf = -1;
          solved = true;
        }
      }
      if (!solved) {
        if (li > ls) {
          k = li;
          li = ls;
          ls = k;
        }
        rang = Math.round(ls - li + 1);
        if (rang < 0)
          rang = 1;
        v = (Math.floor(Math.random(rang)) + li) * exp;
        v = Math.round((Math.floor(Math.random() * rang) + li) * exp);
        if (exp > 1)
          v += Math.floor(Math.random() * exp);
        n.vf = v / exp;
      }
      return true;
    },
    /**
     * 
     * Fills the provided {@link Arith.Operator} with real values
     * @param {Arith.Operator} o - The operator to use to generate the operation
     * @returns {boolean} - `true` if all was OK
     */
    genOp: function (o) {
      var i,
          ops = [], nops, op,
          rlinf, rlsup, ri2, rs2,
          q, va, vb, bufa, bufb;

      rlinf = this.resultLimInf;
      rlsup = this.resultLimSup;

      nops = 0;
      if (this.use_add)
        ops[nops++] = 'SUM';
      if (this.use_subst)
        ops[nops++] = 'REST';
      if (this.use_mult)
        ops[nops++] = 'MULT';
      if (this.use_div)
        ops[nops++] = 'DIV';

      op = ops[Math.floor(Math.random() * nops)];
      switch (op) {
        case 'SUM':
          for (i = 0; i < this.NMAXLOOPS; i++) {
            this.genNum(o.numA, this.opA, this.RES, rlsup);
            ri2 = o.numA.vf < rlinf ? rlinf - Math.round(o.numA.vf) : this.RES;
            rs2 = rlsup - Math.round(o.numA.vf);
            switch (this.opCond) {
              case 'AGB':
                if (rs2 === this.RES || rs2 > o.numA.vf)
                  rs2 = Math.round(o.numA.vf);
                break;
              case 'BGA':
                if (ri2 === this.RES || ri2 < o.numA.vf)
                  ri2 = Math.round(o.numA.vf);
                break;
            }
            this.genNum(o.numB, this.opB, ri2, rs2);
            o.numR.vf = o.numA.vf + o.numB.vf;
            if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
              break;
          }
          o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
          o.op = 0;
          if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0) {
            q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;

            bufa = Arith.DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
            bufb = Arith.DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
            for (i = 0; i < 10; i++)
              if (bufa[i] !== '0' || bufb[i] !== '0')
                break;
            for (; i < 10; i++) {
              va = parseInt(bufa[i]);
              vb = parseInt(bufb[i]);
              if (va + vb < 10)
                continue;
              while (va + vb > 9) {
                if (va > vb)
                  va = va > 0 ? Math.floor(Math.random() * va) : 0;
                else
                  vb = vb > 0 ? Math.floor(Math.random() * vb) : 0;
              }
              bufa[i] = va.toFixed(0);
              bufb[i] = vb.toFixed(0);
            }

            o.numA.vf = parseInt(bufa.join()) / q;
            o.numB.vf = parseInt(bufb.join()) / q;
            o.numR.vf = Math.round(o.numA.vf + o.numB.vf + 0.5) / q;
          }
          break;

        case 'REST':
          for (i = 0; i < this.NMAXLOOPS; i++) {
            this.genNum(o.numA, this.opA, rlinf, this.RES);
            ri2 = o.numA.vf > rlsup ? Math.round(o.numA.vf - rlsup) : this.RES;
            rs2 = Math.round(o.numA.vf - rlinf);
            switch (this.opCond) {
              case 'AGB':
                if (rs2 === this.RES || rs2 > o.numA.vf)
                  rs2 = Math.round(o.numA.vf);
                break;
              case 'BGA':
                if (ri2 === this.RES || ri2 < o.numA.vf)
                  ri2 = Math.round(o.numA.vf);
                break;
            }
            this.genNum(o.numB, this.opB, ri2, rs2);
            o.numR.vf = o.numA.vf - o.numB.vf;
            if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
              break;
          }
          o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
          o.op = 1;
          if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0 && o.numA.vf >= o.numB.vf) {
            q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
            bufa = Arith.DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
            bufb = Arith.DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
            for (i = 0; i < 10; i++)
              if (bufb[i] !== '0')
                break;
            for (; i < 10; i++) {
              va = parseInt(bufa[i]);
              vb = parseInt(bufb[i]);
              if (va >= vb)
                continue;
              vb = va > 0 ? Math.floor(Math.random() * va) : 0;
              bufb[i] = vb.toFixed(0);
            }

            o.numA.vf = parseInt(bufa.join()) / q;
            o.numB.vf = parseInt(bufb.join()) / q;
            o.numR.vf = Math.round(o.numA.vf - o.numB.vf + 0.5) / q;
          }
          break;

        case 'MULT':
          for (i = 0; i < this.NMAXLOOPS; i++) {
            this.genNum(o.numA, this.opA, this.RES, this.RES);
            ri2 = this.opB.limInf;
            rs2 = this.opB.limSup;
            switch (this.opCond) {
              case 'AGB':
                if (rs2 > o.numA.vf)
                  rs2 = Math.round(o.numA.vf);
                break;
              case 'BGA':
                if (ri2 < o.numA.vf)
                  ri2 = Math.round(o.numA.vf);
                break;
            }
            this.genNum(o.numB, this.opB, ri2, rs2);
            o.numR.vf = o.numA.vf * o.numB.vf;
            if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
              break;
          }
          o.numR.c = o.numA.c + o.numB.c;
          o.op = 2;
          break;

        case 'DIV':
          for (i = 0; i < this.NMAXLOOPS; i++) {
            this.genNum(o.numA, this.opA, this.RES, this.RES);
            ri2 = this.opB.limInf;
            rs2 = this.opB.limSup;
            switch (this.opCond) {
              case 'AGB':
                if (rs2 > o.numA.vf)
                  rs2 = Math.round(o.numA.vf);
                break;
              case 'BGA':
                if (ri2 < o.numA.vf)
                  ri2 = Math.round(o.numA.vf);
                break;
            }
            this.genNum(o.numB, this.opB, ri2, rs2);
            if (o.numB.vf !== 0 &&
                Math.abs(o.numA.vf) >= Math.abs(o.numB.vf) &&
                (o.numR.vf = o.numA.vf / o.numB.vf) >= rlinf &&
                o.numR.vf <= rlsup)
              break;
          }
          if (o.numB.vf === 0)
            o.numB.vf = 1;
          o.numR.vf = o.numA.vf / o.numB.vf;
          i = o.numA.c - o.numB.c;
          q = Math.pow(10, i);
          o.numA.vf *= q;
          o.numR.vf *= q;
          o.numR.vf = Math.round(o.numR.vf);
          o.numA.vf = o.numR.vf * o.numB.vf;
          o.numA.vf /= q;
          o.numR.vf /= q;
          o.numR.c = i > 0 ? i : 0;
          o.op = 3;
          break;

        default:
          return false;
      }
      return true;
    },
    /**
     * 
     * Fills the provided ActiveBagContentKit with randomly generated operations
     * @param {AutoContentProvider.ActiveBagContentKit} kit - The composite object to be filled with data.
     * @returns {boolean} - `true` if all was OK
     */
    process: function (kit) {

      var nRows = kit.nRows,
          nCols = kit.nCols,
          content = kit.content, //Array of ActiveBagContent
          useIds = kit.useIds,
          i, j, k,
          o, op = [], // Array of Arith.Operacio
          S = this.S, // non-breaking whitespace
          tipus = [],
          numTipus, tipX,
          tipInv = this.exp_caxb,
          va = '', vb = '', vc = '', operator = '',
          stra = [], strb = [], strc = [],
          nColsB = nCols, nRowsB = nRows,
          nCells = nRows * nCols,
          ass = null;

      if (nRows <= 0 || nCols <= 0 ||
          content === null || content.length < 1 || content[0] === null)
        return false;

      if (nCells < 2)
        return false;

      numTipus = 0;
      if (this.exp_abx)
        tipus[numTipus++] = 'ABX';
      if (this.exp_axc)
        tipus[numTipus++] = 'AXC';
      if (this.exp_xbc)
        tipus[numTipus++] = 'XBC';
      if (this.exp_axbc)
        tipus[numTipus++] = 'AXBC';
      if (numTipus === 0)
        return false;

      for (i = 0; i < nCells; i++) {
        o = new Arith.Operacio();
        for (j = 0; j < this.NMAXLOOPS; j++) {
          this.genOp(o);
          if (this.resultNoDup) {
            for (k = 0; k < i; k++) {
              if (o.numR.vf === op[k].numR.vf)
                break;
            }
            if (k === i)
              break;
          } else
            break;
        }
        op[i] = o;
      }

      if (this.resultOrder !== 0) {
        for (i = nCells - 1; i > 0; i--) {
          for (j = 0; j < i; j++) {
            if (this.resultOrder === 'SORTASC' && op[j].numR.vf > op[j + 1].numR.vf ||
                this.resultOrder === 'SORTDESC' && op[j].numR.vf < op[j + 1].numR.vf) {
              // Switch values
              o = op[j];
              op[j] = op[j + 1];
              op[j + 1] = o;
            }
          }
        }
      }

      for (i = 0; i < nCells; i++) {
        tipX = tipus[Math.floor(Math.random() * numTipus)];
        va = Arith.DecFormat(op[i].numA.vf, op[0].numA.c);
        vb = Arith.DecFormat(op[i].numB.vf, op[0].numB.c);
        vc = Arith.DecFormat(op[i].numR.vf, op[0].numR.c);
        operator = this.OPSTR[op[i].op];

        if (tipInv)
          strc[i] = vc + S + "=" + S + va + S + operator + S + vb;
        else
          strc[i] = va + S + operator + S + vb + S + "=" + S + vc;

        switch (tipX) {
          case 'AXC':
            strb[i] = vb;
            stra[i] = tipInv ?
                vc + S + "=" + S + va + S + operator + S + "?"
                : va + S + operator + S + "?" + S + "=" + S + vc;
            break;

          case 'XBC':
            strb[i] = va;
            stra[i] = tipInv ?
                vc + S + "=" + S + "?" + S + operator + S + vb
                : "?" + S + operator + S + vb + S + "=" + S + vc;
            break;

          case 'AXBC':
            strb[i] = operator;
            stra[i] = tipInv ?
                vc + S + "=" + S + va + S + "?" + S + vb
                : va + S + "?" + S + vb + S + "=" + S + vc;
            break;

          default:
            strb[i] = vc;
            stra[i] = tipInv ?
                "?" + S + "=" + S + va + S + operator + S + vb
                : va + S + operator + S + vb + S + "=";
            break;
        }
      }

      if (useIds) {
        ass = [];
        var strbx = [];
        k = 0;
        for (i = 0; i < nCells; i++) {
          for (j = 0; j < k; j++)
            if (strb[i] === strbx[j])
              break;
          if (j === k) {
            strbx[k] = strb[i];
            ass[i] = k;
            k++;
          } else
            ass[i] = j;
        }

        strb = [];
        for (i = 0; i < k; i++)
          strb[i] = strbx[i];

        if (nRowsB * nColsB !== k) {
          //boolean distH=nColsB>=nRowsB;
          var distH = false;
          switch (k) {
            case 6:
              nRowsB = distH ? 2 : 3;
              nColsB = distH ? 3 : 2;
              break;

            case 8:
              nRowsB = distH ? 2 : 4;
              nColsB = distH ? 4 : 2;
              break;

            case 9:
              nRowsB = 3;
              nColsB = 3;
              break;

            case 10:
              nRowsB = distH ? 2 : 5;
              nColsB = distH ? 5 : 2;
              break;

            case 12:
              nRowsB = distH ? 3 : 4;
              nColsB = distH ? 4 : 3;
              break;

            case 14:
              nRowsB = distH ? 2 : 7;
              nColsB = distH ? 7 : 2;
              break;

            case 15:
              nRowsB = distH ? 3 : 5;
              nColsB = distH ? 3 : 5;
              break;

            case 16:
              nRowsB = 4;
              nColsB = 4;
              break;

            case 18:
              nRowsB = distH ? 6 : 3;
              nColsB = distH ? 3 : 6;
              break;

            case 20:
              nRowsB = distH ? 4 : 5;
              nColsB = distH ? 5 : 4;
              break;

            default:
              nRowsB = distH ? 1 : k;
              nColsB = distH ? k : 1;
              break;
          }
        }
      }

      content[0].setTextContent(stra, nCols, nRows);
      if (ass !== null)
        content[0].setIds(ass);
      if (content.length > 1 && content[1] !== null) {
        content[1].setTextContent(strb, nColsB, nRowsB);
        content[1].getShaper().reset(nColsB, nRowsB);
      }
      if (content.length > 2 && content[2] !== null)
        content[2].setTextContent(strc, nCols, nRows);

      return true;
    }
  };

  /**
   * Formats the number with a fixed number of decimals, optionally filling the result with leading
   * zeroes to have a fixed number of digits.
   * @param {number} val - The value to format
   * @param {number} dec - Number of decimals
   * @param {number} pre - Minimal number of digits before dot.
   * @returns {String}
   */
  Arith.DecFormat = function (val, dec, pre) {
    var result = val.toFixed(dec);
    if (pre) {
      var n = result.indexOf('.');
      if (n < 0)
        n = result.length;
      for (; n < pre; n++)
        result = '0' + result;
    }
    return result;
  };



  /**
   * Operator is an Utility class used by Arith to encapsulate the properties and methods related
   * to the members of the operations.
   * @class
   */
  Arith.Operator = function () {
    this.limInf = this.LIM0;
    this.limSup = this.LIM10;
    this.lst = [];
  };

  Arith.Operator.prototype = {
    constructor: Arith.Operator,
    // Miscellaneous constants used by Arith.Operator
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
    /**
     * Lower limit
     * @type {number} */
    limInf: 0,
    /** 
     * Upper limit
     * @type {number} */
    limSup: 10,
    /** 
     * Number of decimal places
     * @type {number} */
    numDec: 0,
    /** 
     * Including 0
     * @type {boolean} */
    wZero: false,
    /**
     * Including 1
     * @type {boolean} */
    wOne: false,
    /**
     * Including -1
     * @type {boolean} */
    wMinusOne: false,
    /**
     * Take values from list. This member stores the list length.
     * @type {number} */
    fromList: 0,
    /**
     * The list of possible values
     * @type {number[]} */
    lst: [],
    /**
     * 
     * Loads Arith.Operator settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      var op = this;
      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name,
            val = this.value;
        switch (name) {
          case 'decimals':
            op.numDec = Number(val);
            break;

          case 'values':
            var values = val.split(' ');
            for (var i = 0; i < values.length; i++)
              op.lst[i] = Number(values[i]);
            op.fromList = op.lst.length;
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


  Arith.Num = function () {
    this.vf = 0.0; // The number value
    this.c = 0; // Number of decimals to be used when representing the number
  };

  Arith.Num.prototype.format = function () {
    return Arith.DecFormat(this.vf, this.c);
  };

  Arith.Operacio = function () {
    this.numA = new Arith.Num();
    this.numB = new Arith.Num();
    this.numR = new Arith.Num();
    this.op = 0;
  };


  // Arith extends AutoContentPtrovider
  Arith.prototype = $.extend(Object.create(AutoContentProvider.prototype), Arith.prototype);

  // Register class in Activity.prototype
  AutoContentProvider.CLASSES['@arith.Arith'] = Arith;

  return Arith;

});
