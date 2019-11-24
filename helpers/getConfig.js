const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'url',
    message: 'Website url?',
    initial: 'http://www.google.com',
  },
  {
    type: 'number',
    name: 'interval',
    message: 'Check intervals? (in ms)',
    initial: 1000,
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Add another website?',
    initial: false,
  }
];

// Prompts the user for the different websites he wants then creates the config object.
module.exports = async () => {
  const config = [];
  let response;

  do {
    response = await prompts(questions);
    config.push({
      url: response.url,
      interval: response.interval,
      data: [],
    })
  } while (response.confirm);

  return config;
};
