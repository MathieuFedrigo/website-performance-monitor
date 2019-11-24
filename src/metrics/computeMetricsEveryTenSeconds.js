const {computeTwoMinutesMetrics} = require('./computeMetrics');
const {refreshLastTenMinutesAll} = require('../update/refresh');

const checkForAlerts = (newAvailability, pastTenMinutesQueue, elements, config, websiteIndex) => {
  if (newAvailability < 80 && pastTenMinutesQueue[59][websiteIndex].availability > 80) {
    elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is DOWN.     Availability: ${Math.floor(newAvailability)}%`);
  }
  if (newAvailability > 80 && pastTenMinutesQueue[59][websiteIndex].availability < 80) {
    elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is BACK ONLINE.`);
  }
};

const computeMetricsEveryTenSeconds = (screen, config, elements, pastTenMinutesQueue, metricsTwoMinutes) => {
  setInterval(() => {
    config.forEach((website, websiteIndex) => {
      metricsTwoMinutes[websiteIndex] = computeTwoMinutesMetrics(website);
      checkForAlerts(metricsTwoMinutes[websiteIndex].availability, pastTenMinutesQueue, elements, config, websiteIndex);
    });

    pastTenMinutesQueue.push([...metricsTwoMinutes]);
    if (pastTenMinutesQueue.length > 6 * 10) pastTenMinutesQueue.shift();

    refreshLastTenMinutesAll(elements, pastTenMinutesQueue, config);
    screen.render();
  }, 10 * 1000);
};

module.exports = {computeMetricsEveryTenSeconds, checkForAlerts};
