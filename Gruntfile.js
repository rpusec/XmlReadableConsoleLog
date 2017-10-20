module.exports = function(grunt) {

	var bannerText = '/*! \nXmlStylizedConsoleLog min build, <%= grunt.template.today("dd-mm-yyyy") %>\n';
	bannerText += 'rpusec, <%= grunt.template.today("yyyy")%>\n*/';

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