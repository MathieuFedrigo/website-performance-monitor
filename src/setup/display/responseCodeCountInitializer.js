const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {
  lastTenMinutesEveryTwoMinutes,
  lastHourEveryTenMinutes,
} = require('../../../helpers/timeArray');

const setResponseCodeCount = (grid, xGrid, yGrid, text, barCategory, data) => {
  const responseCodeCountBar = grid.set(xGrid, yGrid, 4, 3, contrib.stackedBar,
    {
      label: `Response Codes Count (last ${text})`,
      barWidth: 4,
      barSpacing: 6,
      xOffset: 0,
      maxValue: 120,
      // height: '40%',
      // width: '40%',
      barBgColor: ['green', 'yellow', [255, 150, 0], 'blue', 'red', 'magenta'],
    });


  const responseCodeCountData = {
    barCategory: barCategory,
    stackedCategory: ['2xx', '3xx', '4xx', '5xx', 'timeout', 'network'],
    data: data,
  };

  responseCodeCountBar.setData(responseCodeCountData);

  return {
    bar: responseCodeCountBar,
    data: responseCodeCountData,
  }
};

const setResponseCodeCountLastTenMinutes = grid => {
  return setResponseCodeCount(
    grid,
    8,
    0,
    '10 min',
    lastTenMinutesEveryTwoMinutes(),
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  );
};

const setResponseCodeCountLastHour = grid => {
  return setResponseCodeCount(
    grid,
    8,
    6,
    'hour',
    lastHourEveryTenMinutes(),
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  );
};

module.exports = {setResponseCodeCountLastTenMinutes, setResponseCodeCountLastHour};
