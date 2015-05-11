define([
  "jquery"
], function($){

  //
  // Description
  var XXX = function (id) {
    //BaseClass.call(this, id);
    this.id = id;
  };

  XXX.prototype = {
    constructor: XXX,
    aaa: bbb,
    //
    // Loads the object settings from a specific JQuery XML element
    setProperties: function ($xml) {
      this.aaa = $xml.attr('aaa');
      return this;
    }
  };
  
  // XXX extends BaseClass
  // XXX.prototype = $.extend(Object.create(BaseClass.prototype), XXX.prototype);

  return XXX;

});
