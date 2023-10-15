"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_1 = require("../controllers/contacts/contacts");
const express_validator_1 = require("express-validator");
const cancelPreviousRequestMiddleware_1 = require("../controllers/contacts/middleware/cancelPreviousRequestMiddleware");
const router = (0, express_1.Router)();
router.post('', cancelPreviousRequestMiddleware_1.cancelPreviousRequestMiddleware, (0, express_validator_1.body)('email').isEmail().withMessage('Не верный email'), (0, express_validator_1.body)('number')
    .isInt()
    .withMessage('Необходимо ввести число')
    .isLength({ min: 6, max: 6 })
    .withMessage('номер должен содержать 6 чисел'), contacts_1.contactsController.getContact);
exports.default = router;
