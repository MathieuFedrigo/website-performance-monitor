const {computeTwoMinutesMetrics} = require('./computeMetrics');
const {refreshLastTenMinutesAll} = require('../update/refresh');

// All the metrics calculated are stored in pastTenMinutesQueue
// To throw a DOWN alert, we need to check if newAvailability<80 AND lastAvailability>80
// To throw a BACK ONLINE alert, we need to check if newAvailability>80 AND lastAvailability<80
// Otherwise we do nothing.
const checkForAlerts = (newAvailability, pastTenMinutesQueue, elements, config, websiteIndex) => {
  if (newAvailability < 80 && pastTenMinutesQueue[59][websiteIndex].availability > 80) {
    elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is DOWN.     Availability: ${Math.floor(newAvailability)}%`);
  }
  if (newAvailability > 80 && pastTenMinutesQueue[59][websiteIndex].availability < 80) {
    elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is BACK ONLINE.`);
  }
};

const computeMetricsEveryTenSeconds = (screen, config, elements, pastTenMinutesQueue) => {
  const metricsTwoMinutes = [];
  setInterval(() => {
    config.forEach((website, websiteIndex) => {
      metricsTwoMinutes[websiteIndex] = computeTwoMinutesMetrics(website); // Compute the new metric.
      checkForAlerts(metricsTwoMinutes[websiteIndex].availability, pastTenMinutesQueue, elements, config, websiteIndex);
    });

    pastTenMinutesQueue.push([...metricsTwoMinutes]); // Add the new metrics in the queue (for all websites).
    if (pastTenMinutesQueue.length > 6 * 10) pastTenMinutesQueue.shift();

    refreshLastTenMinutesAll(elements, pastTenMinutesQueue, config); // Refresh the grid data for all websites.
    screen.render();
  }, 10 * 1000);
};

module.exports = {computeMetricsEveryTenSeconds, checkForAlerts};
