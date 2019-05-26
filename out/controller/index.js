"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DownLoad_1 = __importDefault(require("./DownLoad"));
const Restart_1 = __importDefault(require("./Restart"));
const ShutDown_1 = __importDefault(require("./ShutDown"));
const TestGet_1 = __importDefault(require("./TestGet"));
const TestJsonp_1 = __importDefault(require("./TestJsonp"));
const TestPost_1 = __importDefault(require("./TestPost"));
const UpFile_1 = __importDefault(require("./UpFile"));
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