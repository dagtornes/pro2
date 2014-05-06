module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
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
                  'angular-ui-utils/ui-utils.min.js',
                  'angular-bootstrap/ui-bootstrap.min.js',
                  'angular-ui-router/release/angular-ui-router.min.js',
                  'angular-hotkeys/build/hotkeys.min.js',
                  'angular-hotkeys/build/hotkeys.min.css',
                  'lodash/dist/lodash.min.js',
                  'restangular/dist/restangular.min.js'
                ],
                dest: 'build',
                expand: true
            },
            build: {
                cwd: 'src',
                src: ['**', '!**/less/*.less'],
                dest: 'build',
                expand: true
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/**/*.js']
        },
        clean: {
            build: {
                src: ['build']
            }
        },
        less: {
            build: {
                cleancss: true,
                files: {
                    'build/css/app.min.css': 'src/less/bootstrap.less'
                }
            }
        },
        karma: {
            unit: {
                options: {
                    files: [
                        'build/angular/angular.min.js',
                        'src/js/*.js',
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
                files: ['src/**'],
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
        },
        'git-describe': {
            me: {}
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
    grunt.loadNpmTasks('grunt-git-describe');

    grunt.registerTask('save-revision', function() {
        grunt.event.once('git-describe', function(revision) {
            grunt.option('meta.revision', revision);
        });
        grunt.task.run('git-describe');
    });
    grunt.registerTask('tag-revision', 'Write version and revision data to file', function() {
        grunt.task.requires('git-describe');
        grunt.file.write('build/version.json', JSON.stringify({
            version: grunt.config('pkg.version'),
            revision: grunt.option('meta.revision')[3],
            date: grunt.template.today()
        }));
    });
    grunt.registerTask('version', ['save-revision', 'tag-revision']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['copy', 'less']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);
};
