var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexController = require('./controller/indexController');
var competenciasController = require('./controller/competenciaController');

const dbConnection = require('./helper/dbConnection');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'cliente')));

app.use('/', indexController);
app.use('/competencias', competenciasController.init(dbConnection));

module.exports = app;