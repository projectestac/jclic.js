/* global module */
module.exports = function (grunt) {

  "use-strict";

  // Configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
          '// JSClic version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
          '// A JavaScript player of JClic activities\n' +
          '// (c) 2000-<%= grunt.template.today("yyyy") %> Educational Telematic Network of Catalonia (XTEC)\n' +
          '// This program can be freely redistributed under the terms of the GNU General Public License\n' +
          '// This is a minified script. Full, commented source code available at:\n' +
          '// <%= pkg.homepage %>\n'
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
    docco: {
      dist: {
        src: ['src/**/*.js'],
        options: {
          output: 'doc',
          layout: 'parallel'
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
      ['clean:doc', 'docco:dist']
      );

  grunt.registerTask(
      'default',
      'builds all',
      ['build', 'doc']
      );
};
