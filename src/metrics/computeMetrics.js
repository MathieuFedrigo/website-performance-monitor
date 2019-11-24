// Compute metrics over the last numberOfPoints provided.
const computeMetrics = (website, numberOfPoints) => {
  const data = website.data.slice(
    Math.max(website.data.length - (numberOfPoints), 0),
    website.data.length,
  );

  const numberOfGoodResponse = data.filter(value => value[0] === 200).length;
  const availability = (100 * numberOfGoodResponse / data.length) || 0;

  const maxResponseTime = data.reduce((a, b) => Math.max(a, b[1]), 0);

  let sumResponseTime = data
    .filter(value => value[0] === 200)
    .reduce(
      (accumulator, currentValue) => accumulator += currentValue[1],
      0,
    );
  const averageResponseTime = sumResponseTime / data.filter(value => value[0] === 200).length;

  // Format -->  responseCodeCount = [#2xx, #3xx, #4xx, #5xx, #timeouts, #network/dns errors]
  const responseCodeCount = [0, 0, 0, 0, 0, 0];
  data.forEach(value =>
    responseCodeCount[value[0]<-1 ? 5 : value[0]<0 ? 4 : value[0]<300 ? 0 : value[0]<400 ? 1 : value[0]<500 ? 2 : 3]++
  );

  return {availability, averageResponseTime, responseCodeCount, maxResponseTime};
};

const computeTwoMinutesMetrics = website => computeMetrics(website, 2 * 60 / website.interval);
const computeTenMinutesMetrics = website => computeMetrics(website, 10 * 60 / website.interval);

module.exports = {computeTwoMinutesMetrics, computeTenMinutesMetrics};
