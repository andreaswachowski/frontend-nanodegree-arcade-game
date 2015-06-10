module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/app/*.js'],
        dest: 'js/app.js'
      }
    }
  });
};
