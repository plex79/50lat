module.exports = function(grunt) {

grunt.initConfig({
    babel: {
        options: {
            "sourceMap": true
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "_dev/js",
                "src": ["**/*.jsx"],
                "dest": "_dev/js-compiled/",
                "ext": "-compiled.js"
            }]
        }
    },
    uglify: {
        all_src : {
            options : {
              sourceMap : true,
              sourceMapName : '_final/js/sourceMap.map'
            },
            src : '_dev/js-compiled/**/*-compiled.js',
            dest : '_final/js/all.min.js'
        }
    },
    cssmin: {
      task: {
        src: ['_dev/css/style.css'], 
        dest: '_final/css/style.min.css'
      },
      options: {
        'banner': null,
        'keepSpecialComments': '*',
        'report': 'min'
      }
    },
    watch: {
        files: ['_dev/js/*.jsx', '_dev/css/*.css'],
        tasks: ['babel', 'uglify', 'cssmin']
    }
});

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["watch"]);
};