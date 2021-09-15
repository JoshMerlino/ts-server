"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
exports.default = (0, compression_1.default)({
    filter: (req) => !req.query.hasOwnProperty("decompressed") && req.header("use-gzip") !== "false",
    level: 8
});
//# sourceMappingURL=gzip.js.map