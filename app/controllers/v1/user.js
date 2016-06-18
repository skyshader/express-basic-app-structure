'use strict';

class User {
    constructor() {}

    index(req, res) {
        return res.json({
            success: true,
            message: "User#v1"
        });
    }
}

module.exports = new User();
