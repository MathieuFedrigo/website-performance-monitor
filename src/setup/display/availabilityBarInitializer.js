const blessed = require('blessed');
const contrib = require('blessed-contrib');
const {
  lastTenMinutesEveryTwoMinutes,
  lastHourEveryTenMinutes,
} = require('../../../helpers/timeArray');

const setAvailability = (grid, xGrid, yGrid, text, titles, data) => {
  const availabilityBar = grid.set(xGrid, yGrid, 3, 3, contrib.bar,
    {
      label: `Availability (last ${text})`,
      barWidth: 4,
      barSpacing: 6,
      xOffset: 0,
      maxHeight: 9,
    });


  const availabilityData = {
    titles: titles,
    data: data,
  };

  availabilityBar.setData(availabilityData);

  return {
    bar: availabilityBar,
    data: availabilityData,
  }
};

const setAvailabilityLastTenMinutes = grid => {
  return setAvailability(
    grid,
    5,
    0,
    '10 min',
    lastTenMinutesEveryTwoMinutes(),
    [0, 0, 0, 0, 0],
  )
};

const setAvailabilityLastHour = grid => {
  return setAvailability(
    grid,
    5,
    6,
    'hour',
    lastHourEveryTenMinutes(),
    [0, 0, 0, 0, 0, 0],
  )
};

module.exports = {setAvailabilityLastTenMinutes, setAvailabilityLastHour};
