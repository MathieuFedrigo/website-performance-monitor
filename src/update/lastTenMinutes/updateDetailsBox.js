module.exports = (detailsBox, availability, config) => {
  detailsBox.setContent('' +
    '{bold}Website:{/bold} {blue-fg}' + config.url + '{/blue-fg}\n' +
    '{bold}Check intervals:{/bold} {blue-fg}' + config.interval + ' second' + '{/blue-fg}\n' +
    '{bold}Status:{/bold} ' + (availability > 80 ? '{green-fg}ONLINE{/green-fg}' : '{red-fg}DOWN{/red-fg}')
  );
};