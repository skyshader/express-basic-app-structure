'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const JwtService = require('./../../services/JwtService');
const _ = require('lodash');

module.exports = {
    login: (req, res) => {
        res.json({success: true, message: "AuthController_v1#login"});
    },

    signup: (req, res) => {
        User
            .create(_.omit(req.body, 'id'))
            .then((user) => {
                res.json({
                    token: JwtService.createToken(user),
                    user: user
                });
            })
            .catch((err) => {
                res.status = 500;
                res.json({
                    error: err
                });
            });

        res.status = 201;
        res.json({success: true, message: "AuthController_v1#signUp"});
    }
};