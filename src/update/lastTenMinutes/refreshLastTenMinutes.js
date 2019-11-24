const updateDetailsBox = require('./updateDetailsBox');
const updateAvailabilityDonut = require('./updateAvailabilityDonut');

const updateBarLastTenMinutes = require('./updateBarLastTenMinutes');
const updateLineLastTenMinutes = require('./updateLineLastTenMinutes');
const updateStackedBarLastTenMinutes = require('./updateStackedBarLastTenMinutes');

module.exports = (element, pastTenMinutesQueue, config) => {
  const {
    detailsBox,
    availabilityDonut,

    availabilityLastTenMinutes,
    averageResponseTimeLastTenMinutes,
    responseCodeCountLastTenMinutes,
    maxResponseTimeLastTenMinutes,
  } = element;

  updateDetailsBox(detailsBox, pastTenMinutesQueue[59]['availability'], config);
  updateAvailabilityDonut(availabilityDonut, pastTenMinutesQueue[59]['availability']);

  updateBarLastTenMinutes(availabilityLastTenMinutes, pastTenMinutesQueue, 'availability');
  updateLineLastTenMinutes(averageResponseTimeLastTenMinutes, pastTenMinutesQueue, 'averageResponseTime');
  updateStackedBarLastTenMinutes(responseCodeCountLastTenMinutes, pastTenMinutesQueue, 'responseCodeCount');
  updateBarLastTenMinutes(maxResponseTimeLastTenMinutes, pastTenMinutesQueue, 'maxResponseTime');

};
