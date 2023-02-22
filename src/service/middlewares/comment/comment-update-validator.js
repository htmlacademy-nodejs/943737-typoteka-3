"use strict";

const { HttpCode } = require(`../../constants`);

const commentKeys = [`text`];

const commentUpdateValidator = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = keys.some((key) => commentKeys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

module.exports = commentUpdateValidator;
