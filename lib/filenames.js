/**
 * Module dependencies
 */

var path = require('path')
	, util = require('./util');




module.exports = {

	/**
	 * Determine name & relative path for timefile.
	 * (defaults to ~/.billable/anonymous.timesheet)
	 *
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
		timefile = path.resolve(
			util.homeDirectory(),
			opts.files.outputDir,
			timefile);
		return timefile;
	}
};
