'use strict';

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const passport = require('passport');
const config = require('./../config');

const app = express();
module.exports = app;

const db = require('./../config/db')(app, config);

// Bootstrap models
const models = join(__dirname, './../app/models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

require('./../config/passport')(passport);
require('./../config/express')(app, passport);
require('./../config/routes')(app, passport);

module.exports = app;
