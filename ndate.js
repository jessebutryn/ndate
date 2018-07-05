#!/usr/bin/env node

const moment = require('moment');

const {formatDate, checkDate, getOffset, deltaDates} = require('./lib/format');

var argv = process.argv.slice(2);

if (argv.length === 0) {
	formatDate('now', moment());
} else if (argv.length === 1) {
	if (argv[0].charAt(0) === '-' || argv[0].charAt(0) === '+') {
		getOffset(moment(), argv[0]);
	} else {
		var dateOne = checkDate(argv[0]);
		formatDate('time 1', dateOne);
	}
} else if (argv.length === 2) {
	if (argv[1].charAt(0) === '-' || argv[1].charAt(0) === '+') {
		d1 = checkDate(argv[0]);
		getOffset(moment(d1), argv[1]);
	} else {
		var d1 = checkDate(argv[0]);
		var d2 = checkDate(argv[1]);
		deltaDates(d1, d2);
	}
}
