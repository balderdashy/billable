/**
 * Module dependencies.
 */

var _ = require('lodash')
	, fs = require('fs-extra')
	, moment = require('moment')
	, filenames = require('root-require')('lib/filenames');



module.exports = function start (opts) {
	opts = opts.parent;

	var timestamp = moment();
	var timefile = filenames.started(opts, timestamp);

	opts.reporter.write('Writing timefile to %s...', timefile);

	// Write to disk
	fs.outputJSON(timefile, {
		timestamp: timestamp.toJSON()
	}, opts.reporter);
};
