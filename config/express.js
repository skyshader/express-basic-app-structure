'use strict';

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const parser = require('body-parser');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

    app.disable('x-powered-by');

    app.use(parser.json());
    app.use(parser.urlencoded({ extended: false }));

    // app.use(methodOverride(function (req) {
    //     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //         var method = req.body._method;
    //         delete req.body._method;
    //         return method;
    //     }
    // }));

    app.use(morgan(env));

    app.use(passport.initialize());

};
