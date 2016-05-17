//  File    : ActionReg.js  
//  Created : 17/05/2016  
//  By      : fbusquet  
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
  "jquery",
  "../Utils"
], function ($, Utils) {
  /**
   * 
   * @exports ActionReg
   * @class
   */
  var ActionReg = function (type, source, dest, ok) {
    this.type = type;
    this.source = source;
    this.dest = dest;
    this.ok = ok;
    this.time = (new Date()).value();
  };

  ActionReg.prototype = {
    constructor: ActionReg,
    type: null,
    source: null,
    dest: null,
    time: 0,
    isOk: false,
    $getXML: function () {
      var s = '';
      if (this.type)
        s += ' type="' + this.type + '"';
      if (this.source)
        s += ' source="' + this.source + '"';
      if (this.dest)
        s += ' dest="' + this.dest + '"';
      s += ' ok="' + this.ok + '"';
      s += ' time="' + this.time + '"';
      return $('<action ' + s + '/>');
    },
    setProperties: function ($xml) {
      var actReg = this;
      $each($xml.get(0).attributes, function () {
        var name = this.name;
        var value = this.value;
        switch (name) {
          case 'type':
          case 'source':
          case 'dest':
            actReg[name] = value;
            break;
          case 'time':
            actReg[name] = Number(value);
            break;
          case 'ok':
            actReg[name] = Utils.getBoolean(value, false);
          default:
            break;
        }
      });
    },
    toHtmlString: function () {
      // TODO: implement toHtmlString
      return '';
    }
  };

  return ActionReg;

});
