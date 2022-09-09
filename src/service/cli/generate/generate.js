"use strict";

const {
  getRandomInt,
  shuffle,
  writeJsonFile,
  getRandomItemFromArray,
  getDateFormattedString,
  getRandomDateWithBackShiftByMonth,
  readContent,
} = require(`../../utils`);
const {
  FILE_CATEGORIES_PATH,
  FILE_ANNOUNCEMENTS_PATH,
  FILE_TITLES_PATH,
  DEFAULT_COUNT,
  MAX_COUNT_OFFER,
  DEFAULT_FILE_NAME,
  MONTH_SHIFT_COUNT,
  MAX_ID_LENGTH,
  FILE_COMMENTS_PATH,
  MAX_COMMENTS,
} = require(`./generate.constants`);
const { ExitCode } = require(`../../constants`);
const chalk = require(`chalk`);
const { nanoid } = require(`nanoid`);

const getRandomDateFormatedString = () => {
  const randomDate = getRandomDateWithBackShiftByMonth(MONTH_SHIFT_COUNT);
  const randomDateFormattedString = getDateFormattedString(randomDate);

  return randomDateFormattedString;
};

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));

const generateArticles = (count, announcements, categories, titles, comments) =>
  new Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: shuffle(categories).slice(1, getRandomInt(2, categories.length)),
    createdDate: getRandomDateFormatedString(),
    announce: shuffle(announcements).slice(1, 6).join(` `),
    fullText: shuffle(announcements)
      .slice(1, getRandomInt(2, announcements.length))
      .join(` `),
    title: getRandomItemFromArray(titles),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const annoucements = await readContent(FILE_ANNOUNCEMENTS_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticle > MAX_COUNT_OFFER) {
      console.error(chalk.red(`Не больше ${MAX_COUNT_OFFER} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const content = generateArticles(
      countArticle,
      annoucements,
      categories,
      titles,
      comments
    );

    await writeJsonFile(content, DEFAULT_FILE_NAME);
  },
};
