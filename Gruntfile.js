module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            options:{
                globals: {
                    jQuery: true
                }
            },
            files: ['Gruntfile.js', 'jquery.loadingbar.js']
        },
        jsbeautifier: {
            files: ["jquery.loadingbar.js"]
        },
        uglify: {
            options: {
                compress: {},
                mangle: true,
                report: 'gzip'
            },
            files: {
                'jquery.loadingbar.min.js': ['jquery.loadingbar.js']
            }
        }
    });

    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'jshint',
        'jsbeautifier',
        'uglify'
    ]);

};
