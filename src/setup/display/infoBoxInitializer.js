const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = (grid, currentWebsite, config) => {
  const detailsBox = grid.set(0, 0, 5, 3, blessed.box, {
    tags: true,
    label: 'Details',
    style: {
      border: {
        fg: 'yellow'
      }
    },
  });

  detailsBox.setContent('' +
    '{center}{bold}WEBSITE PERFORMANCE MONITOR{/bold}{/center}\n\n' +
    'Change website with {bold}ARROWS{/bold}\n' +
    'Press {bold}ESCAPE{/bold} to exit\n\n' +
    'Websites:\n' +
    config
      .map(website => `${website === currentWebsite ? '{black-bg}' : ''}- ${website.url}${website === currentWebsite ? '{/black-bg}' : ''}\n`)
      .join('')
  );

  return detailsBox;
};
