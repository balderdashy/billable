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
		var isLastEntryValid = isValid && (_.isObject(mostRecent) && mostRecent.start);
		isValid = isValid && isLastEntryValid;
		if ( !isValid ) {
			report.log.error('Oh no.. A timefile is corrupted at `'+timefile+'`.');
			report.log.error('Please repair manually (or at least back it up) before proceeding.');
			return report.error('TIMEFILE_CORRUPTED');
		}

		// If most recent entry already has a `stop`, prevent the user
		// from going any further until they run `billable start` again.
		if ( mostRecent.stop ) {
			report.log.warn('You aren\'t currently tracking time.');
			report.log.warn('Run '+'billable start'.bold.white+' to start the clock.');
			return report.end();
		}


		// Push to timelog
		mostRecent.stop = timestamp.toJSON();
		report.log.verbose('Writing to timefile @ %s...', timefile);


		// Persist timelog to disk
		fsx.outputJSON(
				timefile
			, timelog
			, report.extend({
				success: function () {

					// Calculate number of hours
					var duration = moment.duration(
						timestamp - moment(mostRecent.start)
					);
					// var numHours = truncate(duration.asHours(), 200) + ' hours';

					report.write('========================================================='.red);
					report.write('Stopped the clock.');
					report.write('The current time is', timestamp.format('hh:ssa')+'.');
					report.write();
					report.write('You tracked',duration.humanize().bold.cyan,'just then.');
					report.write('(when you\'re ready to start again, run '+'billable start'.bold.white+')');
					report.write('========================================================='.red);
				}
			}
		));
	}));


};




/**
 * Truncate decimal places.
 *
 * @param  {[type]} number [description]
 * @param  {[type]} digits [description]
 * @return {[type]}        [description]
 */
function truncate (number, digits) {
	var multiplier = Math.pow(10, digits),
		adjustedNum = number * multiplier,
		truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

	return truncatedNum / multiplier;
}
