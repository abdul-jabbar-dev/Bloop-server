"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tokenExpiredError(err) {
    const expierDate = new Date(err.expiredAt);
    const error = {
        name: err.name,
        path: {
            path: "JWT Expired",
            message: "User authorization token invalid at: " + expierDate.toLocaleDateString() + " " + expierDate.toTimeString(),
        },
        message: err.message === "jwt expired"
            ? "Authorization token Expired"
            : err.message,
        statusCode: 401,
    };
    return error;
}
exports.default = tokenExpiredError;
