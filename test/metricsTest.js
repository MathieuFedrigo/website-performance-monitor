const expect = require('chai').expect;
const {computeTwoMinutesMetrics} = require('../src/metrics/computeMetrics');

const config = [{
  url: 'http://www.google.com',
  interval: 1,
  data: [],
}];

describe('Check the metrics calculated when new data arrives.', () => {
  // For all those tests, we just check if the metrics calculated when new data arrives are correct.

  it('Should compute an availability of 90%', () => {
    config[0].data = [
      [200, Math.random() * 1000], // 9 data points where website is available
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [500, Math.random() * 1000], // 1 data point where website is unavailable
    ];
    const newMetrics = computeTwoMinutesMetrics(config[0]);
    expect(newMetrics.availability).to.equal(90);
  });

  it('Should compute an availability of 70%', () => {
    config[0].data = [
      [200, Math.random() * 1000], // 7 data points where website is available
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [200, Math.random() * 1000],
      [500, Math.random() * 1000], // 3 data points where website is unavailable
      [500, Math.random() * 1000],
      [500, Math.random() * 1000],
    ];
    const newMetrics = computeTwoMinutesMetrics(config[0]);
    expect(newMetrics.availability).to.equal(70);
  });
});
