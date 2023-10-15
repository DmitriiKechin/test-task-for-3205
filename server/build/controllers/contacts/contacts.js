"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = exports.currentAbortController = void 0;
const getErrorMessage_1 = require("../../helpers/getErrorMessage");
const getResponse_1 = require("./services/getResponse");
exports.currentAbortController = null;
exports.contactsController = {
    getContact: async (req, res) => {
        try {
            const abortController = new AbortController();
            const { signal } = abortController;
            exports.currentAbortController = abortController;
            const response = await (0, getResponse_1.getResponse)({ signal, req });
            return res.json(response);
        }
        catch (err) {
            const message = (0, getErrorMessage_1.getErrorMessage)(err);
            if (message === 'Aborted') {
                return res.end();
            }
            return res.status(400).json({ message });
        }
        finally {
            exports.currentAbortController = null;
        }
    },
};
