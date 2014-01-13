/**
 * Module dependencies
 */

var _ = require('lodash')
	, rc = require('rc')
	, program = require('commander-plus')
	, _mergeDefaults = require('merge-defaults')

	, DEFAULT_OPTS = {
		files: {
			prefix: '',
			suffix: '_timesheet',
			outputDir: '.billable'
		}
	};



/**
 * Exports monkey-patched `commander` with configuration applied.
 * @type {[type]}
 */

module.exports = _mergeDefaults(program, DEFAULT_OPTS);
