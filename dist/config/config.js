"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// config file created through RESTFUL API IN-Depth 2022 video from 5:00 - 12:00 minutes; however, video has further mongodb atlas configurations and mongo atlas server setup not included here
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@wag-backend.gapkosj.mongodb.net/?retryWrites=true&w=majority`;
// const devDB: string = 'mernAuth'
// const MONGODB_URI: string = process.env.MONGODB_URI || `mongodb://127.0.0.1/${devDB}`
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
//# sourceMappingURL=config.js.map