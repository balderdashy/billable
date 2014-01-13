/**
 * Module dependencies
 */

var _ = require('lodash')
	, rc = require('rc')
	, program = require('commander-plus')
	, _mergeDefaults = require('merge-defaults')
	, switchback = require('node-switchback')

	, DEFAULT_REPORTER = switchback({
		write  : (console.log),
		end    : (function(){}),
		success: (function(){}),
		done   : (function(){}),
		error  : (console.error)
	})

	, DEFAULT_OPTS = {
		files: {
			prefixes: {
				started: 'started_at_',
				stopped: 'stopped_at_'
			},
			outputDir: '.billable'
		},
		reporter: DEFAULT_REPORTER
	};



/**
 * Exports monkey-patched `commander` with configuration applied.
 * @type {[type]}
 */

module.exports = _mergeDefaults(program, DEFAULT_OPTS);
