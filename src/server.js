"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_require_context_1 = __importDefault(require("async-require-context"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const path_1 = require("path");
const { webserver } = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)("./package.json"), "utf8"));
async function server(app) {
    const middlewares = await (0, async_require_context_1.default)("./lib/src/middleware").catch(() => []);
    middlewares.map(middleware => {
        app.use(middleware.module.default);
        console.info(chalk_1.default.magenta("MDW"), "Added middleware from", chalk_1.default.cyan(middleware.path));
    });
    const runtimes = await (0, async_require_context_1.default)("./lib/src/runtime").catch(() => []);
    runtimes.map(runtime => {
        runtime.module.default(app);
        console.info(chalk_1.default.yellow("RNT"), "Added runtime from", chalk_1.default.cyan(runtime.path));
    });
    const endpoints = await (0, async_require_context_1.default)("./lib/api").catch(() => []);
    endpoints.map(function (endpoint) {
        const routes = typeof endpoint.module.route === "string" ? [endpoint.module.route] : endpoint.module.route;
        routes.map(route => app.all(`/api/${route}`, endpoint.module.default));
        console.info(chalk_1.default.greenBright("EDP"), "Added API endpoints from", chalk_1.default.cyan(endpoint.path));
    });
    const PORT = process.env.PORT || webserver.http.port;
    const SSL_PORT = process.env.SSL_PORT || webserver.https.port;
    http_1.default.createServer(app).listen(PORT);
    console.info(chalk_1.default.redBright("SRV"), "HTTP server running on", chalk_1.default.cyan(`:${PORT} (http)`));
    if (webserver.https.enabled) {
        let files = await (0, promises_1.readdir)((0, path_1.resolve)(webserver.https.certs));
        files = files.map(file => (0, path_1.resolve)(webserver.https.certs, file));
        const key = files.filter(file => file.includes("key"))[0];
        const cert = files.filter(file => file.includes("cert"))[0];
        https_1.default.createServer({
            key: await (0, promises_1.readFile)(key, "utf8"),
            cert: await (0, promises_1.readFile)(cert, "utf8")
        }, app).listen(SSL_PORT);
        console.info(chalk_1.default.redBright("SRV"), "SSL server running on", chalk_1.default.cyan(`:${SSL_PORT} (https)`));
    }
}
exports.default = server;
//# sourceMappingURL=server.js.map