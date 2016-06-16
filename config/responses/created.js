'use strict';

module.exports = (res, data) => {
    return res.status(201).send({
        success: true,
        data: data
    });
};
