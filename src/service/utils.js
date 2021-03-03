'use strict';

const fs = require(`fs`);

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.writeJsonFile = (content, fileName) => {
  const contentFile = JSON.stringify(content);

  try {
    fs.writeFileSync(fileName, contentFile);
    console.info(`Operation success. File created.`);
  } catch (error) {
    console.error(`Can't write data to file...`);
  }
};

module.exports.getRandomItemFromArray = (array) => {
  const randomItem = array[exports.getRandomInt(0, array.length - 1)];

  return randomItem;
};

module.exports.getDateFormattedString = (date) => {
  const [dateFormatedString] = date.toISOString().replace(`T`, ` `).match(/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d/);

  return dateFormatedString;
};

module.exports.getRandomDateWithBackShiftByMonth = (monthShiftCount) => {
  const timeToday = new Date().getTime();
  const timeShift = 24 * 3600000 * 30 * monthShiftCount;
  const timeDiff = timeToday - timeShift;
  const randomTime = exports.getRandomInt(timeDiff, timeToday);
  const randomDate = new Date(randomTime);

  randomDate.setSeconds(0, 0);

  return randomDate;
};
