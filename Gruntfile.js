module.exports = function(grunt) {

	var bannerText = '/*! \nXmlStylizedConsoleLog minified build, <%= grunt.template.today("dd.mm.yyyy.") %>\n';
	bannerText += '<%= pkg.homepage %>\n*/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
		    	banner: bannerText
		    },
		    build: {
		    	src: 'src/XmlStylizedConsoleLog.js',
		    	dest: 'build/<%= pkg.name %>.min.js'
		    }
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
};