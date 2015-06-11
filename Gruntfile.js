module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/app/*.js'],
        // TODO: The target should not be in the js directory
        // Better setup a completely separate "dist" directory
        // and copy all HTML, CSS, JS into there.
        // Afterwards, don't forget to remove js/app.js from the .gitignore
        // file!
        dest: 'js/app.js'
      }
    },
    watch: {
      js: {
          files: ['js/**/*.js'],
          tasks: ['concat'],
          options: {
                spawn: false,
              },
        },
    },
  });

  grunt.registerTask('default', ['concat','watch']);
};
