"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function middleware(req, res, next) {
    const route = req.originalUrl.split("?")[0].split("#")[0];
    const timestamp = Date.now();
    console.info(chalk_1.default.blueBright("INB"), "<-", chalk_1.default.cyan(route), chalk_1.default.magenta(req.method), chalk_1.default.redBright(req.secure ? "" : "INSECURE"));
    const completionCheck = setInterval(function () {
        if (!res.headersSent)
            return;
        const duration = Date.now() - timestamp;
        console.info(chalk_1.default.blueBright("OUB"), "->", chalk_1.default.cyan(route), chalk_1.default.magenta(req.method), chalk_1.default.greenBright(res.statusCode), chalk_1.default.yellowBright(`${duration}ms`));
        clearInterval(completionCheck);
    });
    return next();
}
exports.default = middleware;
//# sourceMappingURL=logger.js.map