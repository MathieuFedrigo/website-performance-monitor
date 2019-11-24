'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const getConfig = require('./helpers/getConfig');
const {computeMetricsEveryTenSeconds} = require('./src/metrics/computeMetricsEveryTenSeconds');
const computeMetricsEveryMinute = require('./src/metrics/computeMetricsEveryMinute');
const startWebsitesPingLoop = require('./helpers/pingWebsites');
const {setGrid, setGridAll} = require('./src/setup/gridSetter');
const {refreshLastTenMinutesAll, refreshLastHourAll} = require('./src/update/refresh');
const initializeQueue = require('./helpers/initializeQueue');
const setKeyListeners = require('./src/keyListener/setKeyListeners');

(async () => {
  // The config object stores the url, the check interval and the Website response time data
  return await getConfig(); // Get the config from the prompts.
})().then((config) => {
  // Initialize the queue of the last 60 2min-metrics calculated every 10 seconds for 10 minutes.
  let pastTenMinutesQueue = initializeQueue(config.length);
  // Initialize the queue of the last 60 10min-metrics calculated every minutes for 1 hour.
  let pastHourQueue = initializeQueue(config.length);


  const screen = blessed.screen();
  const grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
  const elements = setGridAll(grid, config); // Stores all the grid elements of all the websites.

  let currentPageIndex = config.length - 1;
  // This function re-renders the corresponding grid elements of the desired page.
  const selectWebsite = pageIndex => {
    const newElement = setGrid(grid, config[pageIndex], config);
    const alerts = elements[pageIndex].alerts;
    elements[pageIndex] = newElement;
    elements[pageIndex].alerts = alerts;
    refreshLastTenMinutesAll(elements, pastTenMinutesQueue, config);
    refreshLastHourAll(elements, pastHourQueue);
    screen.render();
  };

  setKeyListeners(screen, config.length, currentPageIndex, selectWebsite);
  screen.render();


  //Start the different loops.
  startWebsitesPingLoop(config);
  computeMetricsEveryTenSeconds(screen, config, elements, pastTenMinutesQueue);
  computeMetricsEveryMinute(screen, config, elements, pastHourQueue);
}).catch(e => console.log(e));
