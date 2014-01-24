module.exports = function(grunt) {
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                spawn: false
            },
            js: {
                files: ['!**/node_modules/**', '!**/bower_components/**', 'ui/js/*.js', '*.json', 'Gruntfile.js'],
                tasks: ['jshint', 'jsbeautifier']
            },
            less: {
                files: ['ui/less/*.less'],
                tasks: ['less:development', 'copy:css'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['!**/node_modules/**', '!**/bower_components/**', '**/*.html'],
                tasks: [],
                options: {
                    livereload: true,
                    debounceDelay: 300,
                }
            }
        },
        less: {
            options: {},
            development: {
                files: [{
                    expand: true,
                    cwd: 'ui/less/',
                    //src: ['**/*.less'],
                    src: ['styles.less'],
                    dest: 'ui/css/',
                    ext: '.css',
                    report: 'min'
                }]
            },
            production: {}
        },
        copy: {
            css: {
                files:
                // includes files within path
                [{
                    expand: true,
                    src: ['ui/css/*'],
                    dest: '_site/',
                    filter: 'isFile'
                }]
            }
        },
        jshint: {
            all: ['!**/node_modules/**', '!**/bower_components/**', 'ui/js/*.js', '*.json', 'Gruntfile.js']
        },
        jsbeautifier: {
            files: ['!**/node_modules/**', '!**/bower_components/**', 'ui/js/*.js', '*.json', 'Gruntfile.js']
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'less:development',
            'jshint',
            'watch'
        ]);
    });
};
