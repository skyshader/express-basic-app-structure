'use strict';

const passport = require('passport');

module.exports = {
    isAuthenticated: (req, res, next) => {
        passport.authenticate('jwt', function (error, user, info) {
            if (error) {
                res.status = 500;
                return res.json({
                    success: false,
                    error: {
                        code: 'E_UNEXPECTED',
                        message: err
                    }
                });
            }
            
            if (!user) {
                res.status = 401;
                return res.json({
                    success: false,
                    error: {
                        code: info.code,
                        message: info.message
                    }
                });
            }

            req.user = user;

            next();
        })(req, res);
    }
};
