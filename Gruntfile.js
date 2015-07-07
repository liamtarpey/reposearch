module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            css: [
                'assets/css'
            ],
            js: [
                'assets/js'
            ]
        },

        copy: {
            main: {
                expand: true, 
                flatten: true,
                cwd: 'dev', 
                src: [
                    'views/**/*.html'
                    ], 
                dest: 'ng-views/', 
                filter: 'isFile'
            }
        },

        concat: {
            dist: {
                src: [
                    'dev/js/libs/angular.js',
                    'dev/js/libs/angular-route.js',
                    'dev/js/libs/angular-sanitize.js',
                    //'dev/js/libs/angular-touch.js',
                    'dev/js/libs/modernizr.js',
                    'dev/js/app.js',
                    'dev/js/**/*.js'
                ],
                dest: 'assets/js/main.js',
            }
        },

        uglify: {
            build: {
                src: 'assets/js/main.js',
                dest: 'assets/js/main.min.js',
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'dev/sass',
                    cssDir: 'assets/css',
                    environment: 'development'
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'dev/js/**/*.js',
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: [
                    'dev/sass/**/*.scss',
                    'dev/views/**/*.scss'
                ],
                tasks: ['clean:css', 'compass'],
                options: {
                    //spawn: false
                }
            },
            html :{
                files: [
                    'dev/views/**/*.html'
                ],
                tasks: ['copy']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'ng-views/**/*.html',
                    'dev/js/**/*.js',
                    'dev/sass/**/*.scss',
                    'assets/**/*'
                ]
            }
        }

    });

    // Where we tell Grunt we plan to use plugins.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'compass', 'watch']);

};