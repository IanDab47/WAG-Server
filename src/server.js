"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var express_1 = require("express");
var morgan_1 = require("morgan");
dotenv.config();
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 3001;
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('dev')); // Comment out to remove request logging
app.get('/', function (req, res) {
    res.json({ msg: 'hello backend 🐀🐀🐀' });
});
// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'));
app.listen(PORT, function () {
    console.log("is that port ".concat(PORT, " I hear? \uD83D\uDC00"));
});
