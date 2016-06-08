'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(morgan(env));

    app.use(passport.initialize());

};
