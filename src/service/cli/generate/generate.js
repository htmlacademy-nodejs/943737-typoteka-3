'use strict';

const {
  getRandomInt,
  shuffle,
  writeJsonFile,
  getRandomItemFromArray,
  getDateFormattedString,
  getRandomDateWithBackShiftByMonth,
  readContent
} = require(`../../utils`);
const {
  FILE_CATEGORIES_PATH,
  FILE_ANNOUNCEMENTS_PATH,
  FILE_TITLES_PATH,
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

const generateOffers = (count, announcements, categories, titles) => (
  new Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(1, getRandomInt(2, categories.length)),
    createdDate: getRandomDateFormatedString(),
    announce: shuffle(announcements).slice(1, 6).join(` `),
    fullText: shuffle(announcements).slice(1, getRandomInt(2, announcements.length)).join(` `),
    title: getRandomItemFromArray(titles),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const annoucements = await readContent(FILE_ANNOUNCEMENTS_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(chalk.red(`Не больше ${MAX_COUNT_OFFER} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const content = generateOffers(countOffer, annoucements, categories, titles);

    await writeJsonFile(content, DEFAULT_FILE_NAME);
  }
};

