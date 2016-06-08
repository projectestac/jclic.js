//  File    : TCPReporter.js  
//  Created : 08/06/2016  
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
  "./Reporter"
], function ($, Reporter) {

  /**
   * This special case of {@link Reporter} is ...
   * @exports TCPReporter
   * @class
   * @extends Reporter
   */
  var TCPReporter = function () {
    Reporter.call(this);
    this.tasks = [];
  };

  TCPReporter.prototype = {
    constructor: TCPReporter,
    /**
     * Identifier of the current session, provided by the server
     * @type {string} */
    currentSessionId: '',
    /**
     * Last activity reported
     * @type {ActivityReg} */
    lastActivity: null,
    /**
     * Number of activities processed
     * @type {number} */
    actCount: 0,
    /**
     * Service URL of the JClic Reports server
     * @type {string} */
    serviceUrl: null,
    /**
     * Object used to store specific properties of the connected reports system
     * @type {object} */
    dbProperties: null,
    /**
     * List of tasks to be processed
     * @type {TCPReporter.ReportBean[]} */
    tasks: null,
    /**
     * Waiting list of tasks, to be used while `tasks` is processed
     * @type {TCPReporter.ReportBean[]} */
    waitingTasks: null,
    /**
     * Flag used to indicate if `transaction` is currently running
     * @type {boolean} */
    processing: false,
    /**
     * PlayStation used to communicate the status of the operations done
     * @type {PlayStation} */
    ps: null,
    /**
     * Identifier of the background function obtained with a call to window.setInterval
     * @type {number} */
    timer: -1,
    /**
     * Time between calls to the background function, in milliseconds
     * @type {number} */
    timerLap: 5000,
    /**
     * Counter of unsuccessfull connection attempts with the report server
     * @type {number} */
    failCount: 0,
    /**
     * Maximum number of failed attempts allowed before disconnecting
     * @type {number} */
    maxFails: 5,
    /**
     * 
     * @param {type} bean
     * @returns {undefined}
     */
    addTask: function (bean) {
      if (this.processing) {
        if (this.waitingTasks === null)
          this.waitingTasks = [bean];
        else
          this.waitingTasks.push(bean);
      } else
        this.tasks.push(bean);
    },
    flushTasks: function () {
      if (this.tasks.length > 0 && this.serviceUrl !== null) {
        this.processing = true;
        var thisReporter = this;

        var reportBean = new TCPReporter.ReportBean('multiple');
        for (var i = 0; i < this.tasks.length; i++)
          reportBean.appendData(this.tasks[i].$bean);

        this.transaction(reportBean.$bean)
            .done(function (xml) {
              // TODO: Check returned message for possible errors on the server side
              thisReporter.tasks = [];
              if (thisReporter.waitingTasks) {
                thisReporter.tasks.concat(thisReporter.waitingTasks);
                thisReporter.waitingTasks = null;
              }
              // Reset the fail counter after a successufull attempt
              thisReporter.failCount = 0;
            })
            .fail(function (err) {
              if (++thisReporter.failCount > thisReporter.maxFails)
                thisReporter.stopReporting();
              console.log('ERROR reporting data: ' + err);
            })
            .always(function () {
              thisReporter.processing = false;
            });
      }
    },
    end: function () {
      Reporter.prototype.end.call(this);
      this.reportActivity();
      this.flushTasks();
      this.stopReporting();
    },
    transaction: function ($xml) {
      if (this.serviceUrl === null)
        return null;

      return $.ajax({
        method: "POST",
        url: this.serviceUrl,
        data: (new XMLSerializer()).serializeToString($xml.get(0)),
        contentType: 'text/xml',
        dataType: 'xml'
      });
    },
    stopReporting: function () {
      if (this.serviceUrl !== null) {
        this.serviceUrl = null;
        this.description = this.description + ' (' + this.ps.getMsg('not connected') + ')';
      }
      if (this.timer >= 0) {
        window.clearInterval(this.timer);
        this.timer = -1;
      }
      this.initiated = false;
    }
  };


  /**
   * 
   * @class
   * @param id {string} - The main identifier of this ReportBean. Current valid values are:
   * `get property`, `get_properties`, `add session`, `add activity`, `get groups`, `get users`,
   * `get user data`, `get group data`, `new group`, `new user` and `multiple`.
   * @param $data {external:jQuery}+ - Optional data to append to this bean 
   */
  TCPReporter.ReportBean = function (id, $data) {
    this.$bean = $('<bean id="' + id + '"/>');
    if ($data)
      this.setData($data);
  };

  TCPReporter.ReportBean.prototype = {
    constructor: TCPReporter.ReportBean,
    /**
     * The main jQuery XML object managed by this ReportBean
     * @type {external:jQuery} */
    $bean: null,
    /**
     * 
     * Adds  an XML element to the bean
     * @param {external:jQuery} $data - The XML element to be added to this bean
     */
    appendData: function ($data) {
      if ($data) {
        this.$bean.append($data);
      }
    }
  };

  // TCPReporter extends Reporter
  TCPReporter.prototype = $.extend(Object.create(Reporter.prototype), TCPReporter.prototype);

  // Register class in Reporter
  Reporter.CLASSES['TCPReporter'] = TCPReporter;

  return TCPReporter;

});



