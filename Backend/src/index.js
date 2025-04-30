'use strict';

require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const router = require('./routers');

const app = new Koa();
const ip = process.env.DOMAIN;
const port = process.env.PORT;

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Connected to http://${ip}:${port}`);
  });
