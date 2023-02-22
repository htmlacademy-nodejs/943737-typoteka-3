"use strict";

const debug = require(`debug`);
const log = debug(`app:start-request`);

const middleware = (req, res, next) => {
  log(`Start request to url ${req.url}`);
  next();
};

module.exports = { middleware };
