/**
 * Module dependencies
 */

var path = require('path')
	, util = require('./util');




module.exports = {

	/**
	 * Determine name for timefile
	 * @param  {[type]} opts      [description]
	 * @param  {[type]} timestamp [description]
	 * @return {[type]}           [description]
	 */
	timefile: function (opts, timestamp) {
		var timefile = '';
		timefile += opts.files.prefix;
		timefile += opts.files.user || 'anonymous';
		timefile += opts.files.suffix;
		timefile = timefile.toLowerCase();
		// timefile += timestamp.format('hh:mm:ssa');
		timefile = path.resolve(util.homeDirectory, opts.files.outputDir, timefile);

		console.log('!!',timefile);

		throw 'timefile';
		// return timefile;
	}
};
