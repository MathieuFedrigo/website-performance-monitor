// Create an array with every minutes in a day in the correct format.
const allTime = [];
for (let hours = 23; hours < 48; hours++) {
  for (let minutes = 0; minutes < 60; minutes++) {
    const hoursString = '0' + hours%24;
    const minutesString = '0' + minutes;
    allTime.push(
      hoursString.substr(hoursString.length - 2, hoursString.length)
      + ':'
      + minutesString.substr(minutesString.length - 2, minutesString.length)
    );
  }
}

const getCurrentTimeAsString = () => {
  return new Date().toTimeString().slice(0,5);
};

const lastTenMinutesEveryTwoMinutes = () => {
  const i = allTime.lastIndexOf(getCurrentTimeAsString());
  return [allTime[i - 8], allTime[i - 6], allTime[i - 4], allTime[i - 2], allTime[i]];
};

const lastTenMinutesEveryTenSeconds = () => {
  const i = allTime.lastIndexOf(getCurrentTimeAsString());
  return [
    allTime[i - 9], allTime[i - 9], allTime[i - 9], allTime[i - 9], allTime[i - 9], allTime[i - 9],
    allTime[i - 8], allTime[i - 8], allTime[i - 8], allTime[i - 8], allTime[i - 8], allTime[i - 8],
    allTime[i - 7], allTime[i - 7], allTime[i - 7], allTime[i - 7], allTime[i - 7], allTime[i - 7],
    allTime[i - 6], allTime[i - 6], allTime[i - 6], allTime[i - 6], allTime[i - 6], allTime[i - 6],
    allTime[i - 5], allTime[i - 5], allTime[i - 5], allTime[i - 5], allTime[i - 5], allTime[i - 5],
    allTime[i - 4], allTime[i - 4], allTime[i - 4], allTime[i - 4], allTime[i - 4], allTime[i - 4],
    allTime[i - 3], allTime[i - 3], allTime[i - 3], allTime[i - 3], allTime[i - 3], allTime[i - 3],
    allTime[i - 2], allTime[i - 2], allTime[i - 2], allTime[i - 2], allTime[i - 2], allTime[i - 2],
    allTime[i - 1], allTime[i - 1], allTime[i - 1], allTime[i - 1], allTime[i - 1], allTime[i - 1],
    allTime[i], allTime[i], allTime[i], allTime[i], allTime[i], allTime[i],
  ];
};

const lastHourEveryTenMinutes = () => {
  const i = allTime.lastIndexOf(getCurrentTimeAsString());
  return [allTime[i - 50], allTime[i - 40], allTime[i - 30], allTime[i - 20], allTime[i - 10], allTime[i]];
};

const lastHourEveryMinutes = () => {
  const i = allTime.lastIndexOf(getCurrentTimeAsString());
  return allTime.slice(i - 60, i + 1);
};

module.exports = {
  lastTenMinutesEveryTwoMinutes,
  lastTenMinutesEveryTenSeconds,
  lastHourEveryTenMinutes,
  lastHourEveryMinutes,
};
