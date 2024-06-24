"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFoundHandler_1 = require("./app/middleware/notFoundHandler");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/v1/", routes_1.default);
app.get("/", (req, res) => {
    res.send("ph uni root path");
});
//  middlewares
app.use(globalErrorHandler_1.globalErrorHandler);
app.use("/*", notFoundHandler_1.notFoundHandler);
exports.default = app;
