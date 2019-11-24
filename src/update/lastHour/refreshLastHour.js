const updateBarLastHour = require('./updateBarLastHour');
const updateLineLastHour = require('./updateLineLastHour');
const updateStackedBarLastHour = require('./updateStackedBarLastHour');

module.exports = (elements, pastHourQueue) => {
  const {
    availabilityLastHour,
    averageResponseTimeLastHour,
    responseCodeCountLastHour,
    maxResponseTimeLastHour,
  } = elements;

  updateBarLastHour(availabilityLastHour, pastHourQueue, 'availability');
  updateLineLastHour(averageResponseTimeLastHour, pastHourQueue, 'averageResponseTime');
  updateStackedBarLastHour(responseCodeCountLastHour, pastHourQueue, 'responseCodeCount');
  updateBarLastHour(maxResponseTimeLastHour, pastHourQueue, 'maxResponseTime');

};