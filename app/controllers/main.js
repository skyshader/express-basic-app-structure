'use strict';

module.exports = {
    index: function(req, res) {
        res.json({success: true, message: "Main#index"});
    }
};