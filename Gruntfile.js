module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          install: true,
          copy: true,
          targetDir: './libs',
          cleanTargetDir: true
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.js': [ 'dist/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    },

    clean: {
      temp: {
        src: ['dist']
      }
    },

    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        src: [ 'app/**/*.js'],
        dest: 'dist/app.js'
      }
    },

    jshint: {
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: grunt.option('port') || 9000
        }
      }
    },

    copy: {
      dev: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/**'], dest: 'libs/bootstrap', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/bootstrap/fonts/**'], dest: 'libs/fonts', filter: 'isFile'}
        ]
      }
    },

    watch: {
      dev: {
        files: ['Gruntfile.js', 'app/*.js', '*.html', '*.css'],
        tasks: ['jshint', 'concat:dist'],
        options: {
          atBegin: true
        }
      }
    },

    min: {
      files: ['Gruntfile.js', 'app/*.js', '*.html'],
      tasks: ['jshint', 'concat:dist', 'uglify:dist'],
      options: {
        atBegin: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', ['bower', 'concat:dist', 'connect:server', 'copy:dev', 'watch:dev' ]);
};