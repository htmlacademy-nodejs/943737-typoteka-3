'use strict';

const express = require(`express`);
const routes = require(`./routes/routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(routes);

app.listen(DEFAULT_PORT);
