"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zodValidator(err) {
    const error = {
        message: err.issues[0].path[1] + " is " + err.issues[0].message,
        name: err.name,
        statusCode: 400,
        path: {
            path: err.issues.map((er) => er.path.join("/")).join(", "),
            message: JSON.stringify(err.issues.map((er) => (er.path.join("/") + " is " + er.message).trim())),
        },
    };
    console.log(err);
    return error;
}
exports.default = zodValidator;
