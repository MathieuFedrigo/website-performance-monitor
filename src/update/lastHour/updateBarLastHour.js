const {lastHourEveryTenMinutes} = require('../../../helpers/timeArray');

module.exports = (element, pastTenMinutesQueue, name) => {
  const {bar, data} = element;

  data.data = [
    Math.floor(pastTenMinutesQueue[9][name]),
    Math.floor(pastTenMinutesQueue[19][name]),
    Math.floor(pastTenMinutesQueue[29][name]),
    Math.floor(pastTenMinutesQueue[39][name]),
    Math.floor(pastTenMinutesQueue[49][name]),
    Math.floor(pastTenMinutesQueue[59][name]),
  ];

  data.titles = lastHourEveryTenMinutes();

  bar.setData(data);
};