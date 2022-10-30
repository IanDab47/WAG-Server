"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const User_1 = __importDefault(require("../models/User"));
// import { Schemas, ValidateJoi } from '../middleware/joi'
const router = express_1.default.Router();
router.post('/create', users_1.default.createUser(User_1.default));
router.get('/:userId', users_1.default.getUser(User_1.default));
router.get('/', users_1.default.getAllUsers(User_1.default));
router.patch('/:userId', users_1.default.updateUser(User_1.default));
router.delete('/:userId', users_1.default.deleteUser(User_1.default));
exports.default = router;
//# sourceMappingURL=User.js.map