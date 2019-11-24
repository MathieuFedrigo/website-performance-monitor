const {lastHourEveryMinutes} = require('../../../helpers/timeArray');

module.exports = (element, queue, name) => {
  const {line, data} = element;

  data.y = queue.map(metric => metric[name]);

  data.x = lastHourEveryMinutes();

  line.setData(data);
};