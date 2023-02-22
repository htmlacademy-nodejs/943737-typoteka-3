"use strict";

const app = require(`../app`);
const { getLogger } = require(`./../lib/logger`);

const DEFAULT_PORT = 3000;
const logger = getLogger();

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port)
      .on(`listening`, () => {
        logger.info(`Ожидаю соединений на ${port}`);
      })
      .on(`error`, ({ message }) => {
        logger.error(`Ошибка при создании сервера: ${message}`);
      });
  },
};
