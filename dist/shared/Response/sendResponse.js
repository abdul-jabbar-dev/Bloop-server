"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { message, status, data, meta }) => {
    const response = {
        message,
        status: true,
        data,
        meta,
    };
    res.send(response);
};
exports.default = sendResponse;
