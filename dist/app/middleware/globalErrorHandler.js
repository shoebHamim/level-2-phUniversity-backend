"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const AppError_1 = require("../errors/AppError");
//global error handler
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong";
    let errorSources = [
        {
            path: [""],
            message,
        },
    ];
    // checking if zod error
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorSources = zodError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        // you can handle it separately
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) == 11000) {
        // you can handle duplicate mongoDB error here
    }
    else if (err instanceof AppError_1.AppError) {
        // console.log('iha ekti app error');
    }
    const finalError = {
        success: false,
        message,
        errorSources,
        stack: config_1.default.environment === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    };
    return res.status(statusCode).json(finalError);
};
exports.globalErrorHandler = globalErrorHandler;
