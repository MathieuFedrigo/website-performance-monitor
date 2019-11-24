const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {
  lastTenMinutesEveryTenSeconds,
  lastHourEveryMinutes,
} = require('../../../helpers/timeArray');

const setAverageResponseTime = (grid, xGrid, yGrid, text, x, y) => {
  const averageResponseTimeLine = grid.set(xGrid, yGrid, 4, 3, contrib.line,
    {
      showNthLabel: 5,
      label: `Average Response Time (last ${text})`,
      showLegend: false,
      legend: {width: 10}
    });


  const averageResponseTimeData = {
    title: 'Google',
    style: {line: 'red'},
    x: x,
    y: y,
  };

  averageResponseTimeLine.setData(averageResponseTimeData);

  return {
    line: averageResponseTimeLine,
    data: averageResponseTimeData,
  }
};

const setAverageResponseTimeLastTenMinutes = grid => {
  return setAverageResponseTime(
    grid,
    5,
    3,
    '10 min',
    lastTenMinutesEveryTenSeconds(),
    Array(60).fill(0),
  );
};

const setAverageResponseTimeLastHour = grid => {
  return setAverageResponseTime(
    grid,
    5,
    9,
    'hour',
    lastHourEveryMinutes(),
    Array(60).fill(0),
  );
};

module.exports = {setAverageResponseTimeLastTenMinutes, setAverageResponseTimeLastHour};
