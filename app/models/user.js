'use strict';

const mongoose = require('mongoose');
const AuthService = require('../services/HashService');

const UserSchema = new mongoose.Schema({
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
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', (next) => {
    let user = this;
    if(this.isModified('password') || this.isNew) {
        AuthService.hashPassword(user, next);
    }
    return next();
});

mongoose.model('User', UserSchema);
