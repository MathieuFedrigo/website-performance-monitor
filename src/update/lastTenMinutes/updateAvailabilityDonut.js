module.exports = (availabilityDonut, availability) => {
  availabilityDonut.setData([{
    label: '',
    percent: availability,
    color: availability>95 ? 'green' : availability>80 ? 'yellow' : 'red',
  }]);
};