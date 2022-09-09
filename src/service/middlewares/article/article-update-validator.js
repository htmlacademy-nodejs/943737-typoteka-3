"use strict";

const { HttpCode } = require(`../../constants`);

const articleKeys = [
  `category`,
  `createdDate`,
  `announce`,
  `fullText`,
  `title`,
];

const articleUpdateValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.some((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

module.exports = articleUpdateValidator;
