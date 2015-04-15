module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            files: ['Gruntfile.js', 'jquery.loadingbar.js']
        },
        jsbeautifier: {
            files: ['Gruntfile.js', 'jquery.loadingbar.js']
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                    'homepage: <%= pkg.homepage %> - ' +
                    '<%= pkg.description %> */\n',
                mangle: true,
                report: 'gzip'
            },
            dist: {
                src: 'jquery.loadingbar.js',
                dest: 'jquery.loadingbar-<%= pkg.version %>.min.js'
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
