module.exports = (size) => {
  return new Array(60).fill().map(u => new Array(size).fill().map(v => ({
    availability: 81,
    averageResponseTime: 0,
    responseCodeCount: [0, 0, 0, 0, 0],
    maxResponseTime: 0,
  })));
};
