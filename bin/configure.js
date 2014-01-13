/**
 * Module dependencies
 */

var _ = require('lodash')
	, rc = require('rc')
	, program = require('commander-plus')
	, _mergeDefaults = require('merge-defaults')

	, DEFAULT_OPTS = {
		files: {
			prefixes: {
				started: 'started_at_',
				stopped: 'stopped_at_'
			},
			outputDir: '.billable'
		}
	};



/**
 * Exports monkey-patched `commander` with configuration applied.
 * @type {[type]}
 */

module.exports = _mergeDefaults(program, DEFAULT_OPTS);
