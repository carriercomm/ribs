module.exports = function(grunt) {
    var frontendJSGlob = ['frontend/javascript/**/*.js'];

    grunt.initConfig({
        jshint: {
            all: frontendJSGlob,
        },

        uglify: {
            build: {
                files: {
                    'frontend/dist/js/ribs.min.js': frontendJSGlob
                }
            }
        },

        watch: {
            js: {
                files: frontendJSGlob,
                tasks: ['jshint', 'uglify']
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

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify', 'concurrent']);
};
