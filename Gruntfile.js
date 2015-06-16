// This gruntfile is essentially based on the more general
// one created from Yeoman with "yo webapp", with bootstrap and the angular
// options.
// Since I am still learning grunt I read that template and take out
// the parts that I understood and need in the context of this project.
// Of course, as soon as I fully understood the complete template I can use
// it without having to reinvent the wheel.
module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,

    copy: {
        dist: {
            files: [
                { expand: true, src: [ 'css/*'], dest: '<%= config.dist %>/' },
                { expand: true, src: [ 'images/*'], dest: '<%= config.dist %>/' },
                {  src: [ 'index.html' ], dest: '<%= config.dist %>/' }
            ]
        }
    },

    browserify: {
        dist: {
            files: {
                '<%= config.dist %>/js/main.js': [ 'js/engine.js' ],
            },
            options: {
                browserifyOptions: {
                }
            }
        }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'js/engine.js', 'js/resources.js', 'js/app/*.js' ]
    },

    watch: {
      js: {
          files: ['js/**/*.js'],
          tasks: ['build','jshint'],
          options: {
                spawn: false,
              },
        },
    },
  });

  grunt.registerTask('build', ['copy', 'browserify']);
  grunt.registerTask('default', ['build']);
};
