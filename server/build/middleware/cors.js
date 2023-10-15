"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
};
exports.default = cors;
