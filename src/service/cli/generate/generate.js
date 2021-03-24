'use strict';

const {
  getRandomInt,
  shuffle,
  writeJsonFile,
  getRandomItemFromArray,
  getDateFormattedString,
  getRandomDateWithBackShiftByMonth,
} = require(`../../utils`);
const {
  CATEGORIES,
  ANNOUNCEMENTS,
  TITLES,
  DEFAULT_COUNT,
  MAX_COUNT_OFFER,
  DEFAULT_FILE_NAME,
  MONTH_SHIFT_COUNT,
} = require(`./generate.constants`);
const {ExitCode} = require(`../../constants`);
const chalk = require(`chalk`);

const getRandomDateFormatedString = () => {
  const randomDate = getRandomDateWithBackShiftByMonth(MONTH_SHIFT_COUNT);
  const randomDateFormattedString = getDateFormattedString(randomDate);

  return randomDateFormattedString;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(1, getRandomInt(2, CATEGORIES.length)),
    createdDate: getRandomDateFormatedString(),
    announce: shuffle(ANNOUNCEMENTS).slice(1, 6).join(` `),
    fullText: shuffle(ANNOUNCEMENTS).slice(1, getRandomInt(2, ANNOUNCEMENTS.length)).join(` `),
    title: getRandomItemFromArray(TITLES),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(chalk.red(`Не больше ${MAX_COUNT_OFFER} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const content = generateOffers(countOffer);

    await writeJsonFile(content, DEFAULT_FILE_NAME);
  }
};

