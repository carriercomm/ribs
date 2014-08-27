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

        nodemon: {
            dev: {
                script: 'server.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify', 'nodemon']);
};
