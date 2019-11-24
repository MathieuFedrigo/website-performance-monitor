const {computeTenMinutesMetrics} = require('./computeMetrics');
const {refreshLastHourAll} = require('../update/refresh');

module.exports = (screen, config, elements, pastHourQueue, metricsTenMinutes) => {
  setInterval(() => {
    config.forEach((website, websiteIndex) => {
      metricsTenMinutes[websiteIndex] = computeTenMinutesMetrics(website);
    });
    pastHourQueue.push([...metricsTenMinutes]);
    if (pastHourQueue.length > 60) pastHourQueue.shift();

    refreshLastHourAll(elements, pastHourQueue);
    screen.render();
  }, 60 * 1000);
};
