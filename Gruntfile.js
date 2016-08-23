/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
          files: [
              {outputstyle: '', expand: true, cwd: 'sources/stylesheets/base/', src: ['base.scss'], dest: 'lib/css_modules', ext: '.css'},
              {outputstyle: '', expand: true, cwd: 'sources/stylesheets/layout/', src: ['layout.scss'], dest: 'lib/css_modules', ext: '.css'},
              {outputstyle: '', expand: true, cwd: 'sources/stylesheets/components/', src: ['components.scss'], dest: 'lib/css_modules', ext: '.css'}
          ]
      }
    },

    myth: {
      compile: {
        expand: true,
        cwd: 'lib/css_modules',
        src: ['*.css', '!*.min.css'],
        dest: 'lib/css_modules',
        ext: '.css'
      }
    },

    concat: {
      apps: {
          src: 'lib/css_modules/*.css',
          dest: 'lib/dist/qhq-ui.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'lib/dist',
        src: ['*.css', '!*.min.css'],
        dest: 'lib/dist',
        ext: '.min.css'
      },
      release: {
        expand: true,
        cwd: 'lib/dist',
        src: ['*.css', '!*.min.css'],
        dest: 'lib/dist',
        ext: '.min.css'
      }
    },

    watch: {
      sass: {
          files: '**/*.scss',
          tasks: ['sass', 'myth', 'concat', 'cssmin'],
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-myth');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'sass',
    'concat',
    'myth',
    'cssmin:minify',
    'cssmin:release'
  ]);
  grunt.registerTask('reload', ['watch']);

};
