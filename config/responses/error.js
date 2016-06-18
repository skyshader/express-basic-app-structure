'use strict';

module.exports = (res, err) => {
    return res.status(500).send({
        success: false,
        error: {
            code: 'E_UNEXPECTED',
            trace: err.stack,
            message: "Something went wrong!"
        }
    });
};
