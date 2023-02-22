"use strict";

const { Router } = require(`express`);
const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../cli/generate/generate.constants`);
const { HttpCode } = require(`../constants`);
const articleExist = require(`../middlewares/article/article-exist`);
const articleCreateValidator = require(`../middlewares/article/article-create-validator`);
const articleUpdateValidator = require(`../middlewares/article/article-update-validator`);
const commentExist = require(`../middlewares/comment/comment-exist`);
const commentCreateValidator = require(`../middlewares/comment/comment-create-validator`);
const commentUpdateValidator = require(`../middlewares/comment/comment-update-validator`);

const route = new Router();

const articleController = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await service.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExist(service), async (req, res) => {
    const { article } = res.locals;

    res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleCreateValidator, async (req, res) => {
    const article = await service.create(req.body);

    res.status(HttpCode.CREATED).json(article);
  });

  route.put(
    `/:articleId`,
    [articleUpdateValidator, articleExist(service)],
    async (req, res) => {
      const { articleId } = req.params;
      const article = await service.update(articleId, req.body);

      res.status(HttpCode.OK).json(article);
    }
  );

  route.delete(`/:articleId`, articleExist(service), async (req, res) => {
    const { articleId } = req.params;
    const article = await service.drop(articleId);

    res.status(HttpCode.OK).json(article);
  });

  route.get(`/:articleId/comments`, articleExist(service), async (req, res) => {
    const {
      article: { comments },
    } = res.locals;

    res.status(HttpCode.OK).json(comments);
  });

  route.get(
    `/:articleId/comments/:commentId`,
    [articleExist(service), commentExist],
    async (req, res) => {
      const { comment } = res.locals;

      res.status(HttpCode.OK).json(comment);
    }
  );

  route.post(
    `/:articleId/comments`,
    [commentCreateValidator, articleExist(service)],
    async (req, res) => {
      const {
        article: { comments },
      } = res.locals;
      const comment = Object.assign({ id: nanoid(MAX_ID_LENGTH) }, req.body);

      comments.push(comment);

      res.status(HttpCode.CREATED).json(comment);
    }
  );

  route.put(
    `/:articleId/comments/:commentId`,
    [commentUpdateValidator, articleExist(service), commentExist],
    async (req, res) => {
      const { comment } = res.locals;
      const updatedComment = Object.assign(comment, req.body);

      res.status(HttpCode.OK).json(updatedComment);
    }
  );

  route.delete(
    `/:articleId/comments/:commentId`,
    [articleExist(service), commentExist],
    async (req, res) => {
      const { comment, article } = res.locals;
      const { commentId } = req.params;

      article.comments = article.comments.filter(({ id }) => id !== commentId);

      res.status(HttpCode.OK).json(comment);
    }
  );
};

module.exports = articleController;
