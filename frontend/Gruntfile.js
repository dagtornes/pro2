module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            deps: {
                cwd: 'bower_components/',
                src: [
                  'angular/angular.js',
                  'angular/angular.min.js',
                  'angular/angular.min.js.map',
                  'angular-route/angular-route.js',
                  'angular-route/angular-route.min.js',
                  'angular-route/angular-route.min.js.map',
                  'angular-bootstrap/ui-bootstrap.min.js',
        		  'angular-ui-router/release/angular-ui-router.min.js'
                ],
                dest: 'build',
                expand: true
            },
            build: {
                cwd: 'src/main',
                src: ['**', '!**/less/*.less'],
                dest: 'build',
                expand: true
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/main/js/**/*.js', 'src/test/**/*.js']
        },
        clean: {
            build: {
                src: ['build']
            }
        },
        less: {
            build: {
                options: {
                    cleancss: true
                },
                files: {
                    'build/css/app.min.css': 'src/main/less/bootstrap.less'
                }
            }
        },
        karma: {
            unit: {
                options: {
                    files: [
                        'build/angular/angular.min.js',
                        'src/main/js/*.js',
                        'src/test/**/*.js'
                    ],
                    browsers: ['Chrome'],
                    plugins : [
                        'karma-junit-reporter',
                        'karma-chrome-launcher',
                        'karma-jasmine'
                    ],
                    frameworks: ['jasmine']
                }
            }
        },
        watch: {
            copy: {
                files: ['src/main/**'],
                tasks: ['build']
            },
            tests: {
                files: ['src/test/**'],
                tasks: ['karma']
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['clean', 'copy', 'newer:less']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);
};
