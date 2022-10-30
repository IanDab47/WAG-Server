"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require mongoose package
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const devDB = 'mernAuth';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1/${devDB}`;
mongoose_1.default.connect(MONGODB_URI);
const db = mongoose_1.default.connection;
// Connection methods
db.once('open', () => {
    console.log(`🔗 Connected to MongoDB at ${db.host}:${db.port}`);
});
db.on('error', (err) => {
    console.error(`🔥 Datacenter burned down:\n${err}`);
});
module.exports = {
    User: require('./User')
};
//# sourceMappingURL=index.js.map