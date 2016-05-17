//  File    : Reporter.js  
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
  "jquery"
], function ($) {

  /**
   * This class implements the basic operations related with the processing of times and scores
   * done by users playing JClic activities. These operations include
   * users identification, compilation of data coming from the activities, storage of
   * this data for later use, and presentation of summarized results.
   * @exports Reporter
   * @class
   */
  var Reporter = function () {
    this.sessions=[];
    this.started=new Date();
    this.initiated=false;
  };

  Reporter.prototype = {
    constructor: Reporter,
    /**
     * User ID currently associated to this reporting system
     * @type {string} */    
    userId: null,
    /**
     * Optional key to be added as a field of session records
     * @type {string} */
    sessionKey: null,
    /**
     * A second optional key to be reported as a field of session records
     * @type {string} */
    sessionContext: null,
    /**
     * Optional filter to be used in group selection dialog
     * @type {string} */
    groupCodeFilter: null,
    /**
     * Optional filter to be used in user selection dialog
     * @type {string} */
    userCodeFilter: null,
    /**
     * Details about this report system
     * @type {string} */
    description: 'Results are currently not been registered in any database',
    /**
     * Starting date and time of this Reporter
     * @type {Date} */
    started: null,
    /**
     * Array of registered sessions
     * @type {SessionReg[]} */
    sessions: [],
    /**
     * Currently active session
     * @type {SessionReg} */
    currentSession: null,
    /**
     * `true` if the system was successfully initiated, `false` otherwise
     * @type {boolean} */    
    initiated: false,
    /**
     * `true` if the system is connected to a database with user's data.
     * When `false`, a generic ID will be used. */    
    bUserBased: false,          
    
    
  };

  return Reporter;
  
});



