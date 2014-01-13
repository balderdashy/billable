/**
 * Module dependencies.
 */

var _ = require('lodash')
	, fsx = require('fs-extra')
	, moment = require('moment')
	, filenames = require('root-require')('lib/filenames')
	, reportback = require('reportback')();



module.exports = function start (opts) {
	opts = opts.parent;

	// See if we've already started


	// Start time
	var timestamp = moment();

	// Path to timefile disk log
	var timefile = filenames.started(opts, timestamp);
	reportback.log('Writing timefile to %s...', timefile);

	// Write to disk
	fsx.outputJSON(
			timefile
		, { timestamp: timestamp.toJSON() }
		, reportback.extend({
			success: function () {
				reportback.write('The current time is', timestamp.format('hh:ssa')+'.');
				reportback.write('You are now tracking billable hours.');
				reportback.write('When you\'re ready to pause, run `billable stop`.');
			}
		}
	));

};
