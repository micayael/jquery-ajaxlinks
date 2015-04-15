module.exports = function (grunt) {

    grunt.initConfig({

        jsbeautifier: {
            files: ["jquery.loadingbar.js"]
        },
        uglify: {
            options: {
                compress: {},
                mangle: true,
                report: 'gzip'
            },
            dist: {
                files: {
                    'jquery.loadingbar.min.js': ['jquery.loadingbar.js']
                }
            }
        },
        jshint: {
            dist: ['Gruntfile.js', 'jquery.loadingbar.js']
        }
    });

    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'clean:default',
    ]);

};
