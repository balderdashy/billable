/**
 * Truncate decimal places.
 *
 * @param  {[type]} number [description]
 * @param  {[type]} digits [description]
 * @return {[type]}        [description]
 *
 * @api private
 */

// exports.truncate = function (number, digits) {
// 	//
// 	// NOTE: Unused currently
// 	//
// 	var multiplier = Math.pow(10, digits),
// 		adjustedNum = number * multiplier,
// 		truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

// 	return truncatedNum / multiplier;
// };



/**
 * Get path to the home directory in an OS-agnostic way
 *
 * @api private
 */

exports.homeDirectory = function() {
	return process.env[
		(process.platform == 'win32') ?
		'USERPROFILE' :
		'HOME'
	];
};
