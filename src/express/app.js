"use strict";

const express = require(`express`);
const routes = require(`./routes/routes`);
const path = require(`path`);
const { HttpCode } = require(`../service/constants`);
const { getLogger } = require(`./../service/lib/logger`);
const startRequest = require(`./../service/lib/start-request`);
const logger = getLogger();
const pino = require(`express-pino-logger`)({ logger });

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const app = express();

app.use(startRequest);
app.use(pino);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(routes);
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).render(`errors/404`);
});

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
