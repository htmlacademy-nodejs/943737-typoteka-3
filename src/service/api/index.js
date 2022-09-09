"use strict";

const { Router } = require(`express`);
const CategoryDataService = require(`../data-service/category-data-service`);
const categoryController = require(`./category-controller`);
const getMockData = require(`./../lib/get-mock-data`);
const articleController = require(`./article-controller`);
const ArticleDataService = require(`../data-service/article-data-service`);
const searchController = require(`./search-controller`);
const SearchDataService = require(`../data-service/search-data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categoryController(app, new CategoryDataService(mockData));
  articleController(app, new ArticleDataService(mockData));
  searchController(app, new SearchDataService(mockData));
})();

module.exports = app;
