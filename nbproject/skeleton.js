//
//
//
// BASIC SKELETON

define([
  "jquery"
], function($){

  /**
   * Description of XXX
   * @exports XXX
   * @class
   * @param {type} id - Param description
   */
  var XXX = function (id) {
    this.id = id;
  };

  XXX.prototype = {
    constructor: XXX,
    /**
     * Description of field aaa
     * @type {type} */
    aaa: bbb,
    /**
     * 
     * Loads this object settings from an XML element 
     * @param {external:jQuery} $xml - The XML element to parse
     */
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

  /**
   * Description of XXX
   * @exports XXX
   * @class
   * @param {type} id - Param description
   */
  var XXX = function (id) {
    BaseClass.call(this, id);
    this.id = id;
  };

  XXX.prototype = {
    constructor: XXX,
    /**
     * Description of field aaa
     * @type {type} */
    aaa: bbb,
    /**
     * 
     * Loads this object settings from an XML element 
     * @param {external:jQuery} $xml - The XML element to parse
     */
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
  "../Activity",
], function ($, Activity) {

  /**
   * 
   * Description of this class of {@link Activity}
   *
   * @exports XXX
   * @class
   * @extends Activity
   * @param {JClicProject} project - The JClic project to which this activity belongs
   */
  var XXX = function (project) {
    Activity.call(this, project);
  };

  XXX.prototype = {
    constructor: XXX,
    /**
     * Description of field aaa.
     * @type {type} */
    aaa: null,
    /**
     * 
     * Description of method mmm.
     * @returns {type}
     */
    mmm: function () {
      return xxx;
    },
  };

  // 
  // XXX extends Activity
  XXX.prototype = $.extend(Object.create(Activity.prototype), XXX.prototype);

  /**
   * The {@link Activity.Panel} where XXX activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to wich this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the 
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  XXX.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  XXX.Panel.prototype = {
    constructor: XXX.Panel,
    /**
     * Description of field aaa
     * @type {type} */
    aaa: null,
    /**
     * 
     * Description of method mmm
     * @returns {type}
     */
    mmm: function () {
      return xxx;
    },
  };

  // XXX.Panel extends Activity.Panel
  XXX.Panel.prototype = $.extend(Object.create(ActPanelAncestor), XXX.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.CLASSES['@XXX'] = XXX;

  return XXX;

});

