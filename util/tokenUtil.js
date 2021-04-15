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

exports.analysisToken = async (req, res, next) => {
   const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:"";
    try {
        const payload = jwt.verify(token, cert);
        req.verifiedUser = payload;
        console.log('Verification success!', payload);
        next();
    } catch (e) {
        console.log('Verification failed!');
        throw new httpExceptions.CommonHttpErrorException("INVALID_TOKEN", "token", token);
    }


}
// exports.analysisToken = function (token) {
//     let payload;
//     try {
//         payload = jwt.verify(token, cert);
//     } catch (e) {
//         throw new httpExceptions.CommonHttpErrorException("INVALID_TOKEN", "token", token);
//     }
//     if (!payload.user_id) {
//         throw new httpExceptions.CommonHttpErrorException("INVALID_TOKEN", "payload", payload);
//     }
//     return payload;
// }