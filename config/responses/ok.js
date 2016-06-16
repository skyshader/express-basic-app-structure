'use strict';

module.exports = (res, data) => {
    return res.status(200).send({
        success: true,
        data: data
    });
};
