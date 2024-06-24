"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
//regular middleware
const notFoundHandler = (req, res, next) => {
    const message = "API not found!";
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message,
    });
};
exports.notFoundHandler = notFoundHandler;
