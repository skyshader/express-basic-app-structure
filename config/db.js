'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (app, config) => {
    // connect to mongoose
    const options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.db, options, () => {
        if (app.get('env') === 'development' || app.get('env') === 'test') {
            mongoose.connection.db.dropDatabase();
        }
    });

    mongoose.connection
        .on('error', console.log)
        .on('disconnected', () => {
            console.log('Failed to connect to mongodb!');
        })
        .once('open', () => {
            console.log('Connected to mongodb!');
        });
};
