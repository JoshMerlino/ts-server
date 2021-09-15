"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prettyJSON(req, res, next) {
    res.json = function (body) {
        res.header("Content-Type", "application/json; charset=utf-8");
        if (typeof body === "object") {
            const pretty = req.query.hasOwnProperty("pretty") || req.header("pretty") === "true";
            return res.send(JSON.stringify(body, pretty ? null : undefined, pretty ? 4 : undefined));
        }
        return res.send(body);
    };
    return next();
}
exports.default = prettyJSON;
//# sourceMappingURL=prettyJSON.js.map