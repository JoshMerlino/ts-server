"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
console.info = (...args) => console.log(chalk_1.default.blue("[ INFO ]"), ...args);
console.error = (...args) => console.log(chalk_1.default.red("[ ERROR ]"), ...args);
console.warn = (...args) => console.log(chalk_1.default.yellow("[ WARN ]"), ...args);
process.on("uncaughtException", err => console.error(err));
//# sourceMappingURL=console.js.map