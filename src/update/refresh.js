const refreshLastTenMinutes = require('./lastTenMinutes/refreshLastTenMinutes');
const refreshLastHour = require('./lastHour/refreshLastHour');


const refreshLastTenMinutesAll = (elements, pastTenMinutesQueue, config) => {
  elements.forEach((element, elementIndex) => {
    refreshLastTenMinutes(element, pastTenMinutesQueue.map(metric => metric[elementIndex]), config[elementIndex]);
  });
};

const refreshLastHourAll = (elements, pastHourQueue) => {
  elements.forEach((element, elementIndex) => {
    refreshLastHour(element, pastHourQueue.map(metric => metric[elementIndex]));
  });
};


module.exports = {refreshLastTenMinutesAll, refreshLastHourAll};
