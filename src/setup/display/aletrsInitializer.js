const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = grid => {
  return grid.set(0, 6, 5, 6, contrib.log,
    {
      fg: "green",
      selectedFg: "green",
      label: 'Alerts',
      interactive: true,
      style: {
        border: {
          fg: 'red'
        }
      },
    },
  );
};
