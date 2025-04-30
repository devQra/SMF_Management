const Router = require('@koa/router');
const router = new Router();

const db = require('./db.controller');
const MQTT = require('../MQTT');

router
  // Management System CRUD
  .post('/Product', db.findProduct)
  .post('/Progress', db.findProgress)
  .post('/Target/Find', db.findTarget)
  .post('/Total', db.findTotal)

  .post('/Target/Update', db.insertTarget)

  // Account CRUD
  .post('/Admin/Login', db.loginAdmin)
  .post('/Admin/Register', db.registerAdmin)

  .post('/User/Login', db.loginUser)
  .post('/User/Register', db.registerUser)

  .post('/User2/Login', db.loginUser2)
  .post('/User2/Register', db.registerUser2)

  // User Page Board CRUD
  .get('/User/Board/List', db.getBoardList)
  .post('/User/Board/Detail', db.getBoardDetail)
  .post('/User/Board', db.insertBoard);

MQTT.Con(); // MQTT Connect
MQTT.Sub(); // MQTT Subscribe

module.exports = router;
