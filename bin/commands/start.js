/**
 * Module dependencies.
 */

var _ = require('lodash')
	, fsx = require('fs-extra')
	, moment = require('moment')
	, filenames = require('root-require')('lib/filenames')
	, report = require('reportback')()
	, colors = require('colors');



module.exports = function start (opts) {
	opts = opts.parent;

	// Start time
	var timestamp = moment();

	// Path to timelog
	var timefile = filenames.timefile(opts, timestamp);

	// Check that the user hasn't already started time tracking
	fsx.readJSON(timefile, report.extend(function (err, timelog) {
		if (err) {
			var doesntExist = err && err.code === 'ENOENT';
			if (doesntExist) timelog = [];
			else return report.error(err);
		}

		// Validate the timelog
		var isValid = (timelog && _.isArray(timelog));
		var mostRecent = _.last(timelog);
		var isLastEntryValid = isValid && (0===timelog.length || _.isObject(mostRecent) && mostRecent.start);
		isValid = isValid && isLastEntryValid;
		if ( !isValid ) {
			report.log.error('Oh no.. A timefile is corrupted at `'+timefile+'`.');
			report.log.error('Please repair manually (or at least back it up) before proceeding.');
			return report.error('Contents: ', timelog);
		}

		// If most recent entry does not have a `stop`, prevent the user
		// from going any further until they run `billable stop`.
		if ( mostRecent && !mostRecent.stop ) {
			var duration = moment.duration(timestamp - moment(mostRecent.start));
			report.log.warn('The clock is already running!');
			report.log.warn(
				'In fact, you\'ve been tracking time '+('for '+duration.humanize()).yellow,
				'(since', timestamp.format('hh:mma')+'.)');
			report.log.warn('To stop the clock, run','billable stop'.bold.white+'.');
			return report.end();
		}

		// Push to timelog
		timelog.push({ start: timestamp.toJSON() });
		report.log.verbose('Writing to timefile @ %s...', timefile);


		// Persist timelog to disk
		fsx.outputJSON(
				timefile
			, timelog
			, report.extend({
				success: function () {
					report.write('========================================================='.green);
					report.write('Started the clock.');
					report.write('The current time is', timestamp.format('hh:ssa')+'.');
					report.write();
					report.write('You are now tracking billable hours.');
					report.write('(when you\'re ready to pause, run '+'billable stop'.bold.white+')');
					report.write('========================================================='.green);
				}
			}
		));
	}));


};
