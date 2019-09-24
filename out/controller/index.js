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
const combineController = (...clazz) => clazz.map(c => new c());
const CONTROLLER = combineController(DownLoad_1.DownLoad, Restart_1.Restart, ShutDown_1.ShutDown, TestGet_1.TestGet, TestJsonp_1.TestJsonp, TestPost_1.TestPost, UpFiles_1.UpFiles, TestRand_1.TestRand);
exports.default = CONTROLLER;
//# sourceMappingURL=index.js.map