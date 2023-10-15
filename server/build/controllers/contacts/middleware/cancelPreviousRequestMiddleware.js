"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPreviousRequestMiddleware = void 0;
const contacts_1 = require("../contacts");
const cancelPreviousRequestMiddleware = (req, res, next) => {
    if (contacts_1.currentAbortController) {
        contacts_1.currentAbortController.abort();
    }
    next();
};
exports.cancelPreviousRequestMiddleware = cancelPreviousRequestMiddleware;
