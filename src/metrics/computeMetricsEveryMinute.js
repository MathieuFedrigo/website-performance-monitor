const {computeTenMinutesMetrics} = require('./computeMetrics');
const {refreshLastHourAll} = require('../update/refresh');

module.exports = (screen, config, elements, pastHourQueue) => {
  const metricsTenMinutes = [];
  setInterval(() => {
    config.forEach((website, websiteIndex) => {
      metricsTenMinutes[websiteIndex] = computeTenMinutesMetrics(website); // Compute the new metric.
    });
    pastHourQueue.push([...metricsTenMinutes]); // Add the new metrics in the queue (for all websites).
    if (pastHourQueue.length > 60) pastHourQueue.shift();

    refreshLastHourAll(elements, pastHourQueue); // Refresh the grid data for all websites.
    screen.render();
  }, 60 * 1000);
};
