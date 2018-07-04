const moment = require('moment');
const extsprintf = require('extsprintf');

const printf = extsprintf.printf;

var formatDate = (name, date) => {
	var epochMsDate = moment(date).format('x');
	var localDate = '= ' + moment(date).format('YYYY-MM-DDTHH:MM:ss.SSSZ');
	var utcDate = '= ' + moment(date).format('YYYY-MM-DDTHH:MM:ss.SSS') + 'Z';
	printf('%-8s %15s %32s\n %51s\n', name, epochMsDate, localDate, utcDate)
};

var diffDates = (dateOne, dateTwo) => {
	var a = moment(dateOne);
	var b = moment(dateTwo);
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

var checkDate = (date) => {
	if (isNaN(date) && moment(date).isValid) {
		return date;
	} else if (!isNaN(date)) {
		return parseInt(date, 10);
	} else {
		console.error(`Error! ${date} is not a valid date string.`)
	}
}

module.exports = {formatDate, diffDates, checkDate};
