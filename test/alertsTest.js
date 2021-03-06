const expect = require('chai').expect;
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {setGridAll} = require('../src/setup/gridSetter');
const {checkForAlerts} = require('../src/metrics/computeMetricsEveryTenSeconds');
const initializeQueueAvailabilityAbove80 = require('./mockData/initializeQueueAvailabilityAbove80');
const initializeQueueAvailabilityBelow80 = require('./mockData/initializeQueueAvailabilityBelow80');

const initializeEnvironment = () => {
  const config = [{
    url: 'http://www.google.com',
    interval: 1000,
    data: [],
  }];

  const screen = blessed.screen();
  const grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
  const elements = setGridAll(grid, config);
  return {config, elements};
};

describe('Check the Alert Element to se if an alert is thrown when a new Availability is checked', () => {
  // For all those tests, we initialize the environment (screen, gird, elements) like it would be. Then we initialize
  // the pastTenMinutesQueue like it could be during a session and we check the effects on the Alerts element of a
  // new metric (without computing it from the data --> see metricsTest for the computation of this metric).

  it('Should not throw an alert when availability > 80% and new availability > 80%', () => {
    const {config, elements} = initializeEnvironment();
    let pastTenMinutesQueue = initializeQueueAvailabilityAbove80(1);

    let currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);

    const newAvailability = 81;
    checkForAlerts(newAvailability, pastTenMinutesQueue, elements, config, 0);

    currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);
  });

  it('Should throw a DOWN alert when availability > 80% and new availability < 80%', () => {
    const {config, elements} = initializeEnvironment();
    let pastTenMinutesQueue = initializeQueueAvailabilityAbove80(1);

    let currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);

    const newAvailability = 79;
    checkForAlerts(newAvailability, pastTenMinutesQueue, elements, config, 0);

    currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(1);
    expect(currentAlerts[0]).to.equal(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[0].url}  is DOWN.     Availability: ${Math.floor(newAvailability)}%`);
  });

  it('Should throw a BACK ONLINE alert when availability < 80% and new availability > 80%', () => {
    const {config, elements} = initializeEnvironment();
    let pastTenMinutesQueue = initializeQueueAvailabilityBelow80(1);

    let currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);

    const newAvailability = 81;
    checkForAlerts(newAvailability, pastTenMinutesQueue, elements, config, 0);

    currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(1);
    expect(currentAlerts[0]).to.equal(`${new Date().toTimeString().slice(0, 8)} -     Website  ${config[0].url}  is BACK ONLINE.`);
  });

  it('Should not throw an alert when availability < 80% and new availability < 80%', () => {
    const {config, elements} = initializeEnvironment();
    let pastTenMinutesQueue = initializeQueueAvailabilityBelow80(1);

    let currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);

    const newAvailability = 79;
    checkForAlerts(newAvailability, pastTenMinutesQueue, elements, config, 0);

    currentAlerts = elements[0].alerts.logLines;
    expect(currentAlerts).to.have.lengthOf(0);
  });
});
