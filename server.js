'use strict';

require('dotenv').config();

// const fs = require('fs');
// const join = require('path').join();
const express = require('express');
const db = require('mongoose');
const passport = require('passport');
db.Promise = require('bluebird');

const config = require('./config');
const port = process.env.PORT || 3000;

const app = express();

module.exports = app;

//require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

mongoose_connect()
    .on('error', console.log)
    .on('disconnected', function() {})
    .once('open', listen);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function mongoose_connect () {
    const options = { server: { socketOptions: { keepAlive: 1 } } };
    return db.connect(config.db, options).connection;
}
