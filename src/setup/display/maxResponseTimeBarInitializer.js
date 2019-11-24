const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {
  lastTenMinutesEveryTwoMinutes,
  lastHourEveryTenMinutes,
} = require('../../../helpers/timeArray');

const setMaxResponseTime = (grid, xGrid, yGrid, text, titles, data) => {
  const maxResponseTimeBar = grid.set(xGrid, yGrid, 3, 3, contrib.bar,
    {
      label: `Max Response Time (last ${text})`,
      barWidth: 4,
      barSpacing: 6,
      xOffset: 0,
      maxHeight: 9,
    });


  const maxResponseTimeData = {
    titles: titles,
    data: data,
  };

  maxResponseTimeBar.setData(maxResponseTimeData);

  return {
    bar: maxResponseTimeBar,
    data: maxResponseTimeData,
  }
};

const setMaxResponseTimeLastTenMinutes = grid => {
  return setMaxResponseTime(
    grid,
    9,
    3,
    '10 min',
    lastTenMinutesEveryTwoMinutes(),
    [0, 0, 0, 0, 0],
  );
};

const setMaxResponseTimeLastHour = grid => {
  return setMaxResponseTime(
    grid,
    9,
    9,
    'hour',
    lastHourEveryTenMinutes(),
    [0, 0, 0, 0, 0, 0],
  );
};

module.exports = {setMaxResponseTimeLastTenMinutes, setMaxResponseTimeLastHour};
