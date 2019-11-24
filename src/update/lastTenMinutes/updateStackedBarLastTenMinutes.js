const {lastTenMinutesEveryTwoMinutes} = require('../../../helpers/timeArray');

module.exports = (element, pastTenMinutesQueue, name) => {
  const {bar, data} = element;

  data.data = [
    pastTenMinutesQueue[11][name],
    pastTenMinutesQueue[23][name],
    pastTenMinutesQueue[35][name],
    pastTenMinutesQueue[47][name],
    pastTenMinutesQueue[59][name],
  ];

  data.barCategory = lastTenMinutesEveryTwoMinutes();

  bar.setData(data);
};