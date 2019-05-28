"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownLoad_1 = require("./DownLoad");
const Restart_1 = require("./Restart");
const ShutDown_1 = require("./ShutDown");
const TestGet_1 = require("./TestGet");
const TestJsonp_1 = require("./TestJsonp");
const TestPost_1 = require("./TestPost");
const UpFile_1 = require("./UpFile");
const CONTROLLER = [
    DownLoad_1.default,
    Restart_1.default,
    ShutDown_1.default,
    TestGet_1.default,
    TestJsonp_1.default,
    TestPost_1.default,
    UpFile_1.default
];
exports.default = CONTROLLER;
//# sourceMappingURL=index.js.map