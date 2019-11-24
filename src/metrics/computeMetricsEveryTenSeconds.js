const {computeTwoMinutesMetrics} = require('./computeMetrics');
const {refreshLastTenMinutesAll} = require('../update/refresh');

module.exports = (screen, config, elements, pastTenMinutesQueue, metricsTwoMinutes) => {
  setInterval(() => {
    config.forEach((website, websiteIndex) => {
      metricsTwoMinutes[websiteIndex] = computeTwoMinutesMetrics(website);
      if (metricsTwoMinutes[websiteIndex].availability < 80 && pastTenMinutesQueue[59][websiteIndex].availability > 80) {
        elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is DOWN.     Availability: ${Math.floor(metricsTwoMinutes[websiteIndex]['availability'])}%`);
      }
      if (metricsTwoMinutes[websiteIndex].availability > 80 && pastTenMinutesQueue[59][websiteIndex].availability < 80) {
        elements[0].alerts.log(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[websiteIndex].url}  is BACK ONLINE.`);
      }
    });

    pastTenMinutesQueue.push([...metricsTwoMinutes]);
    if (pastTenMinutesQueue.length > 6 * 10) pastTenMinutesQueue.shift();

    refreshLastTenMinutesAll(elements, pastTenMinutesQueue, config);
    screen.render();
  }, 10 * 1000);
};
