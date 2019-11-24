const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = grid => {
  return grid.set(2, 3, 3, 3, contrib.donut,
    {
      label: 'Availability (last 2 min)',
      radius: 16,
      arcWidth: 4,
      yPadding: -2,
      data: [{label: '', percent: 0}],
      style: {
        border: {
          fg: 'blue'
        }
      },
    });
};
