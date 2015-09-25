// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

	// ===========================================================================
	// CONFIGURE GRUNT ===========================================================
	// ===========================================================================
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// configure jshint to validate js files -----------------------------------
		jshint: {
			options: {
				reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
			},

			// when this task is run, lint the Gruntfile and all js files in src
			build: ['Grunfile.js', 'src/**/*.js']
		},

		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'dist/js/scripts.min.js': ['src/**/*.js']
				}
			}
		},

		less: {
			build: {
				files: {
					'dist/css/main.css': 'src/less/main.less'
				}
			}
		},

		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'dist/css/main.min.css': 'dist/css/main.css'
				}
			}
		},

		watch: {
			stylesheets: {
				files: ['src/**/*.css', 'src/**/*.less'],
				tasks: ['less']
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: ['jshint', 'uglify']
			},
			pages: {
				files: 'src/html/*.html',
				tasks: ['copy']
			}
		},

		copy: {
			main: {
				files: [
					// includes files within path
					{expand: true, flatten: true, src: ['src/html/**'], dest: 'dist/', filter: 'isFile'}
				]
			}
		},

		"bower-install-simple": {
			options: {
				color: true,
				directory: "dist/assets/"
			},
			"prod": {
				options: {
					production: true
				}
			},
			"dev": {
				options: {
					production: false
				}
			}
		}

});


	// ===========================================================================
	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	// we can only load these if they are in our package.json
	// make sure you have run npm install so our app can find these
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-bower-install-simple");

	// ===========================================================================
	// CREATE TASKS ==============================================================
	// ===========================================================================

	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less', 'copy', 'bower-install-simple']);

};