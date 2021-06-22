'use strict';

const articlesRoutes = require(`./articles-routes`);
const categoriesRoutes = require(`./categories-routes`);
const myRoutes = require(`./my-routes`);
const mainRoutes = require(`./main-routes`);
const {Router} = require(`express`);

const routes = new Router();

routes.use(`/articles`, articlesRoutes);
routes.use(`/categories`, categoriesRoutes);
routes.use(`/my`, myRoutes);
routes.use(`/`, mainRoutes);

module.exports = routes;
