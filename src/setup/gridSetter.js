const {setAvailabilityLastTenMinutes, setAvailabilityLastHour} = require('./display/availabilityBarInitializer');
const {setAverageResponseTimeLastTenMinutes, setAverageResponseTimeLastHour} = require('./display/averageResponseTimeLineInitializer');
const {setResponseCodeCountLastTenMinutes, setResponseCodeCountLastHour} = require('./display/responseCodeCountInitializer');
const {setMaxResponseTimeLastTenMinutes, setMaxResponseTimeLastHour} = require('./display/maxResponseTimeBarInitializer');
const setAlerts = require('./display/aletrsInitializer');
const setDetailsBox = require('./display/detailsBoxInitializer');
const setAvailabilityDonut = require('./display/availabilityDonulInitializer');
const setInfo = require('./display/infoBoxInitializer');


const setGrid = (grid, website, config) => {
  const info = setInfo(grid, website, config);
  const detailsBox = setDetailsBox(grid, website.url, website.interval);
  const availabilityDonut = setAvailabilityDonut(grid);

  const availabilityLastTenMinutes = setAvailabilityLastTenMinutes(grid);
  const averageResponseTimeLastTenMinutes = setAverageResponseTimeLastTenMinutes(grid);
  const responseCodeCountLastTenMinutes = setResponseCodeCountLastTenMinutes(grid);
  const maxResponseTimeLastTenMinutes = setMaxResponseTimeLastTenMinutes(grid);

  const availabilityLastHour = setAvailabilityLastHour(grid);
  const averageResponseTimeLastHour = setAverageResponseTimeLastHour(grid);
  const responseCodeCountLastHour = setResponseCodeCountLastHour(grid);
  const maxResponseTimeLastHour = setMaxResponseTimeLastHour(grid);

  return {
    info,
    detailsBox,
    availabilityDonut,

    availabilityLastTenMinutes,
    averageResponseTimeLastTenMinutes,
    responseCodeCountLastTenMinutes,
    maxResponseTimeLastTenMinutes,

    availabilityLastHour,
    averageResponseTimeLastHour,
    responseCodeCountLastHour,
    maxResponseTimeLastHour,

  };
};

const setGridAll = (grid, config) => {
  // Creates all grid elements for all websites
  const elements = config.map(website => setGrid(grid, website, config));
  const alerts = setAlerts(grid); // Creates a single instance of the Alerts element because it's shared across websites
  return elements.map(element => ({...element, alerts}));
};

module.exports = {setGrid, setGridAll};
