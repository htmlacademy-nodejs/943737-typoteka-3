'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../constants`);

const FILENAME = `mocks.json`;

const offersRoutes = new Router();

offersRoutes.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);

    res.json(mocks);
  } catch (error) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(error);
  }
});

module.exports = offersRoutes;
