'use strict';

const ok = require('./ok');
const created = require('./created');
const error = require('./error');
const unauthorized = require('./unauthorized');

module.exports = {
    ok: ok,
    created: created,
    error: error,
    unauthorized: unauthorized
};
