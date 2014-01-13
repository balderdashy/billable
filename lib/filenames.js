/**
 * Module dependencies
 */

var path = require('path');




module.exports = {

	/**
	 * Determine name for timefile
	 * @param  {[type]} opts      [description]
	 * @param  {[type]} timestamp [description]
	 * @return {[type]}           [description]
	 */
	started: function (opts, timestamp) {
		var timefile = '';
		timefile += opts.files.prefixes.started;
		timefile += timestamp.format('hh:mm:ssa');
		timefile = path.resolve(opts.files.outputDir, timefile);
		return timefile;
	}
};
