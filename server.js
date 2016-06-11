'use strict';

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const config = require('./config');
const models = join(__dirname, 'app/models');

const port = process.env.PORT || 3000;

const app = express();
module.exports = app;

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));


require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);


const listen = () => {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
};

// connect to mongoose
const options = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(config.db, options);
mongoose.connection
    .on('error', console.log)
    .on('disconnected', () => {})
    .once('open', listen());
