"use strict";

const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../cli/generate/generate.constants`);

class ArticleDataService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object.assign(
      { id: nanoid(MAX_ID_LENGTH), comments: [] },
      article
    );

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const article = this.findOne(id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this.findOne(id);

    if (!oldArticle) {
      return oldArticle;
    }

    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleDataService;
