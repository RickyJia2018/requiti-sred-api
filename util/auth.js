'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config');

const jwtExpirySeconds = config.jwt_expiry_seconds;
const privateKey = fs.readFileSync(path.resolve(__dirname, '../config/jwtRS256.key'));
const cert = fs.readFileSync(path.resolve(__dirname, '../config/jwtRS256.key.pub'));

const httpExceptions = require('../exceptions/HttpExceptions');
exports.generateToken = function (userId) {
    return jwt.sign({user_id: userId}, privateKey, {algorithm: 'RS256', expiresIn: jwtExpirySeconds});
} 

exports.analysisToken = function (token) {
    let payload;
    try {
        payload = jwt.verify(token, cert);
    } catch (e) {
        // if (e instanceof jwt.JsonWebTokenError) {
        //    // return res.status(401).end();
        //     throw new  httpExceptions.CommonHttpErrorException("INVALID_TOKEN","token",token);
        // }
        throw new httpExceptions.CommonHttpErrorException("INVALID_TOKEN", "token", token);
    }
    if (!payload.user_id) {
        throw new httpExceptions.CommonHttpErrorException("INVALID_TOKEN", "payload", payload);
    }
    return payload;
}