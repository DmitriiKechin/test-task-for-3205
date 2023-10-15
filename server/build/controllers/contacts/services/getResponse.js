"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = void 0;
const express_validator_1 = require("express-validator");
const data_json_1 = __importDefault(require("./data.json"));
function getResponse({ signal, req, }) {
    if (signal?.aborted) {
        return Promise.reject(new Error('Aborted'));
    }
    return new Promise((resolve, reject) => {
        let timeout;
        const abortHandler = () => {
            clearTimeout(timeout);
            reject(new Error('Aborted'));
        };
        // start async operation
        timeout = setTimeout(() => {
            const response = validateParams(req) ||
                getContact(req) || { message: 'Контакт не найден' };
            resolve(response);
            signal?.removeEventListener('abort', abortHandler);
        }, 5000);
        signal?.addEventListener('abort', abortHandler);
    });
}
exports.getResponse = getResponse;
const validateParams = (req) => {
    const validation = (0, express_validator_1.validationResult)(req);
    if (!validation.isEmpty()) {
        const message = validation.array().map((error) => error.msg);
        return { message };
    }
};
const getContact = (req) => {
    const { email, number } = req.body;
    const contact = data_json_1.default.find((contact) => contact.email === email && contact.number === Number(number));
    if (contact) {
        return { contact };
    }
};
