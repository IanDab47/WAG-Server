"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config/config");
// import router from './routes/User';
// May need to change line 5 in package.json back from
//    "main": "src/server.ts",
// to
//    "main": "dist/server.js",
// initial switch to "src/server.ts" was have 'nodemon' available instead of npm run start
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('connected');
})
    .catch(error => {
    console.log(error);
});
app.use(express_1.default.urlencoded({ extended: true })); // from RESTFUL API IN-Depth 2022 video
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev')); // Comment out to remove request logging
// API rules (from 16:48 in RESTFUL API IN-Depth 2022 video)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, UPDATE, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.get('/', (req, res) => {
    res.json({ msg: 'hello backend 🐀🐀🐀' });
});
// controllers
app.use('/users', User_1.default);
app.listen(PORT, () => {
    console.log(`is that port ${PORT} I hear? 🐀`);
});
//# sourceMappingURL=server.js.map