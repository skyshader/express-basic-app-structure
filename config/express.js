'use strict';

const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

    app.disable('x-powered-by');

    app.use(parser.json());
    app.use(parser.urlencoded({ extended: false }));

    app.use(morgan(env));

    app.use(passport.initialize());

};
