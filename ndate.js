#!/usr/bin/env node

const moment = require('moment');

const {formatDate, diffDates, checkDate} = require('./lib/format');

var argv = process.argv.slice(2);

if (argv.length === 0) {
	formatDate('now', moment());
} else if (argv.length === 1) {
	var dateOne = checkDate(argv[0]);
	formatDate('time 1', dateOne);
} else if (argv.length === 2) {
	var dateOne = checkDate(argv[0]);
	var dateTwo = checkDate(argv[1]);
	formatDate('time 1', dateOne);
	formatDate('time 2', dateTwo);
	diffDates(dateOne, dateTwo);
}
