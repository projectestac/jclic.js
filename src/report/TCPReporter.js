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
  "../Utils",
  "./Reporter"
], function ($, Utils, Reporter) {

  /**
   * This special case of {@link Reporter} is ...
   * @exports TCPReporter
   * @class
   * @extends Reporter
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
   */
  var TCPReporter = function (ps) {
    Reporter.call(this, ps);
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
     * Default path of JClic Reports Server
     * @type {string} */
    DEFAULT_SERVER_PATH: 'localhost:9000',
    /**
     * Default name for the reports service
     * @type {string} */
    DEFAULT_SERVER_SERVICE: '/JClicReportService',
    /**
     * Default server protocol
     * @type {string} */
    DEFAULT_SERVER_PROTOCOL: 'http',
    /**
     * Default lap between calls to flushTasks, in seconds
     * @type {number} */
    DEFAULT_TIMER_LAP: 5,
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
      // TODO: Return a Promise
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
    /**
     * Initializes this report system with an optional set of parameters
     * @override
     * @param {Object} properties - Initial settings passed to the reporting system
     */
    init: function (properties) {
      Reporter.prototype.init.call(this, properties);
      this.initiated = false;

      var serverPath = properties.path ? properties.path : this.DEFAULT_SERVER_PATH;
      this.description = "TCP/IP " + serverPath;
      var serverService = properties.service ? properties.service : this.DEFAULT_SERVER_SERVICE;
      if (!serverService.startsWith('/'))
        serverService = '/' + serverService;
      var serverProtocol = properties.protocol ? properties.protocol : this.DEFAULT_SERVER_PROTOCOL;

      this.serviceUrl = serverProtocol + "://" + serverPath + serverService;

      if (!this.userId)
        this.userId = this.promptUserId(parent, msg);

      if (userId) {
        var tl = properties.lap ? properties.lap : this.DEFAULT_TIMER_LAP;
        this.timerLap = Math.min(300, Math.max(1, parseInt(tl)));
        var thisReporter = this;
        this.timer = window.setInterval(
            function () {
              thisReporter.flushTasks();
            }, this.timerLap);
        this.initiated = true;
      } else
        this.stopReporting();
    },
    /**
     * This method should be invoked when a new session starts
     * @override
     * @param {JClicProject|string} jcp - The {@link JClicProject} referenced by this session, or
     * just its name.
     */
    newSession: function (jcp) {
      Reporter.prototype.newSession.call(this, jcp);
      if (!this.serviceUrl)
        return;
      if (this.userId === null) {
        this.userId = this.promptUserId();
      }
      if (userId !== null) {
        // Session ID will be obtained when reporting its first activity
        this.currentSessionId = null;
      }
    },
    /**
     * Creates a new session in the remote database and records its ID for future use
     */
    createDBSession: function () {
      if (this.initiated && this.userId !== null && this.currentSession !== null) {
        //TODO: Use a Promise
        this.flushTasks();
        this.currentSessionId = null;
        this.actCount = 0;
        var bean = new TCPReporter.ReportBean('add session');

        bean.setParam('project', this.currentSession.projectName);
        bean.setParam('time', Number(this.currentSession.started));
        bean.setParam('code', this.currentSession.code);
        bean.setParam('user', this.userId);
        bean.setParam('key', this.sessionKey);
        bean.setParam('context', this.sessionContext);

        var thisReporter = this;
        this.transaction(bean.$bean)
            .done(function (xml) {
              thisReporter.currentSessionId = $($.parseXML(xml)).find('param[name="user"]').attr('value');
            })
            .fail(function (err) {
              thisReporter.stopReporting();
              console.log('ERROR reporting data: ' + err);
            })
            .always(function(){
              thisReporter.processing = false;
            });
      }
    },
    /**
     * Closes this reporting system
     * @override
     */
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
    },
    setParam: function (param, value) {
      if (typeof value !== 'undefined' && value !== null)
        this.appendData($('<param/>', {name: param, value: value}));
    }
  };

  // TCPReporter extends Reporter
  TCPReporter.prototype = $.extend(Object.create(Reporter.prototype), TCPReporter.prototype);

  // Register class in Reporter
  Reporter.CLASSES['TCPReporter'] = TCPReporter;

  return TCPReporter;

});

