#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander-plus');
var package = require('root-require')('package.json');


// $ billable -V
program
	.version(package.version);



// $ billable start
program
	.command('start')
	.description('Start tracking time.')
	.action(require('./commands/start'));



// $ billable stop
program
	.command('stop')
	.description('Stop tracking time.')
	.action(require('./commands/stop'));



program.parse(process.argv);
