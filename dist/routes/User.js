"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
// import model from '../models/User'
const joi_1 = require("../middleware/joi");
const router = express_1.default.Router();
router.post('/create', (0, joi_1.ValidateJoi)(joi_1.Schemas.user.create), users_1.default.createUser);
router.get('/:userId', users_1.default.getUser);
router.get('/', users_1.default.getAllUsers);
router.patch('/:userId', (0, joi_1.ValidateJoi)(joi_1.Schemas.user.update), users_1.default.updateUser);
router.delete('/:userId', users_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=User.js.map