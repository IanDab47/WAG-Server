"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./routes/User"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev')); // Comment out to remove request logging
app.get('/', (req, res) => {
    res.json({ msg: 'hello backend 🐀🐀🐀' });
});
// controllers
app.use('/users', User_1.default);
app.listen(PORT, () => {
    console.log(`is that port ${PORT} I hear? 🐀`);
});
//# sourceMappingURL=server.js.map