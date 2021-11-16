const moment = require('moment');

var getWeekDayFromDate = currentDate => {
  const date = new Date(currentDate);
  return date.getDay();
};

var getCurrentMonth = () => {
  var m = moment().format('MMM YYYY');
  return m;
};

var getTodayDate = () => {
  var m = moment().format('DD MMM YYYY');
  return m;
};

var parseDate = date => {
  var m = moment(date).format('DD MMM YYYY');
  return m;
};

var parseMonth = date => {
  var m = moment(date).format('MMM YYYY');
  return m;
};

var parseDateMonthFormat = date => {
  var m = moment(date).format('DD/MM/yyyy');
  return m;
};

var parseDateHiphenFormat = date => {
  var m = moment(date).format('YYYY-MM-DD');
  return m;
};

var parseDateMonth = (date, isDate) => {
  var m = date.split(' ')[0];
  return isDate
    ? moment(m, 'MM/DD/YYYY', true).format('DD')
    : moment(m, 'MM/DD/YYYY', true).format('MMM');
};

var parseTime = date => {
  var m = moment(date).format('hh:mm a');
  return m;
};

export {
  getCurrentMonth,
  getTodayDate,
  parseDate,
  parseDateMonthFormat,
  parseTime,
  parseDateMonth,
  parseDateHiphenFormat,
  parseMonth,
  getWeekDayFromDate,
};
