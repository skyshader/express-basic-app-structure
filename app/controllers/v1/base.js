'use strict';

class Base {
    constructor() {}

    index(req, res) {
        return res.json({
            success: true,
            message: "Base#v1"
        });
    }
}

module.exports = new Base();
