'use strict';

const express = require('express');
const router = express.Router();

// load versioned controllers
const main = require('../../app/controllers/v1/main');

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

    // If nothing else matches, return 404
    router.get('*', function(req, res) {
        res.status = 404;
        res.json({
            success: false,
            message: 'Unknown request'
        });
    });

    return router;
};
