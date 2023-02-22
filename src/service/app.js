"use strict";

const express = require(`express`);
const { HttpCode, API_PREFIX } = require(`./constants`);
const { getLogger } = require(`./lib/logger`);

const app = express();
const routes = require(`./api/index`);
const logger = getLogger();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`End request with error ${res.statusCode}`);
});

module.exports = app;
