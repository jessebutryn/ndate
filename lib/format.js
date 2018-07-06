const moment = require('moment');
const extsprintf = require('extsprintf');
const _ = require('lodash');

const printf = extsprintf.printf;

var formatDate = (name, d) => {
	var epochMsDate = moment(d).format('x');
	var localDate = '= ' + moment(d).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
	var utcDate = '= ' + moment(d).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	printf('%-8s %15s %32s\n %51s\n', name, epochMsDate, localDate, utcDate)
};

var diffDates = (d1, d2) => {
	var a = moment(d1);
	var b = moment(d2);
	var diff = moment.duration(a.diff(b));
	var diffYear = '= ' + diff._data.years + 'y';
	var diffMonth = diff._data.months + 'M';
	var diffDay = diff._data.days + 'd';
	var diffHour = diff._data.hours + 'h';
	var diffMin = diff._data.minutes + 'm';
	var diffSec = diff._data.seconds + 's';
	var diffMs = diff._data.milliseconds + 'ms';
	printf('%-8s %21s %2s %2s %2s %2s %2s %2s\n', 'delta', diffYear, diffMonth, diffDay, diffHour, diffMin, diffSec, diffMs);
};

var checkDate = (d) => {
	if (isNaN(d) && moment(d).isValid()) {
		return moment(d);
	} else if (!isNaN(d)) {
		return moment(parseInt(d, 10));
	} else {
		console.error(`Error! ${d} is not a valid date string.`)
		process.exit(1);
	}
};

var getOffset = (d, offset) => {
	var operation = offset.charAt(0);
	var values = offset.substring(1).split(/[a-zA-Z]/).filter(v=>v!='')
	var keys = offset.substring(1).split(/[0-9]/).filter(v=>v!='')
	offsetObject = _.zipObject(keys, values);
	if (operation === '+') {
		var d1 = moment(d).add(offsetObject);
		var d2 = d;
		deltaDates(d1, d2);
	} else if (operation === '-') {
		var d1 = moment(d).subtract(offsetObject);
		var d2 = d;
		deltaDates(d1, d2);
	}
};

var deltaDates = (d1, d2) => {
	formatDate('time 1', d1);
	formatDate('time 2', d2);
	diffDates(d1, d2);
}

module.exports = {formatDate, diffDates, checkDate, getOffset, deltaDates};
