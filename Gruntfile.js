module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-html');

    grunt.initConfig({
        htmllint: {
        all: ['static/**/*.html']
        }
    });

    grunt.registerTask('default', ['htmllint']);

};
