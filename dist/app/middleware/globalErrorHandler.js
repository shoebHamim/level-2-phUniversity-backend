"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
//global error handler
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    const message = "something went wrong";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
