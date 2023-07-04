const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, queryErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

//lista blanca de acceso externo a la api mediante cors
//validar si funciona



app.use(cors());

require("./utils/auth");

routerApi(app);

app.use(logErrors);
app.use(queryErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
