const {lastHourEveryTenMinutes} = require('../../../helpers/timeArray');

module.exports = (element, pastTenMinutesQueue, name) => {
  const {bar, data} = element;

  data.data = [
    pastTenMinutesQueue[9][name],
    pastTenMinutesQueue[19][name],
    pastTenMinutesQueue[29][name],
    pastTenMinutesQueue[39][name],
    pastTenMinutesQueue[49][name],
    pastTenMinutesQueue[59][name],
  ];

  data.barCategory = lastHourEveryTenMinutes();

  bar.setData(data);
};