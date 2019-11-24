const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = (grid, url, interval) => {
  const detailsBox = grid.set(0, 3, 2, 3, blessed.box, {
    tags: true,
    label: 'Details',
    style: {
      border: {
        fg: 'blue'
      }
    },
  });

  detailsBox.setContent('' +
    '{bold}Website:{/bold} {blue-fg}' + url + '{/blue-fg}\n' +
    '{bold}Check intervals:{/bold} {blue-fg}' + interval + ' ms' + '{/blue-fg}\n' +
    '{bold}Status:{/bold} ' + '{red-fg}DOWN{/red-fg}'
  );

  return detailsBox;
};
