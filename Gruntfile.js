/* global module */
module.exports = function (grunt) {

  "use-strict";

  // Configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
          '// JClic.js version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
          '// HTML5 player of JClic activities\n' +
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
      dist: {
        src: ['dist']
      },
      doc: {
        src: ['doc']
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/jclic.js': ['src/JClic.js']
        },
        options: {
          browserifyOptions: {
            debug: true
          },
          baseUrl: './src/',
          debug: true,
          transform: ['deamdify'],
          banner: '<%= meta.banner %>'
        }
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          banner: '<%= meta.banner %>',
          preserveComments: false
        },
        files: {
          'dist/jclic.min.js': ['dist/jclic.js']
        }
      }
    },
    jsdoc: {
      doc: {
        src: ['misc/jsdoc/index.md', 'src/**/*.js'],
        options: {
          destination: 'doc',
          configure: 'jsdoc.conf.json',
          template: 'node_modules/gc-jaguarjs-jsdoc'
        }
      }
    },
    copy: {
      doc: {
        files: [{src: 'misc/jsdoc/ico.png', dest: 'doc/ico.png'}]
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
        files: ['src/**/*.js', 'dist/*.js'],
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
      ['clean:dist', 'browserify:dist', 'uglify:dist']
      );

  grunt.registerTask(
      'doc',
      'Generates the project documentation in "doc"',
      ['clean:doc', 'jsdoc:doc', 'copy:doc']
      );

  grunt.registerTask(
      'default',
      'builds all',
      ['build']
      );
};
