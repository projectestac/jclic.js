/* global module */
module.exports = function (grunt) {

  "use-strict";

  // Configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
          '// JClic.js version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
          '// JavaScript player for JClic activities\n' +
          '// (c) 2000-<%= grunt.template.today("yyyy") %> Educational Telematic Network of Catalonia (XTEC)\n' +
          '// This program can be freely redistributed under the terms of the GNU General Public License\n' +
          '// WARNING: You are reading a minimized, uglifyed version of jclic.js. Full, readable source\n' +
          '// code is freely available at: <%= pkg.homepage %>\n'
    },
    jshint: {
      files: ['src/**/*.js'],
      options: {
        sub: true
      }
    },
    clean: {
      build: {
        src: ['build']
      },
      doc: {
        src: ['doc']
      }
    },
    browserify: {
      build: {
        files: {
          'build/jclic.unified.js': ['src/JClic.js']
        },
        options: {
          baseUrl: './src/',
          debug: true,
          //exclude: ['../lib/jcanvas.js'],
          transform: ['deamdify'],
          banner: '<%= meta.banner %>'
        }
      }
    },
    uglify: {
      dist: {
        options: {
          //compress: true,
          //mangle: true,
          banner: '<%= meta.banner %>',
          preserveComments: false
        },
        files: {
          'dist/jclic.min.js': ['build/jclic.unified.js']
        }
      }
    },
    jsdoc: {
        dist: {
            src: ['misc/doc/index.md', 'src/**/*.js'],
            options: {
                template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
                destination: 'doc',
                // see: http://terryweiss.github.io/docstrap/
                // Theme 'yeti' with some modifications:
                // - File: node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/static/styles/site.yeti.css
                // - Line: 1254
                //         h4,
                //         .h4 {
                //           font - size: 19px;
                //  added:   padding: 5px;
                //  added:   background-color: lavender;
                //  added:   border-radius: 5px;
                //         }
                //         
                // - Line: 1418
                //             dt {
                //  commented:   //font - weight: bold;
                //             }
                //           
                // - Line: 6944:
                //           code {
                //  changed:   background - color: lavender;
                //             border: none;
                //  changed:   color: darkcyan;
                //           }
                //
                configure: 'jsdoc.conf.json'
            }
        }
    },
    express: {
      all: {
        options: {
          bases: ['.'],     
          port: 8080,
          hostname: '0.0.0.0',
          livereload: true,
          open: 'http://localhost:8080/test/jclic-demo/index.html'
        }
      }
    },
    watch: {
      all: {
        files: ['src/**/*.js', 'dist/*.js', 'build/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the tasks
  // Using of "load-grunt-tasks" instead of calls to "grunt.loadNpmTasks" for each module
  //
  require("load-grunt-tasks")(grunt);

  // define the tasks
  grunt.registerTask(
      'server',
      'Starts a test server',
      ['express', 'watch']
      );
  
  grunt.registerTask(
      'lint',
      'Checks the JS code',
      ['jshint']
      );

  grunt.registerTask(
      'build',
      'cleans and compiles all',
      ['clean:build', 'browserify:build', 'uglify:dist']
      );

  grunt.registerTask(
      'doc',
      'Generates the project documentation in "doc"',
      ['clean:doc', 'jsdoc:dist']
      );

  grunt.registerTask(
      'default',
      'builds all',
      ['build', 'doc']
      );
};
