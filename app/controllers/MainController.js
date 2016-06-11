'use strict';

module.exports = {
    index: (req, res) => {
        res.json({success: true, message: "Main#index"});
    }
};
