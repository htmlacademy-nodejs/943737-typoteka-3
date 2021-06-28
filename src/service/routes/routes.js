'use strict';

const {Router} = require(`express`);
const offersRoutes = require(`./offers-routes`);

const routes = new Router();

routes.use(`/offers`, offersRoutes);

module.exports = routes;
