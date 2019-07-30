"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownLoad_1 = require("./DownLoad");
const Restart_1 = require("./Restart");
const ShutDown_1 = require("./ShutDown");
const TestGet_1 = require("./TestGet");
const TestJsonp_1 = require("./TestJsonp");
const TestPost_1 = require("./TestPost");
const TestRand_1 = require("./TestRand");
const UpFiles_1 = require("./UpFiles");
const CONTROLLER = [
    new DownLoad_1.DownLoad,
    new Restart_1.Restart,
    new ShutDown_1.ShutDown,
    new TestGet_1.TestGet,
    new TestJsonp_1.TestJsonp,
    new TestPost_1.TestPost,
    new UpFiles_1.UpFiles,
    new TestRand_1.TestRand
];
exports.default = CONTROLLER;
//# sourceMappingURL=index.js.map