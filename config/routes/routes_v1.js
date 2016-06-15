'use strict';

const express = require('express');
const router = express.Router();

const authorization = require('./../middlewares/authorization');

// load versioned controllers
const main = require('../../app/controllers/v1/MainController');
const user = require('../../app/controllers/v1/UserController');
const auth = require('../../app/controllers/v1/AuthController');

// define routes
module.exports = function(passport) {

    // Add api version to the response
    router.use(function(req, res, next) {
        res._json = res.json;
        res.json = function json(obj) {
            obj.APIversion = 1;
            res._json(obj);
        };
        next();
    });

    // All routes definition goes here
    router.get('/', main.index);

    router.post('/auth/login', auth.login);
    router.post('/auth/signup', auth.signup);

    router.get('/users', authorization.isAuthenticated, user.index);

    // If nothing else matches, return 404
    router.get('*', function(req, res) {
        res.status = 404;
        res.json({
            success: false,
            error: {
                code: 'E_NOT_FOUND',
                message: 'Unknown Request'
            }
        });
    });

    return router;
};
