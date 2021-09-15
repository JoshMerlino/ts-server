"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const { webserver } = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)("./package.json"), "utf8"));
function middleware(req, res, next) {
    if (!webserver.https.enabled)
        return next();
    if (req.secure)
        return next();
    return res.redirect(307, `https://${req.hostname}${req.url}`);
}
exports.default = middleware;
//# sourceMappingURL=forceSsl.js.map