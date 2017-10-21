module.exports = function(grunt) {

	var bannerText = '/*! \nXmlReadableConsoleLog minified build, <%= grunt.template.today("dd.mm.yyyy.") %>\n';
	bannerText += 'https://github.com/rpusec\n*/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
		    	banner: bannerText
		    },
		    build: {
		    	src: 'src/XmlReadableConsoleLog.js',
		    	dest: 'build/<%= pkg.name %>.min.js'
		    }
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
};