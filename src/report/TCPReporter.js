/* global Promise */

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
    processingTasks: false,
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
      if (this.processingTasks) {
        if (this.waitingTasks === null)
          this.waitingTasks = [bean];
        else
          this.waitingTasks.push(bean);
      } else
        this.tasks.push(bean);
    },
    flushTasksPromise: function () {

      if (this.currentSessionId !== null && this.tasks.length > 0 && this.serviceUrl !== null) {
        this.processingTasks = true;
        var thisReporter = this;

        var reportBean = new TCPReporter.ReportBean('multiple');
        for (var i = 0; i < this.tasks.length; i++)
          reportBean.appendData(this.tasks[i].$bean);

        return new Promise(function (resolve, reject) {
          thisReporter.transaction(reportBean.$bean)
              .done(function (data, textStatus, jqXHR) {
                // TODO: Check returned message for possible errors on the server side
                thisReporter.tasks = [];
                if (thisReporter.waitingTasks) {
                  thisReporter.tasks.concat(thisReporter.waitingTasks);
                  thisReporter.waitingTasks = null;
                }
                // Reset the fail counter after a successufull attempt
                thisReporter.failCount = 0;
                thisReporter.processingTasks = false;
                resolve(true);
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                if (++thisReporter.failCount > thisReporter.maxFails)
                  thisReporter.stopReporting();
                console.log('ERROR reporting data: ' + textStatus);
                thisReporter.processingTasks = false;
                reject(false);
              });
        });
      } else
        return Promise.resolve(true);
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

      if (this.userId === null)
        this.userId = this.promptUserId();

      if (this.userId) {
        var tl = properties.lap ? properties.lap : this.DEFAULT_TIMER_LAP;
        this.timerLap = Math.min(300, Math.max(1, parseInt(tl)));
        var thisReporter = this;
        this.timer = window.setInterval(
            function () {
              thisReporter.flushTasksPromise();
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
      if (this.userId !== null) {
        // Session ID will be obtained when reporting its first activity
        this.currentSessionId = null;
      }
    },
    /**
     * Creates a new session in the remote database and records its ID for future use
     */
    createDBSession: function (forceNewSession) {
      var thisReporter = this;

      if (forceNewSession || this.currentSessionId === null)
        return new Promise(function (resolve, reject) {
          if (thisReporter.initiated && thisReporter.userId !== null && thisReporter.currentSession !== null) {

            thisReporter.flushTasksPromise().then(function () {
              thisReporter.currentSessionId = null;
              thisReporter.actCount = 0;
              var bean = new TCPReporter.ReportBean('add session');

              bean.setParam('project', thisReporter.currentSession.projectName);
              bean.setParam('time', Number(thisReporter.currentSession.started));
              bean.setParam('code', thisReporter.currentSession.code);
              bean.setParam('user', thisReporter.userId);
              bean.setParam('key', thisReporter.sessionKey);
              bean.setParam('context', thisReporter.sessionContext);

              thisReporter.transaction(bean.$bean)
                  .done(function (data, textStatus, jqXHR) {
                    thisReporter.currentSessionId = $(data).find('param[name="session"]').attr('value');
                    resolve(thisReporter.currentSessionId);
                  })
                  .fail(function (jqXHR, textStatus, errorThrown) {
                    thisReporter.stopReporting();
                    console.log('ERROR reporting data: ' + textStatus);
                    reject(err);
                  });
            });
          } else
            reject('Unable to start new DB session');
        });
      else
        return Promise.resolve(this.currentSessionId);
    },
    /**
     * Closes this reporting system
     * @override
     */
    end: function () {
      Reporter.prototype.end.call(this);
      this.reportActivity();
      this.flushTasksPromise();
      this.stopReporting();
    },
    transaction: function ($xml) {
      if (this.serviceUrl === null)
        return null;
      
      var data = '<?xml version="1.0" encoding="UTF-8"?>' + (new XMLSerializer()).serializeToString($xml.get(0));

      return $.ajax({
        method: "POST",
        url: this.serviceUrl,
        data: data,
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
    },
    reportActivity: function () {
      if (this.lastActivity) {
        if (!this.lastActivity.closed)
          this.lastActivity.closeActivity();
        var actCount = this.actCount++;
        var act = this.lastActivity;
        var thisReporter = this;
        this.createDBSession(false).then(function () {
          var bean = new TCPReporter.ReportBean('add activity');
          bean.setParam('session', thisReporter.currentSessionId);
          bean.setParam('num', actCount);
          bean.appendData(act.$getXML());
          thisReporter.addTask(bean);
        });
      }
      if (this.currentSession !== null && this.currentSession.currentSequence !== null
          && this.currentSession.currentSequence.currentActivity !== this.lastActivity) {
        this.lastActivity = this.currentSession.currentSequence.currentActivity;
      } else
        this.lastActivity = null;
    },
    /**
     * This method should be invoked when the user starts a new activity
     * @override
     * @param {Activity} act - The {@link Activity} that has just started
     */
    newActivity: function (act) {
      Reporter.prototype.newActivity.call(this, act);
      this.reportActivity();
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
      this.appendData($data);
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

