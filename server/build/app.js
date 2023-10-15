"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middleware/cors"));
const getErrorMessage_1 = require("./helpers/getErrorMessage");
const path_1 = __importDefault(require("path"));
const contacts_routes_1 = __importDefault(require("./routes/contacts.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5500;
app.use(cors_1.default);
app.use(express_1.default.json());
app.use('/api/v1/contacts/', contacts_routes_1.default);
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../client', 'build', 'index.html'));
});
async function start() {
    try {
        app.listen(PORT, () => console.log(`App has been started on port --> ${PORT}...`));
    }
    catch (e) {
        console.log('server Error :-(', (0, getErrorMessage_1.getErrorMessage)(e));
        process.exit(1);
    }
}
start();
