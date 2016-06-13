'use strict';

const mongoose = require('mongoose');
const HashService = require('../services/HashService');

const UserSchema = new mongoose.Schema(
    {
        first_name:  {
            type: String,
            default: ''
        },
        last_name: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            required: true,
            minlength: 4,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

UserSchema.set('toJSON', { getters: true, virtuals: false, transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
    return ret;
} });

UserSchema.set('toObject', { getters: true, virtuals: false, transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
    return ret;
} });

UserSchema.pre('save', function(next) {
    let user = this;
    if(this.isModified('password') || this.isNew) {
        HashService.hashPassword(user, (err, hash) => {
            user.password = hash;
            next();
        });
    }
    return next();
});

module.exports = mongoose.model('User', UserSchema);
