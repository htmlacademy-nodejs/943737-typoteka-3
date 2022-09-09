"use strict";

const express = require(`express`);
const { HttpCode, API_PREFIX } = require(`./constants`);

const app = express();
const routes = require(`./api/index`);

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

module.exports = app;
