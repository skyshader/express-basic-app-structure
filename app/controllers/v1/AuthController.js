'use strict';

const _ = require('lodash');
const passport = require('passport');
const JwtService = require('./../../services/JwtService');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login: (req, res) => {
        console.log('Logining in..');
        passport.authenticate('jwt', () => {
            console.log('inside');
            res.json({});
        });
    },

    signup: (req, res) => {
        let user = new User(_.omit(req.body, 'id'));
        user.save()
            .then(() => {
                console.log('User model: ', typeof user);
                res.status = 201;
                res.json({
                    success: true,
                    token: JwtService.createToken(user),
                    user: user.toJSON()
                });
            })
            .catch((err) => {
                res.status = 500;
                res.json({
                    success: false,
                    error: err
                });
            });
    }
};
