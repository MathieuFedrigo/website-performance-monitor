const {lastTenMinutesEveryTwoMinutes} = require('../../../helpers/timeArray');

module.exports = (element, pastTenMinutesQueue, name) => {
  const {bar, data} = element;

  data.data = [
    Math.floor(pastTenMinutesQueue[11][name]),
    Math.floor(pastTenMinutesQueue[23][name]),
    Math.floor(pastTenMinutesQueue[35][name]),
    Math.floor(pastTenMinutesQueue[47][name]),
    Math.floor(pastTenMinutesQueue[59][name]),
  ];

  data.titles = lastTenMinutesEveryTwoMinutes();

  bar.setData(data);
};