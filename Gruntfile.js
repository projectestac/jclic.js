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
    docco: {
      dist: {
        src: ['src/**/*.js'],
        options: {
          output: 'doc',
          layout: 'parallel'
        }
      }
    },
    express: {
      all: {
        options: {
          bases: ['.'],     
          port: 8080,
          hostname: '0.0.0.0',
          livereload: true
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
      ['clean:doc', 'docco:dist']
      );

  grunt.registerTask(
      'default',
      'builds all',
      ['build', 'doc']
      );
};
