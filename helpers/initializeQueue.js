module.exports = () => {
  return new Array(60).fill().map(u => new Array(3).fill().map(v => ({
    availability: 0,
    averageResponseTime: 0,
    responseCodeCount: [0, 0, 0, 0, 0],
    maxResponseTime: 0,
  })));
};
