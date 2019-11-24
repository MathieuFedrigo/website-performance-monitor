const request = require('request');

const updateData = website => {
  request({
    uri: website.url,
    method: 'GET',
    timeout: 5000,
    time: true
  }, (err, resp) => {
    if (err) {
      if (err.code === 'ESOCKETTIMEDOUT') {
        website.data.push([-1, -1]);
      } else {
        website.data.push([-2, -2]);
      }
    } else {
      website.data.push([resp.statusCode, resp.timingPhases.firstByte]);
    }
    if (website.data.length > 60 * 60 / website.interval) website.data.shift();
  });
};

module.exports = config => {
  config.forEach(website => {
    setInterval(() => {
      updateData(website);
    }, website.interval * 1000);
  });
};
