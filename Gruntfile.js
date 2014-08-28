module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: 'frontend/bower_modules'
                }
            }
        },

        jshint: {
            all: ['frontend/javascript/**/*.js'],
        },

        html2js: {
            main: {
                options: {
                    base: 'frontend'
                },
                src: ['frontend/views/*.tmpl.html', 'frontend/views/*.tmpl.jade'],
                dest: 'tmp/ribs.templates.js'
            }
        },

        uglify: {
            build: {
                files: {
                    'frontend/ribs.min.js': ['frontend/javascript/**/*.js', 'tmp/ribs.templates.js']
                }
            }
        },

        clean: {
            temp: {
                src: ['tmp']
            }
        },

        watch: {
            js: {
                files: ['frontend/javascript/**/*.js'],
                tasks: ['jshint', 'html2js', 'uglify', 'clean']
            },
            html: {
                files: ['frontend/views/*.html', 'frontend/views/*.jade'],
                tasks: ['html2js', 'uglify', 'clean']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['bower', 'jshint', 'html2js', 'uglify', 'clean', 'concurrent']);
};
