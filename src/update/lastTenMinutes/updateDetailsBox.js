module.exports = (detailsBox, availability, website) => {
  detailsBox.setContent('' +
    '{bold}Website:{/bold} {blue-fg}' + website.url + '{/blue-fg}\n' +
    '{bold}Check intervals:{/bold} {blue-fg}' + website.interval + ' second' + '{/blue-fg}\n' +
    '{bold}Status:{/bold} ' + (availability > 80 ? '{green-fg}ONLINE{/green-fg}' : '{red-fg}DOWN{/red-fg}')
  );
};