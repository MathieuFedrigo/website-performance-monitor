'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const getConfig = require('./helpers/getConfig');
const computeMetricsEveryTenSeconds = require('./src/metrics/computeMetricsEveryTenSeconds');
const computeMetricsEveryMinute = require('./src/metrics/computeMetricsEveryMinute');
const startWebsitesPingLoop = require('./helpers/pingWebsites');
const {setGrid, setGridAll} = require('./src/setup/gridSetter');
const {refreshLastTenMinutesAll, refreshLastHourAll} = require('./src/update/refresh');
const initializeQueue = require('./helpers/initializeQueue');
const setKeyListeners = require('./src/keyListener/setKeyListeners');

(async () => {
  return await getConfig();
})().then((config) => {
  let metricsTwoMinutes = [];
  let metricsTenMinutes = [];
  let pastTenMinutesQueue = initializeQueue();
  let pastHourQueue = initializeQueue();


  const screen = blessed.screen();
  const grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
  const elements = setGridAll(grid, config);

  let currentPageIndex = config.length - 1;
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


  startWebsitesPingLoop(config);
  computeMetricsEveryTenSeconds(screen, config, elements, pastTenMinutesQueue, metricsTwoMinutes);
  computeMetricsEveryMinute(screen, config, elements, pastHourQueue, metricsTenMinutes);
}).catch(e => e.log());
