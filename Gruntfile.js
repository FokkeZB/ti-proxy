module.exports = function (grunt) {

	grunt.initConfig({
		mochaTest: {
			options: {
				timeout: 30000,
				reporter: 'spec',
				ignoreLeaks: true
			},
			src: ['test/**/*_test.js']
		},
		titaniumifier: {
			js: {
				options: {
					bundle: true,
					module: false
				}
			},
			zip: {
				options: {
					bundle: false,
					module: true
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-titaniumifier');

	grunt.registerTask('test', 'mochaTest');
	grunt.registerTask('js', 'titaniumifier:js');
	grunt.registerTask('default', 'test', 'titaniumifier:zip');
};
