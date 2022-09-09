"use strict";

const { HttpCode } = require(`../../constants`);

module.exports = (req, res, next) => {
  const { commentId } = req.params;
  const { article } = res.locals;

  const comment = article.comments.find(({ id }) => id === commentId);

  if (!comment) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Comment with id equals ${commentId} was not found`);
  }

  res.locals.comment = comment;

  return next();
};
