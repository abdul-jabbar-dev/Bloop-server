"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { data, meta }) => {
    const response = {
        data,
        meta,
    };
    res.send(response);
};
exports.default = sendResponse;
