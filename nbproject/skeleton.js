//
//
//
// BASIC SKELETON

define([
  "jquery"
], function($){

  //
  // Description
  var XXX = function (id) {
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
  
  return XXX;
});


//
//
//
// SKELETON FOR A CLASS 'XXX' DERIVED FROM 'BaseClass'
define([
  "jquery",
  "BaseClass"
], function($, BaseClass){

  //
  // Description
  var XXX = function (id) {
    BaseClass.call(this, id);
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
  XXX.prototype = $.extend(Object.create(BaseClass.prototype), XXX.prototype);

  return XXX;

});

//
//
//
// SKELETON FOR ACTIVITIES
// Remember to include it as a dependence in the 'define' call of the main JClic method

define([
  "jquery",
  "../../Activity",
], function ($, Activity) {

  //
  // Description
  var XXX = function (project) {
    Activity.call(this, project);
  };

  XXX.prototype = {
    constructor: XXX,
    //
    // Activity.Panel constructor
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);

    }
  };

  // 
  // XXX extends Activity
  XXX.prototype = $.extend(Object.create(Activity.prototype), XXX.prototype);

  // 
  // Properties and methods specific to XXX.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  XXX.prototype.Panel.prototype = {
    constructor: XXX.prototype.Panel,
    //
    // Prepares the text panel
    buildVisualComponents: function () {
      ActPanelAncestor.buildVisualComponents.call(this);

    }
  };

  // InformationScreen.Panel extends Activity.Panel
  XXX.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), XXX.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@package.XXX'] = XXX;

  return XXX;

});

