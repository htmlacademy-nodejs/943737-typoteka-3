'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const writeJsonFile = async (content, fileName) => {
  const contentFile = JSON.stringify(content);

  try {
    await fs.writeFile(fileName, contentFile);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file...`));
    throw error;
  }
};

const getRandomItemFromArray = (array) => {
  const randomItem = array[getRandomInt(0, array.length - 1)];

  return randomItem;
};

const getDateFormattedString = (date) => {
  const [dateFormatedString] = date.toISOString().replace(`T`, ` `).match(/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d/);

  return dateFormatedString;
};

const getRandomDateWithBackShiftByMonth = (monthShiftCount) => {
  const timeToday = Date.now();
  const timeShift = 24 * 3600000 * 30 * monthShiftCount;
  const timeDiff = timeToday - timeShift;
  const randomTime = getRandomInt(timeDiff, timeToday);
  const randomDate = new Date(randomTime);

  randomDate.setSeconds(0, 0);

  return randomDate;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  getDateFormattedString,
  getRandomDateWithBackShiftByMonth,
  getRandomItemFromArray,
  writeJsonFile,
  shuffle,
  getRandomInt,
  readContent
};
