"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
exports.CONTROLLER = [];
function useController(controller) {
    exports.CONTROLLER.push(controller);
}
try {
    const files = fs_1.readdirSync(path_2.CONTROLLER_PATH);
    files.forEach((f) => __awaiter(this, void 0, void 0, function* () {
        const c = yield Promise.resolve().then(() => __importStar(require(path_1.join(path_2.CONTROLLER_PATH, 'Restart.ts'))));
        useController(c);
    }));
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=CONTROLLER.js.map